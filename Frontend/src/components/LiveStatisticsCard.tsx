import React from 'react';
import { Target, Users, TrendingUp } from 'lucide-react';

interface LiveStatisticsCardProps {
  attentionPercentage: number;
  attentiveStudents: number;
  totalStudents: number;
}

export const LiveStatisticsCard: React.FC<LiveStatisticsCardProps> = ({ attentionPercentage, attentiveStudents, totalStudents }) => {
  const getAttentionColor = (percentage: number) => {
    if (percentage >= 80) return 'text-emerald-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-emerald-400';
    if (percentage >= 60) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Main Attention Percentage Card */}
      <div className="bg-blue-900/30 backdrop-blur-xl rounded-2xl p-6 border-2 border-blue-400/30 transition-all duration-500">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Target className="h-6 w-6 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Attentiveness</h3>
          </div>
          <div className="flex items-center space-x-2 bg-red-500/20 px-3 py-1.5 rounded-full border border-red-400/30">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-red-300">LIVE</span>
          </div>
        </div>
        
        <div className="text-center">
          <div className={`text-5xl font-bold ${getAttentionColor(attentionPercentage)} mb-4 transition-all duration-500`}>
            {attentionPercentage}%
          </div>
          
          {/* Progress Ring */}
          <div className="relative w-24 h-24 mx-auto mb-4">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="rgb(71 85 105)"
                strokeWidth="8"
                fill="none"
                opacity="0.3"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - attentionPercentage / 100)}`}
                className={`${getAttentionColor(attentionPercentage)} transition-all duration-1000 ease-out`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <TrendingUp className={`h-6 w-6 ${getAttentionColor(attentionPercentage)}`} />
            </div>
          </div>
          
          <p className="text-sm text-slate-300 font-medium">
            Class attention level
          </p>
        </div>
      </div>

      {/* Student Count Card */}
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Users className="h-5 w-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Students</h3>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-white mb-3">
            <span className="text-emerald-400">{attentiveStudents}</span>
            <span className="text-slate-400 text-xl mx-2">/</span>
            <span className="text-blue-400">{totalStudents}</span>
          </div>
          
          <p className="text-sm text-slate-300 mb-4 font-medium">
            Attentive Students
          </p>
          
          {/* Student Progress Bar */}
          <div className="w-full bg-slate-700/50 rounded-full h-3 mb-3">
            <div 
              className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${(attentiveStudents / (totalStudents || 1)) * 100}%` }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-slate-400">
            <span>0</span>
            <span>{totalStudents}</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-400 mb-1">{attentiveStudents}</div>
            <div className="text-xs text-slate-400 font-medium">Focused</div>
          </div>
        </div>
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400 mb-1">{totalStudents - attentiveStudents}</div>
            <div className="text-xs text-slate-400 font-medium">Distracted</div>
          </div>
        </div>
      </div>
    </div>
  );
};