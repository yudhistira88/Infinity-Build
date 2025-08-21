import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { Service } from '../types';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import SearchIcon from '../components/icons/SearchIcon';
import XIcon from '../components/icons/XIcon';
import SearchResultCard from '../components/SearchResultCard';
import ServiceDetailPage from './ServiceDetailPage';

interface SearchPageProps {
    allServices: Service[];
    onBack: () => void;
}

const popularSearches = ['Renovasi Rumah', 'Atap Bocor', 'Pengecatan', 'Listrik', 'Canopy'];

const SearchPage: React.FC<SearchPageProps> = ({ allServices, onBack }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Auto-focus the search input when the component mounts
        if (!selectedService) {
            inputRef.current?.focus();
        }
    }, [selectedService]);

    const filteredServices = useMemo(() => {
        if (!searchQuery.trim()) return [];
        return allServices.filter(service =>
            service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [allServices, searchQuery]);

    if (selectedService) {
        return <ServiceDetailPage service={selectedService} onBack={() => setSelectedService(null)} />;
    }

    const renderInitialState = () => (
        <div className="p-4 animate-fade-in-up">
            <h2 className="font-bold text-slate-700 mb-3">Pencarian Populer</h2>
            <div className="flex flex-wrap gap-2">
                {popularSearches.map(term => (
                    <button 
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="bg-slate-200 text-slate-700 font-semibold text-sm py-2 px-4 rounded-full hover:bg-slate-300 transition-colors"
                    >
                        {term}
                    </button>
                ))}
            </div>
        </div>
    );
    
    const renderResults = () => (
         <div className="p-4 space-y-3">
             <h2 className="font-bold text-lg text-slate-900">Hasil Pencarian ({filteredServices.length})</h2>
             {filteredServices.length > 0 ? (
                 filteredServices.map(service => <SearchResultCard key={service.id} service={service} onClick={() => setSelectedService(service)} />)
             ) : (
                 <div className="text-center pt-16">
                     <SearchIcon className="w-16 h-16 mx-auto text-slate-300" />
                     <h3 className="mt-4 text-lg font-semibold text-slate-800">Layanan Tidak Ditemukan</h3>
                     <p className="mt-1 text-slate-500">Coba gunakan kata kunci lain.</p>
                </div>
             )}
         </div>
    );

    return (
        <div className="bg-slate-100 min-h-screen flex flex-col animate-fade-in-up">
            <header className="bg-white sticky top-0 z-10 shadow-sm pt-[env(safe-area-inset-top)]">
                <div className="h-16 flex items-center px-2 space-x-2">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-100 flex-shrink-0" aria-label="Back">
                        <ChevronLeftIcon className="w-6 h-6 text-slate-700" />
                    </button>
                    <div className="relative flex-grow">
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Cari layanan apa saja..."
                            className="w-full bg-slate-100 border-transparent text-slate-800 rounded-lg py-3 pl-11 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-slate-200" aria-label="Clear search">
                                <XIcon className="w-5 h-5 text-slate-500" />
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <main className="flex-grow pb-4">
                {searchQuery.trim() ? renderResults() : renderInitialState()}
            </main>
        </div>
    );
};

export default SearchPage;