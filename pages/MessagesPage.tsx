

import React, { useState, useEffect } from 'react';
import type { Message } from '../types';
import SearchIcon from '../components/icons/SearchIcon';
import ChatPage from './ChatPage';

const MessageItem: React.FC<{ message: Message; onClick: () => void }> = ({ message, onClick }) => (
    <button onClick={onClick} className="w-full bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center space-x-4 cursor-pointer hover:border-orange-400 hover:-translate-y-0.5 transition-all duration-200 text-left">
        <div className="relative">
            <img src={message.avatar} alt={message.senderName} className="w-14 h-14 rounded-full" />
            <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-white"></span>
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-slate-800">{message.senderName}</h3>
                <p className="text-xs text-slate-500">{message.timestamp}</p>
            </div>
            <div className="flex justify-between items-start mt-1">
                <p className="text-sm text-slate-600 truncate max-w-[180px]">{message.lastMessage}</p>
                {message.unreadCount > 0 && (
                    <span className="bg-orange-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">{message.unreadCount}</span>
                )}
            </div>
        </div>
    </button>
);

interface MessagesPageProps {
    messages: Message[];
    onReadMessage: (messageId: string) => void;
    setBottomNavVisible: (visible: boolean) => void;
}

const MessagesPage: React.FC<MessagesPageProps> = ({ messages, onReadMessage, setBottomNavVisible }) => {
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

    useEffect(() => {
        setBottomNavVisible(!selectedMessage);
    }, [selectedMessage, setBottomNavVisible]);

    const handleSelectMessage = (message: Message) => {
        if (message.unreadCount > 0) {
            onReadMessage(message.id);
        }
        setSelectedMessage(message);
    };

    if (selectedMessage) {
        return <ChatPage conversation={selectedMessage} onBack={() => setSelectedMessage(null)} />;
    }

    return (
        <div className="bg-slate-100 min-h-screen">
             <header className="bg-blue-800 text-white px-4 pb-4 pt-[calc(1rem+env(safe-area-inset-top))] rounded-b-[2rem] sticky top-0 z-10 shadow-lg shadow-blue-800/20">
                <h1 className="text-xl font-bold text-center mb-4">Pesan</h1>
                <div className="relative">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Cari pesan..."
                        className="w-full bg-white text-slate-800 rounded-lg py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>
            </header>
            <main className="p-4 space-y-3 pb-[calc(5rem+env(safe-area-inset-bottom))]">
                {messages.map(msg => <MessageItem key={msg.id} message={msg} onClick={() => handleSelectMessage(msg)} />)}
            </main>
        </div>
    );
};

export default MessagesPage;