import React, { useState, useMemo } from 'react';
import type { Location } from '../types';
import XIcon from './icons/XIcon';
import LocationPinIcon from './icons/LocationPinIcon';
import SearchIcon from './icons/SearchIcon';
import CheckIcon from './icons/CheckIcon';
import PlusIcon from './icons/PlusIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';

interface LocationModalProps {
    onClose: () => void;
    locations: Location[];
    selectedLocationId: string;
    onLocationSelect: (id: string) => void;
    onAddNewLocation: ({ name, address }: { name: string; address: string }) => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ onClose, locations, selectedLocationId, onLocationSelect, onAddNewLocation }) => {
    const [view, setView] = useState<'list' | 'add'>('list');
    const [searchQuery, setSearchQuery] = useState('');
    const [newLocationName, setNewLocationName] = useState('');
    const [newLocationAddress, setNewLocationAddress] = useState('');
    const [newLocationCity, setNewLocationCity] = useState('');
    const [isLocating, setIsLocating] = useState(false);

    const filteredLocations = useMemo(() => 
        locations.filter(location => 
            location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            location.address.toLowerCase().includes(searchQuery.toLowerCase())
        ), [locations, searchQuery]);
    
    const handleStartAddNew = () => {
        setNewLocationName('');
        setNewLocationAddress(searchQuery);
        setNewLocationCity('');
        setView('add');
    };

    const handleSaveNewLocation = () => {
        if (newLocationName.trim() && newLocationAddress.trim() && newLocationCity.trim()) {
            onAddNewLocation({ 
                name: newLocationName, 
                address: `${newLocationAddress}, ${newLocationCity}` 
            });
        }
    };

    const handleUseCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation tidak didukung oleh browser Anda.");
            return;
        }

        setIsLocating(true);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Mensimulasikan reverse geocoding dan beralih ke tampilan tambah
                setNewLocationName('Lokasi Saat Ini');
                setNewLocationAddress(`Jl. Ditemukan (${position.coords.latitude.toFixed(3)}, ${position.coords.longitude.toFixed(3)})`);
                setNewLocationCity('Kota Terdekat');
                setView('add');
                setIsLocating(false);
            },
            (error) => {
                let errorMessage = "Tidak dapat mengambil lokasi.";
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "Anda menolak permintaan untuk Geolocation.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Informasi lokasi tidak tersedia.";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "Permintaan untuk mendapatkan lokasi pengguna timed out.";
                        break;
                }
                alert(errorMessage);
                setIsLocating(false);
            }
        );
    };

    const renderListView = () => (
        <>
            <header className="p-4 flex-shrink-0 border-b border-slate-200">
                <div className="flex justify-between items-center">
                    <div className="w-8"></div>
                    <h2 className="font-bold text-lg text-slate-800">Pilih Lokasi</h2>
                    <button onClick={onClose} className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors" aria-label="Close">
                        <XIcon className="w-5 h-5 text-slate-500" />
                    </button>
                </div>
                 <div className="relative mt-4">
                    <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Cari alamat atau lokasi baru"
                        className="w-full bg-slate-50 border border-slate-300 text-slate-800 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-slate-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </header>

            <main className="p-4 pt-2 space-y-3 overflow-y-auto flex-grow scrollbar-hide">
                <h3 className="text-sm font-semibold text-slate-500 px-1">Lokasi Tersimpan</h3>
                {filteredLocations.map(location => {
                    const isSelected = location.id === selectedLocationId;
                    const addressParts = location.address.split(',').map(s => s.trim());
                    const city = addressParts.length > 1 ? addressParts.pop() : '';
                    const street = addressParts.join(', ');

                    return (
                         <button
                            key={location.id}
                            onClick={() => onLocationSelect(location.id)}
                            className={`w-full text-left p-3.5 rounded-lg flex items-center space-x-4 transition-all duration-200 border-2 ${isSelected ? 'border-orange-500 bg-orange-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                        >
                            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isSelected ? 'bg-orange-100' : 'bg-slate-100'}`}>
                                 <LocationPinIcon className={`w-5 h-5 ${isSelected ? 'text-orange-500' : 'text-slate-500'}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className={`font-bold truncate ${isSelected ? 'text-orange-600' : 'text-slate-800'}`}>{location.name}</p>
                                <p className="text-sm text-slate-600 truncate">{street || location.address}</p>
                                {city && <p className="text-xs text-slate-500 truncate">{city}</p>}
                            </div>
                            {isSelected && <CheckIcon className="w-6 h-6 text-orange-500 flex-shrink-0" />}
                        </button>
                    );
                })}
                
                <button
                    onClick={handleStartAddNew}
                    className="w-full text-left p-3.5 rounded-lg flex items-center space-x-4 transition-all duration-200 border-2 border-dashed border-slate-300 hover:border-orange-500 hover:bg-orange-50"
                >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-slate-100">
                        <PlusIcon className="w-5 h-5 text-slate-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-800">Tambah Lokasi Baru</p>
                    </div>
                </button>

                {filteredLocations.length === 0 && searchQuery && (
                    <div className="text-center py-4">
                        <p className="text-slate-500">Lokasi tidak ditemukan.</p>
                    </div>
                )}
            </main>

            <footer className="p-4 flex-shrink-0 border-t border-slate-200">
                <button
                    onClick={handleUseCurrentLocation}
                    disabled={isLocating}
                    className="w-full flex items-center justify-center p-3.5 rounded-lg bg-blue-800 hover:bg-blue-900 transition-colors font-semibold text-white space-x-2 disabled:opacity-50 disabled:cursor-wait shadow-lg shadow-blue-800/30"
                >
                    {isLocating ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Mencari Lokasi...</span>
                        </>
                    ) : (
                        <>
                            <LocationPinIcon className="w-5 h-5"/>
                            <span>Gunakan Lokasi Saat Ini</span>
                        </>
                    )}
                </button>
            </footer>
        </>
    );

     const renderAddView = () => (
        <>
            <header className="p-4 flex-shrink-0 border-b border-slate-200">
                <div className="flex justify-between items-center">
                    <button onClick={() => setView('list')} className="p-1.5" aria-label="Back">
                        <ChevronLeftIcon className="w-6 h-6 text-slate-500" />
                    </button>
                    <h2 className="font-bold text-lg text-slate-800">Tambah Lokasi Baru</h2>
                    <div className="w-8"></div>
                </div>
            </header>
            <main className="p-4 space-y-4 flex-grow">
                <div>
                    <label htmlFor="locationName" className="text-sm font-semibold text-slate-600 mb-1.5 block">Label Lokasi</label>
                    <input
                        id="locationName"
                        type="text"
                        placeholder="Contoh: Rumah, Kantor"
                        className="w-full bg-slate-50 border border-slate-300 text-slate-800 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-slate-400"
                        value={newLocationName}
                        onChange={(e) => setNewLocationName(e.target.value)}
                    />
                </div>
                 <div>
                    <label htmlFor="locationStreet" className="text-sm font-semibold text-slate-600 mb-1.5 block">Alamat Jalan</label>
                    <input
                        id="locationStreet"
                        type="text"
                        placeholder="Contoh: Jl. Cendrawasih No. 42"
                        className="w-full bg-slate-50 border border-slate-300 text-slate-800 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-slate-400"
                        value={newLocationAddress}
                        onChange={(e) => setNewLocationAddress(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="locationCity" className="text-sm font-semibold text-slate-600 mb-1.5 block">Kabupaten/Kota</label>
                    <input
                        id="locationCity"
                        type="text"
                        placeholder="Contoh: Kab. Bekasi"
                        className="w-full bg-slate-50 border border-slate-300 text-slate-800 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-slate-400"
                        value={newLocationCity}
                        onChange={(e) => setNewLocationCity(e.target.value)}
                    />
                </div>
            </main>
            <footer className="p-4 flex-shrink-0 border-t border-slate-200">
                 <button 
                    onClick={handleSaveNewLocation}
                    disabled={!newLocationName.trim() || !newLocationAddress.trim() || !newLocationCity.trim()}
                    className="w-full flex items-center justify-center p-3.5 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 font-semibold text-white transition-opacity disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 shadow-lg shadow-orange-500/20"
                >
                    Simpan Lokasi
                </button>
            </footer>
        </>
    );

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl animate-fade-in-up flex flex-col border border-slate-200" style={{height: 'auto', maxHeight: '90vh'}}>
                {view === 'list' ? renderListView() : renderAddView()}
            </div>
        </div>
    );
};

export default LocationModal;