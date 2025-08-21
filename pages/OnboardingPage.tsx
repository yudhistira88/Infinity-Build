import React, { useState } from 'react';

const onboardingSlides = [
    {
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop",
        title: "Temukan Profesional Terpercaya",
        description: "Jelajahi ribuan ahli konstruksi terverifikasi untuk proyek apa pun, besar atau kecil."
    },
    {
        image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=800&auto=format&fit=crop",
        title: "Estimasi Biaya Mudah",
        description: "Hitung biaya proyek dengan cepat menggunakan alat estimasi kami yang intuitif dan andal."
    },
    {
        image: "https://images.unsplash.com/photo-1572023021945-81a1b3a555a1?q=80&w=800&auto=format&fit=crop",
        title: "Lacak Proyek Anda",
        description: "Pantau kemajuan proyek Anda secara real-time, langsung dari genggaman Anda."
    }
];

interface OnboardingPageProps {
    onComplete: () => void;
}

const OnboardingPage: React.FC<OnboardingPageProps> = ({ onComplete }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleNext = () => {
        if (activeIndex < onboardingSlides.length - 1) {
            setActiveIndex(activeIndex + 1);
        } else {
            onComplete();
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col bg-white">
            <div className="relative h-[55vh] flex-shrink-0">
                {onboardingSlides.map((slide, index) => (
                    <div
                        key={index}
                        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                        style={{ opacity: activeIndex === index ? 1 : 0 }}
                    >
                        <img src={slide.image} alt={slide.title} className="w-full h-full object-cover"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    </div>
                ))}
            </div>
            
            <div className="flex-grow bg-white p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] rounded-t-3xl relative -mt-6 z-10 flex flex-col justify-between">
                <div>
                    <div className="flex justify-center mb-6 space-x-2">
                        {onboardingSlides.map((_, index) => (
                            <div
                                key={index}
                                className={`h-2 rounded-full transition-all duration-300 ${activeIndex === index ? 'w-6 bg-blue-800' : 'w-2 bg-slate-300'}`}
                            />
                        ))}
                    </div>

                    <div key={activeIndex} className="text-center animate-fade-in-up">
                         <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{onboardingSlides[activeIndex].title}</h1>
                         <p className="mt-3 text-slate-600 max-w-sm mx-auto text-base">{onboardingSlides[activeIndex].description}</p>
                    </div>
                </div>

                <div className="space-y-3 mt-8">
                     <button
                        onClick={handleNext}
                        className="w-full bg-blue-800 text-white font-bold py-4 px-5 rounded-xl shadow-lg shadow-blue-800/30 hover:bg-blue-900 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        {activeIndex === onboardingSlides.length - 1 ? 'Mulai' : 'Lanjut'}
                    </button>
                    {activeIndex < onboardingSlides.length - 1 && (
                         <button
                            onClick={onComplete}
                            className="w-full text-slate-500 font-semibold py-4 px-5 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Lewati
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OnboardingPage;