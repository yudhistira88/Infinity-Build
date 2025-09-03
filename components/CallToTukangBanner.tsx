
import React from 'react';
import PhoneArrowUpRightIcon from './icons/PhoneArrowUpRightIcon';

interface CallToTukangBannerProps {
    onCallClick: () => void;
}

const CallToTukangBanner: React.FC<CallToTukangBannerProps> = ({ onCallClick }) => {
    return (
        <div className="px-4 pt-4 pb-0">
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl p-4 flex items-center justify-between gap-4 shadow-lg shadow-blue-800/30">
                
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="flex-shrink-0 bg-white/20 p-3 rounded-full backdrop-blur-sm border border-white/30">
                        <PhoneArrowUpRightIcon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                        <h3 className="font-bold text-white text-md leading-tight">Cari Tukang?</h3>
                        <p className="text-sm text-blue-200">Klik Sekarang, Tukang Datang!</p>
                    </div>
                </div>

                <div className="flex-shrink-0">
                    <button 
                        onClick={onCallClick}
                        className="bg-orange-500 text-white font-bold py-2.5 px-5 rounded-lg text-sm shadow-md hover:bg-orange-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white">
                        Panggil
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CallToTukangBanner;
