
import React, { useState } from 'react';
import type { BannerSlide } from '../types';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';

interface PromoPageProps {
  promo: BannerSlide;
  allPromos: BannerSlide[];
  onBack: () => void;
}

const PromoPage: React.FC<PromoPageProps> = ({ promo, allPromos, onBack }) => {
  const [activeTab, setActiveTab] = useState<'detail' | 'all'>('detail');
  const [currentPromo, setCurrentPromo] = useState<BannerSlide>(promo);

  const handleSelectPromo = (selected: BannerSlide) => {
    setCurrentPromo(selected);
    setActiveTab('detail');
  };

  const renderDetail = () => (
    <div className="animate-fade-in-up">
      <div className="p-4">
        <img src={currentPromo.image} alt={currentPromo.title} className="w-full h-48 object-cover rounded-xl shadow-lg" />
      </div>
      <div className="px-5 pt-2 pb-5">
        <p className="text-sm font-semibold text-orange-600">{currentPromo.subtitle}</p>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight leading-tight mt-1">{currentPromo.title}</h2>
      </div>

      <div className="px-5 space-y-6">
        <div>
          <h3 className="text-sm font-bold uppercase text-slate-500 tracking-wider pb-2 border-b border-slate-200">Masa Berlaku</h3>
          <p className="text-slate-700 text-md mt-3">Promo berlaku sampai <span className="font-semibold text-slate-800">{currentPromo.validUntil}</span>.</p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase text-slate-500 tracking-wider pb-2 border-b border-slate-200">Syarat & Ketentuan</h3>
          <ul className="list-disc list-outside space-y-2.5 text-slate-700 text-md pl-5 mt-3">
            {currentPromo.terms.map((term, index) => <li key={index} className="pl-1">{term}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );

  const renderAllPromos = () => (
    <div className="p-4 space-y-3 animate-fade-in-up">
      {allPromos.map(p => (
        <button key={p.id} onClick={() => handleSelectPromo(p)} className="w-full flex items-center space-x-4 bg-white p-3 rounded-xl border border-slate-200 hover:border-orange-300 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400">
          <img src={p.image} alt={p.title} className="w-28 h-20 object-cover rounded-lg flex-shrink-0" />
          <div className="text-left flex-1 min-w-0">
             <p className="text-xs font-semibold text-orange-600 truncate">{p.subtitle}</p>
             <h3 className="font-bold text-slate-800 truncate mt-0.5">{p.title}</h3>
             <p className="text-sm text-slate-500 mt-1.5">
               Berlaku s/d <span className="font-medium text-slate-700">{p.validUntil}</span>
             </p>
          </div>
        </button>
      ))}
    </div>
  );
  
  return (
    <div className="bg-slate-100 min-h-screen flex flex-col">
      <header className="bg-white sticky top-0 z-10 shadow-sm pt-[env(safe-area-inset-top)]">
        <div className="h-16 flex items-center px-4 relative">
            <button onClick={onBack} className="absolute left-2 p-2 rounded-full hover:bg-slate-100" aria-label="Back">
                <ChevronLeftIcon className="w-6 h-6 text-slate-700"/>
            </button>
            <h1 className="text-lg font-bold text-center w-full text-slate-800">
              {activeTab === 'detail' ? 'Detail Promo' : 'Semua Promo'}
            </h1>
        </div>
         <div className="flex justify-around border-b">
            {[{id: 'detail', label: 'Detail'}, {id: 'all', label: 'Semua Promo'}].map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'detail' | 'all')}
                    className={`w-full py-3 text-sm font-semibold transition-colors duration-200 ${activeTab === tab.id ? 'text-orange-600 border-b-2 border-orange-600' : 'text-slate-500'}`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
      </header>
      
      <main className="flex-grow pb-28">
        {activeTab === 'detail' ? renderDetail() : renderAllPromos()}
      </main>

       <div className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto p-4 bg-white/80 backdrop-blur-sm border-t border-slate-200 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 px-5 rounded-xl shadow-lg shadow-orange-600/30 hover:shadow-xl hover:brightness-110 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
              Gunakan Promo Ini
          </button>
        </div>
    </div>
  );
};

export default PromoPage;