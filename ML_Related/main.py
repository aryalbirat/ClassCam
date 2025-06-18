import cv2
import time
from collections import defaultdict
from video_stream import get_video_stream
from student_detector import detect_students
from tracker import initialize_tracker
from attendance import mark_attendance
from action_recognition import recognize_action
from attention_logger import log_attention

cap = get_video_stream()
tracker = initialize_tracker()

attendance = set()
attention_scores = defaultdict(list)
minute_counter = 0
frame_count = 0
student_actions = defaultdict(set)

start_time = time.time()

while True:
    ret, frame = cap.read()
    if not ret:
        print("Failed to capture frame")
        break

    bboxes, confidences = detect_students(None, frame)
    tracks = tracker.update_tracks(bboxes, frame=frame)

    current_actions = defaultdict(set)

    for track in tracks:
        if not track.is_confirmed():
            continue

        track_id = track.track_id
        l, t, w, h = track.to_ltrb()
        x1, y1, x2, y2 = map(int, [l, t, w, h])

        face_roi = frame[y1:y2, x1:x2]

        frame = mark_attendance(face_roi, frame, (x1, y1), track_id, attendance)

        # Simulate action recognition (replace with actual logic)
        action = recognize_action(face_roi)
        current_actions[track_id].add(action)

        # Draw action
        cv2.putText(frame, action, (x1, y2 + 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 0), 2)

    # Update global student actions
    for sid, acts in current_actions.items():
        student_actions[sid].update(acts)

    frame_count += 1

    # Every 60 seconds, log attentive scores
    if time.time() - start_time > 60:
        log_attention(student_actions, attention_scores, minute_counter, attendance)
        student_actions.clear()
        minute_counter += 1
        start_time = time.time()

    # Display
    cv2.imshow("Classroom Monitoring", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()