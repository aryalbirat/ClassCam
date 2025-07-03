import React, { useState } from 'react';
import { Monitor, Settings, User, Bell, Video, Eye, LogOut, BarChart3, Menu, X } from 'lucide-react';

interface HeaderProps {
  userRole: 'teacher' | 'admin';
  currentPage: 'live-preview';
  onPageChange: (page: 'live-preview') => void;
  onLogout?: () => void;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ userRole, currentPage, onPageChange, onLogout, className }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={`bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 shadow-2xl border-b border-blue-800/50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo and Title - Smaller Size */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-xl blur-lg opacity-30"></div>
                <div className="relative bg-gradient-to-br from-blue-500 to-sky-600 p-2.5 rounded-xl shadow-lg">
                  <Monitor className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  ClassCam
                </h1>
                <p className="text-sm text-blue-200/80 font-medium">
                  Live Preview
                </p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2 ml-8">
              <button
                onClick={() => onPageChange('live-preview')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-blue-500/30 text-white border border-blue-400/50`}
              >
                <Eye className="h-4 w-4" />
                <span>Live Preview</span>
              </button>
            </div>
            
            {/* Status Indicators - Only show on Live Preview and Desktop */}
            <div className="hidden lg:flex items-center space-x-4 ml-8">
              <div className="flex items-center space-x-2 bg-emerald-500/20 px-3 py-1.5 rounded-full border border-emerald-400/30">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-emerald-300">Live</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-500/20 px-3 py-1.5 rounded-full border border-blue-400/30">
                <Video className="h-4 w-4 text-blue-300" />
                <span className="text-sm font-medium text-blue-300">Recording</span>
              </div>
            </div>
          </div>

          {/* Desktop User Info and Actions */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Notifications */}
            <div className="relative group">
              <div className="relative p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer backdrop-blur-sm border border-white/20">
                <Bell className="h-5 w-5 text-white group-hover:text-blue-200 transition-colors" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
              </div>
            </div>
            
            {/* User Profile */}
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-sky-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900"></div>
              </div>
              <div className="text-sm">
                <div className="font-semibold text-white">
                  {userRole === 'teacher' ? 'Ms. Johnson' : 'Admin User'}
                </div>
                <div className="text-xs text-blue-200/80 capitalize font-medium">{userRole}</div>
              </div>
            </div>
            
            {/* Settings */}
            <div className="relative group">
              <div className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer backdrop-blur-sm border border-white/20 group-hover:rotate-90 transform">
                <Settings className="h-5 w-5 text-white group-hover:text-blue-200 transition-all duration-300" />
              </div>
            </div>

            {/* Logout Button */}
            {onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 p-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 transition-all duration-300 cursor-pointer backdrop-blur-sm border border-red-400/30 group"
                title="Logout"
              >
                <LogOut className="h-5 w-5 text-red-300 group-hover:text-red-200 transition-colors" />
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer backdrop-blur-sm border border-white/20"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-blue-800/50 py-4">
            <div className="space-y-4">
              {/* Mobile Navigation */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onPageChange('live-preview');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 bg-blue-500/30 text-white border border-blue-400/50`}
                >
                  <Eye className="h-5 w-5" />
                  <span>Live Preview</span>
                </button>
              </div>

              {/* Mobile Status Indicators - Only show on Live Preview */}
              <div className="flex flex-wrap gap-3 px-4">
                <div className="flex items-center space-x-2 bg-emerald-500/20 px-3 py-2 rounded-full border border-emerald-400/30">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-emerald-300">Live</span>
                </div>
                <div className="flex items-center space-x-2 bg-blue-500/20 px-3 py-2 rounded-full border border-blue-400/30">
                  <Video className="h-4 w-4 text-blue-300" />
                  <span className="text-sm font-medium text-blue-300">Recording</span>
                </div>
              </div>

              {/* Mobile User Info */}
              <div className="px-4 pt-4 border-t border-blue-800/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-sky-500 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900"></div>
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {userRole === 'teacher' ? 'Ms. Johnson' : 'Admin User'}
                      </div>
                      <div className="text-sm text-blue-200/80 capitalize font-medium">{userRole}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {/* Mobile Notifications */}
                    <div className="relative">
                      <div className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer backdrop-blur-sm border border-white/20">
                        <Bell className="h-5 w-5 text-white" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
                      </div>
                    </div>
                    
                    {/* Mobile Settings */}
                    <div className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer backdrop-blur-sm border border-white/20">
                      <Settings className="h-5 w-5 text-white" />
                    </div>

                    {/* Mobile Logout */}
                    {onLogout && (
                      <button
                        onClick={() => {
                          onLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 transition-all duration-300 cursor-pointer backdrop-blur-sm border border-red-400/30"
                        title="Logout"
                      >
                        <LogOut className="h-5 w-5 text-red-300" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
    </header>
  );
};