import os

ATTENTIVE_ACTIONS = {"hand_raised", "reading", "writing", "focused"}

def log_attention(student_actions, attention_scores, minute_counter, attendance):
    os.makedirs("logs", exist_ok=True)

    with open("logs/attention_log.csv", "a", newline="") as f:
        writer = csv.writer(f)
        if minute_counter == 0:
            writer.writerow(["Minute", "StudentID", "Attendance", "AttentionScore"])
        for sid, actions in student_actions.items():
            score = 1 if actions & ATTENTIVE_ACTIONS else 0
            attention_scores[sid].append(score)
            writer.writerow([minute_counter + 1, sid, "Present" if sid in attendance else "Absent", score])
