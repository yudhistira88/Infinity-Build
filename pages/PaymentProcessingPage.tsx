import React, { useEffect } from 'react';

interface PaymentProcessingPageProps {
    onComplete: () => void;
}

const PaymentProcessingPage: React.FC<PaymentProcessingPageProps> = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 3000); // Simulate 3-second processing time
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="absolute inset-0 bg-slate-100 z-50 flex flex-col items-center justify-center text-center p-4 animate-fade-in-up">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-800"></div>
            <h1 className="text-2xl font-bold text-slate-800 mt-6">Memproses Pembayaran...</h1>
            <p className="text-slate-600 mt-2">Mohon tunggu sebentar, jangan tutup halaman ini.</p>
        </div>
    );
};

export default PaymentProcessingPage;