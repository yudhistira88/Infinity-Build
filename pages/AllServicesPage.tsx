
import React, { useState, useEffect, useRef } from 'react';
import DotsGridIcon from '../components/icons/DotsGridIcon';
import ListIcon from '../components/icons/ListIcon';
import ChevronRightIcon from '../components/icons/ChevronRightIcon';
import { popularServicesData } from '../data/services';
import type { Service } from '../types';

interface JobType {
  name: string;
  image: string;
  categoryLink: string; 
  description: string;
}

interface ServiceGroup {
  groupName: string;
  jobTypes: JobType[];
}

const originalServiceGroupsData: ServiceGroup[] = [
    {
        groupName: 'Desain Konstruksi',
        jobTypes: [
            { name: 'Denah 2D', image: 'https://picsum.photos/seed/denah2d/200/200', categoryLink: 'Desain Konstruksi', description: 'Rancangan denah 2D detail untuk tata ruang.' },
            { name: 'Desain 2D\nLengkap', image: 'https://picsum.photos/seed/desain2dlengkap/200/200', categoryLink: 'Desain Konstruksi', description: 'Gambar kerja lengkap untuk denah, tampak, dan potongan.' },
            { name: 'Desain 3D', image: 'https://picsum.photos/seed/desain3d/200/200', categoryLink: 'Desain Konstruksi', description: 'Visualisasi 3D fotorealistik untuk proyek Anda.' },
            { name: 'RAB', image: 'https://picsum.photos/seed/rab/200/200', categoryLink: 'Desain Konstruksi', description: 'Perhitungan detail Rencana Anggaran Biaya proyek.' },
            { name: 'Analisa\nStruktur', image: 'https://picsum.photos/seed/struktur/200/200', categoryLink: 'Desain Konstruksi', description: 'Analisa kekuatan dan kelayakan struktur bangunan.' },
            { name: 'Gambar\nIMB/PBG', image: 'https://picsum.photos/seed/imbpbg/200/200', categoryLink: 'Desain Konstruksi', description: 'Penyusunan gambar teknis untuk perizinan IMB/PBG.' },
        ]
    },
    {
        groupName: 'Bangun / Renovasi',
        jobTypes: [
            { name: 'Bangun', image: 'https://picsum.photos/seed/bangun/200/200', categoryLink: 'Bangun / Renovasi', description: 'Wujudkan bangunan impian dari nol hingga serah terima kunci.' },
            { name: 'Renovasi', image: 'https://picsum.photos/seed/renovasi/200/200', categoryLink: 'Bangun / Renovasi', description: 'Perbarui dan perbaiki bagian bangunan sesuai kebutuhan Anda.' },
        ]
    },
    {
        groupName: 'Repair Maintenance',
        jobTypes: [
            { name: 'RM\nBangunan', image: 'https://picsum.photos/seed/rmbangunan/200/200', categoryLink: 'Repair Maintenance', description: 'Perbaikan dan pemeliharaan struktur bangunan.' },
            { name: 'RM MEP', image: 'https://picsum.photos/seed/rmmep/200/200', categoryLink: 'Repair Maintenance', description: 'Pemeliharaan sistem Mekanikal, Elektrikal, & Plumbing.' },
            { name: 'RM Interior\n& Eksterior', image: 'https://picsum.photos/seed/rmie/200/200', categoryLink: 'Repair Maintenance', description: 'Perbaikan dan perawatan elemen interior dan eksterior.' },
            { name: 'RM\nFurniture', image: 'https://picsum.photos/seed/rmfurniture/200/200', categoryLink: 'Repair Maintenance', description: 'Servis dan perbaikan furniture Anda.' },
        ]
    },
    {
        groupName: 'Pabrikasi',
        jobTypes: [
            { name: 'Canopy', image: 'https://picsum.photos/seed/canopy/200/200', categoryLink: 'Pabrikasi', description: 'Pemasangan kanopi berkualitas untuk carport atau teras.' },
            { name: 'Pagar', image: 'https://picsum.photos/seed/pagarbesi/200/200', categoryLink: 'Pabrikasi', description: 'Pembuatan pagar dengan berbagai material dan desain.' },
            { name: 'Gazebo', image: 'https://picsum.photos/seed/gazebo/200/200', categoryLink: 'Pabrikasi', description: 'Pembuatan gazebo untuk menambah estetika taman Anda.' },
            { name: 'Shelter\n/ Halte', image: 'https://picsum.photos/seed/shelter/200/200', categoryLink: 'Pabrikasi', description: 'Pabrikasi shelter atau halte custom sesuai kebutuhan.' },
            { name: 'JPU', image: 'https://picsum.photos/seed/jpu/200/200', categoryLink: 'Pabrikasi', description: 'Pabrikasi Jembatan Penyeberangan Umum (JPU).' },
        ]
    },
    {
        groupName: 'Interior',
        jobTypes: [
            { name: 'Interior', image: 'https://picsum.photos/seed/interior/200/200', categoryLink: 'Interior', description: 'Desain dan pengerjaan interior ruangan.' },
            { name: 'Eksterior', image: 'https://picsum.photos/seed/eksterior/200/200', categoryLink: 'Interior', description: 'Desain dan pengerjaan eksterior bangunan.' },
            { name: 'Kitchen Set', image: 'https://picsum.photos/seed/kitchen/200/200', categoryLink: 'Interior', description: 'Pembuatan kitchen set custom sesuai desain dan ukuran.' },
            { name: 'Furniture', image: 'https://picsum.photos/seed/furniture/200/200', categoryLink: 'Interior', description: 'Pembuatan furniture custom sesuai keinginan.' },
        ]
    },
    {
        groupName: 'Panggil Tukang',
        jobTypes: [
            { name: 'Tukang\nHarian', image: 'https://picsum.photos/seed/tukang/200/200', categoryLink: 'Panggil Tukang', description: 'Tukang terampil untuk pekerjaan konstruksi harian.' },
            { name: 'Tukang\nBorongan', image: 'https://picsum.photos/seed/borongan/200/200', categoryLink: 'Panggil Tukang', description: 'Pengerjaan proyek dengan sistem borongan.' },
        ]
    }
];


