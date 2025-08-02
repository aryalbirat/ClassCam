import  { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ClassroomFeed } from './components/ClassroomFeed';
import { LandingPage } from './components/LandingPage';
import { SelectionPage } from './components/SelectionPage';
import { SignInPage } from './components/SignInPage';
import { SignUpPage } from './components/SignUpPage';
import { LiveStatisticsCard } from './components/LiveStatisticsCard';
import { LiveAttentionChart } from './components/LiveAttentionChart';
import { useLiveAttentiveness } from './hooks/useLiveAttentiveness';
import { getMe } from './api/auth';

type AppPage = 'landing' | 'signin' | 'signup' | 'selection' | 'live-preview';

function App() {
  const [userRole, setUserRole] = useState< 'admin'>('admin');
  const [userName, setUserName] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<AppPage>('landing');
  const [jwt, setJwt] = useState<string | null>(null);

  // On mount, check for JWT in localStorage
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setJwt(token);
      setCurrentPage('selection');
      getMe().then(user => {
        setUserName(user.name);
        setUserRole(user.role || 'admin');
      }).catch(() => {});
    }
  }, []);

  // Use live attentiveness for live-preview
  const {
    attentivePercentage,
    attentiveCount,
    totalStudents,
    attentionHistory,
  } = useLiveAttentiveness();

  const handleLogin = () => {
    setCurrentPage('signin');
  };

  const handleAuth = (token: string) => {
    setJwt(token);
    localStorage.setItem('jwt', token);
    setCurrentPage('selection');
    getMe().then(user => {
      setUserName(user.name);
      setUserRole(user.role || 'admin');
    }).catch(() => {});
  };

  const handleNavigateToSignUp = () => {
    setCurrentPage('signup');
  };

  const handleNavigateToSignIn = () => {
    setCurrentPage('signin');
  };

  const handlePageChange = (page: AppPage) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    setJwt(null);
    localStorage.removeItem('jwt');
    setCurrentPage('landing');
  };

  // Landing page - not authenticated
  if (!jwt && currentPage === 'landing') {
    return <LandingPage onLogin={handleLogin} />;
  }

  // Sign In page
  if (!jwt && currentPage === 'signin') {
    return <SignInPage onAuth={handleAuth} onNavigateToSignUp={handleNavigateToSignUp} />;
  }

  // Sign Up page
  if (!jwt && currentPage === 'signup') {
    return <SignUpPage onAuth={handleAuth} onNavigateToSignIn={handleNavigateToSignIn} />;
  }

  // Selection page - authenticated but choosing between live preview
  if (jwt && currentPage === 'selection') {
    return <SelectionPage onPageSelect={handlePageChange} />;
  }

      if (!jwt) return null;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <Header 
        userRole={userRole} 
        userName={userName}
        currentPage={currentPage as 'live-preview'} 
        onPageChange={(page) => handlePageChange(page as AppPage)}
        onLogout={handleLogout}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'live-preview' ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Left Column - Camera Feed and Chart */}
              <div className="xl:col-span-3 space-y-8">
                {/* Classroom Live Feed */}
                <div className="w-full">
                  <ClassroomFeed />
                </div>

                {/* Live Attention Chart */}
                <div className="w-full">
                  <LiveAttentionChart
                    data={attentionHistory}
                    currentPercentage={attentivePercentage}
                  />
                </div>
              </div>

              {/* Right Sidebar - Statistics Cards */}
              <div className="xl:col-span-1">
                <div className="sticky top-8">
                  <LiveStatisticsCard
                    attentionPercentage={attentivePercentage}
                    attentiveStudents={attentiveCount}
                    totalStudents={totalStudents}
                  />
                </div>
              </div>
            </div>

            {/* Real-time Status Bar */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700/50 p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                    <span className="text-sm font-medium text-slate-200">Live</span>
                  </div>
                </div>
                <div className="text-sm text-slate-400">
                  Class Average: <span className="text-blue-400 font-semibold">{attentivePercentage}%</span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}

export default App;