
import React, { useState } from 'react';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import AtSymbolIcon from '../components/icons/AtSymbolIcon';
import UserIcon from '../components/icons/UserIcon';
import DevicePhoneMobileIcon from '../components/icons/DevicePhoneMobileIcon';

interface EditProfilePageProps {
    onBack: () => void;
}

const EditProfilePage: React.FC<EditProfilePageProps> = ({ onBack }) => {
    const [name, setName] = useState('M. Zidni Arkan');
    const [email, setEmail] = useState('m.zidni.arkan@example.com');
    const [phone, setPhone] = useState('081234567890');

    const canSaveChanges = name.trim() !== '' && email.trim() !== '' && phone.trim() !== '';

    return (
        <div className="bg-slate-100 min-h-screen flex flex-col animate-fade-in-up">
            <header className="bg-white sticky top-0 z-10 shadow-sm pt-[env(safe-area-inset-top)]">
                <div className="h-16 flex items-center px-4 relative">
                    <button onClick={onBack} className="absolute left-2 p-2 rounded-full hover:bg-slate-100" aria-label="Back">
                        <ChevronLeftIcon className="w-6 h-6 text-slate-700" />
                    </button>
                    <h1 className="text-lg font-bold text-center w-full text-slate-800">Edit Profil</h1>
                </div>
            </header>

            <main className="flex-grow p-4 space-y-6">
                <div className="flex flex-col items-center pt-4">
                    <div className="relative w-28 h-28">
                        <img
                            src="https://i.pravatar.cc/150?img=5"
                            alt="User Avatar"
                            className="w-full h-full rounded-full border-4 border-white shadow-lg"
                        />
                         <button className="absolute bottom-0 right-0 bg-orange-500 w-9 h-9 rounded-full flex items-center justify-center shadow-md hover:bg-orange-600 transition-colors border-2 border-white">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="relative">
                        <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nama Lengkap"
                            className="w-full bg-white border border-slate-300 rounded-lg py-3.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                     <div className="relative">
                        <AtSymbolIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Alamat Email"
                            className="w-full bg-white border border-slate-300 rounded-lg py-3.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                     <div className="relative">
                        <DevicePhoneMobileIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Nomor Telepon"
                            className="w-full bg-white border border-slate-300 rounded-lg py-3.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                </div>
            </main>

            <div className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto p-4 bg-white/80 backdrop-blur-sm border-t border-slate-200 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                <button
                    disabled={!canSaveChanges}
                    className="w-full bg-orange-500 text-white font-bold py-3.5 px-5 rounded-xl shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed">
                    Simpan Perubahan
                </button>
            </div>
        </div>
    );
};

export default EditProfilePage;