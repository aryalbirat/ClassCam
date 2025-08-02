import { useState, useEffect } from 'react';
import { getMLServerUrl } from '../config/api';

interface AttentionDataPoint {
  time: string;
  percentage: number;
  timestamp: number;
}

export const useLiveAttentiveness = () => {
  const [attentivePercentage, setAttentivePercentage] = useState<number>(0);
  const [attentiveCount, setAttentiveCount] = useState<number>(0);
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [attentionHistory, setAttentionHistory] = useState<AttentionDataPoint[]>([]);

  useEffect(() => {
    const fetchAttentiveness = async () => {
      try {
        const res = await fetch(getMLServerUrl('/attentiveness'));
        const data = await res.json();
        setAttentivePercentage(data.attentive_percentage || 0);
        setAttentiveCount(data.attentive_count || 0);
        setTotalStudents(data.total_students || 0);

        const now = new Date();
        setAttentionHistory(prev => [
          ...prev.slice(-59),
          {
            time: now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
            percentage: data.attentive_percentage || 0,
            timestamp: now.getTime(),
          }
        ]);
      } catch (e) {
        console.error('Failed to fetch attentiveness data:', e);
      }
    };
    fetchAttentiveness();
   const interval = setInterval(fetchAttentiveness, 2000);
    return () => clearInterval(interval);
  }, []);

  return {
    attentivePercentage,
    attentiveCount,
    totalStudents,
    attentionHistory,
  };
}; 