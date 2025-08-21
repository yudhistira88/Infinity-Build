
import React from 'react';
import EnvelopeIcon from '../components/icons/EnvelopeIcon';

interface ForgotPasswordPageProps {
    onSendResetLink: () => void;
    onNavigateToLogin: () => void;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onSendResetLink, onNavigateToLogin }) => {
    return (
        <div className="min-h-screen w-full bg-slate-100 flex flex-col">
            <div className="relative h-[40vh] flex-shrink-0">
                <img 
                    src="https://images.unsplash.com/photo-1584433144853-c3ae6a61d60b?q=80&w=1470&auto=format&fit=crop" 
                    alt="Keys on a desk" 
                    className="absolute inset-0 w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-blue-900/20"></div>
            </div>

            <div className="flex-grow bg-white rounded-t-3xl -mt-8 relative z-10 p-6 flex flex-col justify-between animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <div>
                    <div className="mb-6 text-left">
                        <h2 className="text-3xl font-bold text-slate-800">Lupa Kata Sandi?</h2>
                        <p className="text-slate-500 mt-1">Masukkan email Anda untuk menerima tautan reset.</p>
                    </div>

                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSendResetLink(); }}>
                        <div className="relative">
                            <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                            <input
                                type="email"
                                placeholder="Alamat Email Terdaftar"
                                className="w-full bg-slate-100 border border-slate-300 text-slate-900 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder:text-slate-500 transition-colors"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-800 text-white font-bold py-3.5 px-5 rounded-xl shadow-lg shadow-blue-800/30 hover:bg-blue-900 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                            Kirim Tautan Reset
                        </button>
                    </form>
                </div>

                <div className="text-center mt-6 pb-[env(safe-area-inset-bottom)]">
                    <p className="text-slate-600">
                        Ingat kata sandi Anda?{' '}
                        <button onClick={onNavigateToLogin} className="font-bold text-orange-600 hover:text-orange-500">Kembali Masuk</button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
