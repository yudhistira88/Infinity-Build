import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import PromoBanner from '../components/PromoBanner';
import ServiceCategories from '../components/ServiceCategories';
import PopularServices from '../components/PopularServices';
import NotificationsPanel from '../components/NotificationsPanel';
import LocationModal from '../components/LocationModal';
import PromoPage from './PromoPage';
import AllServicesPage from './AllServicesPage';
import CallTukangPage from './CallTukangPage';
import SearchPage from './SearchPage';
import CategoryPage from './CategoryPage';
import ServiceDetailPage from './ServiceDetailPage';
import type { Service, Notification, Location, BannerSlide } from '../types';
import CallToTukangBanner from '../components/CallToTukangBanner';
import PopularServicesPage from './PopularServicesPage';

const allServicesData: Service[] = [
    // Desain Konstruksi
    { id: 'dsn-01', name: 'Jasa Desain 2D Lengkap', priceRange: 'Rp200K - Rp2JT', image: 'https://picsum.photos/seed/desain2d/200/200', category: 'Desain Konstruksi', description: 'Rancangan 2D komprehensif untuk denah, tampak, dan potongan bangunan Anda.' },
    { id: 'dsn-02', name: 'Desain 3D Visual & Rendering', priceRange: 'Rp1JT - Rp5JT', image: 'https://picsum.photos/seed/desain3d/200/200', category: 'Desain Konstruksi', description: 'Visualisasi 3D fotorealistik untuk melihat hasil akhir proyek sebelum dibangun.' },
    { id: 'dsn-03', name: 'Perencanaan Anggaran Biaya', priceRange: 'Rp500K - Rp3JT', image: 'https://picsum.photos/seed/rab/200/200', category: 'Desain Konstruksi', description: 'Perhitungan Rencana Anggaran Biaya (RAB) yang detail dan akurat.' },

    // Bangun & Renovasi
    { id: 'bgn-01', name: 'Jasa Renovasi Rumah', priceRange: 'Rp2JT - Rp5JT', image: 'https://picsum.photos/seed/renovasi/200/200', category: 'Bangun & Renovasi', description: 'Perbarui dan perbaiki bagian rumah Anda sesuai keinginan dan kebutuhan.' },
    { id: 'bgn-02', name: 'Bangun Rumah dari Nol', priceRange: 'Hubungi kami', image: 'https://picsum.photos/seed/bangun/200/200', category: 'Bangun & Renovasi', description: 'Wujudkan rumah impian Anda dari tahap desain hingga serah terima kunci.' },
    { id: 'bgn-03', name: 'Tambah Tingkat/Lantai', priceRange: 'Hubungi kami', image: 'https://picsum.photos/seed/tingkat/200/200', category: 'Bangun & Renovasi', description: 'Menambah lantai bangunan untuk ruang ekstra bagi keluarga atau bisnis.' },
    { id: 'bgn-04', name: 'Jasa Pembuatan Canopy', priceRange: 'Rp200K - Rp2JT', image: 'https://picsum.photos/seed/canopy/200/200', category: 'Bangun & Renovasi', description: 'Pemasangan kanopi berkualitas untuk melindungi carport atau teras Anda.' },

    // Perbaikan
    { id: 'prb-01', name: 'Perbaikan Atap Bocor', priceRange: 'Rp250K - Rp1JT', image: 'https://picsum.photos/seed/atap/200/200', category: 'Perbaikan', description: 'Solusi cepat dan tuntas untuk masalah atap bocor di rumah atau gedung.' },
    { id: 'prb-02', name: 'Perbaikan Dinding Retak', priceRange: 'Rp150K - Rp800K', image: 'https://picsum.photos/seed/dinding/200/200', category: 'Perbaikan', description: 'Memperbaiki retak pada dinding agar kembali mulus dan kokoh.' },
    { id: 'prb-03', name: 'Saluran Air Mampet', priceRange: 'Rp200K - Rp700K', image: 'https://picsum.photos/seed/saluran/200/200', category: 'Perbaikan', description: 'Mengatasi masalah saluran air tersumbat di kamar mandi, dapur, atau wastafel.' },
    
    // Tukang Harian
    { id: 'tkg-01', name: 'Tukang Harian (Borongan)', priceRange: 'Rp150K/hari', image: 'https://picsum.photos/seed/tukang/200/200', category: 'Tukang Harian', description: 'Penyediaan tukang terampil untuk pekerjaan konstruksi skala kecil harian.' },

    // Pengecatan
    { id: 'cat-01', name: 'Jasa Pengecatan Dinding', priceRange: 'Rp30K/m²', image: 'https://picsum.photos/seed/catdinding/200/200', category: 'Pengecatan', description: 'Pengecatan interior dan eksterior dengan hasil rapi dan tahan lama.' },
    { id: 'cat-02', name: 'Jasa Pengecatan Pagar', priceRange: 'Rp200K - Rp1JT', image: 'https://picsum.photos/seed/pagar/200/200', category: 'Pengecatan', description: 'Memberikan lapisan cat baru untuk melindungi dan memperindah pagar Anda.' },

    // Listrik
    { id: 'lis-01', name: 'Instalasi Listrik Rumah', priceRange: 'Rp300K - Rp1.5JT', image: 'https://picsum.photos/seed/listrik/200/200', category: 'Listrik', description: 'Pemasangan instalasi listrik baru yang aman dan sesuai standar.' },
    { id: 'lis-02', name: 'Perbaikan Konsleting', priceRange: 'Rp200K - Rp800K', image: 'https://picsum.photos/seed/konslet/200/200', category: 'Listrik', description: 'Penanganan cepat masalah korsleting listrik untuk keamanan properti Anda.' },
];

