
import React, { useState, useEffect, useRef } from 'react';
import type { BannerSlide } from '../types';

const getCtaText = (promoText: BannerSlide['promoText']): string => {
    if (promoText.line1 === "UP TO" || promoText.line1 === "GET") {
        return `Klaim Diskon ${promoText.line2}`;
    }
    if (promoText.line1 === "MULAI") {
        return `Mulai Dari ${promoText.line2}`;
    }
    return "Lihat Promo";
};

interface PromoBannerProps {
    banners: BannerSlide[];
    onBannerClick: (banner: BannerSlide) => void;
}

const PromoBanner: React.FC<PromoBannerProps> = ({ banners, onBannerClick }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const timeoutRef = useRef<number | null>(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = window.setTimeout(
            () => setActiveIndex((prevIndex) =>
                prevIndex === banners.length - 1 ? 0 : prevIndex + 1
            ),
            5000
        );

        return () => {
            resetTimeout();
        };
    }, [activeIndex, banners.length]);

    return (
        <div className="px-4 py-4">
            <div className="relative rounded-xl overflow-hidden shadow-lg h-48 bg-slate-800 group">
                {banners.map((banner, index) => {
                    const isActive = activeIndex === index;
                    return (
                        <div
                            key={banner.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100' : 'opacity-0'} cursor-pointer`}
                            aria-hidden={!isActive}
                            onClick={() => onBannerClick(banner)}
                        >
                            <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-5 text-white">
                                <div className={`transition-all duration-500 ease-out ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: isActive ? '200ms' : '0ms' }}>
                                    <p className="font-medium text-sm opacity-90">{banner.subtitle}</p>
                                    <h2 className="font-bold text-2xl leading-tight mt-1">{banner.title}</h2>
                                </div>
                                <div className={`transition-all duration-500 ease-out ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: isActive ? '300ms' : '0ms' }}>
                                    <button className={`${banner.bgColor} text-white font-bold py-2 px-5 rounded-lg mt-4 text-sm shadow-lg hover:brightness-110 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white`}>
                                        {getCtaText(banner.promoText)}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
                
                {/* Pagination */}
                <div className="absolute bottom-5 right-5 flex items-center space-x-2">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`h-2 rounded-full transition-all duration-300 ease-out ${activeIndex === index ? 'w-6 bg-white' : 'w-2 bg-white/60 group-hover:bg-white/80'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PromoBanner;