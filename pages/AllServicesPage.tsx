
import React, { useState, useMemo } from 'react';
import type { Service } from '../types';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import SearchIcon from '../components/icons/SearchIcon';
import ViewGridIcon from '../components/icons/ViewGridIcon';
import ViewListIcon from '../components/icons/ViewListIcon';
import ServiceDetailPage from './ServiceDetailPage';

interface AllServicesPageProps {
    allServices: Service[];
    onBack: () => void;
}

const ServiceGridCard: React.FC<{ service: Service; onClick: () => void; }> = ({ service, onClick }) => (
    <button onClick={onClick} className="bg-white rounded-xl overflow-hidden border border-slate-200 flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-orange-300 text-left">
        <div className="w-full h-32 bg-slate-200 overflow-hidden relative">
            <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" />
        </div>
        <div className="p-3 flex-grow">
            <h3 className="text-sm font-bold text-slate-800 leading-tight line-clamp-2">{service.name}</h3>
        </div>
    </button>
);

const ServiceListCard: React.FC<{ service: Service; onClick: () => void; }> = ({ service, onClick }) => (
    <button onClick={onClick} className="w-full flex items-start bg-white p-3 rounded-xl border border-slate-200 space-x-4 transition-all duration-300 hover:shadow-xl hover:border-orange-300 hover:bg-slate-50 transform hover:-translate-y-0.5 text-left">
        <img src={service.image} alt={service.name} className="w-20 h-20 object-cover rounded-lg flex-shrink-0"/>
        <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-800">{service.name}</h3>
            <p className="text-sm text-slate-500 mt-1 line-clamp-2">{service.description}</p>
        </div>
    </button>
);

const AllServicesPage: React.FC<AllServicesPageProps> = ({ allServices, onBack }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const filteredServices = useMemo(() => {
        if (!searchQuery) return allServices;
        return allServices.filter(service =>
            service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [allServices, searchQuery]);

    const groupedServices = useMemo(() => {
        return filteredServices.reduce((acc, service) => {
            const category = service.category;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(service);
            return acc;
        }, {} as Record<string, Service[]>);
    }, [filteredServices]);
    
    if (selectedService) {
        return <ServiceDetailPage service={selectedService} onBack={() => setSelectedService(null)} />;
    }

    return (
        <div className="bg-white min-h-screen flex flex-col animate-fade-in-up">
            <header className="bg-white sticky top-0 z-20 shadow-sm pt-[env(safe-area-inset-top)]">
                <div className="h-16 flex items-center px-4 relative">
                    <button onClick={onBack} className="absolute left-2 p-2 rounded-full hover:bg-slate-100" aria-label="Back">
                        <ChevronLeftIcon className="w-6 h-6 text-slate-700" />
                    </button>
                    <h1 className="text-lg font-bold text-center w-full text-slate-800">Semua Layanan</h1>
                </div>
            </header>

            <div className="sticky top-[calc(4rem+env(safe-area-inset-top))] z-10 bg-white/80 backdrop-blur-sm p-4 pb-3 border-b border-slate-200">
                <div className="flex items-center space-x-3">
                    <div className="relative flex-grow">
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Cari layanan, misal 'Renovasi'"
                            className="w-full bg-white border border-slate-300 text-slate-800 rounded-lg py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex-shrink-0 flex items-center bg-slate-100 border border-slate-200 rounded-lg p-1 space-x-1">
                        <button 
                            onClick={() => setViewMode('grid')} 
                            className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'grid' ? 'bg-white shadow-sm text-orange-600' : 'text-slate-500 hover:text-slate-800'}`}
                            aria-label="Grid view"
                            aria-pressed={viewMode === 'grid'}
                        >
                            <ViewGridIcon className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={() => setViewMode('list')} 
                            className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'list' ? 'bg-white shadow-sm text-orange-600' : 'text-slate-500 hover:text-slate-800'}`}
                            aria-label="List view"
                             aria-pressed={viewMode === 'list'}
                        >
                            <ViewListIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <main className="flex-grow p-4 pb-36">
                {Object.keys(groupedServices).length > 0 ? (
                    Object.entries(groupedServices).map(([category, services], index) => (
                        <section key={category} className={`mb-8 animate-fade-in-up`} style={{ animationDelay: `${index * 50}ms` }}>
                            <h2 className="text-lg font-bold text-slate-800 mb-3">{category}</h2>
                            {viewMode === 'grid' ? (
                                <div className="grid grid-cols-2 gap-4">
                                    {services.map(service => <ServiceGridCard key={service.id} service={service} onClick={() => setSelectedService(service)} />)}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {services.map(service => <ServiceListCard key={service.id} service={service} onClick={() => setSelectedService(service)} />)}
                                </div>
                            )}
                        </section>
                    ))
                ) : (
                    <div className="text-center py-16">
                         <SearchIcon className="w-16 h-16 mx-auto text-slate-300" />
                         <h3 className="mt-4 text-lg font-semibold text-slate-800">Layanan Tidak Ditemukan</h3>
                         <p className="mt-1 text-slate-500">Coba gunakan kata kunci lain.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AllServicesPage;