import React from 'react';
import XIcon from './icons/XIcon';
import type { Notification } from '../types';
import CheckCircleIcon from './icons/CheckCircleIcon';
import TagIcon from './icons/TagIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';

const iconMap = {
    order: {
        icon: <CheckCircleIcon className="w-5 h-5 text-green-500" />,
        bg: 'bg-green-100'
    },
    promo: {
        icon: <TagIcon className="w-5 h-5 text-purple-500" />,
        bg: 'bg-purple-100'
    },
    account: {
        icon: <ShieldCheckIcon className="w-5 h-5 text-blue-600" />,
        bg: 'bg-blue-100'
    }
};

interface NotificationsPanelProps {
    notifications: Notification[];
    onClose: () => void;
    onMarkAllAsRead: () => void;
    onNotificationClick: (notification: Notification) => void;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ notifications, onClose, onMarkAllAsRead, onNotificationClick }) => {
    const hasUnread = notifications.some(n => !n.read);

    return (
        <div className="absolute top-0 left-0 right-0 z-20 bg-white/80 backdrop-blur-xl border-b border-slate-200 rounded-b-3xl shadow-2xl overflow-hidden animate-slide-down">
            <div className="p-4 border-b border-slate-200">
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-lg text-slate-800">Notifikasi</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 transition-colors" aria-label="Close notifications">
                        <XIcon className="w-5 h-5 text-slate-500" />
                    </button>
                </div>
            </div>
            <div className="p-2 max-h-80 overflow-y-auto space-y-1 scrollbar-hide">
                {notifications.length > 0 ? (
                    notifications.map(notif => {
                        const { icon, bg } = iconMap[notif.iconType];
                        const isRead = notif.read;
                        const isClickable = !isRead || !!notif.linkPath;

                        return (
                             <div 
                                key={notif.id}
                                onClick={() => onNotificationClick(notif)}
                                className={`flex items-start space-x-4 p-3 rounded-lg transition-all duration-300 ${isRead ? 'opacity-60' : ''} ${isClickable ? 'hover:bg-slate-100 cursor-pointer' : ''}`}
                            >
                                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${bg}`}>
                                    {icon}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                        {!isRead && <div className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0"></div>}
                                        <p className="font-semibold text-slate-800">{notif.title}</p>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-tight mt-0.5">{notif.description}</p>
                                    <p className="text-xs text-slate-500 mt-1">{notif.timestamp}</p>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className="text-center py-12">
                        <p className="text-slate-500">Tidak ada notifikasi baru.</p>
                    </div>
                )}
            </div>
            {hasUnread && (
                <div className="p-3 text-center border-t border-slate-200 bg-white/50">
                    <button onClick={onMarkAllAsRead} className="text-sm font-semibold text-orange-600 hover:text-orange-500 transition-colors">Tandai semua dibaca</button>
                </div>
            )}
        </div>
    );
};

export default NotificationsPanel;