import React, { useState, useEffect, useMemo } from 'react';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import ChevronDownIcon from '../components/icons/ChevronDownIcon';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';
import ClockIcon from '../components/icons/ClockIcon';
import SurveyStepper from '../components/SurveyStepper';
import XIcon from '../components/icons/XIcon';
import PaymentInstructionsPage from './PaymentInstructionsPage';

// --- Simple Icon Components for Payment Methods ---
const BcaIcon = () => <svg viewBox="0 0 48 48" className="w-8 h-8"><path fill="#0065F4" d="M24,4C12.95,4,4,12.95,4,24s8.95,20,20,20s20-8.95,20-20S35.05,4,24,4z M31.2,20.15l-7.2,7.2l-7.2-7.2h3.6l3.6,3.6 l3.6-3.6H31.2z M16.8,27.85l7.2-7.2l7.2,7.2h-3.6l-3.6-3.6l-3.6,3.6H16.8z"/></svg>;
const MandiriIcon = () => <svg viewBox="0 0 48 48" className="w-8 h-8"><rect width="48" height="48" rx="8" fill="#003D79"/><path d="M14 14H34V20H14V14Z" fill="#FFC107"/><path d="M14 22H34V25H14V22Z" fill="white"/><path d="M14 27H34V34H14V27Z" fill="#FFC107"/></svg>;
const BriIcon = () => <svg viewBox="0 0 48 48" className="w-8 h-8"><rect width="48" height="48" rx="8" fill="#00529B"/><path d="M14 14L24 24L14 34V14Z" fill="#FFC107"/><path d="M24 14H34V34H24L34 24L24 14Z" fill="white"/></svg>;
const BniIcon = () => <svg viewBox="0 0 48 48" className="w-8 h-8"><rect width="48" height="48" rx="8" fill="#F6821F"/><path d="M14 34V14L24 14V24L34 24V34H14Z" fill="white"/><path d="M26 14L34 14V22L26 22V14Z" fill="#00A19A"/></svg>;
const GopayIcon = () => <svg viewBox="0 0 48 48" className="w-8 h-8"><rect width="48" height="48" rx="24" fill="#0081d6"/><path d="M12 24C12 17.37 17.37 12 24 12C30.63 12 36 17.37 36 24C36 30.63 30.63 36 24 36C17.37 36 12 30.63 12 24Z" fill="white"/><path d="M24 16C19.58 16 16 19.58 16 24H32C32 19.58 28.42 16 24 16Z" fill="#0081d6"/></svg>;
const OvoIcon = () => <svg viewBox="0 0 48 48" className="w-8 h-8"><rect width="48" height="48" rx="8" fill="#4C2A85"/><circle cx="24" cy="24" r="10" stroke="white" strokeWidth="4"/></svg>;
const VisaIcon = () => <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="32" y="8" rx="4" fill="#142688"/><path d="M10 12L7 28H11L14 12H10Z" fill="#fff"/><path d="M24 12L20 28H24L28 12H24Z" fill="#fff"/><path d="M34 12L31 28H35L38 12H34Z" fill="#fff"/><path d="M42 12L39 28H43L46 12H42Z" fill="#FFC107"/></svg>;


interface PaymentMethod {
    id: string;
    name: string;
    icon: React.ReactElement;
}
interface PaymentCategory {
    name: string;
    methods: PaymentMethod[];
}

const paymentCategories: PaymentCategory[] = [
    {
        name: 'Virtual Account',
        methods: [
            { id: 'bca_va', name: 'BCA Virtual Account', icon: <BcaIcon /> },
            { id: 'mandiri_va', name: 'Mandiri Virtual Account', icon: <MandiriIcon /> },
            { id: 'bri_va', name: 'BRI Virtual Account', icon: <BriIcon /> },
            { id: 'bni_va', name: 'BNI Virtual Account', icon: <BniIcon /> },
        ]
    },
    {
        name: 'E-Wallet',
        methods: [
            { id: 'gopay', name: 'GoPay', icon: <GopayIcon /> },
            { id: 'ovo', name: 'OVO', icon: <OvoIcon /> },
        ]
    },
    {
        name: 'Kartu Kredit/Debit',
        methods: [
            { id: 'visa', name: 'Visa', icon: <VisaIcon /> },
        ]
    }
];


