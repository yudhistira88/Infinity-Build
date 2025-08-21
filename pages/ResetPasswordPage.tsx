
import React, { useState } from 'react';
import LockClosedIcon from '../components/icons/LockClosedIcon';
import EyeIcon from '../components/icons/EyeIcon';
import EyeSlashIcon from '../components/icons/EyeSlashIcon';

interface ResetPasswordPageProps {
    onResetSuccess: () => void;
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ onResetSuccess }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    return (
        <div className="min-h-screen w-full bg-slate-100 flex flex-col">
            <div className="relative h-[35vh] flex-shrink-0">
                <img 
                    src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1470&auto=format&fit=crop"
                    alt="Secure data" 
                    className="absolute inset-0 w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-blue-900/20"></div>
            </div>

            <div className="flex-grow bg-white rounded-t-3xl -mt-8 relative z-10 p-6 flex flex-col justify-between animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <div>
                    <div className="mb-6 text-left">
                        <h2 className="text-3xl font-bold text-slate-800">Atur Kata Sandi Baru</h2>
                        <p className="text-slate-500 mt-1">Pastikan kata sandi baru Anda kuat dan aman.</p>
                    </div>

                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onResetSuccess(); }}>
                        <div className="relative">
                            <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                            <input
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Kata Sandi Baru"
                                className="w-full bg-slate-100 border border-slate-300 text-slate-900 rounded-xl py-3.5 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder:text-slate-500 transition-colors"
                                required
                            />
                            <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600">
                                {passwordVisible ? <EyeSlashIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
                            </button>
                        </div>

                         <div className="relative">
                            <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                            <input
                                type={confirmPasswordVisible ? "text" : "password"}
                                placeholder="Konfirmasi Kata Sandi Baru"
                                className="w-full bg-slate-100 border border-slate-300 text-slate-900 rounded-xl py-3.5 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder:text-slate-500 transition-colors"
                                required
                            />
                            <button type="button" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600">
                                {confirmPasswordVisible ? <EyeSlashIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
                            </button>
                        </div>

                        <div className="pt-2">
                             <button
                                type="submit"
                                className="w-full bg-blue-800 text-white font-bold py-3.5 px-5 rounded-xl shadow-lg shadow-blue-800/30 hover:bg-blue-900 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                                Simpan Perubahan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
