
import React, { useState } from 'react';
import UserIcon from '../components/icons/UserIcon';
import EnvelopeIcon from '../components/icons/EnvelopeIcon';
import LockClosedIcon from '../components/icons/LockClosedIcon';
import EyeIcon from '../components/icons/EyeIcon';
import EyeSlashIcon from '../components/icons/EyeSlashIcon';
import GoogleIcon from '../components/icons/GoogleIcon';
import DevicePhoneMobileIcon from '../components/icons/DevicePhoneMobileIcon';

interface SignUpPageProps {
    onSignUpSuccess: () => void;
    onNavigateToLogin: () => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onSignUpSuccess, onNavigateToLogin }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <div className="min-h-screen w-full bg-slate-100 flex flex-col">
            {/* Top Image Section */}
            <div className="relative h-[35vh] flex-shrink-0">
                <img 
                    src="https://images.unsplash.com/photo-1511097305342-9b59695a4c02?q=80&w=1471&auto=format&fit=crop"
                    alt="Architect working on blueprints" 
                    className="absolute inset-0 w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-blue-900/20"></div>
            </div>

            {/* Form Section */}
            <div className="flex-grow bg-white rounded-t-3xl -mt-8 relative z-10 p-6 flex flex-col justify-between animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <div>
                    <div className="mb-6 text-left">
                        <h2 className="text-3xl font-bold text-slate-800">Buat Akun</h2>
                        <p className="text-slate-500 mt-1">Satu langkah lagi untuk memulai.</p>
                    </div>

                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSignUpSuccess(); }}>
                         <div className="relative">
                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Nama Lengkap"
                                className="w-full bg-slate-100 border border-slate-300 text-slate-900 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder:text-slate-500 transition-colors"
                                required
                            />
                        </div>
                        <div className="relative">
                            <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                            <input
                                type="email"
                                placeholder="Alamat Email"
                                className="w-full bg-slate-100 border border-slate-300 text-slate-900 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder:text-slate-500 transition-colors"
                                required
                            />
                        </div>
                        <div className="relative">
                            <DevicePhoneMobileIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                            <input
                                type="tel"
                                placeholder="Nomor Ponsel"
                                className="w-full bg-slate-100 border border-slate-300 text-slate-900 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder:text-slate-500 transition-colors"
                                required
                            />
                        </div>
                        <div className="relative">
                            <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                            <input
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Kata Sandi"
                                className="w-full bg-slate-100 border border-slate-300 text-slate-900 rounded-xl py-3.5 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder:text-slate-500 transition-colors"
                                required
                            />
                             <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600">
                                {passwordVisible ? <EyeSlashIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
                            </button>
                        </div>

                        <div className="pt-2">
                             <button
                                type="submit"
                                className="w-full bg-blue-800 text-white font-bold py-3.5 px-5 rounded-xl shadow-lg shadow-blue-800/30 hover:bg-blue-900 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                                Daftar
                            </button>
                        </div>

                        <div className="py-2 flex items-center">
                            <div className="flex-grow border-t border-slate-300"></div>
                            <span className="flex-shrink mx-4 text-slate-500 font-semibold text-sm">atau</span>
                            <div className="flex-grow border-t border-slate-300"></div>
                        </div>

                        <button type="button" onClick={onSignUpSuccess} className="w-full flex items-center justify-center space-x-3 bg-white border border-slate-300 text-slate-700 font-bold py-3 px-5 rounded-xl hover:bg-slate-50 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                            <GoogleIcon className="w-6 h-6" />
                            <span>Daftar dengan Google</span>
                        </button>
                    </form>
                </div>

                <div className="text-center mt-6 pb-[env(safe-area-inset-bottom)]">
                    <p className="text-slate-600">
                        Sudah punya akun?{' '}
                        <button onClick={onNavigateToLogin} className="font-bold text-orange-600 hover:text-orange-500">Masuk di sini</button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
