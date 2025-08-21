
import React from 'react';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import ChevronRightIcon from '../components/icons/ChevronRightIcon';
import BellIcon from '../components/icons/BellIcon';
import ShieldCheckIcon from '../components/icons/ShieldCheckIcon';
import LockClosedIcon from '../components/icons/LockClosedIcon';

interface SettingsPageProps {
    onBack: () => void;
}

const SettingsMenuItem: React.FC<{ icon: React.ReactNode; label: string, description?: string }> = ({ icon, label, description }) => (
    <button className="flex items-center justify-between w-full p-4 text-left hover:bg-slate-100 transition-colors duration-200">
        <div className="flex items-center space-x-4">
            <div className="text-slate-500">{icon}</div>
            <div>
                <span className="font-semibold text-slate-700">{label}</span>
                {description && <p className="text-sm text-slate-500">{description}</p>}
            </div>
        </div>
        <ChevronRightIcon className="w-5 h-5 text-slate-400" />
    </button>
);


const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
    return (
        <div className="bg-slate-100 min-h-screen flex flex-col animate-fade-in-up">
            <header className="bg-white sticky top-0 z-10 shadow-sm pt-[env(safe-area-inset-top)]">
                <div className="h-16 flex items-center px-4 relative">
                    <button onClick={onBack} className="absolute left-2 p-2 rounded-full hover:bg-slate-100" aria-label="Back">
                        <ChevronLeftIcon className="w-6 h-6 text-slate-700" />
                    </button>
                    <h1 className="text-lg font-bold text-center w-full text-slate-800">Pengaturan Akun</h1>
                </div>
            </header>

            <main className="flex-grow p-4">
                 <div className="bg-white rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-200 overflow-hidden">
                    <SettingsMenuItem icon={<BellIcon className="w-6 h-6" />} label="Notifikasi" description="Atur pengingat dan pemberitahuan promo" />
                    <SettingsMenuItem icon={<ShieldCheckIcon className="w-6 h-6" />} label="Privasi & Keamanan" description="Kelola data dan keamanan akun" />
                    <SettingsMenuItem icon={<LockClosedIcon className="w-6 h-6" />} label="Ubah Kata Sandi" />
                </div>
            </main>
        </div>
    );
};

export default SettingsPage;