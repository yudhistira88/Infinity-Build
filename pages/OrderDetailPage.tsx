
import React from 'react';
import type { Order } from '../types';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';
import ClockIcon from '../components/icons/ClockIcon';
import ShieldCheckIcon from '../components/icons/ShieldCheckIcon';
import ChatBubbleLeftRightIcon from '../components/icons/ChatBubbleLeftRightIcon';
import CurrencyDollarIcon from '../components/icons/CurrencyDollarIcon';

interface OrderDetailPageProps {
    order: Order;
    onBack: () => void;
}

const TimelineStep: React.FC<{ title: string; date: string; status: 'completed' | 'in_progress' | 'pending'; isLast?: boolean }> = ({ title, date, status, isLast = false }) => {
    const statusClasses = {
        completed: {
            dot: 'bg-blue-800 border-blue-800',
            text: 'text-slate-800 font-semibold',
            date: 'text-slate-600',
        },
        in_progress: {
            dot: 'bg-white border-blue-800 ring-4 ring-blue-200',
            text: 'text-blue-800 font-bold',
            date: 'text-blue-800',
        },
        pending: {
            dot: 'bg-slate-200 border-slate-300',
            text: 'text-slate-500',
            date: 'text-slate-500',
        },
    };
    
    return (
        <div className="flex space-x-4">
            <div className="flex flex-col items-center">
                <div className={`w-5 h-5 rounded-full border-2 ${statusClasses[status].dot} z-10`}></div>
                {!isLast && <div className={`w-0.5 flex-grow ${status === 'completed' ? 'bg-blue-800' : 'bg-slate-300'}`}></div>}
            </div>
            <div className="pb-8 -mt-1">
                <p className={`text-md ${statusClasses[status].text}`}>{title}</p>
                <p className={`text-sm ${statusClasses[status].date}`}>{date}</p>
            </div>
        </div>
    );
};

const OrderDetailPage: React.FC<OrderDetailPageProps> = ({ order, onBack }) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };
    const isCompleted = order.status === 'Completed';

    return (
        <div className="bg-slate-100 min-h-screen flex flex-col animate-fade-in-up">
            <header className="bg-white sticky top-0 z-10 shadow-sm pt-[env(safe-area-inset-top)]">
                <div className="h-16 flex items-center px-4 relative">
                    <button onClick={onBack} className="absolute left-2 p-2 rounded-full hover:bg-slate-100" aria-label="Back">
                        <ChevronLeftIcon className="w-6 h-6 text-slate-700" />
                    </button>
                    <h1 className="text-lg font-bold text-center w-full text-slate-800">Detail Pesanan</h1>
                </div>
            </header>

            <main className="flex-grow p-4 space-y-4 pb-28">
                <section className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-xs font-semibold text-orange-600">{order.id}</p>
                            <h2 className="text-xl font-bold text-slate-800 mt-1">{order.serviceName}</h2>
                        </div>
                         <div className={`text-sm font-semibold py-1.5 px-3 rounded-full flex items-center space-x-1.5 ${isCompleted ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                            {isCompleted ? <CheckCircleIcon className="w-5 h-5" /> : <ClockIcon className="w-5 h-5" />}
                            <span>{isCompleted ? 'Selesai' : 'Dikerjakan'}</span>
                        </div>
                    </div>
                </section>
                
                <section className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                     <h3 className="font-bold text-slate-800 mb-4">Penyedia Jasa</h3>
                     <div className="flex items-center space-x-3">
                        <img src={order.provider.avatar} alt={order.provider.name} className="w-12 h-12 rounded-full" />
                        <div className="flex-1">
                            <div className="flex items-center space-x-1.5">
                                <h4 className="font-semibold text-slate-800">{order.provider.name}</h4>
                                <ShieldCheckIcon className="w-5 h-5 text-blue-600" title="Penyedia Terverifikasi"/>
                            </div>
                            <p className="text-sm text-slate-500">Penyedia jasa terverifikasi</p>
                        </div>
                    </div>
                </section>

                {order.timeline && (
                    <section className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4">Linimasa Pengerjaan</h3>
                        <div>
                            {order.timeline.map((step, index) => (
                                <TimelineStep key={index} {...step} isLast={index === (order.timeline?.length ?? 0) - 1} />
                            ))}
                        </div>
                    </section>
                )}

                {order.costDetails && (
                    <section className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center space-x-3 mb-4">
                            <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
                            <h3 className="font-bold text-slate-800">Rincian Biaya</h3>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-600">Biaya Jasa</span>
                                <span className="font-medium text-slate-800">{formatCurrency(order.costDetails.service)}</span>
                            </div>
                            {order.costDetails.materials && (
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Biaya Material</span>
                                    <span className="font-medium text-slate-800">{formatCurrency(order.costDetails.materials)}</span>
                                </div>
                            )}
                            <div className="border-t border-slate-200 my-2"></div>
                            <div className="flex justify-between font-bold text-md">
                                <span className="text-slate-800">Total</span>
                                <span className="text-blue-800">{formatCurrency(order.costDetails.total)}</span>
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <div className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto p-4 bg-white/80 backdrop-blur-sm border-t border-slate-200 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                <button className="w-full bg-orange-500 text-white font-bold py-3.5 px-5 rounded-xl shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all flex items-center justify-center space-x-2">
                    <ChatBubbleLeftRightIcon className="w-5 h-5" />
                    <span>Hubungi Penyedia</span>
                </button>
            </div>
        </div>
    );
};

export default OrderDetailPage;