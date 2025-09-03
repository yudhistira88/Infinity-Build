import React, { useState, useMemo } from 'react';
import type { Service, Location, Order } from '../types';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import TagIcon from '../components/icons/TagIcon';
import InformationCircleIcon from '../components/icons/InformationCircleIcon';
import BanknotesIcon from '../components/icons/BanknotesIcon';
import WalletIcon from '../components/icons/WalletIcon';
import CreditCardIcon from '../components/icons/CreditCardIcon';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';
import PaymentProcessingPage from './PaymentProcessingPage';
import OrderConfirmationPage from './OrderConfirmationPage';

interface CheckoutPageProps {
    service: Service;
    location: Location;
    date: string;
    onBack: () => void;
    onPaymentSuccess: () => void;
}

const paymentMethods = [
    { id: 'va', name: 'Virtual Account', icon: <BanknotesIcon className="w-6 h-6" /> },
    { id: 'ewallet', name: 'E-Wallet (GoPay, OVO)', icon: <WalletIcon className="w-6 h-6" /> },
    { id: 'cc', name: 'Kartu Kredit/Debit', icon: <CreditCardIcon className="w-6 h-6" /> },
];

const SERVICE_COST = 2000000; // Mock service cost
const SURVEY_COST = 200000;  // From previous requirements

const CheckoutPage: React.FC<CheckoutPageProps> = ({ service, location, date, onBack, onPaymentSuccess }) => {
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [promoMessage, setPromoMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0].id);

    const [view, setView] = useState<'checkout' | 'processing' | 'confirmed'>('checkout');

    const total = useMemo(() => {
        return SERVICE_COST + SURVEY_COST - discount;
    }, [discount]);

    const handleApplyPromo = () => {
        if (promoCode.toUpperCase() === 'HEMAT50') {
            setDiscount(50000);
            setPromoMessage({ text: 'Kode promo berhasil digunakan!', type: 'success' });
        } else {
            setDiscount(0);
            setPromoMessage({ text: 'Kode promo tidak valid.', type: 'error' });
        }
    };

    const handlePayment = () => {
        setView('processing');
    };

    const handleProcessingComplete = () => {
        const newOrder: Order = {
            id: `JBS-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-${String(Math.random()).slice(2, 5)}`,
            serviceName: service.name,
            date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
            status: 'In Progress',
            provider: {
                name: 'CV. Karya Abadi',
                avatar: 'https://i.pravatar.cc/150?img=1',
            },
            timeline: [
                { title: 'Pesanan Dibuat', date: new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }), status: 'completed' },
                { title: 'Pembayaran Dikonfirmasi', date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }), status: 'completed' },
                { title: 'Tukang Ditemukan', date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }), status: 'in_progress' },
                { title: 'Pengerjaan Dimulai', date: 'Estimasi besok', status: 'pending' },
            ],
            costDetails: {
                service: SERVICE_COST,
                total: total,
            }
        };

        sessionStorage.setItem('newlyCreatedOrder', JSON.stringify(newOrder));
        setView('confirmed');
    };
    
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    if (view === 'processing') {
        return <PaymentProcessingPage onComplete={handleProcessingComplete} />;
    }

    if (view === 'confirmed') {
        return <OrderConfirmationPage 
            service={service}
            location={location}
            date={date}
            onDone={onPaymentSuccess}
        />;
    }

    return (
        <div className="bg-slate-100 min-h-screen flex flex-col animate-fade-in-up">
            <header className="bg-white sticky top-0 z-10 shadow-sm pt-[env(safe-area-inset-top)]">
                <div className="h-16 flex items-center px-4 relative">
                    <button onClick={onBack} className="absolute left-2 p-2 rounded-full hover:bg-slate-100" aria-label="Back">
                        <ChevronLeftIcon className="w-6 h-6 text-slate-700" />
                    </button>
                    <h1 className="text-lg font-bold text-center w-full text-slate-800">Pembayaran</h1>
                </div>
            </header>

            <main className="flex-grow p-4 space-y-4 pb-36">
                {/* Order Summary */}
                <section className="bg-white p-3 rounded-xl border border-slate-200 flex items-center space-x-4">
                    <img src={service.image} alt={service.name} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                        <h2 className="font-bold text-slate-800 truncate">{service.name}</h2>
                        <p className="text-sm text-slate-500">{new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                </section>
                
                {/* Promo Code */}
                <section className="bg-white p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center space-x-3 mb-3">
                        <TagIcon className="w-5 h-5 text-blue-800" />
                        <span className="font-bold text-slate-800">Voucher / Kode Promo</span>
                    </div>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            placeholder="Masukkan Kode Promo"
                            className="w-full bg-slate-100 border-slate-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500 text-sm"
                        />
                        <button onClick={handleApplyPromo} className="bg-orange-100 text-orange-700 font-bold px-4 rounded-lg text-sm hover:bg-orange-200 transition-colors">Terapkan</button>
                    </div>
                    {promoMessage && (
                         <div className={`mt-3 flex items-start space-x-2 text-sm ${promoMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                            <InformationCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <span>{promoMessage.text}</span>
                        </div>
                    )}
                </section>

                {/* Payment Methods */}
                <section className="bg-white p-4 rounded-xl border border-slate-200">
                    <h3 className="font-bold text-slate-800 mb-3">Pilih Metode Pembayaran</h3>
                    <div className="space-y-3">
                        {paymentMethods.map(method => (
                            <button key={method.id} onClick={() => setSelectedPaymentMethod(method.id)} className={`w-full text-left flex items-center p-3 rounded-lg border-2 transition-all ${selectedPaymentMethod === method.id ? 'border-orange-500 bg-orange-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                                <div className={`mr-4 ${selectedPaymentMethod === method.id ? 'text-orange-600' : 'text-slate-500'}`}>{method.icon}</div>
                                <span className="flex-grow font-semibold text-slate-800">{method.name}</span>
                                {selectedPaymentMethod === method.id && <CheckCircleIcon className="w-6 h-6 text-orange-500" />}
                            </button>
                        ))}
                    </div>
                </section>

                 {/* Price Details */}
                <section className="bg-white p-4 rounded-xl border border-slate-200">
                    <h3 className="font-bold text-slate-800 mb-3">Rincian Pembayaran</h3>
                     <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-600">Biaya Jasa (Estimasi)</span>
                            <span className="font-medium text-slate-800">{formatCurrency(SERVICE_COST)}</span>
                        </div>
                         <div className="flex justify-between">
                            <span className="text-slate-600">Biaya Survei</span>
                            <span className="font-medium text-slate-800">{formatCurrency(SURVEY_COST)}</span>
                        </div>
                        {discount > 0 && (
                             <div className="flex justify-between text-green-600">
                                <span className="font-medium">Diskon</span>
                                <span className="font-medium">-{formatCurrency(discount)}</span>
                            </div>
                        )}
                        <div className="border-t border-slate-200 pt-3 mt-3">
                             <div className="flex justify-between font-bold text-md">
                                <span className="text-slate-800">Total Pembayaran</span>
                                <span className="text-blue-800">{formatCurrency(total)}</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

             <footer className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto p-4 bg-white/80 backdrop-blur-sm border-t border-slate-200 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-slate-600">Total</span>
                    <span className="text-xl font-bold text-blue-800">{formatCurrency(total)}</span>
                </div>
                <button 
                    onClick={handlePayment}
                    className="w-full bg-orange-500 text-white font-bold py-3.5 px-5 rounded-xl shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                    Bayar Sekarang
                </button>
            </footer>
        </div>
    );
};

export default CheckoutPage;