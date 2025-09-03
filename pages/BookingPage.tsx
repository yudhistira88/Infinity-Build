import React, { useState, useRef } from 'react';
import type { Service, Location } from '../types';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import LocationPinIcon from '../components/icons/LocationPinIcon';
import CalendarDaysIcon from '../components/icons/CalendarDaysIcon';
import PencilIcon from '../components/icons/PencilIcon';
import CameraIcon from '../components/icons/CameraIcon';
import ChevronRightIcon from '../components/icons/ChevronRightIcon';
import ArrowUpOnSquareIcon from '../components/icons/ArrowUpOnSquareIcon';
import CurrencyDollarIcon from '../components/icons/CurrencyDollarIcon';
import CheckoutPage from './CheckoutPage';

interface BookingPageProps {
    service: Service;
    location: Location;
    onBack: () => void;
    onBookingConfirmed: () => void;
}

const BookingPage: React.FC<BookingPageProps> = ({ service, location, onBack, onBookingConfirmed }) => {
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [photos, setPhotos] = useState<File[]>([]);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
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
        if (!date) {
            alert('Mohon pilih tanggal pengerjaan.');
            return;
        }
        if (!description.trim()) {
            alert('Mohon isi deskripsi kebutuhan Anda.');
            return;
        }
        setIsCheckingOut(true);
    };
    
    if (isCheckingOut) {
        return (
            <CheckoutPage
                service={service}
                location={location}
                date={date}
                onBack={() => setIsCheckingOut(false)}
                onPaymentSuccess={onBookingConfirmed}
            />
        );
    }

    return (
        <div className="bg-slate-100 min-h-screen flex flex-col animate-fade-in-up">
            <header className="bg-white sticky top-0 z-10 shadow-sm pt-[env(safe-area-inset-top)]">
                <div className="h-16 flex items-center px-4 relative">
                    <button onClick={onBack} className="absolute left-2 p-2 rounded-full hover:bg-slate-100" aria-label="Back">
                        <ChevronLeftIcon className="w-6 h-6 text-slate-700" />
                    </button>
                    <h1 className="text-lg font-bold text-center w-full text-slate-800">Detail Pemesanan</h1>
                </div>
            </header>

            <main className="flex-grow p-4 space-y-4 pb-28">
                {/* Service Summary */}
                <section className="bg-white p-3 rounded-xl border border-slate-200 flex items-center space-x-4">
                    <img src={service.image} alt={service.name} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-orange-600">{service.category}</p>
                        <h2 className="font-bold text-slate-800 truncate mt-0.5">{service.name}</h2>
                        <p className="text-sm font-semibold text-slate-600 mt-1">{service.priceRange}</p>
                    </div>
                </section>

                {/* Location */}
                <section className="bg-white p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center space-x-3 mb-3">
                        <LocationPinIcon className="w-5 h-5 text-blue-800" />
                        <span className="font-bold text-slate-800">Lokasi Pengerjaan</span>
                    </div>
                    <button className="w-full text-left p-3 rounded-lg flex items-center justify-between bg-slate-100 hover:bg-slate-200 transition-colors">
                        <div className="min-w-0">
                            <p className="font-semibold truncate text-slate-800">{location.name}</p>
                            <p className="text-sm text-slate-500 truncate">{location.address}</p>
                        </div>
                        <ChevronRightIcon className="w-5 h-5 text-slate-400 flex-shrink-0 ml-2" />
                    </button>
                </section>
                
                {/* Schedule */}
                <section className="bg-white p-4 rounded-xl border border-slate-200">
                    <label htmlFor="scheduleDate" className="flex items-center space-x-3 mb-3">
                        <CalendarDaysIcon className="w-5 h-5 text-blue-800" />
                        <span className="font-bold text-slate-800">Jadwal Pengerjaan</span>
                    </label>
                    <input
                        type="date"
                        id="scheduleDate"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-slate-100 border-slate-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500"
                        min={new Date().toISOString().split('T')[0]} // Set min date to today
                    />
                </section>
                
                {/* Description */}
                <section className="bg-white p-4 rounded-xl border border-slate-200">
                    <label htmlFor="description" className="flex items-center space-x-3 mb-3">
                        <PencilIcon className="w-5 h-5 text-blue-800" />
                        <span className="font-bold text-slate-800">Deskripsi Kebutuhan</span>
                    </label>
                    <textarea
                        id="description"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Berikan detail tambahan tentang pekerjaan yang dibutuhkan..."
                        className="w-full bg-slate-100 border-slate-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500 resize-none"
                    ></textarea>
                </section>
                
                {/* Photo Upload */}
                <section className="bg-white p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center space-x-3 mb-3">
                        <CameraIcon className="w-5 h-5 text-blue-800" />
                        <span className="font-bold text-slate-800">Foto (Opsional)</span>
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
                        <ArrowUpOnSquareIcon className="w-8 h-8 text-slate-400 mb-2" />
                        <span className="text-sm font-semibold text-orange-600">{photos.length > 0 ? `${photos.length} foto dipilih` : 'Unggah Foto'}</span>
                        <span className="text-xs text-slate-500">Membantu penyedia jasa memahami kondisi</span>
                    </button>
                </section>
                
                {/* Cost Summary */}
                <section className="bg-white p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center space-x-3 mb-3">
                        <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
                        <h3 className="font-bold text-slate-800">Ringkasan Biaya</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-600">Estimasi Biaya Jasa</span>
                            <span className="font-medium text-slate-800">{service.priceRange}</span>
                        </div>
                         <p className="text-xs text-slate-500 mt-2">*Harga akhir akan dikonfirmasi oleh penyedia jasa setelah survei atau diskusi lebih lanjut.</p>
                    </div>
                </section>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto p-4 bg-white/80 backdrop-blur-sm border-t border-slate-200 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                <button 
                    onClick={handleSubmit}
                    className="w-full bg-orange-500 text-white font-bold py-3.5 px-5 rounded-xl shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed">
                    Konfirmasi Pesanan
                </button>
            </footer>
        </div>
    );
};

export default BookingPage;