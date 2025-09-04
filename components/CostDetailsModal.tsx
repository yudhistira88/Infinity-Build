import React, { useState, useEffect } from 'react';
import XIcon from './icons/XIcon';

interface CostDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    baseCost: number;
    surcharge: number;
}

const CostDetailsModal: React.FC<CostDetailsModalProps> = ({ isOpen, onClose, baseCost, surcharge }) => {
    const [shouldRender, setShouldRender] = useState(isOpen);

    const total = baseCost + surcharge;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            const timer = setTimeout(() => setShouldRender(false), 300); // Must match animation duration
            return () => clearTimeout(timer);
        }

        // Cleanup effect
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!shouldRender) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-8"
            aria-modal="true"
            role="dialog"
        >
            <div 
                className={`fixed inset-0 bg-black/60 ${isOpen ? 'animate-fade-in' : 'animate-fade-out'}`}
                onClick={onClose}
                aria-hidden="true"
            ></div>

            <div className={`relative z-10 w-full max-w-xs flex flex-col items-center gap-4 ${isOpen ? 'animate-slide-down' : 'animate-fade-out'}`}>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full">
                    <div className="p-6">
                        <h2 className="text-xl font-bold text-blue-900 text-center mb-4">Rincian Biaya</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-slate-600">
                                <span className="text-md">Survey Lokasi</span>
                                <span className="font-semibold text-md text-slate-800">{formatCurrency(baseCost)}</span>
                            </div>
                            {surcharge > 0 && (
                                <div className="flex justify-between items-center text-slate-600">
                                    <span className="text-md">Biaya Tambahan (Non-Rumah)</span>
                                    <span className="font-semibold text-md text-slate-800">{formatCurrency(surcharge)}</span>
                                </div>
                            )}
                        </div>
                        <div className="border-t border-slate-200 my-4"></div>
                        <div className="flex justify-between items-center text-slate-800">
                            <span className="text-lg font-bold">Total Biaya</span>
                            <span className="font-bold text-lg text-sky-500">{formatCurrency(total)}</span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    aria-label="Tutup"
                >
                    <XIcon className="w-6 h-6 text-slate-800" />
                </button>
            </div>
        </div>
    );
};

export default CostDetailsModal;