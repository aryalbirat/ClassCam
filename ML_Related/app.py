# from flask import Flask, Response, jsonify
# from flask_cors import CORS
# import cv2
# from detector import YOLOv5ActionDetector
# from annotator import annotate_attentive_actions
#
# app = Flask(__name__)
# CORS(app)
# action_detector = YOLOv5ActionDetector(weights_path='best.pt')
#
# cap = cv2.VideoCapture('http://192.168.101.2:8776/video')
#
# TOTAL_STUDENTS = 4
# latest_labels = []
#
#
# def generate_frames():
#     global latest_labels
#
#     while True:
#         success, frame = cap.read()
#         if not success:
#             break
#
#         action_boxes, action_labels = action_detector.detect(frame)
#         latest_labels = action_labels  # Save latest labels for /attentiveness
#
#         annotated_frame = annotate_attentive_actions(frame, action_boxes, action_labels)
#
#
#         _, buffer = cv2.imencode('.jpg', annotated_frame)
#         frame_bytes = buffer.tobytes()
#
#         yield (b'--frame\r\n'
#                b'Content-Type: image/jpeg\r\n'
#                b'Content-Length: ' + f"{len(frame_bytes)}".encode() + b'\r\n\r\n' +
#                frame_bytes + b'\r\n')
#
#
# @app.route('/')
# def index():
#     return "<h2>Webcam Attentiveness Monitoring Active</h2>"
#
#
# @app.route('/video_feed')
# def video_feed():
#     return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')
#
#
# @app.route('/attentiveness')
# def get_attentiveness():
#     attentive_actions = ['hand_raising', 'reading', 'writing']
#     attentive_count = sum(1 for label in latest_labels if label in attentive_actions)
#     attentiveness_score = round(attentive_count / TOTAL_STUDENTS, 2)
#     return jsonify({"attentiveness": attentiveness_score})
#
#
# if __name__ == '__main__':
#     app.run(debug=True)



# Now for the video code
# app.py
from flask import Flask, Response, jsonify
from flask_cors import CORS
import cv2
import time
from detector import YOLOv5ActionDetector
from annotator import annotate_attentive_actions
from logger import log_performance_metrics

app = Flask(__name__)
CORS(app)

action_detector = YOLOv5ActionDetector(weights_path='best.pt')

# Use video file instead of webcam
cap = cv2.VideoCapture('./assets/Video.mov')

# Constants
TOTAL_STUDENTS = 4
latest_labels = []  # Will hold the latest frame's detected actions

def generate_frames():
    global latest_labels
    frame_count = 0
    start_time = time.time()

    while cap.isOpened():
        capture_time = time.time()
        success, frame = cap.read()
        if not success:
            print("End of video or failed to read frame.")
            break

        # Detect actions and time inference
        infer_start = time.time()
        action_boxes, action_labels = action_detector.detect(frame)
        infer_end = time.time()
        inference_time = infer_end - infer_start

        latest_labels = action_labels  # Store for API use

        # Annotate the frame
        annotated_frame = annotate_attentive_actions(frame, action_boxes, action_labels)

        # Latency
        render_time = time.time()
        latency = render_time - capture_time

        # FPS
        frame_count += 1
        elapsed_time = time.time() - start_time
        fps = frame_count / elapsed_time if elapsed_time > 0 else 0.0

        # Log performance
        log_performance_metrics(fps, inference_time, latency)

        # Encode and yield the frame
        _, buffer = cv2.imencode('.jpg', annotated_frame)
        frame_bytes = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n'
               b'Content-Length: ' + f"{len(frame_bytes)}".encode() + b'\r\n\r\n' +
               frame_bytes + b'\r\n')

    cap.release()

@app.route('/')
def index():
    return "<h2>Video Attentiveness Monitoring Active</h2>"

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/attentiveness')
def get_attentiveness():
    attentive_actions = ['handraising', 'reading', 'writing', 'focus']
    attentive_count = sum(1 for label in latest_labels if label in attentive_actions)
    # attentiveness_score = round(attentive_count / TOTAL_STUDENTS, 2)
    attentive_percentage= round((attentive_count / TOTAL_STUDENTS) * 100, 2)
    return jsonify({"attentive_percentage": attentive_percentage,
                    "total_students": TOTAL_STUDENTS,
                    "attentive_count": attentive_count})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)


