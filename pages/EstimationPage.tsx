
import React, { useState } from 'react';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import CalculatorIcon from '../components/icons/CalculatorIcon';

interface EstimationPageProps {
    onBack: () => void;
}

const serviceTypes = [
    'Pengecatan Dinding',
    'Pemasangan Keramik',
    'Bangun Dinding Bata',
    'Pemasangan Plafon Gypsum',
    'Instalasi Listrik per Titik',
];

const EstimationPage: React.FC<EstimationPageProps> = ({ onBack }) => {
    const [serviceType, setServiceType] = useState(serviceTypes[0]);
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [estimate, setEstimate] = useState<string | null>(null);

    const handleCalculate = () => {
        const area = Number(length) * Number(width);
        if (isNaN(area) || area <= 0) {
            setEstimate('Mohon masukkan ukuran panjang dan lebar yang valid.');
            return;
        }
        
        let costPerMeter = 35000;
        switch(serviceType) {
            case 'Pemasangan Keramik': costPerMeter = 150000; break;
            case 'Bangun Dinding Bata': costPerMeter = 250000; break;
            case 'Pemasangan Plafon Gypsum': costPerMeter = 180000; break;
            case 'Instalasi Listrik per Titik': 
                 // Calculation not based on area for this one
                setEstimate(`Estimasi biaya untuk instalasi listrik adalah sekitar Rp 125.000 per titik.`);
                return;
            default: costPerMeter = 35000; // Pengecatan
        }

        const totalCost = area * costPerMeter;
        
        const formattedCost = new Intl.NumberFormat('id-ID', { 
            style: 'currency', 
            currency: 'IDR', 
            minimumFractionDigits: 0 
        }).format(totalCost);

        setEstimate(`Estimasi biaya untuk area seluas ${area} m² adalah sekitar ${formattedCost}.`);
    };

    return (
        <div className="bg-slate-100 min-h-screen flex flex-col animate-fade-in-up">
            <header className="bg-white sticky top-0 z-10 shadow-sm pt-[env(safe-area-inset-top)]">
                <div className="h-16 flex items-center px-4 relative">
                    <button onClick={onBack} className="absolute left-2 p-2 rounded-full hover:bg-slate-100" aria-label="Back">
                        <ChevronLeftIcon className="w-6 h-6 text-slate-700" />
                    </button>
                    <h1 className="text-lg font-bold text-center w-full text-slate-800">Estimasi Biaya</h1>
                </div>
            </header>

            <main className="flex-grow p-4 space-y-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <label htmlFor="serviceType" className="font-bold text-slate-800 mb-2 block">Jenis Pengerjaan</label>
                    <select id="serviceType" value={serviceType} onChange={e => setServiceType(e.target.value)} className="w-full bg-slate-100 border-slate-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500">
                        {serviceTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <label className="font-bold text-slate-800 mb-2 block">Ukuran Area (meter)</label>
                    <div className="flex space-x-3">
                        <input type="number" value={length} onChange={e => setLength(e.target.value)} placeholder="Panjang" className="w-full bg-slate-100 border-slate-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500" />
                        <input type="number" value={width} onChange={e => setWidth(e.target.value)} placeholder="Lebar" className="w-full bg-slate-100 border-slate-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500" />
                    </div>
                     <p className="text-xs text-slate-500 mt-2">Kosongkan jika layanan tidak memerlukan ukuran (mis. Instalasi Listrik).</p>
                </div>

                {estimate && (
                    <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 rounded-r-lg shadow-sm animate-fade-in-up">
                        <h3 className="font-bold">Hasil Estimasi</h3>
                        <p className="mt-1">{estimate}</p>
                        <p className="text-xs mt-2 text-blue-600">*Harga ini adalah perkiraan dan dapat berubah tergantung pada kompleksitas dan material yang digunakan.</p>
                    </div>
                )}
            </main>
            
            <div className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto p-4 bg-white/80 backdrop-blur-sm border-t border-slate-200 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                <button onClick={handleCalculate} className="w-full bg-orange-500 text-white font-bold py-3.5 px-5 rounded-xl shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all flex items-center justify-center space-x-2">
                    <CalculatorIcon className="w-5 h-5" />
                    <span>Hitung Estimasi</span>
                </button>
            </div>
        </div>
    );
};

export default EstimationPage;
