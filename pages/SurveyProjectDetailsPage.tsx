
import React, { useState, useMemo, useRef, useEffect } from 'react';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import ChevronDownIcon from '../components/icons/ChevronDownIcon';
import BuildingOfficeIcon from '../components/icons/BuildingOfficeIcon';
import BuildingLibraryIcon from '../components/icons/BuildingLibraryIcon';
import ArrowsPointingOutIcon from '../components/icons/ArrowsPointingOutIcon';
import InformationCircleIcon from '../components/icons/InformationCircleIcon';
import CostDetailsModal from '../components/CostDetailsModal';
import HomeModernIcon from '../components/icons/HomeModernIcon';
import WrenchScrewdriverIcon from '../components/icons/WrenchScrewdriverIcon';
import SurveyStepper from '../components/SurveyStepper';
import Squares2x2Icon from '../components/icons/Squares2x2Icon';
import DocumentTextIcon from '../components/icons/DocumentTextIcon';
import CameraIcon from '../components/icons/CameraIcon';
import DocumentArrowUpIcon from '../components/icons/DocumentArrowUpIcon';
import SpinnerIcon from '../components/icons/SpinnerIcon';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';
import ArrowUpOnSquareIcon from '../components/icons/ArrowUpOnSquareIcon';
import TrashIcon from '../components/icons/TrashIcon';
import PencilIcon from '../components/icons/PencilIcon';
import CubeTransparentIcon from '../components/icons/CubeTransparentIcon';


interface SurveyProjectDetailsPageProps {
    categoryName: string;
    onBack: () => void;
    onNext: (data: any) => void;
    initialData: any;
}

