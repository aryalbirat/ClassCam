# ClassCam - Student Attentiveness Monitoring System

A real-time student attentiveness monitoring system using AI-powered computer vision.

## Features
- **Live Video Feed:** View the classroom video stream with real-time AI-based attention annotation.
- **Attentiveness Analytics:** See live statistics and historical trends of student attentiveness.
- **JWT Authentication:** Secure user authentication and session management using JSON Web Tokens.

- **Modular Frontend & Backend:**
  - **Frontend:** React + Vite + Tailwind CSS
  - **Backend:** Node.js (Express) for authentication (with JWT) and user management
  - **ML Backend:** Python Flask with YOLOv5-based action detection

## Project Structure

- **Backend/** - Node.js (Express) server for authentication (JWT) and user management
- **Frontend/** - React Vite + Tailwind CSS application for the web interface
- **ML_Related/** - Flask server for video processing and AI detection (YOLOv5 model)

## Quick Start

### 1. Start the Backend Server (Node.js/Express)

```bash
cd Backend
npm install
npm run dev
```

The backend server will start on `http://localhost:3001`

### 2. Start the ML Backend (Flask + YOLOv5)

```bash
cd ML_Related
pip install -r requirements.txt
python app.py
```

The ML server will start on `http://localhost:5000`

### 3. Start the Frontend (React + Vite + Tailwind CSS)

```bash
cd Frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:5173`

## API Endpoints

### Backend Server (Port 3001)
- `POST /signup` - User registration
- `POST /login` - User authentication (returns JWT)
- `GET /me` - Get current user info (requires JWT)
- `GET /health` - Health check

### ML Backend (Port 5000)
- `GET /video_feed` - Live video stream
- `GET /attentiveness` - Real-time attentiveness data

## Troubleshooting

### CORS Errors
If you encounter CORS errors, make sure both servers are running:
1. Backend server on port 3001
2. ML server on port 5000

### 404 Errors
- Ensure both servers are running simultaneously
- Check that the ports are not being used by other applications
- Verify the video file exists in `ML_Related/assets/Video.mov`

### Database Issues
The backend server can run without MongoDB for development. User data will be stored in memory and reset when the server restarts.

## Development Notes

- The backend uses in-memory storage for development (no MongoDB required)
- The backend uses JWT for secure authentication and session management
- The ML backend uses a YOLOv5 model for action detection and processes video files for demonstration
- Both servers must be running for the full application to work

## Usage
- Open the frontend in your browser.
- The live video feed and attentiveness analytics will update in real time.
- Use the dashboard to monitor class engagement and trends.

## Customization
- **Model:** Replace `best.pt` in `ML_Related/` with your own YOLOv5 model for different action detection.
- **Frontend:** Modify or extend React components in `Frontend/src/components/` for custom UI/UX.

## .gitignore Best Practices
- **Frontend:** Ignores `node_modules`, build outputs, local configs, and logs.
- **ML_Related:** Ignores Python cache, virtual environments, model weights, outputs, logs, and IDE files.
- **Recommendation:**
  - Do not commit large video/model files or sensitive data.
  - Keep `.env` and credentials out of version control.

---

**ClassCam** — Real-time classroom attentiveness analytics with AI and mordern web technologies