import React from 'react';
import { Users } from 'lucide-react';
import { getMLServerUrl } from '../config/api';

export const ClassroomFeed: React.FC = () => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Users className="h-6 w-6 text-blue-400" />
        <h2 className="text-xl font-semibold text-white">Classroom Live Feed</h2>
        <div className="flex items-center space-x-2 bg-red-500/20 px-3 py-1 rounded-full border border-red-400/30">
          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-red-300">LIVE</span>
        </div>
      </div>
      
      <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden border border-slate-700/50 mb-8">
        {/* Live video stream from backend */}
        <img
          src={getMLServerUrl('/video_feed')}
          alt="Live Classroom Feed"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 1 }}
        />

        <div className="absolute top-4 left-4 bg-black/70 rounded-xl p-3 backdrop-blur-sm border border-slate-600/50 z-10">
          <div className="flex items-center space-x-2 text-white">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">AI Analysis Active</span>
          </div>
          <div className="text-xs text-gray-300 mt-1">
            Next update in: 1 minute
          </div>
        </div>
        
        {/* Timestamp */}
        <div className="absolute bottom-4 right-4 bg-black/70 rounded-xl p-2 backdrop-blur-sm border border-slate-600/50 z-10">
          <div className="text-xs text-white font-mono">
            {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClassroomFeed;