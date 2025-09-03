import React, { useState, useMemo, useEffect } from 'react';
import type { Location } from '../types';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import ChevronDownIcon from '../components/icons/ChevronDownIcon';
import LocationPinIcon from '../components/icons/LocationPinIcon';
import DocumentTextIcon from '../components/icons/DocumentTextIcon';
import CalendarDaysIcon from '../components/icons/CalendarDaysIcon';
import ClockIcon from '../components/icons/ClockIcon';
import CostDetailsModal from '../components/CostDetailsModal';
import SurveyStepper from '../components/SurveyStepper';
import LocationModal from '../components/LocationModal';
import ChevronRightIcon from '../components/icons/ChevronRightIcon';

interface SurveyLocationPageProps {
    categoryName: string;
    onBack: () => void;
    onNext: (data: any) => void;
    initialData: any;
    availableLocations: Location[];
    onLocationUpdate: (locationId: string) => void;
    onAddNewLocation: ({ name, address }: { name: string; address: string }) => void;
}

// --- SIMULASI DATA BOOKING DARI BACKEND ---
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowISO = tomorrow.toISOString().slice(0, 10);

const dayAfterTomorrow = new Date();
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
const dayAfterTomorrowISO = dayAfterTomorrow.toISOString().slice(0, 10);


const bookedSlots = [
    { date: tomorrowISO, time: '12:00 - 14:00' },
    { date: dayAfterTomorrowISO, time: '09:00 - 11:00' },
    { date: dayAfterTomorrowISO, time: '15:00 - 17:00' },
];

const allTimeSlots = [
    "09:00 - 11:00",
    "12:00 - 14:00",
    "15:00 - 17:00"
];
// -----------------------------------------


const SurveyLocationPage: React.FC<SurveyLocationPageProps> = ({ categoryName, onBack, onNext, initialData, availableLocations, onLocationUpdate, onAddNewLocation }) => {
    
    const [isCostModalOpen, setIsCostModalOpen] = useState(false);
    const [isLocationModalOpen, setLocationModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        locationId: initialData.location?.id || (availableLocations.length > 0 ? availableLocations[0].id : ''),
        detailAlamat: initialData.location?.address || (availableLocations.length > 0 ? availableLocations[0].address : ''),
        tanggal: initialData.tanggal || new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 10), // Default to tomorrow
        waktu: initialData.waktu || allTimeSlots[0],
    });

    const availableTimeSlots = useMemo(() => {
        return allTimeSlots.map(slot => {
            const isBooked = bookedSlots.some(
                booked => booked.date === formData.tanggal && booked.time === slot
            );
            return {
                value: slot,
                disabled: isBooked,
            };
        });
    }, [formData.tanggal]);

     useEffect(() => {
        if (initialData.location) {
            setFormData(prev => ({
                ...prev,
                locationId: initialData.location.id,
                detailAlamat: initialData.location.address,
            }));
        }
    }, [initialData.location]);

    useEffect(() => {
        const isCurrentTimeSlotDisabled = availableTimeSlots.find(s => s.value === formData.waktu)?.disabled;

        if (isCurrentTimeSlotDisabled) {
            const firstAvailable = availableTimeSlots.find(s => !s.disabled);
            setFormData(prev => ({
                ...prev,
                waktu: firstAvailable ? firstAvailable.value : ''
            }));
        }
    }, [formData.tanggal, availableTimeSlots]);

    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleLocationSelect = (locationId: string) => {
        onLocationUpdate(locationId);
        setLocationModalOpen(false);
    };

    const handleAddNewLocationAndClose = (newLocationData: { name: string; address: string }) => {
        onAddNewLocation(newLocationData);
        setLocationModalOpen(false);
    };


    const isFormValid = formData.locationId && formData.detailAlamat && formData.tanggal && formData.waktu;

    const handleLanjutkan = () => {
        const selectedLocation = availableLocations.find(l => l.id === formData.locationId);
        onNext({
            ...formData,
            location: selectedLocation,
        });
    };
    
    const selectedLocationDisplay = availableLocations.find(l => l.id === formData.locationId);

    return (
        <>
            <div className={`bg-slate-100 h-screen flex flex-col animate-fade-in-up transition-all duration-300 ${isCostModalOpen || isLocationModalOpen ? 'blur-sm pointer-events-none' : ''}`}>
                <header className="bg-white sticky top-0 z-10 shadow-sm pt-[env(safe-area-inset-top)]">
                    <div className="h-20 flex items-center px-2 relative">
                        <button onClick={onBack} className="absolute left-2 p-2 rounded-full hover:bg-slate-100" aria-label="Back">
                            <ChevronLeftIcon className="w-6 h-6 text-slate-700" />
                        </button>
                        <div className="text-center w-full">
                            <h1 className="text-lg font-bold text-slate-800">{categoryName}</h1>
                             <button onClick={() => setIsCostModalOpen(true)} className="flex items-center justify-center mx-auto text-sm text-slate-500 font-semibold hover:bg-slate-100 p-1 rounded-md transition-colors">
                                Total Biaya <span className="font-bold text-blue-800 mx-1">Rp200.000,-</span>
                                <ChevronDownIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </header>

                <main className="flex-grow pb-28 overflow-y-auto scrollbar-hide">
                    <SurveyStepper currentStep="pesan" />
                    
                    <div className="p-4 pt-2">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100">
                           
                            {/* Lokasi Survey */}
                            <div className="py-3">
                                <label htmlFor="locationId" className="flex items-center space-x-3 text-sm text-slate-500 mb-2">
                                    <div className="flex-shrink-0"><LocationPinIcon className="w-6 h-6" /></div>
                                    <span>Lokasi<span className="text-red-500">*</span></span>
                                </label>
                                <div className="pl-9">
                                    <button 
                                        type="button"
                                        onClick={() => setLocationModalOpen(true)}
                                        className="w-full text-left p-2.5 rounded-lg flex items-center justify-between bg-slate-50 border border-slate-300 hover:bg-slate-100 transition-colors"
                                    >
                                        <div className="min-w-0">
                                            <p className="font-semibold truncate text-slate-800">{selectedLocationDisplay?.name || 'Pilih Lokasi'}</p>
                                        </div>
                                        <ChevronRightIcon className="w-5 h-5 text-slate-400 flex-shrink-0 ml-2" />
                                    </button>
                                </div>
                            </div>

                            {/* Detail Alamat */}
                            <div className="py-3">
                                <label htmlFor="detailAlamat" className="flex items-center space-x-3 text-sm text-slate-500 mb-2">
                                    <div className="flex-shrink-0"><DocumentTextIcon className="w-6 h-6" /></div>
                                    <span>Detail Alamat<span className="text-red-500">*</span></span>
                                </label>
                                <div className="pl-9">
                                    <textarea
                                        id="detailAlamat"
                                        value={formData.detailAlamat}
                                        readOnly
                                        rows={3}
                                        placeholder="Detail alamat akan terisi otomatis setelah memilih lokasi."
                                        className="w-full bg-slate-100 border border-slate-300 rounded-lg p-2.5 text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all resize-none cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            {/* Tanggal Survey */}
                            <div className="py-3">
                                <label htmlFor="tanggal" className="flex items-center space-x-3 text-sm text-slate-500 mb-2">
                                    <div className="flex-shrink-0"><CalendarDaysIcon className="w-6 h-6" /></div>
                                    <span>Tanggal Survey<span className="text-red-500">*</span></span>
                                </label>
                                <div className="pl-9">
                                    <input
                                        id="tanggal"
                                        type="date"
                                        value={formData.tanggal}
                                        onChange={handleInputChange}
                                        min={new Date().toISOString().split("T")[0]}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            {/* Waktu Survey */}
                            <div className="py-3">
                                <label htmlFor="waktu" className="flex items-center space-x-3 text-sm text-slate-500 mb-2">
                                    <div className="flex-shrink-0"><ClockIcon className="w-6 h-6" /></div>
                                    <span>Waktu Survey<span className="text-red-500">*</span></span>
                                </label>
                                <div className="pl-9">
                                    <div className="relative">
                                        <select
                                            id="waktu"
                                            value={formData.waktu}
                                            onChange={handleInputChange}
                                            className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all appearance-none pr-8"
                                        >
                                            {availableTimeSlots.map(slot => (
                                                <option
                                                    key={slot.value}
                                                    value={slot.value}
                                                    disabled={slot.disabled}
                                                    className={slot.disabled ? 'text-red-400' : ''}
                                                >
                                                    {slot.value} {slot.disabled ? '(Penuh)' : ''}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                                    </div>
                                    {!formData.waktu && availableTimeSlots.every(s => s.disabled) && (
                                        <p className="text-xs text-red-500 mt-2">Semua slot waktu untuk tanggal ini sudah penuh. Silakan pilih tanggal lain.</p>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </main>

                <footer className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto p-4 bg-white/80 backdrop-blur-sm border-t border-slate-200 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                    <button 
                        onClick={handleLanjutkan}
                        disabled={!isFormValid}
                        className="w-full bg-blue-800 text-white font-bold py-3.5 px-5 rounded-xl shadow-lg shadow-blue-800/30 hover:bg-blue-900 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed">
                        Lanjutkan
                    </button>
                </footer>
            </div>
            <CostDetailsModal 
                isOpen={isCostModalOpen} 
                onClose={() => setIsCostModalOpen(false)} 
            />
            {isLocationModalOpen && (
                <LocationModal 
                    onClose={() => setLocationModalOpen(false)}
                    locations={availableLocations}
                    selectedLocationId={formData.locationId}
                    onLocationSelect={handleLocationSelect}
                    onAddNewLocation={handleAddNewLocationAndClose}
                />
            )}
        </>
    );
};

export default SurveyLocationPage;