# student_detector.py
import torch

# Load YOLOv5 model globally to avoid repeated loading
model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)
model.conf = 0.5
model.classes = [0]  # person class only

def detect_students(_, frame):
    results = model(frame)
    detections = results.xyxy[0].cpu().numpy()
    bboxes = []
    confidences = []

    for det in detections:
        x1, y1, x2, y2, conf, cls = det
        bboxes.append([int(x1), int(y1), int(x2 - x1), int(y2 - y1)])
        confidences.append(conf)

    return bboxes, confidences
