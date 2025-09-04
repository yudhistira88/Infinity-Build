

import React, { useState } from 'react';
import SurveyStepper from '../components/SurveyStepper';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import LocationPinIcon from '../components/icons/LocationPinIcon';
import ChevronRightIcon from '../components/icons/ChevronRightIcon';
import PercentageIcon from '../components/icons/PercentageIcon';
import Squares2x2Icon from '../components/icons/Squares2x2Icon';
import OrderConfirmationPromptModal from '../components/OrderConfirmationPromptModal';

interface SurveyConfirmationPageProps {
    surveyData: any;
    onBack: () => void;
    onNext: () => void;
    onSelectPromo: () => void;
}

const SurveyConfirmationPage: React.FC<SurveyConfirmationPageProps> = ({ surveyData, onBack, onNext, onSelectPromo }) => {
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

    const baseSurveyCost = 200000;
    const totalSurveyCost = surveyData.totalCost || baseSurveyCost;
    const surcharge = totalSurveyCost - baseSurveyCost;
    const discount = surveyData.promo?.discountAmount || 0;
    const total = totalSurveyCost - discount;


    const formatDate = (dateString: string, timeSlot: string) => {
        if (!dateString || !timeSlot) return "Jadwal belum diatur";
        const date = new Date(dateString + 'T00:00:00');
        const time = timeSlot;
        
        const formattedDate = date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        
        return `${time}, ${formattedDate}`;
    };
    
    const getLuas = () => {
        if (surveyData.jobType === 'Bangun') {
            return surveyData.luasBangunan || surveyData.luasTanah || 'N/A';
        }
        return surveyData.estimasiLuas || 'N/A';
    };

    const getInfo = () => {
        if (surveyData.jobType === 'Bangun') {
            return surveyData.infoTambahan || 'Bangun rumah';
        }
        return surveyData.detailPekerjaan || 'Renovasi';
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    return (
        <>
            <div className={`bg-slate-100 h-screen flex flex-col animate-fade-in-up transition-all duration-300 ${isConfirmModalOpen ? 'blur-sm pointer-events-none' : ''}`}>
                <header className="flex-shrink-0 bg-white z-20 shadow-sm pt-[env(safe-area-inset-top)]">
                    <div className="h-16 flex items-center px-2 relative">
                        <button onClick={onBack} className="absolute left-2 p-2 rounded-full hover:bg-slate-100" aria-label="Back">
                            <ChevronLeftIcon className="w-6 h-6 text-slate-700" />
                        </button>
                        <h1 className="text-lg font-bold text-slate-800 text-center w-full">Konfirmasi Pesanan</h1>
                    </div>
                </header>

                <main className="flex-grow overflow-y-auto scrollbar-hide">
                    <SurveyStepper currentStep="pesan" />

                    <div className="p-4 space-y-4">
                        {/* Alamat */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                            <h2 className="font-bold text-slate-800 mb-3">Lokasi</h2>
                            <div className="w-full text-left flex items-start space-x-3">
                                <LocationPinIcon className="w-6 h-6 text-blue-800 mt-1 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-slate-800">{surveyData.location.name}</p>
                                    <p className="text-sm text-slate-500 line-clamp-2">{surveyData.location.address}</p>
                                </div>
                            </div>
                        </div>

                        {/* Informasi Pesanan */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                            <h2 className="font-bold text-slate-800 mb-4">Informasi Pesanan</h2>
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="w-14 h-14 bg-cyan-100 rounded-lg flex items-center justify-center">
                                <Squares2x2Icon className="w-7 h-7 text-cyan-600" />
                                </div>
                                <div>
                                    <p className="font-bold text-xl text-slate-800">{surveyData.categoryName}</p>
                                    <p className="text-md text-slate-500">{surveyData.jobType}</p>
                                </div>
                            </div>
                            <div className="space-y-3.5 text-sm border-t border-slate-100 pt-4">
                                <div className="flex justify-between"><span className="text-slate-500">Jadwal Kunjungan</span><span className="font-semibold text-blue-800">{formatDate(surveyData.tanggal, surveyData.waktu)}</span></div>
                                <div className="flex justify-between"><span className="text-slate-500">Jenis Properti</span><span className="font-semibold text-slate-800">{surveyData.jenisProperti}</span></div>
                                
                                {surveyData.jobType === 'Bangun' ? (
                                    <>
                                        {surveyData.jumlahLantai && <div className="flex justify-between"><span className="text-slate-500">Jumlah Lantai</span><span className="font-semibold text-slate-800">{surveyData.jumlahLantai}</span></div>}
                                        <div className="flex justify-between"><span className="text-slate-500">Luas</span><span className="font-semibold text-slate-800">{getLuas()} m²</span></div>
                                    </>
                                ) : (
                                    <>
                                        {surveyData.ruanganDirenovasi && <div className="flex justify-between"><span className="text-slate-500">Ruangan</span><span className="font-semibold text-slate-800">{surveyData.ruanganDirenovasi}</span></div>}
                                        {surveyData.estimasiLuas && <div className="flex justify-between"><span className="text-slate-500">Estimasi Luas</span><span className="font-semibold text-slate-800">{getLuas()} m²</span></div>}
                                    </>
                                )}
                                
                                <div className="flex justify-between items-start"><span className="text-slate-500 flex-shrink-0">Informasi</span><span className="font-semibold text-slate-800 text-right w-1/2 break-words">{getInfo()}</span></div>
                            </div>
                        </div>

                        {/* Promo */}
                        <button onClick={onSelectPromo} className="w-full text-left bg-white p-3 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center group">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-blue-800 text-white rounded-full flex items-center justify-center">
                                    <PercentageIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-bold text-blue-800">{surveyData.promo ? surveyData.promo.name : 'Gunakan Promo'}</p>
                                    {surveyData.promo ?
                                        <p className="text-xs text-slate-500">1 promo dipakai</p>
                                        : <p className="text-xs text-slate-500">Pilih promo untuk dapat diskon</p>
                                    }
                                </div>
                            </div>
                            <ChevronRightIcon className="w-5 h-5 text-slate-400 self-center group-hover:translate-x-1 transition-transform" />
                        </button>

                        {/* Ringkasan Biaya */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                            <h2 className="font-bold text-slate-800 mb-3">Ringkasan Biaya</h2>
                            <div className="space-y-2 text-sm border-t border-slate-100 pt-3">
                                <div className="flex justify-between"><span className="text-slate-500">Survey Lokasi</span><span className="font-semibold text-slate-800">{formatCurrency(baseSurveyCost)}</span></div>
                                {surcharge > 0 && (
                                    <div className="flex justify-between"><span className="text-slate-500">Biaya Tambahan (Non-Rumah)</span><span className="font-semibold text-slate-800">{formatCurrency(surcharge)}</span></div>
                                )}
                                {surveyData.promo && (
                                    <div className="flex justify-between"><span className="text-slate-500">{surveyData.promo.name}</span><span className="font-semibold text-green-600">-{formatCurrency(discount)}</span></div>
                                )}
                            </div>
                        </div>

                    </div>
                </main>

                <footer className="flex-shrink-0 p-4 bg-white/95 backdrop-blur-sm border-t border-slate-200 z-20 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600">Total Tagihan</p>
                            <p className="font-bold text-xl text-slate-900">{formatCurrency(total)}</p>
                        </div>
                        <button onClick={() => setConfirmModalOpen(true)} className="bg-blue-800 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-800/30 hover:bg-blue-900 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                            Pilih Pembayaran
                        </button>
                    </div>
                </footer>
            </div>
            <OrderConfirmationPromptModal
                isOpen={isConfirmModalOpen}
                onCancel={() => setConfirmModalOpen(false)}
                onConfirm={() => {
                    setConfirmModalOpen(false);
                    onNext();
                }}
            />
        </>
    );
};

export default SurveyConfirmationPage;