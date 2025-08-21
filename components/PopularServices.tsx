
import React from 'react';
import type { Service } from '../types';

const ServiceCard: React.FC<{ service: Service; onClick: () => void }> = ({ service, onClick }) => (
    <button onClick={onClick} className="relative flex-shrink-0 w-40 h-48 rounded-xl overflow-hidden group shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl cursor-pointer text-left">
        <img src={service.image} alt={service.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-3 text-white w-full">
            <h3 className="text-sm font-bold leading-tight line-clamp-2">{service.name}</h3>
            <p className="text-xs text-slate-200 mt-1">{service.priceRange}</p>
        </div>
    </button>
);

interface PopularServicesProps {
    services: Service[];
    onServiceClick: (service: Service) => void;
    onViewAllClick: () => void;
}

const PopularServices: React.FC<PopularServicesProps> = ({ services, onServiceClick, onViewAllClick }) => {
    return (
        <div className="px-4 pt-6 pb-6 bg-white rounded-t-[2rem]">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg text-slate-900">Jasa Populer</h2>
                <button onClick={onViewAllClick} className="text-orange-600 font-semibold text-sm hover:text-orange-500 transition-colors">Lihat Semua</button>
            </div>
            <div className="flex overflow-x-auto space-x-4 pb-2 -mx-4 px-4 scrollbar-hide">
                {services.map((service) => (
                    <ServiceCard key={service.id} service={service} onClick={() => onServiceClick(service)} />
                ))}
            </div>
        </div>
    );
};

export default PopularServices;