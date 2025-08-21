import React, { useState, useRef, useEffect } from 'react';
import type { Service } from '../types';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import StarIcon from '../components/icons/StarIcon';
import ShieldCheckIcon from '../components/icons/ShieldCheckIcon';
import ShareIcon from '../components/icons/ShareIcon';
import CubeTransparentIcon from '../components/icons/CubeTransparentIcon';
import ChatAlt2Icon from '../components/icons/ChatAlt2Icon';
import LocationPinIcon from '../components/icons/LocationPinIcon';

interface ServiceDetailPageProps {
    service: Service;
    onBack: () => void;
}

const BenefitItem: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
    <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
        <div className="text-blue-800">{icon}</div>
        <p className="text-xs font-semibold text-slate-700 mt-2 leading-tight">{text}</p>
    </div>
);


const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ service, onBack }) => {
    // Mock data for provider and reviews
    const provider = {
        name: 'CV. Karya Abadi',
        avatar: 'https://i.pravatar.cc/150?img=1',
        rating: 4.9,
        reviewsCount: 132,
        isVerified: true,
    };

    const reviews = [
        { id: 1, name: 'Budi Santoso', avatar: 'https://i.pravatar.cc/150?img=2', rating: 5, comment: 'Pengerjaan sangat rapi dan tepat waktu. Komunikasi dengan tim juga lancar. Sangat direkomendasikan!' },
        { id: 2, name: 'Siti Aminah', avatar: 'https://i.pravatar.cc/150?img=4', rating: 4, comment: 'Hasilnya bagus sesuai ekspektasi, hanya saja ada sedikit keterlambatan dari jadwal yang ditentukan.' },
    ];

    const [isScrolled, setIsScrolled] = useState(false);
    const mainRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const mainEl = mainRef.current;
        if (!mainEl) return;
        
        const handleScroll = () => {
            setIsScrolled(mainEl.scrollTop > 50);
        };

        mainEl.addEventListener('scroll', handleScroll);
        return () => mainEl.removeEventListener('scroll', handleScroll);
    }, []);

    const headerClasses = isScrolled
        ? 'bg-white/80 backdrop-blur-sm shadow-sm'
        : 'bg-transparent';
    const iconButtonClasses = isScrolled
        ? 'bg-slate-100/80 text-slate-800'
        : 'bg-black/30 text-white';


    return (
        <div className="bg-slate-100 min-h-screen flex flex-col animate-fade-in-up">
             <header className={`fixed top-0 left-0 right-0 max-w-sm mx-auto z-30 transition-all duration-300 ${headerClasses}`}>
                 <div className="h-16 flex items-center justify-between px-2 pt-[env(safe-area-inset-top)]">
                    <button onClick={onBack} aria-label="Back" className={`p-2 rounded-full transition-colors duration-300 ${iconButtonClasses}`}>
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                    <h1 className={`text-lg font-bold text-slate-800 absolute left-1/2 -translate-x-1/2 transition-opacity duration-300 truncate w-2/3 text-center ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
                        {service.name}
                    </h1>
                    <button aria-label="Share" className={`p-2 rounded-full transition-colors duration-300 ${iconButtonClasses}`}>
                        <ShareIcon className="w-6 h-6" />
                    </button>
                </div>
            </header>
            
            <main ref={mainRef} className="flex-grow overflow-y-auto pb-40">
                <div className="w-full h-72 bg-slate-200">
                    <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="bg-slate-100 rounded-t-2xl -mt-5 relative z-10">
                    <div className="p-4 pt-6 space-y-6">
                        {/* Main Info */}
                        <section>
                            <span className="text-sm font-semibold text-orange-700 bg-orange-100 py-1 px-3 rounded-full">{service.category}</span>
                            <h2 className="text-3xl font-bold text-slate-900 mt-2 tracking-tight">{service.name}</h2>
                            <p className="text-xl font-semibold text-slate-700 mt-1">{service.priceRange}</p>
                        </section>
                        
                        {/* Provider */}
                        <section className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-800 mb-3">Penyedia Jasa</h3>
                            <div className="flex items-center space-x-3">
                                <img src={provider.avatar} alt={provider.name} className="w-12 h-12 rounded-full" />
                                <div className="flex-1">
                                    <div className="flex items-center space-x-1.5">
                                        <h4 className="font-semibold text-slate-800">{provider.name}</h4>
                                        {provider.isVerified && <ShieldCheckIcon className="w-5 h-5 text-blue-600" title="Penyedia Terverifikasi"/>}
                                    </div>
                                    <div className="flex items-center space-x-1 text-sm text-slate-500">
                                        <StarIcon className="w-4 h-4 text-yellow-400" />
                                        <span className="font-semibold text-slate-700">{provider.rating}</span>
                                        <span>({provider.reviewsCount} ulasan)</span>
                                    </div>
                                </div>
                                <button className="text-sm font-semibold text-blue-800 bg-blue-100 hover:bg-blue-200 py-2 px-4 rounded-lg transition-colors">
                                    Lihat Profil
                                </button>
                            </div>
                        </section>
                        
                        {/* What you get */}
                        <section>
                            <h3 className="font-bold text-slate-800 mb-3">Apa yang Anda Dapatkan</h3>
                            <div className="grid grid-cols-3 gap-3 text-center">
                                <BenefitItem icon={<ShieldCheckIcon className="w-6 h-6"/>} text="Garansi Pengerjaan"/>
                                <BenefitItem icon={<CubeTransparentIcon className="w-6 h-6"/>} text="Material Terbaik"/>
                                <BenefitItem icon={<ChatAlt2Icon className="w-6 h-6"/>} text="Konsultasi Gratis"/>
                            </div>
                        </section>

                        {/* Description */}
                        <section>
                            <h3 className="font-bold text-slate-800 mb-2">Deskripsi Layanan</h3>
                            <p className="text-slate-600 leading-relaxed">{service.description}</p>
                        </section>

                        {/* Location */}
                        <section>
                            <h3 className="font-bold text-slate-800 mb-3">Cakupan Layanan</h3>
                            <div className="flex items-start space-x-3 bg-white p-3 rounded-lg border border-slate-200">
                                <LocationPinIcon className="w-8 h-8 text-blue-600 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-slate-800">Area Jabodetabek</h4>
                                    <p className="text-sm text-slate-600">Tim kami siap melayani di seluruh wilayah Jakarta, Bogor, Depok, Tangerang, dan Bekasi.</p>
                                </div>
                            </div>
                        </section>

                        {/* Reviews */}
                        <section>
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-bold text-slate-800">Ulasan Pelanggan</h3>
                                <a href="#" className="text-sm font-semibold text-orange-600">Lihat Semua</a>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <div className="flex items-center space-x-4 border-b border-slate-100 pb-3 mb-3">
                                    <StarIcon className="w-10 h-10 text-yellow-400"/>
                                    <div>
                                        <p className="font-bold text-slate-800 text-lg">{provider.rating} dari 5 bintang</p>
                                        <p className="text-sm text-slate-600">Berdasarkan {provider.reviewsCount} ulasan</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {reviews.map(review => (
                                        <div key={review.id} className="flex items-start space-x-3 pt-3 first:pt-0">
                                            <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full" />
                                            <div>
                                                <h5 className="font-semibold text-slate-800">{review.name}</h5>
                                                <div className="flex items-center my-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <StarIcon key={i} className="w-4 h-4 text-yellow-400" filled={i < review.rating} />
                                                    ))}
                                                </div>
                                                <p className="text-sm text-slate-600">{review.comment}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto p-4 bg-white/80 backdrop-blur-sm border-t border-slate-200 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                <button className="w-full bg-orange-500 text-white font-bold py-4 px-5 rounded-xl shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                    Pesan Layanan Ini
                </button>
            </footer>
        </div>
    );
};

export default ServiceDetailPage;