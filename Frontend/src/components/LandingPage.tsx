import React from 'react';
import { Monitor, Eye, Brain, Users, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/8 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Diagonal animated glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-sky-600/5 animate-pulse"></div>
      </div>

      {/* Navigation - Consistent with other pages */}
      <nav className="relative z-10 flex justify-start items-center px-6 lg:px-12 py-6">
        <div className="flex items-center space-x-3 animate-fade-in-left">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 rounded-xl blur-lg opacity-30"></div>
            <div className="relative bg-gradient-to-br from-blue-500 to-sky-600 p-2.5 rounded-xl shadow-lg">
              <Monitor className="h-6 w-6 text-white" />
            </div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            ClassCam
          </span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 text-center">
        {/* Main Title with enhanced animation */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-blue-400 via-white to-sky-200 bg-clip-text text-transparent mb-6 leading-tight">
            ClassCam
          </h1>
        </div>

        {/* Subtitle with staggered animation */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-white font-semibold mb-6 max-w-4xl leading-relaxed animate-fade-in-up delay-200">
          Real-Time Student Attentiveness Monitoring
        </h2>
        
        {/* Description - Not bold */}
        <p className="text-lg md:text-xl text-blue-100/90 mb-12 max-w-3xl leading-relaxed animate-fade-in-up delay-300">
          Advanced AI-powered detection of reading, writing, and hand-raising behaviors using intelligent camera feeds
        </p>

        {/* Feature Icons with enhanced styling */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-12 animate-fade-in-up delay-400">
          <div className="flex items-center space-x-3 bg-blue-900/30 backdrop-blur-sm rounded-2xl px-6 py-4 border border-blue-700/50 hover:border-blue-500/70 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20">
            <Eye className="h-6 w-6 text-blue-400" />
            <span className="text-blue-100 font-medium">Live Monitoring</span>
          </div>
          <div className="flex items-center space-x-3 bg-indigo-900/30 backdrop-blur-sm rounded-2xl px-6 py-4 border border-indigo-700/50 hover:border-indigo-500/70 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/20">
            <Brain className="h-6 w-6 text-indigo-400" />
            <span className="text-blue-100 font-medium">AI Detection</span>
          </div>
          <div className="flex items-center space-x-3 bg-sky-900/30 backdrop-blur-sm rounded-2xl px-6 py-4 border border-sky-700/50 hover:border-sky-500/70 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-sky-500/20">
            <Users className="h-6 w-6 text-sky-400" />
            <span className="text-blue-100 font-medium">Class Analytics</span>
          </div>
        </div>

        {/* Login Button with Minimal Animation */}
        <button
          onClick={onLogin}
          className="group relative inline-flex items-center space-x-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-12 py-5 rounded-2xl shadow-2xl shadow-blue-500/30 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-blue-500/40 animate-fade-in-up delay-500"
        >
          <span className="relative text-lg font-bold">Login to ClassCam</span>
          <ArrowRight className="relative h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>

      {/* Enhanced grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23334155' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-60"></div>
      
      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-blue-950/20 to-slate-950/40"></div>
    </div>
  );
};