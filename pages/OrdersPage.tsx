
import React, { useState } from 'react';
import type { Order } from '../types';
import ClockIcon from '../components/icons/ClockIcon';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';
import ClipboardListIcon from '../components/icons/ClipboardListIcon';
import OrderDetailPage from './OrderDetailPage';

const ordersData: Order[] = [
    { 
        id: 'JBS-240723-001', 
        serviceName: 'Jasa Renovasi Rumah Tipe 36', 
        date: '23 Juli 2024', 
        status: 'In Progress', 
        provider: { name: 'CV. Karya Abadi', avatar: 'https://i.pravatar.cc/150?img=1' },
        timeline: [
            { title: 'Pesanan Dibuat', date: '23 Juli 2024', status: 'completed' },
            { title: 'Tukang Ditemukan', date: '23 Juli 2024', status: 'completed' },
            { title: 'Pengerjaan Dimulai', date: '24 Juli 2024', status: 'in_progress' },
            { title: 'Estimasi Selesai', date: '30 Juli 2024', status: 'pending' },
        ],
        costDetails: { service: 2000000, materials: 1500000, total: 3500000 }
    },
    { 
        id: 'JBS-240721-005', 
        serviceName: 'Pengecatan Pagar Besi', 
        date: '21 Juli 2024', 
        status: 'Completed', 
        provider: { name: 'Budi Tukang', avatar: 'https://i.pravatar.cc/150?img=2' },
        timeline: [
            { title: 'Pesanan Dibuat', date: '21 Juli 2024', status: 'completed' },
            { title: 'Pengerjaan Dimulai', date: '21 Juli 2024', status: 'completed' },
            { title: 'Selesai', date: '21 Juli 2024', status: 'completed' },
        ],
        costDetails: { service: 350000, total: 350000 }
    },
    { 
        id: 'JBS-240715-002', 
        serviceName: 'Instalasi Kanopi Alderon', 
        date: '15 Juli 2024', 
        status: 'Completed', 
        provider: { name: 'Sumber Jaya Las', avatar: 'https://i.pravatar.cc/150?img=3' },
        timeline: [
            { title: 'Pesanan Dibuat', date: '15 Juli 2024', status: 'completed' },
            { title: 'Pengerjaan Dimulai', date: '15 Juli 2024', status: 'completed' },
            { title: 'Selesai', date: '16 Juli 2024', status: 'completed' },
        ],
        costDetails: { service: 1200000, materials: 2000000, total: 3200000 }
    },
];

const OrderCard: React.FC<{ order: Order; onViewDetail: () => void }> = ({ order, onViewDetail }) => {
    const isCompleted = order.status === 'Completed';
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:border-orange-400 hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-xs text-slate-500">{order.id} &bull; {order.date}</p>
                    <h3 className="font-bold text-slate-800 mt-1">{order.serviceName}</h3>
                </div>
                <div className={`text-xs font-semibold py-1 px-2.5 rounded-full flex items-center space-x-1 ${isCompleted ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {isCompleted ? <CheckCircleIcon className="w-4 h-4" /> : <ClockIcon className="w-4 h-4" />}
                    <span>{isCompleted ? 'Selesai' : 'Dikerjakan'}</span>
                </div>
            </div>
            <div className="border-t border-slate-100 my-3"></div>
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <img src={order.provider.avatar} alt={order.provider.name} className="w-8 h-8 rounded-full" />
                    <span className="text-sm font-medium text-slate-600">{order.provider.name}</span>
                </div>
                <button onClick={onViewDetail} className="text-sm font-bold text-orange-600 hover:text-orange-500">Lihat Detail</button>
            </div>
        </div>
    );
};

const OrdersPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Dalam Pengerjaan');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const filteredOrders = ordersData.filter(order =>
        activeTab === 'Dalam Pengerjaan' ? order.status === 'In Progress' : order.status === 'Completed'
    );

    if (selectedOrder) {
        return <OrderDetailPage order={selectedOrder} onBack={() => setSelectedOrder(null)} />;
    }

    return (
        <div className="bg-slate-100 min-h-screen">
            <header className="bg-blue-800 text-white px-4 pb-6 pt-[calc(1rem+env(safe-area-inset-top))] rounded-b-[2rem] sticky top-0 z-10 shadow-lg shadow-blue-800/20">
                <h1 className="text-xl font-bold text-center">Pesanan Saya</h1>
            </header>

            <div className="p-4 pb-[calc(5rem+env(safe-area-inset-bottom))]">
                <div className="bg-blue-100 p-1 rounded-xl flex items-center mb-4">
                    {['Dalam Pengerjaan', 'Selesai'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`w-full py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${activeTab === tab ? 'bg-blue-800 text-white shadow-md' : 'text-blue-900'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="space-y-4">
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map(order => <OrderCard key={order.id} order={order} onViewDetail={() => setSelectedOrder(order)} />)
                    ) : (
                        <div className="text-center pt-16">
                            <ClipboardListIcon className="w-16 h-16 mx-auto text-slate-300" />
                            <h3 className="mt-4 text-lg font-semibold text-slate-800">Tidak Ada Pesanan</h3>
                            <p className="mt-1 text-slate-500">Pesanan Anda yang sedang berjalan akan muncul di sini.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;