const JobTypeCard: React.FC<{ icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void; }> = ({ icon, label, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full p-4 rounded-lg border-2 flex flex-col items-center justify-center space-y-2 transition-all duration-200 ${
                isActive 
                ? 'border-blue-800 bg-blue-50 text-blue-800' 
                : 'border-slate-300 bg-slate-50 text-slate-600 hover:border-slate-400'
            }`}
        >
            <div className="text-inherit">{icon}</div>
            <span className="font-semibold text-sm">{label}</span>
        </button>
    );
};


const EditableFormField: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    isOptional?: boolean;
    type?: string;
    placeholder?: string;
    rows?: number;
    options?: string[];
    id: string;
}> = ({ icon, label, value, onChange, isOptional, type = 'text', placeholder, rows, options, id }) => {
    
    const commonInputClasses = "w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all";
    
    const renderInput = () => {
        if (type === 'textarea') {
            return <textarea id={id} value={value} onChange={onChange} placeholder={placeholder} rows={rows || 3} className={`${commonInputClasses} resize-none`} />;
        }
        if (type === 'select' && options) {
            return (
                <div className="relative">
                    <select id={id} value={value} onChange={onChange} className={`${commonInputClasses} appearance-none pr-8`}>
                        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                </div>
            );
        }
        return <input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} className={commonInputClasses} />;
    };

    const hasAsterisk = label.includes('*');
    const labelText = hasAsterisk ? label.replace('*', '') : label;


    return (
        <div className="py-3">
            <label htmlFor={id} className="flex items-center space-x-3 text-sm text-slate-500 mb-2">
                <div className="flex-shrink-0">{icon}</div>
                <span>
                    {labelText}
                    {hasAsterisk && <span className="text-red-500">*</span>}
                    {isOptional && <span className="text-orange-500 ml-1.5 font-medium">(Optional)</span>}
                </span>
            </label>
            <div className="pl-9">
                {renderInput()}
            </div>
        </div>
    );
};

const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const FileThumbnail: React.FC<{ file: File }> = ({ file }) => {
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (file.type.startsWith('image/')) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [file]);

    if (preview) {
        return <img src={preview} alt={file.name} className="w-12 h-12 object-cover rounded-md flex-shrink-0" />;
    }

    return (
        <div className="w-12 h-12 bg-slate-200 rounded-md flex items-center justify-center flex-shrink-0">
            <DocumentTextIcon className="w-6 h-6 text-slate-500" />
        </div>
    );
};


const FileUploadField: React.FC<{
    id: string;
    icon: React.ReactNode;
    label: string;
    onFilesChange: (files: File[]) => void;
    selectedFiles: File[];
    accept: string;
    isOptional?: boolean;
}> = ({ id, icon, label, onFilesChange, selectedFiles, accept, isOptional }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success'>('idle');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;

        const newFiles = Array.from(event.target.files);
        const validFiles: File[] = [];
        const oversizedFiles: string[] = [];

        newFiles.forEach(file => {
            if (file.size > MAX_FILE_SIZE_BYTES) {
                oversizedFiles.push(file.name);
            } else {
                validFiles.push(file);
            }
        });

        if (oversizedFiles.length > 0) {
            alert(`File berikut melebihi batas ${MAX_FILE_SIZE_MB}MB dan tidak akan ditambahkan:\n- ${oversizedFiles.join('\n- ')}`);
        }

        if (validFiles.length > 0) {
            onFilesChange([...selectedFiles, ...validFiles]);
            setUploadStatus('uploading');
            setTimeout(() => {
                setUploadStatus('success');
                setTimeout(() => setUploadStatus('idle'), 2000);
            }, 1500);
        }
        event.target.value = ''; // Reset input to allow re-uploading the same file
    };
    
    const handleRemoveFile = (indexToRemove: number) => {
        onFilesChange(selectedFiles.filter((_, index) => index !== indexToRemove));
    };


    const triggerFileInput = () => {
        if (uploadStatus === 'uploading') return;
        fileInputRef.current?.click();
    };
    
    const renderButtonContent = () => {
        const hasFiles = selectedFiles.length > 0;
        switch (uploadStatus) {
            case 'uploading':
                return (
                    <>
                        <SpinnerIcon className="w-6 h-6 text-slate-500 mr-3" />
                        <span className="text-sm font-semibold text-slate-600">Mengunggah...</span>
                    </>
                );
            case 'success':
                return (
                     <>
                        <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3" />
                        <span className="text-sm font-semibold text-green-600">Unggahan Selesai!</span>
                    </>
                );
            case 'idle':
            default:
                return (
                    <div className="flex flex-col items-center justify-center p-4 text-center">
                        <ArrowUpOnSquareIcon className="w-8 h-8 text-slate-400 mb-2" />
                        <span className="text-sm font-semibold text-blue-800">
                           {hasFiles ? 'Tambah File Lain' : 'Pilih File untuk Diunggah'}
                        </span>
                        <span className="text-xs text-slate-500 mt-1">
                           Maksimal {MAX_FILE_SIZE_MB}MB per file
                        </span>
                    </div>
                );
        }
    };

    return (
        <div className="py-3">
            <label className="flex items-center space-x-3 text-sm text-slate-500 mb-2">
                <div className="flex-shrink-0">{icon}</div>
                <span>
                    {label}
                    {isOptional && <span className="text-orange-500 ml-1.5 font-medium">(Optional)</span>}
                </span>
            </label>
            <div className="pl-9">
                <input
                    type="file"
                    id={id}
                    ref={fileInputRef}
                    multiple
                    accept={accept}
                    onChange={handleFileChange}
                    className="hidden"
                />

                {selectedFiles.length > 0 && (
                    <div className="space-y-2 mb-3">
                        {selectedFiles.map((file, index) => (
                            <div key={`${file.name}-${index}`} className="bg-slate-100 p-2 rounded-lg flex items-center space-x-3 animate-fade-in-up">
                                <FileThumbnail file={file} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-slate-800 truncate">{file.name}</p>
                                    <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveFile(index)}
                                    className="p-1.5 rounded-full text-slate-500 hover:bg-red-100 hover:text-red-600 transition-colors"
                                    aria-label={`Hapus ${file.name}`}
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <button
                    type="button"
                    onClick={triggerFileInput}
                    disabled={uploadStatus === 'uploading'}
                     className={`w-full flex items-center justify-center border-2 border-dashed rounded-lg transition-all duration-300 ${
                        uploadStatus === 'uploading' 
                            ? 'border-slate-300 bg-slate-100 cursor-wait h-[106px]'
                            : uploadStatus === 'success'
                            ? 'border-green-400 bg-green-50 h-[106px]'
                            : selectedFiles.length > 0
                            ? 'border-slate-300 bg-white py-3 hover:border-blue-800'
                            : 'border-slate-300 h-[106px] hover:bg-slate-50 hover:border-blue-800'
                    }`}
                >
                   {renderButtonContent()}
                </button>
            </div>
        </div>
    );
};

const interiorJobTypes = [
    { id: 'Interior', label: 'Interior', icon: <Squares2x2Icon className="w-7 h-7" /> },
    { id: 'Eksterior', label: 'Eksterior', icon: <HomeModernIcon className="w-7 h-7" /> },
    { id: 'Kitchen Set', label: 'Kitchen Set', icon: <WrenchScrewdriverIcon className="w-7 h-7" /> },
    { id: 'Furniture', label: 'Furniture', icon: <CubeTransparentIcon className="w-7 h-7" /> },
];

const buildRenovateJobTypes = [
    { id: 'Bangun', label: 'Bangun', icon: <HomeModernIcon className="w-7 h-7" /> },
    { id: 'Renovasi', label: 'Renovasi', icon: <WrenchScrewdriverIcon className="w-7 h-7" /> },
];

const SurveyProjectDetailsPage: React.FC<SurveyProjectDetailsPageProps> = ({ categoryName, onBack, onNext, initialData }) => {
    
    const [isCostModalOpen, setIsCostModalOpen] = useState(false);
    
    const jobTypesToShow = categoryName === 'Interior / Eksterior' ? interiorJobTypes : buildRenovateJobTypes;
    
    const [jobType, setJobType] = useState(initialData.jobType || jobTypesToShow[0].id);
    const [photos, setPhotos] = useState<File[]>(initialData.photos || []);
    const [documents, setDocuments] = useState<File[]>(initialData.documents || []);
    const [totalCost, setTotalCost] = useState(initialData.totalCost || 200000);

    const SURVEY_BASE_COST = 200000;
    const PROPERTY_SURCHARGE = 20000;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };
    
    // State for Bangun / Renovasi forms
    const [bangunData, setBangunData] = useState({
        jenisProperti: initialData.jenisProperti || 'Rumah',
        jumlahLantai: initialData.jumlahLantai || '2 Lantai',
        luasTanah: initialData.luasTanah || '',
        luasBangunan: initialData.luasBangunan || '',
        infoTambahan: initialData.infoTambahan || ''
    });

    const [renovasiData, setRenovasiData] = useState({
        jenisProperti: initialData.jenisProperti || 'Rumah',
        ruanganDirenovasi: initialData.ruanganDirenovasi || '',
        detailPekerjaan: initialData.detailPekerjaan || '',
        estimasiLuas: initialData.estimasiLuas || '',
    });
    
    // State for Interior / Eksterior forms
    const [interiorData, setInteriorData] = useState({
        jenisProperti: initialData.jenisProperti || 'Rumah',
        ruangan: initialData.ruangan || '',
        gayaDesain: initialData.gayaDesain || '',
        detailPekerjaan: initialData.detailPekerjaan || '',
        estimasiLuas: initialData.estimasiLuas || '',
    });

    const [eksteriorData, setEksteriorData] = useState({
        jenisProperti: initialData.jenisProperti || 'Rumah',
        areaEksterior: initialData.areaEksterior || '',
        detailPekerjaan: initialData.detailPekerjaan || '',
        estimasiLuas: initialData.estimasiLuas || '',
    });

    const [kitchenSetData, setKitchenSetData] = useState({
        jenisProperti: initialData.jenisProperti || 'Rumah',
        bentukDapur: initialData.bentukDapur || 'L-Shape',
        material: initialData.material || '',
        estimasiUkuran: initialData.estimasiUkuran || '',
        infoTambahan: initialData.infoTambahan || '',
    });

    const [furnitureData, setFurnitureData] = useState({
        jenisFurniture: initialData.jenisFurniture || '',
        jumlah: initialData.jumlah || 1,
        material: initialData.material || '',
        estimasiUkuran: initialData.estimasiUkuran || '',
        infoTambahan: initialData.infoTambahan || '',
    });

    const handleBangunChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setBangunData(prev => ({ ...prev, [id]: value }));
    };

    const handleRenovasiChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setRenovasiData(prev => ({ ...prev, [id]: value }));
    };
    
    const handleInteriorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setInteriorData(prev => ({ ...prev, [id]: value }));
    };
    
    const handleEksteriorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setEksteriorData(prev => ({ ...prev, [id]: value }));
    };

    const handleKitchenSetChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setKitchenSetData(prev => ({ ...prev, [id]: value }));
    };
    
    const handleFurnitureChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFurnitureData(prev => ({ ...prev, [id]: value }));
    };

    const activeFormData = useMemo(() => {
        if (categoryName === 'Interior / Eksterior') {
            switch (jobType) {
                case 'Interior': return interiorData;
                case 'Eksterior': return eksteriorData;
                case 'Kitchen Set': return kitchenSetData;
                case 'Furniture': return null;
                default: return null;
            }
        }
        return jobType === 'Bangun' ? bangunData : renovasiData;
    }, [categoryName, jobType, bangunData, renovasiData, interiorData, eksteriorData, kitchenSetData]);

    useEffect(() => {
        let cost = SURVEY_BASE_COST;
        const propertyType = activeFormData?.jenisProperti;
        
        if (propertyType && propertyType !== 'Rumah') {
            cost += PROPERTY_SURCHARGE;
        }
        setTotalCost(cost);
    }, [activeFormData]);

    const isFormValid = useMemo(() => {
        if (categoryName === 'Interior / Eksterior') {
            switch (jobType) {
                case 'Interior':
                    return !!(interiorData.jenisProperti && interiorData.ruangan && interiorData.detailPekerjaan);
                case 'Eksterior':
                    return !!(eksteriorData.jenisProperti && eksteriorData.areaEksterior && eksteriorData.detailPekerjaan);
                case 'Kitchen Set':
                    return !!(kitchenSetData.jenisProperti && kitchenSetData.bentukDapur && kitchenSetData.material);
                case 'Furniture':
                    return !!(furnitureData.jenisFurniture && furnitureData.jumlah > 0 && furnitureData.material);
                default:
                    return false;
            }
        }
        // Existing logic
        if (jobType === 'Bangun') {
            return !!(bangunData.jenisProperti && bangunData.jumlahLantai && bangunData.luasTanah && bangunData.luasBangunan);
        }
        if (jobType === 'Renovasi') {
            return !!(renovasiData.jenisProperti && renovasiData.ruanganDirenovasi && renovasiData.detailPekerjaan);
        }
        return false;
    }, [categoryName, jobType, bangunData, renovasiData, interiorData, eksteriorData, kitchenSetData, furnitureData]);

    const handleLanjutkan = () => {
        let dataToPass = {};
        if (categoryName === 'Interior / Eksterior') {
            switch (jobType) {
                case 'Interior': dataToPass = interiorData; break;
                case 'Eksterior': dataToPass = eksteriorData; break;
                case 'Kitchen Set': dataToPass = kitchenSetData; break;
                case 'Furniture': dataToPass = furnitureData; break;
            }
        } else {
            dataToPass = jobType === 'Bangun' ? bangunData : renovasiData;
        }
        onNext({ jobType, ...dataToPass, photos, documents, totalCost });
    };
    
    const renderBangunForm = () => (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100 animate-fade-in-up">
            <EditableFormField id="jenisProperti" icon={<BuildingOfficeIcon className="w-6 h-6" />} label="Jenis Properti*" value={bangunData.jenisProperti} onChange={handleBangunChange} type="select" options={['Rumah', 'Ruko', 'Apartemen', 'Gudang', 'Kantor']} />
            <EditableFormField id="jumlahLantai" icon={<BuildingLibraryIcon className="w-6 h-6" />} label="Jumlah Lantai*" value={bangunData.jumlahLantai} onChange={handleBangunChange} type="select" options={['1 Lantai', '2 Lantai', '3 Lantai', '4+ Lantai']} />
            <EditableFormField id="luasTanah" icon={<ArrowsPointingOutIcon className="w-6 h-6" />} label="Luas Tanah (m²)*" value={bangunData.luasTanah} onChange={handleBangunChange} type="number" placeholder="Contoh: 100" />
            <EditableFormField id="luasBangunan" icon={<ArrowsPointingOutIcon className="w-6 h-6" />} label="Luas Bangunan (m²)*" value={bangunData.luasBangunan} onChange={handleBangunChange} type="number" placeholder="Contoh: 80" />
            <EditableFormField id="infoTambahan" icon={<InformationCircleIcon className="w-6 h-6" />} label="Informasi Tambahan" value={bangunData.infoTambahan} onChange={handleBangunChange} isOptional type="textarea" placeholder="Contoh: Ingin model minimalis, sudah ada desain sendiri" />
            <FileUploadField id="photos" icon={<CameraIcon className="w-6 h-6" />} label="Foto Kondisi" onFilesChange={setPhotos} selectedFiles={photos} accept="image/*" isOptional />
            <FileUploadField id="documents" icon={<DocumentArrowUpIcon className="w-6 h-6" />} label="Dokumen Pendukung" onFilesChange={setDocuments} selectedFiles={documents} accept=".pdf,.doc,.docx,.jpg,.png" isOptional />
        </div>
    );

    const renderRenovasiForm = () => (
         <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100 animate-fade-in-up">
            <EditableFormField id="jenisProperti" icon={<BuildingOfficeIcon className="w-6 h-6" />} label="Jenis Properti*" value={renovasiData.jenisProperti} onChange={handleRenovasiChange} type="select" options={['Rumah', 'Ruko', 'Apartemen', 'Gudang', 'Kantor']} />
            <EditableFormField id="ruanganDirenovasi" icon={<Squares2x2Icon className="w-6 h-6" />} label="Ruangan yang Direnovasi*" value={renovasiData.ruanganDirenovasi} onChange={handleRenovasiChange} type="text" placeholder="Contoh: Dapur, Kamar Mandi" />
            <EditableFormField id="detailPekerjaan" icon={<DocumentTextIcon className="w-6 h-6" />} label="Detail Pekerjaan*" value={renovasiData.detailPekerjaan} onChange={handleRenovasiChange} type="textarea" placeholder="Contoh: Ganti keramik, perbaiki atap bocor" />
            <EditableFormField id="estimasiLuas" icon={<ArrowsPointingOutIcon className="w-6 h-6" />} label="Estimasi Luas Renovasi (m²)" value={renovasiData.estimasiLuas} onChange={handleRenovasiChange} isOptional type="number" placeholder="Contoh: 25" />
            <FileUploadField id="photos" icon={<CameraIcon className="w-6 h-6" />} label="Foto Kondisi" onFilesChange={setPhotos} selectedFiles={photos} accept="image/*" isOptional />
            <FileUploadField id="documents" icon={<DocumentArrowUpIcon className="w-6 h-6" />} label="Dokumen Pendukung" onFilesChange={setDocuments} selectedFiles={documents} accept=".pdf,.doc,.docx,.jpg,.png" isOptional />
        </div>
    );
    
    const renderInteriorForm = () => (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100 animate-fade-in-up">
            <EditableFormField id="jenisProperti" icon={<BuildingOfficeIcon className="w-6 h-6" />} label="Jenis Properti*" value={interiorData.jenisProperti} onChange={handleInteriorChange} type="select" options={['Rumah', 'Apartemen', 'Kantor', 'Ruko']} />
            <EditableFormField id="ruangan" icon={<Squares2x2Icon className="w-6 h-6" />} label="Ruangan yang Dikerjakan*" value={interiorData.ruangan} onChange={handleInteriorChange} type="text" placeholder="Contoh: Ruang Tamu, Kamar Tidur" />
            <EditableFormField id="gayaDesain" icon={<PencilIcon className="w-6 h-6" />} label="Gaya Desain" value={interiorData.gayaDesain} onChange={handleInteriorChange} isOptional type="text" placeholder="Contoh: Minimalis, Industrial" />
            <EditableFormField id="detailPekerjaan" icon={<DocumentTextIcon className="w-6 h-6" />} label="Detail Pekerjaan*" value={interiorData.detailPekerjaan} onChange={handleInteriorChange} type="textarea" placeholder="Contoh: Pengecatan, pasang wallpaper" />
            <EditableFormField id="estimasiLuas" icon={<ArrowsPointingOutIcon className="w-6 h-6" />} label="Estimasi Luas (m²)" value={interiorData.estimasiLuas} onChange={handleInteriorChange} isOptional type="number" placeholder="Contoh: 20" />
            <FileUploadField id="photos" icon={<CameraIcon className="w-6 h-6" />} label="Foto Referensi / Kondisi" onFilesChange={setPhotos} selectedFiles={photos} accept="image/*" isOptional />
            <FileUploadField id="documents" icon={<DocumentArrowUpIcon className="w-6 h-6" />} label="Dokumen Pendukung" onFilesChange={setDocuments} selectedFiles={documents} accept=".pdf,.doc,.docx,.jpg,.png" isOptional />
        </div>
    );
    
    const renderEksteriorForm = () => (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100 animate-fade-in-up">
            <EditableFormField id="jenisProperti" icon={<BuildingOfficeIcon className="w-6 h-6" />} label="Jenis Properti*" value={eksteriorData.jenisProperti} onChange={handleEksteriorChange} type="select" options={['Rumah', 'Ruko', 'Gedung']} />
            <EditableFormField id="areaEksterior" icon={<Squares2x2Icon className="w-6 h-6" />} label="Area yang Dikerjakan*" value={eksteriorData.areaEksterior} onChange={handleEksteriorChange} type="text" placeholder="Contoh: Fasad, Pagar, Taman" />
            <EditableFormField id="detailPekerjaan" icon={<DocumentTextIcon className="w-6 h-6" />} label="Detail Pekerjaan*" value={eksteriorData.detailPekerjaan} onChange={handleEksteriorChange} type="textarea" placeholder="Contoh: Pengecatan ulang, perbaikan taman" />
            <EditableFormField id="estimasiLuas" icon={<ArrowsPointingOutIcon className="w-6 h-6" />} label="Estimasi Luas (m²)" value={eksteriorData.estimasiLuas} onChange={handleEksteriorChange} isOptional type="number" placeholder="Contoh: 50" />
            <FileUploadField id="photos" icon={<CameraIcon className="w-6 h-6" />} label="Foto Kondisi Saat Ini" onFilesChange={setPhotos} selectedFiles={photos} accept="image/*" isOptional />
        </div>
    );
    
    const renderKitchenSetForm = () => (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100 animate-fade-in-up">
            <EditableFormField id="jenisProperti" icon={<BuildingOfficeIcon className="w-6 h-6" />} label="Jenis Properti*" value={kitchenSetData.jenisProperti} onChange={handleKitchenSetChange} type="select" options={['Rumah', 'Apartemen']} />
            <EditableFormField id="bentukDapur" icon={<Squares2x2Icon className="w-6 h-6" />} label="Bentuk Dapur*" value={kitchenSetData.bentukDapur} onChange={handleKitchenSetChange} type="select" options={['L-Shape', 'U-Shape', 'Island', 'Linear']} />
            <EditableFormField id="material" icon={<CubeTransparentIcon className="w-6 h-6" />} label="Material yang Diinginkan*" value={kitchenSetData.material} onChange={handleKitchenSetChange} type="text" placeholder="Contoh: HPL, Duco, Kayu Jati" />
            <EditableFormField id="estimasiUkuran" icon={<ArrowsPointingOutIcon className="w-6 h-6" />} label="Estimasi Ukuran (meter)" value={kitchenSetData.estimasiUkuran} onChange={handleKitchenSetChange} isOptional type="text" placeholder="Contoh: 3m x 2m" />
            <EditableFormField id="infoTambahan" icon={<InformationCircleIcon className="w-6 h-6" />} label="Informasi Tambahan" value={kitchenSetData.infoTambahan} onChange={handleKitchenSetChange} isOptional type="textarea" placeholder="Termasuk top table granit, backsplash" />
            <FileUploadField id="photos" icon={<CameraIcon className="w-6 h-6" />} label="Foto Dapur & Referensi" onFilesChange={setPhotos} selectedFiles={photos} accept="image/*" isOptional />
        </div>
    );
    
    const renderFurnitureForm = () => (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100 animate-fade-in-up">
            <EditableFormField id="jenisFurniture" icon={<CubeTransparentIcon className="w-6 h-6" />} label="Jenis Furniture*" value={furnitureData.jenisFurniture} onChange={handleFurnitureChange} type="text" placeholder="Contoh: Lemari, Meja TV, Partisi" />
            <EditableFormField id="jumlah" icon={<WrenchScrewdriverIcon className="w-6 h-6" />} label="Jumlah Unit*" value={furnitureData.jumlah} onChange={handleFurnitureChange} type="number" placeholder="1" />
            <EditableFormField id="material" icon={<CubeTransparentIcon className="w-6 h-6" />} label="Material yang Diinginkan*" value={furnitureData.material} onChange={handleFurnitureChange} type="text" placeholder="Contoh: Kayu Jati, Plywood, Besi" />
            <EditableFormField id="estimasiUkuran" icon={<ArrowsPointingOutIcon className="w-6 h-6" />} label="Estimasi Ukuran" value={furnitureData.estimasiUkuran} onChange={handleFurnitureChange} isOptional type="text" placeholder="P: 2m, L: 0.6m, T: 2.2m" />
            <EditableFormField id="infoTambahan" icon={<InformationCircleIcon className="w-6 h-6" />} label="Informasi Tambahan" value={furnitureData.infoTambahan} onChange={handleFurnitureChange} isOptional type="textarea" placeholder="Finishing HPL, model custom" />
            <FileUploadField id="photos" icon={<CameraIcon className="w-6 h-6" />} label="Foto Referensi Desain" onFilesChange={setPhotos} selectedFiles={photos} accept="image/*" isOptional />
        </div>
    );

    const renderForm = () => {
        if (categoryName === 'Interior / Eksterior') {
            switch (jobType) {
                case 'Interior': return renderInteriorForm();
                case 'Eksterior': return renderEksteriorForm();
                case 'Kitchen Set': return renderKitchenSetForm();
                case 'Furniture': return renderFurnitureForm();
                default: return null;
            }
        } else {
            return jobType === 'Bangun' ? renderBangunForm() : renderRenovasiForm();
        }
    };


    return (
        <>
            <div className={`bg-slate-100 h-screen flex flex-col animate-fade-in-up transition-all duration-300 ${isCostModalOpen ? 'blur-sm pointer-events-none' : ''}`}>
                <header className="bg-white sticky top-0 z-10 shadow-sm pt-[env(safe-area-inset-top)]">
                    <div className="h-20 flex items-center px-2 relative">
                        <button onClick={onBack} className="absolute left-2 p-2 rounded-full hover:bg-slate-100" aria-label="Back">
                            <ChevronLeftIcon className="w-6 h-6 text-slate-700" />
                        </button>
                        <div className="text-center w-full">
                            <h1 className="text-lg font-bold text-slate-800">{categoryName}</h1>
                             <button onClick={() => setIsCostModalOpen(true)} className="flex items-center justify-center mx-auto text-sm text-slate-500 font-semibold hover:bg-slate-100 p-1 rounded-md transition-colors">
                                Total Biaya <span className="font-bold text-blue-800 mx-1">{formatCurrency(totalCost)}</span>
                                <ChevronDownIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </header>

                <main className="flex-grow pb-28 overflow-y-auto scrollbar-hide">
                    <SurveyStepper currentStep="pesan" />
                    
                    <div className="px-4 pt-2 space-y-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                            <label className="text-sm text-slate-500 mb-3 block">Pilih Jenis Pekerjaan<span className="text-red-500">*</span></label>
                            <div className={`grid gap-3 ${jobTypesToShow.length === 2 ? 'grid-cols-2' : 'grid-cols-2'}`}>
                                {jobTypesToShow.map(type => (
                                    <JobTypeCard 
                                        key={type.id}
                                        icon={type.icon}
                                        label={type.label}
                                        isActive={jobType === type.id}
                                        onClick={() => setJobType(type.id)}
                                    />
                                ))}
                            </div>
                        </div>
                        
                        {renderForm()}
                    </div>
                </main>

                <footer className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto p-4 bg-white/80 backdrop-blur-sm border-t border-slate-200 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                    <button 
                        onClick={handleLanjutkan}
                        disabled={!isFormValid}
                        className="w-full bg-blue-800 text-white font-bold py-3.5 px-5 rounded-xl shadow-lg shadow-blue-800/30 hover:bg-blue-900 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed">
                        Lanjutkan
                    </button>
                </footer>
            </div>
            <CostDetailsModal 
                isOpen={isCostModalOpen} 
                onClose={() => setIsCostModalOpen(false)}
                baseCost={SURVEY_BASE_COST}
                surcharge={totalCost > SURVEY_BASE_COST ? PROPERTY_SURCHARGE : 0}
            />
        </>
    );
};

export default SurveyProjectDetailsPage;