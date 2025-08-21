
import React, { useState, useRef } from 'react';
import type { Location } from '../types';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import WrenchScrewdriverIcon from '../components/icons/WrenchScrewdriverIcon';
import PencilIcon from '../components/icons/PencilIcon';
import CameraIcon from '../components/icons/CameraIcon';
import LocationPinIcon from '../components/icons/LocationPinIcon';
import CalendarDaysIcon from '../components/icons/CalendarDaysIcon';
import ChevronRightIcon from '../components/icons/ChevronRightIcon';
import ArrowUpOnSquareIcon from '../components/icons/ArrowUpOnSquareIcon';

interface CallTukangPageProps {
    onBack: () => void;
    initialLocation: Location;
}

const urgentServiceTypes = [
    'Perbaikan Atap Bocor',
    'Saluran Air Mampet',
    'Perbaikan Listrik / Konsleting',
    'Pemasangan / Perbaikan Pipa',
    'Perbaikan Dinding Retak',
    'Lainnya (Jelaskan di Deskripsi)',
];

const scheduleOptions = ['Secepatnya', 'Hari Ini', 'Besok'];

const CallTukangPage: React.FC<CallTukangPageProps> = ({ onBack, initialLocation }) => {
    const [serviceType, setServiceType] = useState(urgentServiceTypes[0]);
    const [description, setDescription] = useState('');
    const [photos, setPhotos] = useState<File[]>([]);
    const [location] = useState(initialLocation);
    const [schedule, setSchedule] = useState(scheduleOptions[0]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setPhotos(Array.from(event.target.files));
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };
    
    const handleSubmit = () => {
        if (!description.trim()) {
            alert('Mohon isi deskripsi masalah terlebih dahulu.');
            return;
        }
        
        const formData = {
            serviceType,
            description,
            photoCount: photos.length,
            location: location.name,
            schedule,
        };

        console.log('Form Submitted:', formData);
        alert(`Permintaan terkirim!\n\nLayanan: ${serviceType}\nLokasi: ${location.name}\nJadwal: ${schedule}\n\nKami akan segera mencarikan tukang untuk Anda.`);
        onBack();
    };

    return (
        <div className="bg-slate-100 min-h-screen flex flex-col animate-fade-in-up">
            <header className="bg-white sticky top-0 z-10 shadow-sm pt-[env(safe-area-inset-top)]">
                <div className="h-16 flex items-center px-4 relative">
                    <button onClick={onBack} className="absolute left-2 p-2 rounded-full hover:bg-slate-100" aria-label="Back">
                        <ChevronLeftIcon className="w-6 h-6 text-slate-700" />
                    </button>
                    <h1 className="text-lg font-bold text-center w-full text-slate-800">Panggil Tukang Cepat</h1>
                </div>
            </header>
            
            <main className="flex-grow p-4 space-y-4 pb-28">
                {/* Service Type */}
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <label htmlFor="serviceType" className="flex items-center space-x-3 mb-3">
                        <WrenchScrewdriverIcon className="w-5 h-5 text-blue-800" />
                        <span className="font-bold text-slate-800">Jenis Layanan</span>
                    </label>
                    <select
                        id="serviceType"
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="w-full bg-slate-100 border-slate-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500"
                    >
                        {urgentServiceTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                </div>

                {/* Description */}
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <label htmlFor="description" className="flex items-center space-x-3 mb-3">
                        <PencilIcon className="w-5 h-5 text-blue-800" />
                        <span className="font-bold text-slate-800">Deskripsi Masalah</span>
                    </label>
                    <textarea
                        id="description"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Jelaskan detail masalah yang Anda hadapi..."
                        className="w-full bg-slate-100 border-slate-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500 resize-none"
                    ></textarea>
                </div>

                {/* Photo Upload */}
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center space-x-3 mb-3">
                        <CameraIcon className="w-5 h-5 text-blue-800" />
                        <span className="font-bold text-slate-800">Foto Kerusakan (Opsional)</span>
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handlePhotoUpload}
                        multiple
                        accept="image/*"
                        className="hidden"
                    />
                    <button onClick={triggerFileInput} className="w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                        <ArrowUpOnSquareIcon className="w-8 h-8 text-slate-400 mb-2"/>
                        <span className="text-sm font-semibold text-orange-600">{photos.length > 0 ? `${photos.length} foto dipilih` : 'Unggah Foto'}</span>
                        <span className="text-xs text-slate-500">Ini akan membantu tukang memahami masalah</span>
                    </button>
                </div>

                {/* Location */}
                 <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center space-x-3 mb-3">
                        <LocationPinIcon className="w-5 h-5 text-blue-800" />
                        <span className="font-bold text-slate-800">Lokasi</span>
                    </div>
                     <button className="w-full text-left p-3 rounded-lg flex items-center justify-between bg-slate-100 hover:bg-slate-200 transition-colors">
                        <div className="min-w-0">
                             <p className="font-semibold truncate text-slate-800">{location.name}</p>
                             <p className="text-sm text-slate-500 truncate">{location.address}</p>
                        </div>
                         <ChevronRightIcon className="w-5 h-5 text-slate-400 flex-shrink-0 ml-2" />
                     </button>
                </div>
                
                {/* Schedule */}
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                     <div className="flex items-center space-x-3 mb-3">
                        <CalendarDaysIcon className="w-5 h-5 text-blue-800" />
                        <span className="font-bold text-slate-800">Jadwal Pengerjaan</span>
                    </div>
                    <div className="flex space-x-2">
                        {scheduleOptions.map(option => (
                             <button
                                key={option}
                                onClick={() => setSchedule(option)}
                                className={`flex-1 py-3 px-2 text-sm font-bold rounded-lg transition-all duration-200 ${schedule === option ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

            </main>

            <div className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto p-4 bg-white/80 backdrop-blur-sm border-t border-slate-200 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                <button 
                    onClick={handleSubmit}
                    disabled={!description.trim()}
                    className="w-full bg-orange-500 text-white font-bold py-3.5 px-5 rounded-xl shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed">
                    Cari Tukang Sekarang
                </button>
            </div>
        </div>
    );
};

export default CallTukangPage;