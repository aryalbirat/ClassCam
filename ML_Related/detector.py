import torch

class YOLOv5ActionDetector:
    def __init__(self, weights_path='best.pt', device='cpu'):
        self.model = torch.hub.load('ultralytics/yolov5', 'custom', path=weights_path)
        self.model.to(device)
        self.device = device

    def detect(self, frame):
        results = self.model(frame)
        detections = results.xyxy[0].cpu().numpy()

        boxes = []
        labels = []
        for det in detections:
            x1, y1, x2, y2, conf, cls = det
            boxes.append([x1, y1, x2, y2])
            labels.append(self.model.names[int(cls)])

        return boxes, labels
