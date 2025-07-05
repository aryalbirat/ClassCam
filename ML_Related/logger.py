# logger.py
import csv
import os
from datetime import datetime
import psutil
import subprocess

LOG_FILE = 'performance_metrics.csv'

def get_gpu_usage():
    try:
        result = subprocess.check_output(
            ['nvidia-smi', '--query-gpu=utilization.gpu', '--format=csv,noheader,nounits'],
            encoding='utf-8'
        )
        gpu_usage = float(result.strip().split('\n')[0])
        return gpu_usage
    except Exception:
        return None

def log_performance_metrics(fps, inference_time, latency):
    ram_usage = psutil.virtual_memory().percent
    cpu_usage = psutil.cpu_percent(interval=0.1)
    gpu_usage = get_gpu_usage()

    headers = ['Timestamp', 'FPS', 'Inference Time (s)', 'Latency (s)',
               'RAM Usage (%)', 'CPU Usage (%)', 'GPU Usage (%)']
    data = [
        datetime.now().isoformat(),
        round(fps, 2),
        round(inference_time, 4),
        round(latency, 4),
        ram_usage,
        cpu_usage,
        gpu_usage if gpu_usage is not None else 'N/A'
    ]

    file_exists = os.path.isfile(LOG_FILE)
    with open(LOG_FILE, mode='a', newline='') as file:
        writer = csv.writer(file)
        if not file_exists:
            writer.writerow(headers)
        writer.writerow(data)
