import React, { useState } from 'react';
import type { Order } from '../types';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';

interface EditOrderPageProps {
    order: Order;
    onBack: () => void;
    onSave: (updatedOrder: Order) => void;
}

const EditOrderPage: React.FC<EditOrderPageProps> = ({ order, onBack, onSave }) => {
    const [serviceName, setServiceName] = useState(order.serviceName);

    const handleSaveChanges = () => {
        if (!serviceName.trim()) {
            alert('Nama layanan tidak boleh kosong.');
            return;
        }
        const updatedOrder = {
            ...order,
            serviceName: serviceName.trim(),
        };
        onSave(updatedOrder);
    };

    return (
        <div className="bg-slate-100 min-h-screen flex flex-col animate-fade-in-up">
            <header className="bg-white sticky top-0 z-10 shadow-sm pt-[env(safe-area-inset-top)]">
                <div className="h-16 flex items-center px-4 relative">
                    <button onClick={onBack} className="absolute left-2 p-2 rounded-full hover:bg-slate-100" aria-label="Back">
                        <ChevronLeftIcon className="w-6 h-6 text-slate-700" />
                    </button>
                    <h1 className="text-lg font-bold text-center w-full text-slate-800">Ubah Detail Pesanan</h1>
                </div>
            </header>

            <main className="flex-grow p-4 space-y-4">
                <section className="bg-white p-4 rounded-xl border border-slate-200">
                    <label htmlFor="serviceName" className="block text-sm font-bold text-slate-700 mb-2">
                        Nama Layanan
                    </label>
                    <input
                        id="serviceName"
                        type="text"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 text-slate-800 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-slate-400"
                    />
                </section>
                
                <section className="bg-white p-4 rounded-xl border border-slate-200">
                    <p className="text-sm font-bold text-slate-700 mb-2">Info Lainnya</p>
                    <p className="text-slate-500 text-sm">Untuk mengubah detail lain seperti jadwal atau rincian biaya, silakan hubungi penyedia jasa melalui halaman pesan.</p>
                </section>

            </main>

            <footer className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto p-4 bg-white/80 backdrop-blur-sm border-t border-slate-200 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                <button
                    onClick={handleSaveChanges}
                    className="w-full bg-orange-500 text-white font-bold py-3.5 px-5 rounded-xl shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                    Simpan Perubahan
                </button>
            </footer>
        </div>
    );
};

export default EditOrderPage;
