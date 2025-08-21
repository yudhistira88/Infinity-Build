import React from 'react';

const BuildingIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 21V10.7846C4 10.2439 4.30139 9.75691 4.79619 9.54483L11.7962 6.14483C11.916 6.0886 12.084 6.0886 12.2038 6.14483L19.2038 9.54483C19.6986 9.75691 20 10.2439 20 10.7846V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 21H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 14V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 14V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


const SplashScreen: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-blue-900">
            <div className="text-center">
                <div className="flex justify-center animate-scale-in" style={{ animationDelay: '100ms' }}>
                   <BuildingIcon className="w-20 h-20 text-white" />
                </div>
                <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                    <h1 className="text-5xl font-extrabold text-white tracking-tight mt-4">
                        Infinity Build
                    </h1>
                    <p className="text-slate-400 mt-2 font-medium">=Membangun Tanpa Batas=</p>
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;