interface PaymentPageProps {
    surveyData: any;
    onBack: () => void;
    onPaymentSuccess: () => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ surveyData, onBack, onPaymentSuccess }) => {
    const [view, setView] = useState<'payment' | 'instructions'>('payment');
    const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(paymentCategories[0].methods[0]);

    const orderId = useMemo(() => {
        const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, '');
        const randomPart = String(Math.random()).slice(2, 7);
        return `JBS-${datePart}-${randomPart}`;
    }, []);

    const baseSurveyCost = 200000;
    const totalSurveyCost = surveyData.totalCost || baseSurveyCost;
    const surcharge = totalSurveyCost - baseSurveyCost;
    const discount = surveyData.promo?.discountAmount || 0;
    const totalAmount = totalSurveyCost - discount;

    useEffect(() => {
        if (timeLeft <= 0) return;
        const intervalId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(intervalId);
    }, [timeLeft]);
    
    useEffect(() => {
        document.body.style.overflow = isSheetOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isSheetOpen]);


    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return { h, m, s };
    };

    const { h, m, s } = formatTime(timeLeft);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    const handleMethodSelect = (method: PaymentMethod) => {
        setSelectedMethod(method);
        setIsSheetOpen(false);
    };

    if (view === 'instructions') {
        return (
            <PaymentInstructionsPage
                orderId={orderId}
                totalAmount={totalAmount}
                selectedMethod={selectedMethod}
                onBack={() => setView('payment')}
                onConfirmPayment={onPaymentSuccess}
            />
        );
    }

    return (
        <>
            <div className="bg-slate-100 min-h-screen flex flex-col font-sans animate-fade-in-up">
                <header className="bg-white sticky top-0 z-10 shadow-sm pt-[env(safe-area-inset-top)]">
                    <div className="h-20 flex items-center px-2 relative">
                        <button onClick={onBack} className="absolute left-2 p-2 rounded-full hover:bg-slate-100" aria-label="Back">
                            <ChevronLeftIcon className="w-6 h-6 text-slate-700" />
                        </button>
                        <div className="text-center w-full">
                            <h1 className="text-lg font-bold text-slate-800">Pembayaran</h1>
                             <div className="flex items-center justify-center text-sm text-slate-500 font-semibold">
                                ID Pesanan <span className="font-bold text-blue-800 mx-1">{orderId}</span>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-grow pb-32 overflow-y-auto scrollbar-hide">
                    <SurveyStepper currentStep="bayar" />
                    
                    <div className="p-4 space-y-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                            <label className="flex items-center space-x-3 text-sm text-slate-500 mb-2">
                                <ClockIcon className="w-6 h-6"/>
                                <span>Selesaikan Pembayaran Dalam</span>
                            </label>
                            <div className="pl-9 flex items-center space-x-1.5">
                                <span className="bg-red-500 text-white font-mono font-bold text-lg rounded-md px-2 py-0.5">{h}</span>
                                <span className="text-slate-500 font-bold">:</span>
                                <span className="bg-red-500 text-white font-mono font-bold text-lg rounded-md px-2 py-0.5">{m}</span>
                                <span className="text-slate-500 font-bold">:</span>
                                <span className="bg-red-500 text-white font-mono font-bold text-lg rounded-md px-2 py-0.5">{s}</span>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                            <h2 className="font-bold text-slate-800 mb-4">Metode Pembayaran</h2>
                            <button className="w-full text-left p-3 rounded-xl border-2 border-slate-200 bg-white">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-3">
                                        {selectedMethod.icon}
                                        <span className="font-semibold text-slate-800">{selectedMethod.name}</span>
                                    </div>
                                    <button onClick={() => setIsSheetOpen(true)} className="text-blue-800 font-semibold text-sm">Ganti</button>
                                </div>
                            </button>
                            <div className="text-center mt-4">
                                <button onClick={() => setIsSheetOpen(true)} className="text-blue-800 font-semibold text-sm flex items-center mx-auto">
                                    Lihat semua metode
                                    <ChevronDownIcon className="w-4 h-4 ml-1" />
                                </button>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                            <h2 className="font-bold text-slate-800 mb-3">Rincian Pembayaran</h2>
                            <div className="space-y-2 text-sm border-t border-slate-100 pt-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Survey Lokasi</span>
                                    <span className="font-semibold text-slate-800">{formatCurrency(baseSurveyCost)}</span>
                                </div>
                                {surcharge > 0 && (
                                     <div className="flex justify-between">
                                        <span className="text-slate-500">Biaya Tambahan (Non-Rumah)</span>
                                        <span className="font-semibold text-slate-800">{formatCurrency(surcharge)}</span>
                                    </div>
                                )}
                                {surveyData.promo && (
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">{surveyData.promo.name}</span>
                                        <span className="font-semibold text-green-600">-{formatCurrency(discount)}</span>
                                    </div>
                                )}
                                <div className="border-t border-slate-200 pt-3 mt-3">
                                    <div className="flex justify-between font-bold text-md">
                                        <span className="text-slate-800">Total Pembayaran</span>
                                        <span className="text-blue-800">{formatCurrency(totalAmount)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto p-4 bg-white/95 backdrop-blur-sm border-t border-slate-200 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600">Total Tagihan</p>
                            <p className="font-bold text-xl text-slate-900">{formatCurrency(totalAmount)}</p>
                        </div>
                        <button onClick={() => setView('instructions')} className="bg-blue-800 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-800/30 hover:bg-blue-900 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                            Bayar
                        </button>
                    </div>
                </footer>
            </div>
            
            {/* Payment Method Selection Sheet */}
            {isSheetOpen && (
                <div className="fixed inset-0 z-50 flex flex-col justify-end" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-black/50 animate-fade-in" onClick={() => setIsSheetOpen(false)}></div>
                    <div className={`bg-slate-50 rounded-t-2xl w-full max-w-sm mx-auto shadow-xl z-10 flex flex-col ${isSheetOpen ? 'animate-slide-up' : 'animate-sheet-slide-down'}`}>
                        <header className="p-4 border-b border-slate-200 flex-shrink-0">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-bold text-slate-800">Pilih Metode Pembayaran</h2>
                                <button onClick={() => setIsSheetOpen(false)} className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200" aria-label="Close">
                                    <XIcon className="w-5 h-5 text-slate-600" />
                                </button>
                            </div>
                        </header>
                        <main className="overflow-y-auto scrollbar-hide p-4 flex-grow">
                            <div className="space-y-4">
                                {paymentCategories.map(category => (
                                    <div key={category.name}>
                                        <h3 className="font-bold text-slate-600 mb-2">{category.name}</h3>
                                        <div className="space-y-2">
                                            {category.methods.map(method => (
                                                <button key={method.id} onClick={() => handleMethodSelect(method)} className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-800 hover:bg-blue-50 transition-all">
                                                    <div className="flex items-center space-x-4">
                                                        {method.icon}
                                                        <span className="font-semibold text-slate-800 text-sm">{method.name}</span>
                                                    </div>
                                                    {selectedMethod.id === method.id && <CheckCircleIcon className="w-6 h-6 text-blue-800" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </main>
                    </div>
                </div>
            )}
        </>
    );
};

export default PaymentPage;