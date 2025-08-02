import torch
from typing import List, Tuple

class YOLOv5ActionDetector:
    def __init__(self, weights_path: str = "best.pt", device: str = "cpu", half: bool = True):
        self.device = torch.device(device)
        self.model = torch.hub.load(
            "ultralytics/yolov5",
            "custom",
            path=weights_path,
            _verbose=False
        ).to(self.device).eval()
        self.half = half and self.device.type == "cuda"
        if self.half:
            self.model.half()

    @torch.no_grad()
    def detect(self, frame) -> Tuple[List[List[float]], List[str]]:
        results = self.model(frame, size=640)
        detections = results.xyxy[0].cpu().numpy()
        boxes, labels = [], []
        for x1, y1, x2, y2, conf, cls in detections:
            boxes.append([float(x1), float(y1), float(x2), float(y2)])
            labels.append(self.model.names[int(cls)])
        return boxes, labels
