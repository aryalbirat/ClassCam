from flask import Flask, Response, jsonify
from flask_cors import CORS
import cv2
import torch

from detector import YOLOv5ActionDetector
from annotator import annotate_attentive_actions

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

app = Flask(__name__)
CORS(app)

action_detector = YOLOv5ActionDetector(weights_path="best.pt", device=DEVICE)
cap = cv2.VideoCapture("http://172.16.12.120:8080/video", cv2.CAP_FFMPEG)

TOTAL_STUDENTS = 4
latest_labels = []

def generate_frames():
    global latest_labels
    while True:
        success, frame = cap.read()
        if not success or frame is None:
            continue
        action_boxes, action_labels = action_detector.detect(frame)
        latest_labels = action_labels
        annotated_frame = annotate_attentive_actions(frame, action_boxes, action_labels)
        _, buffer = cv2.imencode(".jpg", annotated_frame)
        frame_bytes = buffer.tobytes()
        yield (
            b"--frame\r\n"
            b"Content-Type: image/jpeg\r\n"
            b"Content-Length: " + f"{len(frame_bytes)}".encode() + b"\r\n\r\n" +
            frame_bytes + b"\r\n"
        )

@app.route("/")
def index():
    return "<h2>Webcam Attentiveness Monitoring Active</h2>"

@app.route("/video_feed")
def video_feed():
    return Response(generate_frames(), mimetype="multipart/x-mixed-replace; boundary=frame")

@app.route("/attentiveness")
def get_attentiveness():
    attentive_actions = {"handraising", "reading", "writing", "focus"}
    attentive_count = sum(label in attentive_actions for label in latest_labels)
    attentive_percentage = round(attentive_count / TOTAL_STUDENTS * 100, 2)
    return jsonify(
        attentive_percentage=attentive_percentage,
        total_students=TOTAL_STUDENTS,
        attentive_count=attentive_count
    )

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)