const allJobTypes: JobType[] = originalServiceGroupsData.flatMap(group => group.jobTypes);

const originalAllJobTypes = originalServiceGroupsData.flatMap(g => g.jobTypes);

const popularJobTypes: JobType[] = popularServicesData.map((s: Service) => {
    const originalJob = originalAllJobTypes.find(job => job.image === s.image && job.categoryLink === s.category);
    
    return {
        name: originalJob ? originalJob.name : s.name,
        image: s.image,
        categoryLink: s.category,
        description: s.description || `Layanan populer dalam kategori ${s.category}.`
    };
});

const popularServicesGroup: ServiceGroup = {
    groupName: 'Populer',
    jobTypes: popularJobTypes,
};


const serviceGroupsData: ServiceGroup[] = [
    {
        groupName: 'Semua',
        jobTypes: allJobTypes
    },
    popularServicesGroup,
    ...originalServiceGroupsData
];


interface AllServicesPageProps {
    onBack: () => void;
    onJobTypeSelect: (category: string) => void;
    initialCategoryGroupName: string;
}

const JobTypeGridCard: React.FC<{ jobType: JobType; onClick: () => void; }> = ({ jobType, onClick }) => (
    <button onClick={onClick} className="text-center group flex flex-col items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-lg">
        <div className="w-full aspect-square rounded-lg flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 overflow-hidden">
            <img src={jobType.image} alt={jobType.name} className="w-full h-full object-cover" />
        </div>
        <p className="mt-2 text-sm font-semibold text-slate-700 leading-tight whitespace-pre-line text-center">{jobType.name}</p>
    </button>
);

const JobTypeListCard: React.FC<{ jobType: JobType; onClick: () => void; }> = ({ jobType, onClick }) => (
    <button onClick={onClick} className="w-full flex items-center bg-white p-3 rounded-xl border border-slate-200 space-x-4 transition-all duration-300 hover:shadow-md hover:border-blue-400 text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        <img src={jobType.image} alt={jobType.name.replace(/\n/g, ' ')} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
        <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-800">{jobType.name.replace(/\n/g, ' ')}</h3>
            <p className="text-sm text-slate-600 mt-1 line-clamp-2">{jobType.description}</p>
        </div>
        <ChevronRightIcon className="w-5 h-5 text-slate-400" />
    </button>
);

