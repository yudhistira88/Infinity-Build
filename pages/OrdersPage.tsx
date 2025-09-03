

import React, { useState, useMemo, useEffect } from 'react';
import type { Order, OrderStatus } from '../types';
import ClockIcon from '../components/icons/ClockIcon';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';
import ClipboardListIcon from '../components/icons/ClipboardListIcon';
import ShieldCheckIcon from '../components/icons/ShieldCheckIcon';
import OrderDetailPage from './OrderDetailPage';
import EditOrderPage from './EditOrderPage';
import WrenchScrewdriverIcon from '../components/icons/WrenchScrewdriverIcon';
import SearchIcon from '../components/icons/SearchIcon';
import XCircleIcon from '../components/icons/XCircleIcon';

const initialOrdersData: Order[] = [
    { 
        id: 'JBS-240725-001', 
        serviceName: 'Survey Lokasi Renovasi Dapur', 
        date: '25 Juli 2024', 
        status: 'Waiting for Payment', 
        provider: { name: 'Tim Survey Jasaqu', avatar: 'https://i.pravatar.cc/150?img=4' },
        costDetails: { service: 200000, total: 200000 }
    },
    { 
        id: 'JBS-240724-002', 
        serviceName: 'Survey Pembangunan Rumah Baru', 
        date: '24 Juli 2024', 
        status: 'Survey', 
        provider: { name: 'CV. Griya Asri', avatar: 'https://i.pravatar.cc/150?img=5' },
        timeline: [
            { title: 'Pesanan Dibuat', date: '24 Juli 2024', status: 'completed' },
            { title: 'Pembayaran Dikonfirmasi', date: '24 Juli 2024', status: 'completed' },
            { title: 'Survey Dijadwalkan', date: '25 Juli 2024', status: 'in_progress' },
        ],
    },
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
        id: 'JBS-240720-003', 
        serviceName: 'Pemasangan Pagar Otomatis', 
        date: '20 Juli 2024', 
        status: 'Warranty Period', 
        provider: { name: 'Sumber Jaya Las', avatar: 'https://i.pravatar.cc/150?img=3' },
        timeline: [
            { title: 'Selesai', date: '20 Juli 2024', status: 'completed' },
            { title: 'Masa Garansi hingga', date: '20 Agu 2024', status: 'in_progress' },
        ],
        costDetails: { service: 4500000, total: 4500000 }
    },
    { 
        id: 'JBS-240721-005', 
        serviceName: 'Pengecatan Pagar Besi', 
        date: '21 Juli 2024', 
        status: 'Completed', 
        provider: { name: 'Budi Tukang', avatar: 'https://i.pravatar.cc/150?img=2' },
        timeline: [
            { title: 'Pesanan Dibuat', date: '18 Juli 2024', status: 'completed' },
            { title: 'Pengerjaan Dimulai', date: '19 Juli 2024', status: 'completed' },
            { title: 'Selesai', date: '21 Juli 2024', status: 'completed' },
        ],
        costDetails: { service: 350000, total: 350000 }
    },
    { 
        id: 'JBS-240719-001', 
        serviceName: 'Perbaikan Saluran Air Mampet', 
        date: '19 Juli 2024', 
        status: 'Completed', 
        provider: { name: 'CV. Lancar Jaya', avatar: 'https://i.pravatar.cc/150?img=6' },
        timeline: [
             { title: 'Selesai', date: '19 Juli 2024', status: 'completed' },
        ],
        costDetails: { service: 250000, total: 250000 }
    },
    { 
        id: 'JBS-240718-004', 
        serviceName: 'Pemasangan Wallpaper Dinding', 
        date: '18 Juli 2024', 
        status: 'Cancelled', 
        provider: { name: 'Decor Home', avatar: 'https://i.pravatar.cc/150?img=7' },
        costDetails: { service: 800000, total: 800000 }
    }
];

const StatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
    const statusInfo: { [key in OrderStatus]: { text: string; icon: React.ReactNode; className: string } } = {
        'Waiting for Payment': { text: 'Pembayaran', icon: <ClockIcon className="w-4 h-4" />, className: 'bg-yellow-100 text-yellow-800' },
        'Survey': { text: 'Survey', icon: <SearchIcon className="w-4 h-4" />, className: 'bg-cyan-100 text-cyan-800' },
        'In Progress': { text: 'Pengerjaan', icon: <WrenchScrewdriverIcon className="w-4 h-4" />, className: 'bg-blue-100 text-blue-800' },
        'Warranty Period': { text: 'Garansi', icon: <ShieldCheckIcon className="w-4 h-4" />, className: 'bg-purple-100 text-purple-800' },
        'Completed': { text: 'Selesai', icon: <CheckCircleIcon className="w-4 h-4" />, className: 'bg-green-100 text-green-800' },
        'Cancelled': { text: 'Dibatalkan', icon: <XCircleIcon className="w-4 h-4" />, className: 'bg-red-100 text-red-800' },
    };
    const info = statusInfo[status];
    if (!info) return null;

    return (
        <div className={`flex items-center space-x-1.5 py-1 px-2.5 rounded-full text-xs font-semibold ${info.className}`}>
            {info.icon}
            <span>{info.text}</span>
        </div>
    );
};

