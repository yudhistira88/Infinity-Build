
import React, { useState } from 'react';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import SearchIcon from '../components/icons/SearchIcon';
import ChevronDownIcon from '../components/icons/ChevronDownIcon';
import LifebuoyIcon from '../components/icons/LifebuoyIcon';
import ChatBubbleLeftRightIcon from '../components/icons/ChatBubbleLeftRightIcon';


interface HelpCenterPageProps {
    onBack: () => void;
}

const faqs = [
    { q: "Bagaimana cara memesan layanan?", a: "Anda dapat memesan layanan melalui halaman utama, pilih kategori atau cari layanan yang Anda butuhkan, lalu ikuti langkah-langkah pemesanan yang tersedia." },
    { q: "Apakah ada garansi untuk setiap pengerjaan?", a: "Ya, kami memberikan garansi pengerjaan untuk sebagian besar layanan kami. Detail garansi dapat dilihat pada halaman detail setiap layanan." },
    { q: "Bagaimana cara menghubungi penyedia jasa?", a: "Setelah pesanan Anda dikonfirmasi, Anda dapat menggunakan fitur Pesan di dalam aplikasi untuk berkomunikasi langsung dengan penyedia jasa." },
    { q: "Metode pembayaran apa saja yang diterima?", a: "Kami menerima berbagai metode pembayaran, termasuk transfer bank, kartu kredit, dan dompet digital." },
];

const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-slate-200">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left p-4 hover:bg-slate-50">
                <span className="font-semibold text-slate-800">{q}</span>
                <ChevronDownIcon className={`w-5 h-5 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="p-4 pt-0 text-slate-600">
                    <p>{a}</p>
                </div>
            )}
        </div>
    );
};

const HelpCenterPage: React.FC<HelpCenterPageProps> = ({ onBack }) => {
    return (
        <div className="bg-slate-100 min-h-screen flex flex-col animate-fade-in-up">
            <header className="bg-white sticky top-0 z-10 shadow-sm pt-[env(safe-area-inset-top)]">
                <div className="h-16 flex items-center px-4 relative">
                    <button onClick={onBack} className="absolute left-2 p-2 rounded-full hover:bg-slate-100" aria-label="Back">
                        <ChevronLeftIcon className="w-6 h-6 text-slate-700" />
                    </button>
                    <h1 className="text-lg font-bold text-center w-full text-slate-800">Pusat Bantuan</h1>
                </div>
            </header>

            <main className="flex-grow p-4 space-y-6">
                <div className="relative">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Cari pertanyaan Anda..."
                        className="w-full bg-white border border-slate-300 rounded-lg py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <h2 className="text-lg font-bold text-slate-800 p-4">Pertanyaan Umum</h2>
                    {faqs.map((faq, i) => <FaqItem key={i} {...faq} />)}
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center space-x-3 mb-3">
                        <LifebuoyIcon className="w-6 h-6 text-blue-800" />
                         <h2 className="text-lg font-bold text-slate-800">Butuh Bantuan Lain?</h2>
                    </div>
                    <p className="text-slate-600 mb-4">Tim kami siap membantu Anda jika tidak menemukan jawaban dari pertanyaan Anda.</p>
                    <button className="w-full bg-orange-500 text-white font-bold py-3 px-5 rounded-lg shadow-md hover:bg-orange-600 transition-all flex items-center justify-center space-x-2">
                        <ChatBubbleLeftRightIcon className="w-5 h-5"/>
                        <span>Chat dengan Customer Service</span>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default HelpCenterPage;