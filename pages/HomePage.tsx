import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import PromoBanner from '../components/PromoBanner';
import ServiceCategories from '../components/ServiceCategories';
import PopularServices from '../components/PopularServices';
import NotificationsPanel from '../components/NotificationsPanel';
import LocationModal from '../components/LocationModal';
import PromoPage from './PromoPage';
import AllServicesPage from './AllServicesPage';
import SearchPage from './SearchPage';
import CategoryPage from './CategoryPage';
import ServiceDetailPage from './ServiceDetailPage';
import BookingPage from './BookingPage';
import type { Service, Notification, Location, BannerSlide, Order, JobType } from '../types';
import CallToTukangBanner from '../components/CallToTukangBanner';
import SurveyConfirmationModal from '../components/SurveyConfirmationModal';
import SurveyProjectDetailsPage from './SurveyProjectDetailsPage';
import SurveyLocationPage from './SurveyLocationPage';
import SurveyConfirmationPage from './SurveyConfirmationPage';
import PaymentPage from './PaymentPage';
import { allServicesData, popularServicesData } from '../data/services';

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
    { id: '1', name: 'Rumah M. Zidni Arkan', address: 'Komplek Departemen Agama, Pabuaran, Kec. Bojong Gede, Kab. Bogor, Jawa Barat' },
    { id: '2', name: 'Kantor Ayah', address: 'Menara Sudirman Lt. 12, Jakarta Selatan' },
];