const popularServicesData: Service[] = allServicesData.filter(s => ['bgn-01', 'dsn-01', 'bgn-04', 'cat-02', 'lis-01', 'prb-01'].includes(s.id));

const bannersData: BannerSlide[] = [
    {
        id: 'promo1',
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop",
        bgColor: "bg-orange-500",
        title: "MODERN DECOR",
        subtitle: "Interior Home Design",
        promoText: { line1: "UP TO", line2: "50%", line3: "OFF" },
        validUntil: "31 Agu 2024",
        terms: [
            "Berlaku untuk layanan desain interior.",
            "Minimal transaksi Rp 5.000.000.",
            "Tidak dapat digabung dengan promo lain.",
            "Hanya untuk 100 pelanggan pertama.",
        ]
    },
    {
        id: 'promo2',
        image: "https://images.unsplash.com/photo-1542632230-5e5108b49021?q=80&w=600&auto=format&fit=crop",
        bgColor: "bg-blue-800",
        title: "GARDEN OASIS",
        subtitle: "Landscaping Services",
        promoText: { line1: "MULAI", line2: "Rp2JT", line3: "" },
        validUntil: "15 Sep 2024",
        terms: [
            "Harga mulai untuk lahan seluas 50m².",
            "Termasuk konsultasi dan desain awal.",
            "Biaya material dan tanaman tidak termasuk.",
        ]
    },
    {
        id: 'promo3',
        image: "https://images.unsplash.com/photo-1596205252519-222473130368?q=80&w=600&auto=format&fit=crop",
        bgColor: "bg-orange-600",
        title: "KITCHEN REMODEL",
        subtitle: "Renovation Experts",
        promoText: { line1: "GET", line2: "15%", line3: "DISCOUNT" },
        validUntil: "31 Agu 2024",
        terms: [
            "Diskon berlaku untuk total biaya jasa.",
            "Minimal pengerjaan 2 minggu.",
            "Berlaku untuk area Jabodetabek.",
        ]
    },
];

const initialNotificationsData: Notification[] = [
    { id: '1', title: 'Pesanan Selesai', description: 'Pesanan JBS-240721-005 telah diselesaikan.', timestamp: '2 jam lalu', iconType: 'order', read: false, linkPath: 'Pesanan' },
    { id: '2', title: 'Promo Spesial Untukmu!', description: 'Diskon 30% untuk jasa pengecatan. Klaim!', timestamp: '1 hari lalu', iconType: 'promo', read: false },
    { id: '3', title: 'Akun Terverifikasi', description: 'Selamat! Akun Anda telah berhasil diverifikasi.', timestamp: '3 hari lalu', iconType: 'account', read: true, linkPath: 'Profil' },
];

const initialLocations: Location[] = [
    { id: '1', name: 'Rumah M. Zidni Arkan', address: 'Jl. Cendrawasih No. 42, Kab. Bekasi' },
    { id: '2', name: 'Kantor Ayah', address: 'Menara Sudirman Lt. 12, Jakarta Selatan' },
];

