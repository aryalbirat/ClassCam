# ClassCam

ClassCam is an AI-powered classroom monitoring system that provides real-time attentiveness analytics using computer vision and a modern web dashboard.

## Features
- **Live Video Feed:** View the classroom video stream with real-time AI-based attention annotation.
- **Attentiveness Analytics:** See live statistics and historical trends of student attentiveness.

- **Modular Frontend & Backend:**
  - **Frontend:** React + Vite + Tailwind CSS
  - **Backend:** Python Flask with YOLOv5-based action detection

## Project Structure
```
ClassCam/
├── Frontend/           # React frontend (Vite, Tailwind)
│   ├── src/
│   │   ├── components/ # React components (LiveAttentionChart, LiveStatisticsCard, etc.)
│   │   └── ...
│   ├── public/
│   └── ...
├── ML_Related/         # Python backend (Flask, YOLOv5, annotator)
│   ├── app.py          # Flask server
│   ├── detector.py     # YOLOv5 action detector
│   ├── annotator.py    # Frame annotation
│   ├── requirements.txt
│   └── ...
└── ...
```

## Getting Started

### Backend (Flask)
1. **Install dependencies:**
   ```bash
   cd ML_Related
   pip install -r requirements.txt
   ```
2. **Run the server:**
   ```bash
   python app.py
   ```
   The backend will start at `http://localhost:5000`.

### Frontend (React)
1. **Install dependencies:**
   ```bash
   cd Frontend
   npm install
   ```
2. **Run the frontend:**
   ```bash
   npm run dev
   ```
   The frontend will start at `http://localhost:5173` (or as configured).

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

## License
MIT License

---

**ClassCam** — Real-time classroom attentiveness analytics with AI and modern web technologies.
