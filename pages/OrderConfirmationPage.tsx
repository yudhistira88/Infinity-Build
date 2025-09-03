import React, { useEffect } from 'react';
import type { Service, Location } from '../types';
import CheckBadgeIcon from '../components/icons/CheckBadgeIcon';
import LocationPinIcon from '../components/icons/LocationPinIcon';
import CalendarDaysIcon from '../components/icons/CalendarDaysIcon';

interface OrderConfirmationPageProps {
    service: Service;
    location: Location;
    date: string;
    onDone: () => void;
}

const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ service, location, date, onDone }) => {
    
    useEffect(() => {
        const timer = setTimeout(() => {
            onDone();
        }, 3000); // Automatically navigate after 3 seconds

        return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
    }, [onDone]);

    const formattedDate = date ? new Date(date).toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : 'Belum ditentukan';

    return (
        <div className="bg-slate-100 min-h-screen flex flex-col justify-between p-4 pt-8 animate-fade-in-up">
            <main className="text-center">
                <div className="flex justify-center mb-4">
                    <CheckBadgeIcon className="w-24 h-24 text-green-500" />
                </div>
                <h1 className="text-3xl font-extrabold text-slate-800">Pesanan Berhasil Dibuat!</h1>
                <p className="mt-2 text-slate-600 max-w-sm mx-auto">
                    Anda akan diarahkan ke halaman Pesanan. Penyedia jasa akan segera menghubungimu untuk konfirmasi.
                </p>

                <div className="bg-white rounded-xl border border-slate-200 p-4 mt-8 text-left space-y-4 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-3">Ringkasan Pesanan</h2>
                    
                    {/* Service Info */}
                    <div className="flex items-start space-x-3">
                        <img src={service.image} alt={service.name} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-slate-800 truncate">{service.name}</p>
                            <p className="text-sm text-slate-500">{service.category}</p>
                        </div>
                    </div>
                    
                    {/* Date Info */}
                    <div className="flex items-center space-x-3">
                        <CalendarDaysIcon className="w-5 h-5 text-blue-800 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-500">Jadwal</p>
                            <p className="font-bold text-slate-800">{formattedDate}</p>
                        </div>
                    </div>
                    
                    {/* Location Info */}
                     <div className="flex items-center space-x-3">
                        <LocationPinIcon className="w-5 h-5 text-blue-800 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-500">Lokasi</p>
                            <p className="font-bold text-slate-800 truncate">{location.name}</p>
                            <p className="text-xs text-slate-500 truncate">{location.address}</p>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="space-y-3 pb-[env(safe-area-inset-bottom)]">
                 <button 
                    onClick={onDone}
                    className="w-full bg-blue-800 text-white font-bold py-3.5 px-5 rounded-xl shadow-lg shadow-blue-800/30 hover:bg-blue-900 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                    Selesai
                </button>
            </footer>
        </div>
    );
};

export default OrderConfirmationPage;
