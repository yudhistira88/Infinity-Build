import React, { useState } from 'react';
import type { Service, Location } from '../types';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import ServiceDetailPage from './ServiceDetailPage';

interface PopularServicesPageProps {
    services: Service[];
    onBack: () => void;
    location: Location;
    onNavigate: (page: string) => void;
}

const ServiceCard: React.FC<{ service: Service; onClick: () => void; }> = ({ service, onClick }) => (
    <button onClick={onClick} className="bg-white rounded-xl overflow-hidden border border-slate-200 flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-orange-300 text-left">
        <div className="w-full h-32 bg-slate-200 overflow-hidden relative">
            <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" />
        </div>
        <div className="p-3 flex-grow flex flex-col">
            <h3 className="text-sm font-bold text-slate-800 leading-tight line-clamp-2 flex-grow">{service.name}</h3>
            <p className="text-xs text-slate-500 mt-1">{service.priceRange}</p>
        </div>
    </button>
);

const PopularServicesPage: React.FC<PopularServicesPageProps> = ({ services, onBack, location, onNavigate }) => {
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    if (selectedService) {
        return <ServiceDetailPage service={selectedService} onBack={() => setSelectedService(null)} location={location} onNavigate={onNavigate} />;
    }

    return (
        <div className="bg-slate-100 min-h-screen flex flex-col animate-fade-in-up">
            <header className="bg-white sticky top-0 z-20 shadow-sm pt-[env(safe-area-inset-top)]">
                <div className="h-16 flex items-center px-4 relative">
                    <button onClick={onBack} className="absolute left-2 p-2 rounded-full hover:bg-slate-100" aria-label="Back">
                        <ChevronLeftIcon className="w-6 h-6 text-slate-700" />
                    </button>
                    <h1 className="text-lg font-bold text-center w-full text-slate-800">Jasa Populer</h1>
                </div>
            </header>
            
            <main className="flex-grow p-4 pb-4">
                <div className="grid grid-cols-2 gap-4">
                    {services.map(service => (
                        <ServiceCard key={service.id} service={service} onClick={() => setSelectedService(service)} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default PopularServicesPage;