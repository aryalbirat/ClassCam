# app.py
from flask import Flask, Response
import cv2
import time
from detector import YOLOv5ActionDetector
from annotator import annotate_attentive_actions

app = Flask(__name__)
action_detector = YOLOv5ActionDetector(weights_path='best.pt')

cap = cv2.VideoCapture('http://192.168.101.2:8776/video')

# Attentiveness tracking setup
TOTAL_STUDENTS = 4
last_check_time = time.time()
attentiveness_interval = 10  # seconds


def generate_frames():
    global last_check_time

    while True:
        success, frame = cap.read()
        if not success:
            break

        action_boxes, action_labels = action_detector.detect(frame)

        # Annotate frame based on action detections
        annotated_frame = annotate_attentive_actions(frame, action_boxes, action_labels)

        # Every 10 seconds, compute and print attentiveness
        current_time = time.time()
        if current_time - last_check_time > attentiveness_interval:
            attentive_count = sum(1 for label in action_labels if label in ['hand_raising', 'reading', 'writing'])
            attentiveness = (attentive_count / TOTAL_STUDENTS)
            print(f"Attentiveness: {attentiveness:.2f}")
            last_check_time = current_time

        # Always encode and yield frame
        _, buffer = cv2.imencode('.jpg', annotated_frame)
        frame_bytes = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n'
               b'Content-Length: ' + f"{len(frame_bytes)}".encode() + b'\r\n\r\n' +
               frame_bytes + b'\r\n')


@app.route('/')
def index():
    return "<h2>Webcam Attentiveness Monitoring Active</h2>"


@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == '__main__':
    app.run(debug=True)


# Now for the video code
# app.py
# from flask import Flask, Response
# import cv2
# import time
# from detector import YOLOv5ActionDetector
# from annotator import annotate_attentive_actions
#
# app = Flask(__name__)
# action_detector = YOLOv5ActionDetector(weights_path='best.pt')
#
# # Read from local video file (same directory)
# cap = cv2.VideoCapture('IMG_0674.mov')  # replace with your video filename if different
#
# # Attentiveness tracking setup
# TOTAL_STUDENTS = 4
# last_check_time = time.time()
# attentiveness_interval = 2  # seconds
#
#
# def generate_frames():
#     global last_check_time
#
#     while cap.isOpened():
#         success, frame = cap.read()
#         if not success:
#             print("End of video or failed to read frame.")
#             break
#
#         action_boxes, action_labels = action_detector.detect(frame)
#         annotated_frame = annotate_attentive_actions(frame, action_boxes, action_labels)
#
#         current_time = time.time()
#         if current_time - last_check_time > attentiveness_interval:
#             attentive_count = sum(1 for label in action_labels if label in ['handwriting', 'read', 'write','focus'])
#             attentiveness = (attentive_count / TOTAL_STUDENTS)
#             print(f"Attentiveness: {attentiveness:.2f}")
#             last_check_time = current_time
#
#         _, buffer = cv2.imencode('.jpg', annotated_frame)
#         frame_bytes = buffer.tobytes()
#
#         yield (b'--frame\r\n'
#                b'Content-Type: image/jpeg\r\n'
#                b'Content-Length: ' + f"{len(frame_bytes)}".encode() + b'\r\n\r\n' +
#                frame_bytes + b'\r\n')
#
#     cap.release()
#
#
# @app.route('/')
# def index():
#     return "<h2>Video Attentiveness Monitoring Active</h2>"
#
#
# @app.route('/video_feed')
# def video_feed():
#     return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')
#
#
# if __name__ == '__main__':
#     app.run(debug=True)