const AllServicesPage: React.FC<AllServicesPageProps> = ({ onBack, onJobTypeSelect, initialCategoryGroupName }) => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [isClosing, setIsClosing] = useState(false);
    const [activeGroupName, setActiveGroupName] = useState(initialCategoryGroupName);
    
    const tabContainerRef = useRef<HTMLDivElement>(null);
    const activeTabRef = useRef<HTMLButtonElement>(null);

    const categoryTabs = serviceGroupsData.map(g => g.groupName);
    const activeGroup = serviceGroupsData.find(g => g.groupName === activeGroupName);
    
    useEffect(() => {
        if (activeTabRef.current) {
            activeTabRef.current.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest'
            });
        }
    }, [activeGroupName]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(onBack, 300); // Wait for animation to finish
    };
    
    // Handle closing with Escape key
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="fixed inset-0 z-20 flex flex-col justify-end" role="dialog" aria-modal="true">
            <div className={`fixed inset-0 bg-black/40 ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`} onClick={handleClose}></div>
            <div className={`bg-white rounded-t-2xl w-full max-w-sm mx-auto shadow-xl z-10 flex flex-col ${isClosing ? 'animate-sheet-slide-down' : 'animate-slide-up'}`} style={{ height: '90vh' }}>
                <header className="py-4 px-4 sticky top-0 bg-white z-10 rounded-t-2xl flex-shrink-0">
                    <div className="w-10 h-1.5 bg-slate-200 rounded-full mx-auto mb-4 cursor-pointer" onClick={handleClose}></div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold text-slate-900">Semua</h1>
                        <div className="flex items-center bg-slate-100 rounded-lg p-1 space-x-1">
                             <button 
                                onClick={() => setViewMode('grid')} 
                                className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all duration-200 flex items-center space-x-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow' : 'text-slate-700'}`}
                                aria-label="Grid view"
                                aria-pressed={viewMode === 'grid'}
                            >
                                <DotsGridIcon className="w-4 h-4" />
                                <span>Grid</span>
                            </button>
                            <button 
                                onClick={() => setViewMode('list')} 
                                className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all duration-200 flex items-center space-x-2 ${viewMode === 'list' ? 'bg-blue-600 text-white shadow' : 'text-slate-700'}`}
                                aria-label="List view"
                                aria-pressed={viewMode === 'list'}
                            >
                                <ListIcon className="w-4 h-4" />
                                <span>List</span>
                            </button>
                        </div>
                    </div>
                </header>

                <div ref={tabContainerRef} className="flex-shrink-0 border-b border-slate-200 bg-white">
                    <div className="flex space-x-3 overflow-x-auto scrollbar-hide px-4 py-2">
                        {categoryTabs.map(tab => {
                            const isActive = activeGroupName === tab;
                            return (
                                <button
                                    ref={isActive ? activeTabRef : null}
                                    key={tab}
                                    onClick={() => setActiveGroupName(tab)}
                                    className={`flex-shrink-0 px-4 py-2 text-sm font-semibold whitespace-nowrap rounded-full transition-colors duration-200 ${
                                        isActive ? 'bg-blue-800 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
                                    }`}
                                >
                                    {tab}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <main className="flex-grow p-4 overflow-y-auto scrollbar-hide">
                    {activeGroupName === 'Semua' ? (
                        <div className="space-y-6">
                            {originalServiceGroupsData.map(group => (
                                <section key={group.groupName} className="animate-fade-in-up">
                                    <h2 className="text-lg font-bold text-slate-800 mb-3">{group.groupName}</h2>
                                    {viewMode === 'grid' ? (
                                        <div className="grid grid-cols-3 gap-4">
                                            {group.jobTypes.map(job => (
                                                <JobTypeGridCard key={job.name} jobType={job} onClick={() => onJobTypeSelect(job.categoryLink)} />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {group.jobTypes.map(job => (
                                                <JobTypeListCard key={job.name} jobType={job} onClick={() => onJobTypeSelect(job.categoryLink)} />
                                            ))}
                                        </div>
                                    )}
                                </section>
                            ))}
                        </div>
                    ) : (
                        activeGroup && (
                            <section key={activeGroup.groupName} className="animate-fade-in-up">
                                {viewMode === 'grid' ? (
                                    <div className="grid grid-cols-3 gap-4">
                                        {activeGroup.jobTypes.map(job => (
                                            <JobTypeGridCard key={job.name} jobType={job} onClick={() => onJobTypeSelect(job.categoryLink)} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {activeGroup.jobTypes.map(job => (
                                            <JobTypeListCard key={job.name} jobType={job} onClick={() => onJobTypeSelect(job.categoryLink)} />
                                        ))}
                                    </div>
                                )}
                            </section>
                        )
                    )}
                </main>
            </div>
        </div>
    );
};

export default AllServicesPage;
