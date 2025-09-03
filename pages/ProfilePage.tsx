

import React, { useState, useEffect } from 'react';
import UserIcon from '../components/icons/UserIcon';
import CogIcon from '../components/icons/CogIcon';
import QuestionMarkCircleIcon from '../components/icons/QuestionMarkCircleIcon';
import LogoutIcon from '../components/icons/LogoutIcon';
import ChevronRightIcon from '../components/icons/ChevronRightIcon';
import EditProfilePage from './EditProfilePage';
import SettingsPage from './SettingsPage';
import HelpCenterPage from './HelpCenterPage';

interface ProfilePageProps {
    onLogout: () => void;
    setBottomNavVisible: (visible: boolean) => void;
}

const ProfileMenuItem: React.FC<{ icon: React.ReactNode; label: string; onClick?: () => void; }> = ({ icon, label, onClick }) => (
    <button onClick={onClick} className="flex items-center justify-between w-full p-4 text-left hover:bg-slate-100 transition-colors duration-200">
        <div className="flex items-center space-x-4">
            <div className="text-slate-500">{icon}</div>
            <span className="font-semibold text-slate-700">{label}</span>
        </div>
        <ChevronRightIcon className="w-5 h-5 text-slate-400" />
    </button>
);


const ProfilePage: React.FC<ProfilePageProps> = ({ onLogout, setBottomNavVisible }) => {
    const [view, setView] = useState<'main' | 'edit' | 'settings' | 'help'>('main');

    useEffect(() => {
        setBottomNavVisible(view === 'main');
    }, [view, setBottomNavVisible]);

    if (view === 'edit') {
        return <EditProfilePage onBack={() => setView('main')} />;
    }
    if (view === 'settings') {
        return <SettingsPage onBack={() => setView('main')} />;
    }
    if (view === 'help') {
        return <HelpCenterPage onBack={() => setView('main')} />;
    }

    return (
        <div className="bg-slate-100 min-h-screen pb-[calc(5rem+env(safe-area-inset-bottom))]">
            <header className="bg-blue-800 text-white px-4 pb-6 pt-[calc(1rem+env(safe-area-inset-top))] rounded-b-[2rem] shadow-lg shadow-blue-800/20">
                 <h1 className="text-xl font-bold text-center text-white mb-4">Profil Saya</h1>
                <div className="flex flex-col items-center">
                    <div className="relative w-24 h-24">
                        <img
                            src="https://i.pravatar.cc/150?img=5"
                            alt="User Avatar"
                            className="w-full h-full rounded-full border-4 border-white shadow-lg"
                        />
                        <button onClick={() => setView('edit')} className="absolute bottom-0 right-0 bg-orange-500 w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-orange-600 transition-colors">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                        </button>
                    </div>
                    <h2 className="mt-4 text-2xl font-bold">M. Zidni Arkan</h2>
                    <p className="text-blue-300">m.zidni.arkan@example.com</p>
                </div>
            </header>

            <div className="p-4">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-200 overflow-hidden">
                    <ProfileMenuItem icon={<CogIcon className="w-6 h-6" />} label="Pengaturan Akun" onClick={() => setView('settings')} />
                    <ProfileMenuItem icon={<QuestionMarkCircleIcon className="w-6 h-6" />} label="Pusat Bantuan" onClick={() => setView('help')} />
                    <ProfileMenuItem icon={<LogoutIcon className="w-6 h-6 text-red-500" />} label="Keluar" onClick={onLogout} />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;