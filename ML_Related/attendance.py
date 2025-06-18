# attendance.py
import cv2

def mark_attendance(face_roi, frame, coords, track_id, attendance):
    x1, y1 = coords
    gray = cv2.cvtColor(face_roi, cv2.COLOR_BGR2GRAY)
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)

    if len(faces) > 0 and track_id not in attendance:
        attendance.add(track_id)

    cv2.rectangle(frame, (x1, y1), (x1 + face_roi.shape[1], y1 + face_roi.shape[0]), (0, 255, 0), 2)
    cv2.putText(frame, f'ID: {track_id}', (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)
    return frame
