import cv2

def annotate_attentive_actions(frame, boxes, labels):
    for box, label in zip(boxes, labels):
        color = (0, 255, 0)
        text = f'{label}'

        x1, y1, x2, y2 = map(int, box)
        cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
        cv2.putText(frame, text, (x1, y1 - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, color, 2)

    return frame