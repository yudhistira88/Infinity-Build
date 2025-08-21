
import React, { useState, useMemo, useEffect } from 'react';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import OrdersPage from './pages/OrdersPage';
import MessagesPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';
import EstimationPage from './pages/EstimationPage';
import type { Message } from './types';

import SplashScreen from './pages/SplashScreen';
import OnboardingPage from './pages/OnboardingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

const initialMessagesData: Message[] = [
    { 
        id: '1', 
        senderName: 'CV. Karya Abadi', 
        lastMessage: 'Baik Pak, besok tim kami akan ke lokasi.', 
        timestamp: '10:45', 
        avatar: 'https://i.pravatar.cc/150?img=1', 
        unreadCount: 1,
        messages: [
            { id: 'm1', text: 'Selamat pagi, Pak. Mau konfirmasi untuk jadwal renovasi besok, apakah jadi?', sender: 'provider', timestamp: '10:44' },
            { id: 'm2', text: 'Iya jadi, tolong pastikan semua material sudah siap ya.', sender: 'user', timestamp: '10:44' },
            { id: 'm3', text: 'Baik Pak, besok tim kami akan ke lokasi.', sender: 'provider', timestamp: '10:45' },
        ]
    },
    { 
        id: '2', 
        senderName: 'Budi Tukang', 
        lastMessage: 'Selesai pak, sudah bisa dicek.', 
        timestamp: 'Kemarin', 
        avatar: 'https://i.pravatar.cc/150?img=2', 
        unreadCount: 1,
        messages: [
            { id: 'm1', text: 'Selesai pak, sudah bisa dicek.', sender: 'provider', timestamp: 'Kemarin' }
        ]
    },
    { 
        id: '3', 
        senderName: 'Sumber Jaya Las', 
        lastMessage: 'Terima kasih atas kepercayaannya!', 
        timestamp: '15/07/24', 
        avatar: 'https://i.pravatar.cc/150?img=3', 
        unreadCount: 0,
        messages: [
            { id: 'm1', text: 'Terima kasih atas kepercayaannya!', sender: 'provider', timestamp: '15/07/24' }
        ]
    },
];

type AppState = 'splash' | 'onboarding' | 'login' | 'signup' | 'forgotPassword' | 'resetPassword' | 'loggedIn';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('splash');
  const [activePage, setActivePage] = useState('Layanan');
  const [isBottomNavVisible, setBottomNavVisible] = useState(true);
  const [messages, setMessages] = useState<Message[]>(initialMessagesData);

  useEffect(() => {
    if (appState === 'splash') {
      const timer = setTimeout(() => {
        const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
        if (hasCompletedOnboarding) {
          setAppState('login');
        } else {
          setAppState('onboarding');
        }
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [appState]);

  const messageNotificationCount = useMemo(() => {
    return messages.reduce((count, message) => count + message.unreadCount, 0);
  }, [messages]);

  const handleNavigate = (page: string) => {
    setActivePage(page);
  };

  const handleOpenEstimator = () => {
      setActivePage('Estimasi');
      setBottomNavVisible(false);
  };

  const handleReadMessage = (messageId: string) => {
    setMessages(currentMessages => 
      currentMessages.map(message => 
        message.id === messageId ? { ...message, unreadCount: 0 } : message
      )
    );
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasCompletedOnboarding', 'true');
    setAppState('login');
  };

  const handleLoginSuccess = () => {
    setAppState('loggedIn');
    setActivePage('Layanan');
    setBottomNavVisible(true);
  };
  
  const handleLogout = () => {
    setAppState('login');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'Layanan':
        return <HomePage onNavigate={handleNavigate} setBottomNavVisible={setBottomNavVisible} />;
      case 'Pesanan':
        return <OrdersPage />;
      case 'Pesan':
        return <MessagesPage messages={messages} onReadMessage={handleReadMessage} />;
      case 'Profil':
        return <ProfilePage onLogout={handleLogout}/>;
      case 'Estimasi':
        return <EstimationPage onBack={() => { setActivePage('Layanan'); setBottomNavVisible(true); }} />;
      default:
        return <HomePage onNavigate={handleNavigate} setBottomNavVisible={setBottomNavVisible} />;
    }
  };

  const renderContent = () => {
    switch(appState) {
        case 'splash':
            return <SplashScreen />;
        case 'onboarding':
            return <OnboardingPage onComplete={handleOnboardingComplete} />;
        case 'login':
            return <LoginPage 
                onLoginSuccess={handleLoginSuccess} 
                onNavigateToSignUp={() => setAppState('signup')} 
                onNavigateToForgotPassword={() => setAppState('forgotPassword')}
            />;
        case 'signup':
            return <SignUpPage onSignUpSuccess={handleLoginSuccess} onNavigateToLogin={() => setAppState('login')} />;
        case 'forgotPassword':
            return <ForgotPasswordPage 
                onSendResetLink={() => setAppState('resetPassword')} 
                onNavigateToLogin={() => setAppState('login')}
            />;
        case 'resetPassword':
            return <ResetPasswordPage 
                onResetSuccess={() => {
                    alert('Kata sandi berhasil diubah! Silakan masuk dengan kata sandi baru Anda.');
                    setAppState('login');
                }}
            />;
        case 'loggedIn':
            return (
                <div className="bg-slate-100 min-h-screen font-sans">
                    <main>
                        {renderPage()}
                    </main>
                    {isBottomNavVisible && <BottomNav activePage={activePage} onNavigate={handleNavigate} messageNotificationCount={messageNotificationCount} onEstimateClick={handleOpenEstimator} />}
                </div>
            );
        default:
             return <SplashScreen />;
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-slate-900 min-h-screen font-sans shadow-2xl relative overflow-x-hidden">
        {renderContent()}
    </div>
  );
};

export default App;
