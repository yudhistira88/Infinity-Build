import React, { useState, useEffect } from 'react';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import ClockIcon from '../components/icons/ClockIcon';
import ClipboardIcon from '../components/icons/ClipboardIcon';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';
import PaymentSuccessModal from '../components/PaymentSuccessModal';

interface PaymentMethod {
    id: string;
    name: string;
    icon: React.ReactElement;
}

interface PaymentInstructionsPageProps {
    orderId: string;
    totalAmount: number;
    selectedMethod: PaymentMethod;
    onBack: () => void;
    onConfirmPayment: () => void;
}

const PaymentInstructionsPage: React.FC<PaymentInstructionsPageProps> = ({ orderId, totalAmount, selectedMethod, onBack, onConfirmPayment }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);
    const vaNumber = "88081234567890"; // Mock VA number

    useEffect(() => {
        if (timeLeft <= 0) return;
        const intervalId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return { h, m, s };
    };

    const { h, m, s } = formatTime(timeLeft);

    const handleCopy = () => {
        navigator.clipboard.writeText(vaNumber);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };
    
    const handleConfirmAndShowSuccess = () => {
        setIsSuccessModalVisible(true);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    const paymentInstructions = [
        'Buka aplikasi m-Banking Anda.',
        'Pilih menu Transfer > Virtual Account.',
        'Masukkan nomor Virtual Account di atas.',
        'Masukkan PIN m-Banking Anda.',
        'Pembayaran selesai.',
    ];

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
                
                <main className="flex-grow p-4 space-y-4 pb-32 overflow-y-auto scrollbar-hide">
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
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <div className="flex items-center space-x-3">
                                {selectedMethod.icon}
                                <span className="font-semibold text-slate-800">{selectedMethod.name}</span>
                            </div>
                        </div>
                        
                        <div className="pt-4">
                            <p className="text-sm text-slate-500">Nomor Virtual Account</p>
                            <div className="flex items-center justify-between mt-1">
                                <p className="text-2xl font-bold font-mono text-slate-800 tracking-wider">{vaNumber}</p>
                                <button onClick={handleCopy} className="flex items-center space-x-2 text-sm font-semibold text-blue-800 hover:text-blue-600 transition-colors">
                                    {isCopied ? <CheckCircleIcon className="w-5 h-5 text-green-500"/> : <ClipboardIcon className="w-5 h-5" />}
                                    <span>{isCopied ? 'Tersalin' : 'Salin'}</span>
                                </button>
                            </div>
                        </div>
                        
                         <div className="pt-4 mt-4 border-t border-slate-100">
                            <p className="text-sm text-slate-500">Total Pembayaran</p>
                            <p className="text-2xl font-bold text-slate-800">{formatCurrency(totalAmount)}</p>
                        </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-800 mb-3">Cara Pembayaran</h3>
                        <ul className="space-y-3">
                            {paymentInstructions.map((step, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="mr-3 flex-shrink-0 bg-blue-800 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{index + 1}</span>
                                    <p className="text-sm text-slate-600">{step}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                </main>
                
                <footer className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto p-4 bg-white/95 backdrop-blur-sm border-t border-slate-200 pb-[calc(1rem+env(safe-area-inset-bottom))] space-y-3">
                     <button onClick={handleConfirmAndShowSuccess} className="w-full bg-blue-800 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-800/30 hover:bg-blue-900 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                        Saya Sudah Bayar
                    </button>
                    <button onClick={onBack} className="w-full bg-slate-100 text-slate-700 font-bold py-3.5 px-6 rounded-xl hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                        Ubah Metode Pembayaran
                    </button>
                </footer>
            </div>
            {isSuccessModalVisible && (
                <PaymentSuccessModal onClose={onConfirmPayment} />
            )}
        </>
    );
};

export default PaymentInstructionsPage;