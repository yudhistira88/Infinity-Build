
import React, { useState, useMemo } from 'react';
import type { Service } from '../types';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import SearchIcon from '../components/icons/SearchIcon';
import ServiceDetailPage from './ServiceDetailPage';

interface CategoryPageProps {
    categoryName: string;
    services: Service[];
    onBack: () => void;
}

const ServiceListCard: React.FC<{ service: Service; onClick: () => void }> = ({ service, onClick }) => (
    <button onClick={onClick} className="w-full flex items-start bg-white p-3 rounded-xl border border-slate-200 space-x-4 transition-all duration-300 hover:shadow-xl hover:border-orange-300 hover:bg-slate-50 transform hover:-translate-y-0.5 text-left">
        <img src={service.image} alt={service.name} className="w-20 h-20 object-cover rounded-lg flex-shrink-0"/>
        <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-800">{service.name}</h3>
            <p className="text-sm text-slate-500 mt-1 line-clamp-2">{service.description}</p>
        </div>
    </button>
);

const CategoryPage: React.FC<CategoryPageProps> = ({ categoryName, services, onBack }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const filteredServices = useMemo(() => {
        if (!searchQuery) return services;
        return services.filter(service =>
            service.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [services, searchQuery]);
    
    if (selectedService) {
        return <ServiceDetailPage service={selectedService} onBack={() => setSelectedService(null)} />;
    }

    return (
        <div className="bg-slate-100 min-h-screen flex flex-col animate-fade-in-up">
            <header className="bg-white sticky top-0 z-20 shadow-sm pt-[env(safe-area-inset-top)]">
                <div className="h-16 flex items-center px-4 relative">
                    <button onClick={onBack} className="absolute left-2 p-2 rounded-full hover:bg-slate-100" aria-label="Back">
                        <ChevronLeftIcon className="w-6 h-6 text-slate-700" />
                    </button>
                    <h1 className="text-lg font-bold text-center w-full text-slate-800">{categoryName}</h1>
                </div>
            </header>

            <div className="sticky top-[calc(4rem+env(safe-area-inset-top))] z-10 bg-slate-100/80 backdrop-blur-sm p-4 pb-3 border-b border-slate-200">
                <div className="relative">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder={`Cari di ${categoryName}...`}
                        className="w-full bg-white border border-slate-300 text-slate-800 rounded-lg py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <main className="flex-grow p-4 pb-28">
                {filteredServices.length > 0 ? (
                    <div className="space-y-3">
                        {filteredServices.map(service => <ServiceListCard key={service.id} service={service} onClick={() => setSelectedService(service)} />)}
                    </div>
                ) : (
                    <div className="text-center pt-16">
                         <SearchIcon className="w-16 h-16 mx-auto text-slate-300" />
                         <h3 className="mt-4 text-lg font-semibold text-slate-800">Layanan Tidak Ditemukan</h3>
                         <p className="mt-1 text-slate-500">Coba gunakan kata kunci lain di kategori ini.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default CategoryPage;