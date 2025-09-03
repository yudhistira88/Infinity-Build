import React from 'react';
import SuccessIcon from './icons/SuccessIcon';
import XIcon from './icons/XIcon';

interface PaymentSuccessModalProps {
    onClose: () => void;
}

const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({ onClose }) => {
    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="fixed inset-0 bg-black/50 animate-fade-in"
                onClick={onClose}
            ></div>

            <div className="relative bg-white rounded-2xl shadow-xl z-10 w-full max-w-sm overflow-hidden animate-scale-in text-center p-8 pt-12">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
                    aria-label="Tutup"
                >
                    <XIcon className="w-6 h-6 text-slate-500" />
                </button>
                
                <div className="flex justify-center">
                    <SuccessIcon />
                </div>
                
                <h2 className="text-2xl font-bold text-slate-800 mt-6">
                    Pesanan Berhasil Dibuat
                </h2>
                
                <p className="text-slate-600 mt-2">
                    Anda dapat melihat status pesanan di halaman Pesanan.
                </p>

            </div>
        </div>
    );
};

export default PaymentSuccessModal;
