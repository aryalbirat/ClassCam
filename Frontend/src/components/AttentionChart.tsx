import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  attentionLevel: number;
  isAttentive: boolean;
}

interface AttentionChartProps {
  students: Student[];
}

export const AttentionChart: React.FC<AttentionChartProps> = ({ students }) => {
  const maxHeight = 200;
  
  const getBarColor = (attentionLevel: number) => {
    if (attentionLevel >= 80) return 'bg-gradient-to-t from-emerald-500 to-emerald-400';
    if (attentionLevel >= 60) return 'bg-gradient-to-t from-yellow-500 to-yellow-400';
    return 'bg-gradient-to-t from-red-500 to-red-400';
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Student Attention Levels</h3>
        </div>
        <TrendingUp className="h-5 w-5 text-emerald-400" />
      </div>
      
      <div className="flex items-end justify-between space-x-2 h-64">
        {students.map((student) => (
          <div key={student.id} className="flex flex-col items-center space-y-2 flex-1">
            <div className="relative w-full max-w-12">
              <div
                className={`w-full rounded-t-md transition-all duration-700 ease-out ${getBarColor(student.attentionLevel)} relative overflow-hidden`}
                style={{ 
                  height: `${(student.attentionLevel / 100) * maxHeight}px`,
                  minHeight: '4px'
                }}
              >
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse" />
                
                {/* Attention percentage label */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-white">
                  {student.attentionLevel}%
                </div>
              </div>
            </div>
            
            <div className="text-xs font-medium text-slate-300 text-center max-w-16 truncate">
              {student.name}
            </div>
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-slate-700/50">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded bg-emerald-400"></div>
          <span className="text-xs text-slate-300">High (80%+)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded bg-yellow-400"></div>
          <span className="text-xs text-slate-300">Medium (60-79%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded bg-red-400"></div>
          <span className="text-xs text-slate-300">Low (0-59%)</span>
        </div>
      </div>
    </div>
  );
};