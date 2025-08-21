
import React from 'react';

interface AuthPageProps {
    onNavigateLogin: () => void;
    onNavigateSignUp: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onNavigateLogin, onNavigateSignUp }) => {
    return (
        <div className="min-h-screen w-full flex flex-col bg-slate-100">
            <div className="absolute inset-0">
                 <img src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800&auto=format&fit=crop" alt="Background" className="w-full h-full object-cover"/>
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
            </div>
           
            <div className="relative z-10 flex flex-col flex-grow justify-end p-6 pb-[calc(2.5rem+env(safe-area-inset-bottom))]">
                 <div className="text-center mb-10 animate-fade-in-up">
                    <h1 className="text-5xl font-extrabold text-white tracking-tight">
                        Infinity Build
                    </h1>
                    <p className="text-slate-300 mt-2">Your Trusted Partner in Construction</p>
                </div>
                
                <div className="space-y-4 animate-fade-in-up" style={{animationDelay: '200ms'}}>
                    <button
                        onClick={onNavigateLogin}
                        className="w-full bg-orange-500 text-white font-bold py-4 px-5 rounded-xl shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-white">
                        Masuk
                    </button>
                    <button
                        onClick={onNavigateSignUp}
                        className="w-full bg-white/10 border border-white/20 backdrop-blur-sm text-white font-bold py-4 px-5 rounded-xl hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-white">
                        Daftar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
