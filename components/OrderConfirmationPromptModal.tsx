import React, { useState, useEffect } from 'react';

interface OrderConfirmationPromptModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const OrderConfirmationPromptModal: React.FC<OrderConfirmationPromptModalProps> = ({ isOpen, onConfirm, onCancel }) => {
    const [shouldRender, setShouldRender] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
        } else {
            const timer = setTimeout(() => setShouldRender(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!shouldRender) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            aria-modal="true"
            role="dialog"
        >
            <div 
                className={`fixed inset-0 bg-black/50 ${!isOpen ? 'animate-fade-out' : 'animate-fade-in'}`}
                onClick={onCancel}
            ></div>

            <div className={`bg-white rounded-2xl shadow-xl z-10 w-full max-w-sm overflow-hidden ${!isOpen ? 'animate-fade-out' : 'animate-scale-in'}`}>
                <div className="bg-blue-800 p-4">
                    <h2 className="text-xl font-bold text-white text-center">❔ Konfirmasi Pesanan</h2>
                </div>
                <div className="p-6 text-center">
                    <p className="text-slate-700 leading-relaxed">
                        Apakah pesananmu sudah sesuai? Pastikan semua detail sudah benar sebelum melanjutkan.
                    </p>
                </div>
                <div className="flex p-4 bg-slate-50 border-t border-slate-200 space-x-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 bg-slate-100 text-slate-800 font-bold py-3 px-5 rounded-lg hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400"
                    >
                        ❌ Cek Kembali
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 bg-orange-500 text-white font-bold py-3 px-5 rounded-lg hover:bg-orange-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 shadow-md shadow-orange-500/30"
                    >
                        ✅ Sesuai
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmationPromptModal;