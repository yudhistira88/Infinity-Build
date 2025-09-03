import React, { useState, useMemo } from 'react';
import type { Service, Location } from '../types';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import SearchIcon from '../components/icons/SearchIcon';
import ViewGridIcon from '../components/icons/ViewGridIcon';
import ViewListIcon from '../components/icons/ViewListIcon';
import ServiceDetailPage from './ServiceDetailPage';

// Props for the main component
interface AllServicesPageProps {
    allServices: Service[];
    onBack: () => void;
    location: Location;
    onNavigate: (page: string) => void;
}

// Redesigned Service Grid Card
const ServiceGridCard: React.FC<{ service: Service; onClick: () => void; }> = ({ service, onClick }) => (
    <button onClick={onClick} className="bg-white rounded-xl overflow-hidden shadow-sm flex flex-col group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-left border border-slate-100">
        <div className="w-full h-32 bg-slate-200 overflow-hidden relative">
            <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="p-3 flex-grow flex flex-col justify-between">
            <h3 className="text-sm font-semibold text-slate-800 leading-tight line-clamp-2">{service.name}</h3>
            <p className="text-xs text-slate-500 mt-2">{service.priceRange}</p>
        </div>
    </button>
);

// Redesigned Service List Card
const ServiceListCard: React.FC<{ service: Service; onClick: () => void; }> = ({ service, onClick }) => (
    <button onClick={onClick} className="w-full flex items-center bg-white p-3 rounded-xl border border-slate-200 space-x-4 transition-all duration-300 hover:shadow-lg hover:border-orange-400 hover:bg-white transform hover:-translate-y-0.5 text-left">
        <img src={service.image} alt={service.name} className="w-24 h-24 object-cover rounded-lg flex-shrink-0"/>
        <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-800">{service.name}</h3>
            <p className="text-sm text-slate-500 mt-1 line-clamp-2">{service.description}</p>
            <p className="text-sm font-semibold text-orange-600 mt-2">{service.priceRange}</p>
        </div>
    </button>
);


const AllServicesPage: React.FC<AllServicesPageProps> = ({ allServices, onBack, location, onNavigate }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(allServices.map(s => s.category))];
        return ['Semua', ...uniqueCategories];
    }, [allServices]);
    
    const [activeCategory, setActiveCategory] = useState(categories[0]);

    const filteredServices = useMemo(() => {
        return allServices
            .filter(service => activeCategory === 'Semua' || service.category === activeCategory)
            .filter(service =>
                service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                service.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
    }, [allServices, searchQuery, activeCategory]);

    if (selectedService) {
        return <ServiceDetailPage service={selectedService} onBack={() => setSelectedService(null)} location={location} onNavigate={onNavigate} />;
    }

    return (
        <div className="bg-slate-50 min-h-screen flex flex-col animate-fade-in-up">
            <header className="bg-white sticky top-0 z-20 shadow-sm pt-[env(safe-area-inset-top)]">
                <div className="h-16 flex items-center px-4 relative">
                    <button onClick={onBack} className="absolute left-2 p-2 rounded-full hover:bg-slate-100" aria-label="Back">
                        <ChevronLeftIcon className="w-6 h-6 text-slate-700" />
                    </button>
                    <h1 className="text-lg font-bold text-center w-full text-slate-800">Semua Layanan</h1>
                </div>
            </header>

            <div className="sticky top-[calc(4rem+env(safe-area-inset-top))] z-10 bg-white/80 backdrop-blur-sm border-b border-slate-200">
                <div className="p-4 pb-3">
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
                <div className="flex space-x-3 overflow-x-auto scrollbar-hide px-4 pb-3">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`flex-shrink-0 px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
                                activeCategory === category
                                ? 'bg-blue-800 text-white'
                                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <main className="flex-grow p-4 pb-36">
                {filteredServices.length > 0 ? (
                    viewMode === 'grid' ? (
                        <div className="grid grid-cols-2 gap-4">
                            {filteredServices.map(service => <ServiceGridCard key={service.id} service={service} onClick={() => setSelectedService(service)} />)}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredServices.map(service => <ServiceListCard key={service.id} service={service} onClick={() => setSelectedService(service)} />)}
                        </div>
                    )
                ) : (
                    <div className="text-center py-16">
                         <SearchIcon className="w-16 h-16 mx-auto text-slate-300" />
                         <h3 className="mt-4 text-lg font-semibold text-slate-800">Layanan Tidak Ditemukan</h3>
                         <p className="mt-1 text-slate-500">Coba gunakan kata kunci atau filter lain.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AllServicesPage;