interface HomePageProps {
    onNavigate: (page: string) => void;
    setBottomNavVisible: (visible: boolean) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, setBottomNavVisible }) => {
    const [view, setView] = useState<'main' | 'promo' | 'allServices' | 'callTukang' | 'search' | 'category' | 'serviceDetail' | 'popularServices'>('main');
    const [selectedPromo, setSelectedPromo] = useState<BannerSlide | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const [isNotificationsOpen, setNotificationsOpen] = useState(false);
    const [isLocationModalOpen, setLocationModalOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>(initialNotificationsData);
    const [locations, setLocations] = useState<Location[]>(initialLocations);
    const [selectedLocationId, setSelectedLocationId] = useState<string>('1');

    useEffect(() => {
        const isMainView = view === 'main';
        setBottomNavVisible(isMainView);
    }, [view, setBottomNavVisible]);

    const selectedLocation = locations.find(loc => loc.id === selectedLocationId) || locations[0];
    const addressParts = selectedLocation.address.split(',').map(s => s.trim());
    const locationCity = addressParts.length > 1 ? addressParts[addressParts.length - 1] : '';

    const hasUnreadNotifications = notifications.some(n => !n.read);

    const handleBannerClick = (banner: BannerSlide) => {
        setSelectedPromo(banner);
        setView('promo');
    };
    
    const handleCallTukangClick = () => {
        setView('callTukang');
    };
    
    const handleBackFromCallTukang = () => {
        setView('main');
    };

    const handleBackFromPromo = () => {
        setView('main');
        setSelectedPromo(null);
    };
    
    const handleShowAllServices = () => {
        setView('allServices');
    };
    
    const handleShowPopularServices = () => {
        setView('popularServices');
    };

    const handleBackFromAllServices = () => {
        setView('main');
    };
    
    const handleBackFromPopularServices = () => {
        setView('main');
    };

    const handleSearchClick = () => {
        setView('search');
    };

    const handleCategorySelect = (categoryName: string) => {
        setSelectedCategory(categoryName);
        setView('category');
    };

    const handleBackFromCategory = () => {
        setView('main');
        setSelectedCategory(null);
    };

    const handleServiceSelect = (service: Service) => {
        setSelectedService(service);
        setView('serviceDetail');
    };

    const handleBackFromServiceDetail = () => {
        // Instead of going straight to main, go back to the previous view if possible
        const previousView = selectedCategory ? 'category' : (view === 'allServices' ? 'allServices' : 'main');
        if (view === 'serviceDetail') { // This logic can be expanded
             setView(previousView)
        } else {
             setView('main');
        }
        setSelectedService(null);
    };

    const handleMarkAsRead = (id: string) => {
        setNotifications(currentNotifications =>
            currentNotifications.map(n => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const handleMarkAllAsRead = () => {
        setNotifications(currentNotifications =>
            currentNotifications.map(n => ({ ...n, read: true }))
        );
    };

    const handleNotificationClick = (notification: Notification) => {
        if (!notification.read) {
            handleMarkAsRead(notification.id);
        }
        if (notification.linkPath) {
            onNavigate(notification.linkPath);
        }
        setNotificationsOpen(false);
    };
    
    const handleLocationSelect = (id: string) => {
        setSelectedLocationId(id);
        setLocationModalOpen(false);
    };

    const handleAddNewLocation = ({ name, address }: { name: string; address: string }) => {
        const newLocation: Location = {
            id: new Date().getTime().toString(),
            name,
            address,
        };
        const newLocations = [...locations, newLocation];
        setLocations(newLocations);
        setSelectedLocationId(newLocation.id);
        setLocationModalOpen(false);
    };

    if (view === 'serviceDetail' && selectedService) {
        return <ServiceDetailPage service={selectedService} onBack={() => {
            setView(selectedCategory ? 'category' : 'main'); // Smarter back navigation
            setSelectedService(null);
        }} />;
    }

    if (view === 'category' && selectedCategory) {
        const categoryServices = allServicesData.filter(s => s.category === selectedCategory);
        return <CategoryPage 
            categoryName={selectedCategory} 
            services={categoryServices} 
            onBack={handleBackFromCategory} 
        />;
    }
    
    if (view === 'popularServices') {
        return <PopularServicesPage services={popularServicesData} onBack={handleBackFromPopularServices} />;
    }

    if (view === 'promo' && selectedPromo) {
        return <PromoPage promo={selectedPromo} allPromos={bannersData} onBack={handleBackFromPromo} />;
    }
    
    if (view === 'allServices') {
        return <AllServicesPage allServices={allServicesData} onBack={handleBackFromAllServices} />;
    }
    
    if (view === 'callTukang') {
        return <CallTukangPage onBack={handleBackFromCallTukang} initialLocation={selectedLocation} />;
    }

    if (view === 'search') {
        return <SearchPage allServices={allServicesData} onBack={() => setView('main')} />;
    }

    return (
        <div className="relative flex flex-col h-screen">
            <Header
                locationName={selectedLocation.name}
                locationCity={locationCity}
                onSearchClick={handleSearchClick}
                onNotificationClick={() => setNotificationsOpen(true)}
                onLocationClick={() => setLocationModalOpen(true)}
                hasUnreadNotifications={hasUnreadNotifications}
            />
            
            <main className="flex-grow overflow-y-auto scrollbar-hide pb-[calc(5rem+env(safe-area-inset-bottom))]">
                <div className={`${(isNotificationsOpen || isLocationModalOpen) ? 'blur-sm pointer-events-none' : ''} transition-all duration-300`}>
                    <>
                        <PromoBanner banners={bannersData} onBannerClick={handleBannerClick} />
                        <ServiceCategories onShowAllServices={handleShowAllServices} onCategorySelect={handleCategorySelect} />
                        <CallToTukangBanner onCallClick={handleCallTukangClick} />
                        <PopularServices services={popularServicesData} onServiceClick={handleServiceSelect} onViewAllClick={handleShowPopularServices} />
                    </>
                </div>
            </main>
            
            {isNotificationsOpen && (
                <NotificationsPanel
                    notifications={notifications}
                    onClose={() => setNotificationsOpen(false)}
                    onMarkAllAsRead={handleMarkAllAsRead}
                    onNotificationClick={handleNotificationClick}
                />
            )}
            {isLocationModalOpen && <LocationModal 
                    onClose={() => setLocationModalOpen(false)}
                    locations={locations}
                    selectedLocationId={selectedLocationId}
                    onLocationSelect={handleLocationSelect}
                    onAddNewLocation={handleAddNewLocation}
                />}
        </div>
    );
};

export default HomePage;