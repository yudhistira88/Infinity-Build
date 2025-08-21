
import React, { useState, useRef, useEffect } from 'react';
import type { Message, ChatMessage } from '../types';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import PhoneIcon from '../components/icons/PhoneIcon';
import PaperAirplaneIcon from '../components/icons/PaperAirplaneIcon';
import PaperclipIcon from '../components/icons/PaperclipIcon';

interface ChatPageProps {
    conversation: Message;
    onBack: () => void;
}

const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
    const isUser = message.sender === 'user';
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md px-4 py-2.5 rounded-2xl ${isUser ? 'bg-blue-800 text-white rounded-br-lg' : 'bg-white text-slate-800 border border-slate-200 rounded-bl-lg'}`}>
                <p className="text-sm leading-snug">{message.text}</p>
                <p className={`text-xs mt-1.5 ${isUser ? 'text-blue-300' : 'text-slate-500'} text-right`}>{message.timestamp}</p>
            </div>
        </div>
    );
};

const ChatPage: React.FC<ChatPageProps> = ({ conversation, onBack }) => {
    const [messages, setMessages] = useState<ChatMessage[]>(conversation.messages || []);
    const [newMessage, setNewMessage] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const message: ChatMessage = {
            id: `m${messages.length + 1}`,
            text: newMessage,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages([...messages, message]);
        setNewMessage('');
    };

    return (
        <div className="bg-slate-100 min-h-screen flex flex-col animate-fade-in-up">
            <header className="bg-white sticky top-0 z-10 shadow-sm pt-[env(safe-area-inset-top)] border-b border-slate-200">
                <div className="h-16 flex items-center px-2 relative">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-100" aria-label="Back">
                        <ChevronLeftIcon className="w-6 h-6 text-slate-700" />
                    </button>
                    <div className="flex items-center space-x-3 ml-2">
                        <img src={conversation.avatar} alt={conversation.senderName} className="w-10 h-10 rounded-full" />
                        <div>
                            <h1 className="text-md font-bold text-slate-800">{conversation.senderName}</h1>
                            <p className="text-xs text-green-600 font-semibold">Online</p>
                        </div>
                    </div>
                    <div className="absolute right-2 flex items-center space-x-1">
                        <button className="p-2 rounded-full hover:bg-slate-100">
                            <PhoneIcon className="w-6 h-6 text-slate-600" />
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-grow p-4 space-y-4 overflow-y-auto">
                {messages.map((msg) => <ChatBubble key={msg.id} message={msg} />)}
                <div ref={chatEndRef} />
            </main>

            <footer className="sticky bottom-0 bg-white border-t border-slate-200 p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    <button type="button" className="p-3 rounded-full hover:bg-slate-100 text-slate-500">
                        <PaperclipIcon className="w-6 h-6" />
                    </button>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Ketik pesan..."
                        className="flex-grow bg-slate-100 border-transparent rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <button type="submit" className="p-3 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors disabled:opacity-50" disabled={!newMessage.trim()}>
                        <PaperAirplaneIcon className="w-6 h-6" />
                    </button>
                </form>
            </footer>
        </div>
    );
};

export default ChatPage;