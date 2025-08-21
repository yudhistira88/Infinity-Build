import React, { useState, useEffect } from 'react';
import LocationPinIcon from './icons/LocationPinIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';
import BellIcon from './icons/BellIcon';
import SearchIcon from './icons/SearchIcon';

interface HeaderProps {
    locationName: string;
    locationCity: string;
    onLocationClick: () => void;
    onNotificationClick: () => void;
    onSearchClick: () => void;
    hasUnreadNotifications: boolean;
}

const searchPlaceholders = [
    "Kamu lagi cari layanan apa?",
    "Coba \"Renovasi Rumah\"",
    "Atau \"Atap Bocor\"",
    "Misalnya \"Pengecatan\"",
];

const TYPING_SPEED = 120;
const DELETING_SPEED = 60;
const PAUSE_DURATION = 2000;

const Header: React.FC<HeaderProps> = ({ locationName, locationCity, onLocationClick, onNotificationClick, onSearchClick, hasUnreadNotifications }) => {
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fullText = searchPlaceholders[placeholderIndex];

        const logic = () => {
            if (isDeleting) {
                // Handle deleting
                if (displayedText.length > 0) {
                    setDisplayedText(prev => prev.slice(0, -1));
                } else {
                    setIsDeleting(false);
                    setPlaceholderIndex(prev => (prev + 1) % searchPlaceholders.length);
                }
            } else {
                // Handle typing
                if (displayedText.length < fullText.length) {
                    setDisplayedText(prev => fullText.slice(0, prev.length + 1));
                } else {
                    // Wait before deleting
                    return setTimeout(() => setIsDeleting(true), PAUSE_DURATION);
                }
            }
        };
        
        const timeoutId = setTimeout(logic, isDeleting ? DELETING_SPEED : TYPING_SPEED);

        return () => clearTimeout(timeoutId);
    }, [displayedText, isDeleting, placeholderIndex]);

    return (
        <header className="bg-blue-800 text-white px-4 pb-4 pt-[calc(1rem+env(safe-area-inset-top))] rounded-b-[2rem] z-10 shadow-lg shadow-blue-800/20 flex-shrink-0">
            <div className="flex justify-between items-center mb-3">
                <div className="text-xl font-extrabold tracking-tight">
                    Infinity Build
                </div>
                 <button onClick={onNotificationClick} className="relative p-1">
                   <BellIcon className="w-7 h-7" />
                   {hasUnreadNotifications && (
                     <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-orange-500 ring-2 ring-blue-800"></span>
                   )}
                 </button>
            </div>
            
            <button onClick={onLocationClick} className="flex items-center space-x-2 text-left -ml-2 p-2 rounded-lg hover:bg-white/10 transition-colors max-w-full mb-4">
                <LocationPinIcon className="w-5 h-5 flex-shrink-0 text-blue-300" />
                <div className="flex items-center flex-1 min-w-0">
                    <div className="flex-1 min-w-0">
                        <h1 className="font-semibold text-sm truncate" title={locationName}>{locationName}</h1>
                        {locationCity && <p className="text-xs text-blue-300 truncate" title={locationCity}>{locationCity}</p>}
                    </div>
                    <ChevronDownIcon className="w-4 h-4 ml-1.5 text-blue-300 flex-shrink-0" />
                </div>
            </button>

            <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <button
                    onClick={onSearchClick}
                    aria-label="Cari layanan"
                    className="w-full text-left bg-white text-slate-500 rounded-lg py-3 pl-11 pr-4 transition-colors hover:bg-slate-50 h-[46px] flex items-center"
                >
                    <span>{displayedText}</span>
                    <span className="animate-blink text-slate-700 font-light">|</span>
                </button>
            </div>
        </header>
    );
};

export default Header;