const OrderCard: React.FC<{ order: Order; onClick: () => void }> = ({ order, onClick }) => (
    <button onClick={onClick} className="w-full bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-left transition-all duration-200 hover:border-orange-400 hover:shadow-md hover:-translate-y-0.5">
        <div className="flex justify-between items-start mb-3">
            <p className="text-xs font-bold text-slate-500">{order.id}</p>
            <StatusBadge status={order.status} />
        </div>
        <h3 className="font-bold text-slate-800 text-base mb-2">{order.serviceName}</h3>
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div className="flex items-center space-x-3">
                <img src={order.provider.avatar} alt={order.provider.name} className="w-8 h-8 rounded-full" />
                <div>
                     <p className="text-sm font-semibold text-slate-700">{order.provider.name}</p>
                     <p className="text-xs text-slate-500">{order.date}</p>
                </div>
            </div>
            <span className="text-sm font-semibold text-orange-600">Lihat Detail</span>
        </div>
    </button>
);

interface OrdersPageProps {
    setBottomNavVisible: (visible: boolean) => void;
}

const OrdersPage: React.FC<OrdersPageProps> = ({ setBottomNavVisible }) => {
    const [view, setView] = useState<'list' | 'detail' | 'edit'>('list');
    const [orders, setOrders] = useState<Order[]>(initialOrdersData);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    type TabKey = 'All' | 'Pembayaran' | 'Pelaksanaan' | 'Dibatalkan';
    
    const tabs: { name: string; key: TabKey }[] = [
        { name: 'Semua Pesanan', key: 'All' },
        { name: 'Pembayaran', key: 'Pembayaran' },
        { name: 'Pelaksanaan', key: 'Pelaksanaan' },
        { name: 'Dibatalkan', key: 'Dibatalkan' },
    ];
    
    const [activeTab, setActiveTab] = useState<TabKey>('All');

    useEffect(() => {
        const newOrderJson = sessionStorage.getItem('newlyCreatedOrder');
        if (newOrderJson) {
            try {
                const newOrder = JSON.parse(newOrderJson);
                // Prepend new order and remove duplicates if any
                setOrders(prevOrders => [newOrder, ...prevOrders.filter(o => o.id !== newOrder.id)]);
                sessionStorage.removeItem('newlyCreatedOrder');
            } catch (e) {
                console.error("Failed to parse new order from session storage", e);
                sessionStorage.removeItem('newlyCreatedOrder');
            }
        }
    }, []);


    useEffect(() => {
        setBottomNavVisible(view === 'list');
    }, [view, setBottomNavVisible]);


    const filteredOrders = useMemo(() => {
        switch (activeTab) {
            case 'All':
                return orders;
            case 'Pembayaran':
                return orders.filter(order => order.status === 'Waiting for Payment');
            case 'Pelaksanaan':
                const executionStatuses: OrderStatus[] = ['Survey', 'In Progress', 'Warranty Period', 'Completed'];
                return orders.filter(order => executionStatuses.includes(order.status));
            case 'Dibatalkan':
                return orders.filter(order => order.status === 'Cancelled');
            default:
                return orders;
        }
    }, [orders, activeTab]);

    const handleSelectOrder = (order: Order) => {
        setSelectedOrder(order);
        setView('detail');
    };
    
    const handleEditOrder = () => {
         if (selectedOrder) {
            setView('edit');
        }
    };

    const handleSaveOrder = (updatedOrder: Order) => {
        setOrders(currentOrders => 
            currentOrders.map(o => o.id === updatedOrder.id ? updatedOrder : o)
        );
        setSelectedOrder(updatedOrder);
        setView('detail');
    };

    if (view === 'detail' && selectedOrder) {
        return <OrderDetailPage order={selectedOrder} onBack={() => setView('list')} onEdit={handleEditOrder} />;
    }
    
    if (view === 'edit' && selectedOrder) {
        return <EditOrderPage order={selectedOrder} onBack={() => setView('detail')} onSave={handleSaveOrder} />;
    }

    return (
        <div className="bg-slate-100 flex flex-col h-screen">
            <header className="bg-blue-800 text-white px-4 pb-4 pt-[calc(1rem+env(safe-area-inset-top))] rounded-b-[2rem] z-10 shadow-lg shadow-blue-800/20 flex-shrink-0">
                <h1 className="text-xl font-bold text-center">Pesanan Saya</h1>
            </header>

            <nav className="bg-slate-100 py-2 flex-shrink-0 border-b border-slate-200 z-10">
                <div className="flex space-x-3 overflow-x-auto scrollbar-hide px-4">
                    {tabs.map(tab => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex-shrink-0 px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 whitespace-nowrap ${
                                activeTab === tab.key
                                ? 'bg-blue-800 text-white shadow'
                                : 'bg-white text-slate-700 hover:bg-slate-200'
                            }`}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>
            </nav>

            <main className="flex-grow overflow-y-auto scrollbar-hide p-4 pb-[calc(6rem+env(safe-area-inset-bottom))]">
                {filteredOrders.length > 0 ? (
                    <div className="animate-fade-in-up space-y-4">
                        {filteredOrders.map(order => <OrderCard key={order.id} order={order} onClick={() => handleSelectOrder(order)} />)}
                    </div>
                ) : (
                    <div className="text-center py-16 animate-fade-in-up">
                        <ClipboardListIcon className="w-16 h-16 mx-auto text-slate-300" />
                        <h3 className="mt-4 text-lg font-semibold text-slate-800">Tidak Ada Pesanan</h3>
                        <p className="mt-1 text-slate-500">Anda belum memiliki pesanan dengan status ini.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default OrdersPage;