interface HomePageProps {
    onNavigate: (page: string) => void;
    setBottomNavVisible: (visible: boolean) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, setBottomNavVisible }) => {
    const [view, setView] = useState<'main' | 'promo' | 'allServices' | 'search' | 'category' | 'serviceDetail' | 'surveyProjectDetails' | 'surveyLocation' | 'surveyConfirmation' | 'payment' | 'surveyPromo' | 'booking'>('main');
    const [selectedPromo, setSelectedPromo] = useState<BannerSlide | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [surveyData, setSurveyData] = useState<any>({});
    const [initialCategoryGroup, setInitialCategoryGroup] = useState('');

    const [isNotificationsOpen, setNotificationsOpen] = useState(false);
    const [isLocationModalOpen, setLocationModalOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>(initialNotificationsData);
    const [locations, setLocations] = useState<Location[]>(initialLocations);
    const [selectedLocationId, setSelectedLocationId] = useState<string>('1');

    const [isBookingSurveyModalOpen, setIsBookingSurveyModalOpen] = useState(false);
    const [pendingJob, setPendingJob] = useState<JobType | null>(null);

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
    
    const handlePanggilTukangClick = () => {
        setInitialCategoryGroup('Panggil Tukang');
        setView('allServices');
    };

    const handleBackFromPromo = () => {
        setView('main');
        setSelectedPromo(null);
    };
    
    const handleShowPopularServices = () => {
        setInitialCategoryGroup('Populer');
        setView('allServices');
    };

    const handleBackFromAllServices = () => {
        setView('main');
    };
    
    const handleSearchClick = () => {
        setView('search');
    };

    const handleCategoryClickFromHome = (categoryName: string) => {
        setInitialCategoryGroup(categoryName);
        setView('allServices');
    };

    const categoriesRequiringSurveyInfo = [
        "Desain Konstruksi",
        "Bangun / Renovasi",
        "Repair Maintenance",
        "Pabrikasi",
        "Interior / Eksterior",
        "Panggil Tukang",
    ];

    const handleServiceSelected = (job: JobType) => {
        if (categoriesRequiringSurveyInfo.includes(job.categoryLink)) {
            setSurveyData({
                jobTypeName: job.name,
                categoryGroupName: job.categoryLink,
                location: selectedLocation,
                jobImage: job.image,
                jobDescription: job.description,
            });
            setView('surveyProjectDetails');
        } else {
            setSelectedCategory(job.categoryLink);
            setView('category');
        }
    };
    
    const handleNextFromProjectDetails = (data: any) => {
        setSurveyData(prev => ({ ...prev, ...data }));
        setView('surveyLocation');
    };

    const handleBackFromProjectDetails = () => {
        setView('allServices');
        setSurveyData({});
    };

    const handleNextFromLocation = (data: any) => {
        const finalSurveyData = { ...surveyData, ...data };
        setSurveyData(finalSurveyData);
        setView('surveyConfirmation');
    };

    const handleBackFromLocation = () => {
        setView('surveyProjectDetails');
    };

    const handleBackFromSurveyConfirmation = () => {
        setView('surveyLocation');
    };

    const handleConfirmSurveyPayment = () => {
        console.log("Final Survey Data for Payment:", surveyData);
        setView('payment');
    };

    const handleGoToSurveyPromo = () => {
        setView('surveyPromo');
    };
    
    const handleSelectSurveyPromo = (promo: BannerSlide) => {
        let discountAmount = 0;
        const surveyCost = 200000;
        
        if (promo.promoText.line1 === "GET" && promo.promoText.line2.includes('%')) {
            const percentage = parseInt(promo.promoText.line2.replace('%', ''));
            if (!isNaN(percentage)) {
                discountAmount = surveyCost * (percentage / 100);
            }
        }
    
        setSurveyData((prev: any) => ({
            ...prev,
            promo: {
                name: promo.title,
                discountAmount: discountAmount,
            },
        }));
        setView('surveyConfirmation');
    };


    const handlePaymentSuccess = () => {
        alert("Pembayaran berhasil! Pesanan Anda sedang diproses.");
        const newOrder: Order = {
            id: `JBS-2407${String(Math.random()).slice(2, 7)}`, 
            serviceName: surveyData.jobTypeName || 'Survey Lokasi',
            date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
            status: 'In Progress',
            provider: { name: 'Tim Survey Jasaqu', avatar: 'https://i.pravatar.cc/150?img=1' },
            timeline: [
                { title: 'Pesanan Dibuat', date: new Date().toLocaleDateString('id-ID'), status: 'completed' },
                { title: 'Pembayaran Dikonfirmasi', date: new Date().toLocaleDateString('id-ID'), status: 'completed' },
                { title: 'Survey Dijadwalkan', date: surveyData.tanggal, status: 'in_progress' },
                { title: 'Survey Selesai', date: 'Menunggu', status: 'pending' },
            ],
            costDetails: { service: 100000, total: surveyData.promo ? 200000 - surveyData.promo.discountAmount : 200000 }
        };

        sessionStorage.setItem('newlyCreatedOrder', JSON.stringify(newOrder));
        
        setView('main');
        setSurveyData({});
        onNavigate('Pesanan');
    };
    
    const handleUpdateSurveyLocation = (locationId: string) => {
        const newLocation = locations.find(loc => loc.id === locationId);
        if (newLocation) {
            setSurveyData(prev => ({
                ...prev,
                location: newLocation,
                locationId: newLocation.id,
                detailAlamat: newLocation.address,
            }));
        }
    };

    const handleAddNewLocation = ({ name, address }: { name: string; address: string }) => {
        const newLocation: Location = {
            id: new Date().getTime().toString(),
            name,
            address,
        };
        setLocations(prev => [...prev, newLocation]);
        setSelectedLocationId(newLocation.id);
        setLocationModalOpen(false);
    };

    const handleAddAndSetSurveyLocation = ({ name, address }: { name: string; address: string }) => {
        const newLocation: Location = {
            id: new Date().getTime().toString(),
            name,
            address,
        };
        setLocations(prev => [...prev, newLocation]);
        setSurveyData((prev: any) => ({
            ...prev,
            location: newLocation,
            locationId: newLocation.id,
            detailAlamat: newLocation.address,
        }));
    };

    const handleBackFromCategory = () => {
        setView('allServices');
        setSelectedCategory(null);
    };

    const handleServiceSelect = (service: Service) => {
        const job: JobType = {
            name: service.name,
            image: service.image,
            categoryLink: service.category,
            description: service.description || `Layanan dalam kategori ${service.category}.`
        };

        if (categoriesRequiringSurveyInfo.includes(job.categoryLink)) {
            setPendingJob(job);
            setIsBookingSurveyModalOpen(true);
        } else {
            setSelectedCategory(job.categoryLink);
            setView('category');
        }
    };

    const handleMarkAllAsRead = () => {
        setNotifications(currentNotifications =>
            currentNotifications.map(n => ({ ...n, read: true }))
        );
    };

    const handleNotificationClick = (notification: Notification) => {
        setNotifications(currentNotifications =>
            currentNotifications.map(n =>
                n.id === notification.id ? { ...n, read: true } : n
            )
        );
        if (notification.linkPath) {
            onNavigate(notification.linkPath);
        }
        setNotificationsOpen(false);
    };

    const handleLocationSelect = (id: string) => {
        setSelectedLocationId(id);
        setLocationModalOpen(false);
    };
    
    if (view === 'booking' && selectedService) {
        return <BookingPage 
            service={selectedService} 
            location={selectedLocation} 
            onBack={() => { setView('main'); setSelectedService(null); }} 
            onBookingConfirmed={() => {
                setView('main');
                setSelectedService(null);
                onNavigate('Pesanan');
            }} 
        />;
    }

    if (view === 'payment') {
        return <PaymentPage 
            surveyData={surveyData}
            onBack={() => setView('surveyConfirmation')}
            onPaymentSuccess={handlePaymentSuccess}
        />
    }

    if (view === 'surveyProjectDetails') {
        return <SurveyProjectDetailsPage 
            jobTypeName={surveyData.jobTypeName}
            categoryGroupName={surveyData.categoryGroupName}
            jobImage={surveyData.jobImage}
            jobDescription={surveyData.jobDescription}
            onBack={handleBackFromProjectDetails}
            onNext={handleNextFromProjectDetails}
            initialData={surveyData}
        />
    }

    if (view === 'surveyLocation') {
        return <SurveyLocationPage
            categoryName={surveyData.categoryGroupName}
            onBack={handleBackFromLocation}
            onNext={handleNextFromLocation}
            initialData={surveyData}
            availableLocations={locations}
            onLocationUpdate={handleUpdateSurveyLocation}
            onAddNewLocation={handleAddAndSetSurveyLocation}
        />
    }

    if (view === 'surveyConfirmation') {
        return <SurveyConfirmationPage 
            surveyData={surveyData}
            onBack={handleBackFromSurveyConfirmation}
            onNext={handleConfirmSurveyPayment}
            onSelectPromo={handleGoToSurveyPromo}
        />
    }
    
    if (view === 'surveyPromo') {
        const surveyPromos: BannerSlide[] = [
             {
                id: 'promo-survey-50',
                image: 'https://images.unsplash.com/photo-1556912173-35f353986513?q=80&w=800&auto=format&fit=crop',
                bgColor: "bg-green-500",
                title: "Promo Survey 50%",
                subtitle: "Diskon Khusus Survey",
                promoText: { line1: "GET", line2: "50%", line3: "DISCOUNT"},
                validUntil: "31 Des 2024",
                terms: ["Hanya berlaku untuk biaya survey.", "Tidak dapat digabung dengan promo lain."]
            },
            ...bannersData,
        ];

        return <PromoPage 
            promo={surveyPromos[0]}
            allPromos={surveyPromos}
            onBack={() => setView('surveyConfirmation')}
            onUsePromo={handleSelectSurveyPromo}
        />;
    }


    if (view === 'serviceDetail' && selectedService) {
        return <ServiceDetailPage service={selectedService} onBack={() => {
            setView(selectedCategory ? 'category' : 'main'); // Smarter back navigation
            setSelectedService(null);
        }} location={selectedLocation} onNavigate={onNavigate} />;
    }

    if (view === 'category' && selectedCategory) {
        const categoryServices = allServicesData.filter(s => s.category === selectedCategory);
        return <CategoryPage 
            categoryName={selectedCategory} 
            services={categoryServices} 
            onBack={handleBackFromCategory}
            location={selectedLocation}
            onNavigate={onNavigate}
        />;
    }
    
    if (view === 'promo' && selectedPromo) {
        return <PromoPage promo={selectedPromo} allPromos={bannersData} onBack={handleBackFromPromo} />;
    }
    
    if (view === 'search') {
        return <SearchPage allServices={allServicesData} onBack={() => setView('main')} location={selectedLocation} onNavigate={onNavigate} />;
    }
    
    const isModalOpen = isNotificationsOpen || isLocationModalOpen || view === 'allServices' || isBookingSurveyModalOpen;

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
                <div className={`${isModalOpen ? 'blur-sm pointer-events-none' : ''} transition-all duration-300`}>
                    <>
                        <PromoBanner banners={bannersData} onBannerClick={handleBannerClick} />
                        <ServiceCategories onCategorySelect={handleCategoryClickFromHome} />
                        <CallToTukangBanner onCallClick={handlePanggilTukangClick} />
                        <PopularServices services={popularServicesData} onServiceClick={handleServiceSelect} onViewAllClick={handleShowPopularServices} />
                    </>
                </div>
            </main>
            
            {view === 'allServices' && <AllServicesPage onBack={() => setView('main')} onServiceSelect={handleServiceSelected} initialCategoryGroupName={initialCategoryGroup} />}

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
            
            {isBookingSurveyModalOpen && (
                <SurveyConfirmationModal 
                    isOpen={isBookingSurveyModalOpen}
                    onConfirm={() => {
                        setIsBookingSurveyModalOpen(false);
                        if (pendingJob) {
                            handleServiceSelected(pendingJob);
                            setPendingJob(null);
                        }
                    }}
                    onCancel={() => {
                        setIsBookingSurveyModalOpen(false);
                        setPendingJob(null);
                    }}
                />
            )}
        </div>
    );
};

export default HomePage;