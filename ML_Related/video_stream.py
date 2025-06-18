import cv2

def get_video_stream():
    # Use this if you're connecting via mobile IP camera
    ip_camera_url = 'http://192.168.101.4:8776/video'  # Replace with your actual IP
    cap = cv2.VideoCapture(ip_camera_url, cv2.CAP_FFMPEG)

    if not cap.isOpened():
        print("Cannot open camera stream. Check your IP and connection.")
        exit()

    print("📡 Connected to mobile camera. Press 'q' to quit.")
    return cap






