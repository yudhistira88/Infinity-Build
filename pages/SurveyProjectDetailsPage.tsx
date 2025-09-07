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
import UserGroupIcon from '../components/icons/UserGroupIcon';
import CalendarDaysIcon from '../components/icons/CalendarDaysIcon';


interface SurveyProjectDetailsPageProps {
    jobTypeName: string;
    categoryGroupName: string;
    jobImage: string;
    jobDescription: string;
    onBack: () => void;
    onNext: (data: any) => void;
    initialData: any;
}

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
    notification?: React.ReactNode;
}> = ({ icon, label, value, onChange, isOptional, type = 'text', placeholder, rows, options, id, notification }) => {
    
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
                {notification}
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

const SurveyProjectDetailsPage: React.FC<SurveyProjectDetailsPageProps> = ({ jobTypeName, categoryGroupName, jobImage, jobDescription, onBack, onNext, initialData }) => {
    
    const [isCostModalOpen, setIsCostModalOpen] = useState(false);
    
    const jobType = jobTypeName.replace(/\n/g, ' ');
    
    const [photos, setPhotos] = useState<File[]>(initialData.photos || []);
    const [documents, setDocuments] = useState<File[]>(initialData.documents || []);
    const [totalCost, setTotalCost] = useState(initialData.totalCost || 200000);

    const SURVEY_BASE_COST = 200000;
    const PROPERTY_SURCHARGE = 20000;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };
    
    const SurchargeNotification: React.FC = () => (
        <div className="pt-2 animate-fade-in-up">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-3 rounded-r-lg text-sm flex items-start space-x-2">
                <InformationCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                    <span className="font-semibold">Info Biaya Tambahan:</span> Akan dikenakan biaya tambahan sebesar <span className="font-bold">{formatCurrency(PROPERTY_SURCHARGE)}</span> untuk survei properti selain Rumah.
                </div>
            </div>
        </div>
    );

    const [desainData, setDesainData] = useState({
        jenisProperti: initialData.jenisProperti || 'Rumah',
        luasBangunan: initialData.luasBangunan || '',
        jumlahLantai: initialData.jumlahLantai || '1 Lantai',
        kebutuhanDesain: initialData.kebutuhanDesain || '',
    });

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

    const [rmData, setRmData] = useState({
        jenisProperti: initialData.jenisProperti || 'Rumah',
        detailKerusakan: initialData.detailKerusakan || '',
        estimasiLuas: initialData.estimasiLuas || '',
        jenisMasalahMEP: initialData.jenisMasalahMEP || 'Listrik',
        area: initialData.area || 'Interior',
        jenisFurniture: initialData.jenisFurniture || '',
        jumlahUnit: initialData.jumlahUnit || 1,
    });

    const [pabrikasiData, setPabrikasiData] = useState({
        jenisProperti: initialData.jenisProperti || 'Rumah',
        materialRangka: initialData.materialRangka || 'Baja Ringan',
        materialAtap: initialData.materialAtap || 'Spandek',
        materialPagar: initialData.materialPagar || 'Besi',
        estimasiUkuran: initialData.estimasiUkuran || '',
        detailKebutuhan: initialData.detailKebutuhan || '',
    });

    const [tukangData, setTukangData] = useState({
        jenisPekerjaan: initialData.jenisPekerjaan || '',
        jumlahTukang: initialData.jumlahTukang || 1,
        durasi: initialData.durasi || 1, // in days
        detailProyek: initialData.detailProyek || '',
    });

    const handleChange = (setter: React.Dispatch<React.SetStateAction<any>>, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setter((prev: any) => ({ ...prev, [id]: value }));
    };

    const activeFormData = useMemo(() => {
        switch (categoryGroupName) {
            case 'Desain Konstruksi':
                return desainData;
            case 'Bangun / Renovasi':
                return jobType === 'Bangun' ? bangunData : renovasiData;
            case 'Interior / Eksterior':
                switch (jobType) {
                    case 'Interior': return interiorData;
                    case 'Eksterior': return eksteriorData;
                    case 'Kitchen Set': return kitchenSetData;
                    case 'Furniture': return furnitureData;
                    default: return {};
                }
            case 'Repair Maintenance':
                return rmData;
            case 'Pabrikasi':
                return pabrikasiData;
            case 'Panggil Tukang':
                return tukangData;
            default:
                return {};
        }
    }, [categoryGroupName, jobType, desainData, bangunData, renovasiData, interiorData, eksteriorData, kitchenSetData, furnitureData, rmData, pabrikasiData, tukangData]);

    useEffect(() => {
        let cost = SURVEY_BASE_COST;
        const propertyType = (activeFormData as any)?.jenisProperti;
        
        if (propertyType && propertyType !== 'Rumah') {
            cost += PROPERTY_SURCHARGE;
        }
        setTotalCost(cost);
    }, [activeFormData]);

    const isFormValid = useMemo(() => {
        switch (categoryGroupName) {
            case 'Desain Konstruksi':
                return !!(desainData.jenisProperti && desainData.luasBangunan && desainData.jumlahLantai && desainData.kebutuhanDesain);
            case 'Bangun / Renovasi':
                if (jobType === 'Bangun') return !!(bangunData.jenisProperti && bangunData.jumlahLantai && bangunData.luasTanah && bangunData.luasBangunan);
                if (jobType === 'Renovasi') return !!(renovasiData.jenisProperti && renovasiData.ruanganDirenovasi && renovasiData.detailPekerjaan);
                return false;
            case 'Interior / Eksterior':
                switch (jobType) {
                    case 'Interior': return !!(interiorData.jenisProperti && interiorData.ruangan && interiorData.detailPekerjaan);
                    case 'Eksterior': return !!(eksteriorData.jenisProperti && eksteriorData.areaEksterior && eksteriorData.detailPekerjaan);
                    case 'Kitchen Set': return !!(kitchenSetData.jenisProperti && kitchenSetData.bentukDapur && kitchenSetData.material);
                    case 'Furniture': return !!(furnitureData.jenisFurniture && furnitureData.jumlah > 0 && furnitureData.material);
                    default: return false;
                }
            case 'Repair Maintenance':
                return !!(rmData.jenisProperti && rmData.detailKerusakan);
            case 'Pabrikasi':
                return !!(pabrikasiData.jenisProperti && (pabrikasiData.detailKebutuhan || pabrikasiData.estimasiUkuran));
            case 'Panggil Tukang':
                if (jobType === 'Tukang Harian') return !!(tukangData.jenisPekerjaan && tukangData.jumlahTukang > 0 && tukangData.durasi > 0);
                if (jobType === 'Tukang Borongan') return !!(tukangData.detailProyek);
                return false;
            default:
                return true; // Default to true if no specific form
        }
    }, [categoryGroupName, jobType, desainData, bangunData, renovasiData, interiorData, eksteriorData, kitchenSetData, furnitureData, rmData, pabrikasiData, tukangData]);

    const handleLanjutkan = () => {
        onNext({ jobType, ...activeFormData, photos, documents, totalCost });
    };

    const renderDesainForm = () => (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100 animate-fade-in-up">
            <EditableFormField
                id="jenisProperti"
                icon={<BuildingOfficeIcon className="w-6 h-6" />}
                label="Jenis Properti*"
                value={desainData.jenisProperti}
                onChange={(e) => handleChange(setDesainData, e)}
                type="select"
                options={['Rumah', 'Ruko', 'Apartemen', 'Gudang', 'Kantor', 'Lainnya']}
                notification={desainData.jenisProperti !== 'Rumah' ? <SurchargeNotification /> : null}
            />
            <EditableFormField
                id="luasBangunan"
                icon={<ArrowsPointingOutIcon className="w-6 h-6" />}
                label="Estimasi Luas Bangunan (m²)*"
                value={desainData.luasBangunan}
                onChange={(e) => handleChange(setDesainData, e)}
                type="number"
                placeholder="Contoh: 80"
            />
            <EditableFormField
                id="jumlahLantai"
                icon={<BuildingLibraryIcon className="w-6 h-6" />}
                label="Jumlah Lantai*"
                value={desainData.jumlahLantai}
                onChange={(e) => handleChange(setDesainData, e)}
                type="select"
                options={['1 Lantai', '2 Lantai', '3 Lantai', '4+ Lantai']}
            />
            <EditableFormField
                id="kebutuhanDesain"
                icon={<DocumentTextIcon className="w-6 h-6" />}
                label="Uraian Kebutuhan Desain*"
                value={desainData.kebutuhanDesain}
                onChange={(e) => handleChange(setDesainData, e)}
                type="textarea"
                placeholder={`Jelaskan kebutuhan Anda untuk layanan ${jobType}...`}
            />
            <FileUploadField
                id="documents"
                icon={<DocumentArrowUpIcon className="w-6 h-6" />}
                label="Referensi/Sketsa/Denah Lama"
                onFilesChange={setDocuments}
                selectedFiles={documents}
                accept=".pdf,.doc,.docx,.jpg,.png"
                isOptional
            />
        </div>
    );
    
    const renderBangunForm = () => (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100 animate-fade-in-up">
            <EditableFormField 
                id="jenisProperti" 
                icon={<BuildingOfficeIcon className="w-6 h-6" />} 
                label="Jenis Properti*" 
                value={bangunData.jenisProperti} 
                onChange={(e) => handleChange(setBangunData, e)}
                type="select" 
                options={['Rumah', 'Ruko', 'Apartemen', 'Gudang', 'Kantor']} 
                notification={bangunData.jenisProperti !== 'Rumah' ? <SurchargeNotification /> : null}
            />
            <EditableFormField id="jumlahLantai" icon={<BuildingLibraryIcon className="w-6 h-6" />} label="Jumlah Lantai*" value={bangunData.jumlahLantai} onChange={(e) => handleChange(setBangunData, e)} type="select" options={['1 Lantai', '2 Lantai', '3 Lantai', '4+ Lantai']} />
            <EditableFormField id="luasTanah" icon={<ArrowsPointingOutIcon className="w-6 h-6" />} label="Luas Tanah (m²)*" value={bangunData.luasTanah} onChange={(e) => handleChange(setBangunData, e)} type="number" placeholder="Contoh: 100" />
            <EditableFormField id="luasBangunan" icon={<ArrowsPointingOutIcon className="w-6 h-6" />} label="Luas Bangunan (m²)*" value={bangunData.luasBangunan} onChange={(e) => handleChange(setBangunData, e)} type="number" placeholder="Contoh: 80" />
            <EditableFormField id="infoTambahan" icon={<InformationCircleIcon className="w-6 h-6" />} label="Informasi Tambahan" value={bangunData.infoTambahan} onChange={(e) => handleChange(setBangunData, e)} isOptional type="textarea" placeholder="Contoh: Ingin model minimalis, sudah ada desain sendiri" />
            <FileUploadField id="photos" icon={<CameraIcon className="w-6 h-6" />} label="Foto Kondisi" onFilesChange={setPhotos} selectedFiles={photos} accept="image/*" isOptional />
            <FileUploadField id="documents" icon={<DocumentArrowUpIcon className="w-6 h-6" />} label="Dokumen Pendukung" onFilesChange={setDocuments} selectedFiles={documents} accept=".pdf,.doc,.docx,.jpg,.png" isOptional />
        </div>
    );

    const renderRenovasiForm = () => (
         <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100 animate-fade-in-up">
            <EditableFormField 
                id="jenisProperti" 
                icon={<BuildingOfficeIcon className="w-6 h-6" />} 
                label="Jenis Properti*" 
                value={renovasiData.jenisProperti} 
                onChange={(e) => handleChange(setRenovasiData, e)}
                type="select" options={['Rumah', 'Ruko', 'Apartemen', 'Gudang', 'Kantor']} 
                notification={renovasiData.jenisProperti !== 'Rumah' ? <SurchargeNotification /> : null}
            />
            <EditableFormField id="ruanganDirenovasi" icon={<Squares2x2Icon className="w-6 h-6" />} label="Ruangan yang Direnovasi*" value={renovasiData.ruanganDirenovasi} onChange={(e) => handleChange(setRenovasiData, e)} type="text" placeholder="Contoh: Dapur, Kamar Mandi" />
            <EditableFormField id="detailPekerjaan" icon={<DocumentTextIcon className="w-6 h-6" />} label="Detail Pekerjaan*" value={renovasiData.detailPekerjaan} onChange={(e) => handleChange(setRenovasiData, e)} type="textarea" placeholder="Contoh: Ganti keramik, perbaiki atap bocor" />
            <EditableFormField id="estimasiLuas" icon={<ArrowsPointingOutIcon className="w-6 h-6" />} label="Estimasi Luas Renovasi (m²)" value={renovasiData.estimasiLuas} onChange={(e) => handleChange(setRenovasiData, e)} isOptional type="number" placeholder="Contoh: 25" />
            <FileUploadField id="photos" icon={<CameraIcon className="w-6 h-6" />} label="Foto Kondisi" onFilesChange={setPhotos} selectedFiles={photos} accept="image/*" isOptional />
            <FileUploadField id="documents" icon={<DocumentArrowUpIcon className="w-6 h-6" />} label="Dokumen Pendukung" onFilesChange={setDocuments} selectedFiles={documents} accept=".pdf,.doc,.docx,.jpg,.png" isOptional />
        </div>
    );
    
    const renderInteriorForm = () => (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100 animate-fade-in-up">
            <EditableFormField 
                id="jenisProperti" 
                icon={<BuildingOfficeIcon className="w-6 h-6" />} 
                label="Jenis Properti*" 
                value={interiorData.jenisProperti} 
                onChange={(e) => handleChange(setInteriorData, e)}
                type="select" 
                options={['Rumah', 'Apartemen', 'Kantor', 'Ruko']}
                notification={interiorData.jenisProperti !== 'Rumah' ? <SurchargeNotification /> : null}
            />
            <EditableFormField id="ruangan" icon={<Squares2x2Icon className="w-6 h-6" />} label="Ruangan yang Dikerjakan*" value={interiorData.ruangan} onChange={(e) => handleChange(setInteriorData, e)} type="text" placeholder="Contoh: Ruang Tamu, Kamar Tidur" />
            <EditableFormField id="gayaDesain" icon={<PencilIcon className="w-6 h-6" />} label="Gaya Desain" value={interiorData.gayaDesain} onChange={(e) => handleChange(setInteriorData, e)} isOptional type="text" placeholder="Contoh: Minimalis, Industrial" />
            <EditableFormField id="detailPekerjaan" icon={<DocumentTextIcon className="w-6 h-6" />} label="Detail Pekerjaan*" value={interiorData.detailPekerjaan} onChange={(e) => handleChange(setInteriorData, e)} type="textarea" placeholder="Contoh: Pengecatan, pasang wallpaper" />
            <EditableFormField id="estimasiLuas" icon={<ArrowsPointingOutIcon className="w-6 h-6" />} label="Estimasi Luas (m²)" value={interiorData.estimasiLuas} onChange={(e) => handleChange(setInteriorData, e)} isOptional type="number" placeholder="Contoh: 20" />
            <FileUploadField id="photos" icon={<CameraIcon className="w-6 h-6" />} label="Foto Referensi / Kondisi" onFilesChange={setPhotos} selectedFiles={photos} accept="image/*" isOptional />
        </div>
    );
    
    const renderEksteriorForm = () => (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100 animate-fade-in-up">
            <EditableFormField 
                id="jenisProperti" 
                icon={<BuildingOfficeIcon className="w-6 h-6" />} 
                label="Jenis Properti*" 
                value={eksteriorData.jenisProperti} 
                onChange={(e) => handleChange(setEksteriorData, e)}
                type="select" 
                options={['Rumah', 'Ruko', 'Gedung']} 
                notification={eksteriorData.jenisProperti !== 'Rumah' ? <SurchargeNotification /> : null}
            />
            <EditableFormField id="areaEksterior" icon={<Squares2x2Icon className="w-6 h-6" />} label="Area yang Dikerjakan*" value={eksteriorData.areaEksterior} onChange={(e) => handleChange(setEksteriorData, e)} type="text" placeholder="Contoh: Fasad, Pagar, Taman" />
            <EditableFormField id="detailPekerjaan" icon={<DocumentTextIcon className="w-6 h-6" />} label="Detail Pekerjaan*" value={eksteriorData.detailPekerjaan} onChange={(e) => handleChange(setEksteriorData, e)} type="textarea" placeholder="Contoh: Pengecatan ulang, perbaikan taman" />
            <EditableFormField id="estimasiLuas" icon={<ArrowsPointingOutIcon className="w-6 h-6" />} label="Estimasi Luas (m²)" value={eksteriorData.estimasiLuas} onChange={(e) => handleChange(setEksteriorData, e)} isOptional type="number" placeholder="Contoh: 50" />
            <FileUploadField id="photos" icon={<CameraIcon className="w-6 h-6" />} label="Foto Kondisi Saat Ini" onFilesChange={setPhotos} selectedFiles={photos} accept="image/*" isOptional />
        </div>
    );
    
    const renderKitchenSetForm = () => (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100 animate-fade-in-up">
            <EditableFormField 
                id="jenisProperti" 
                icon={<BuildingOfficeIcon className="w-6 h-6" />} 
                label="Jenis Properti*" 
                value={kitchenSetData.jenisProperti} 
                onChange={(e) => handleChange(setKitchenSetData, e)}
                type="select" 
                options={['Rumah', 'Apartemen']} 
                notification={kitchenSetData.jenisProperti !== 'Rumah' ? <SurchargeNotification /> : null}
            />
            <EditableFormField id="bentukDapur" icon={<Squares2x2Icon className="w-6 h-6" />} label="Bentuk Dapur*" value={kitchenSetData.bentukDapur} onChange={(e) => handleChange(setKitchenSetData, e)} type="select" options={['L-Shape', 'U-Shape', 'Island', 'Linear']} />
            <EditableFormField id="material" icon={<CubeTransparentIcon className="w-6 h-6" />} label="Material yang Diinginkan*" value={kitchenSetData.material} onChange={(e) => handleChange(setKitchenSetData, e)} type="text" placeholder="Contoh: HPL, Duco, Kayu Jati" />
            <EditableFormField id="estimasiUkuran" icon={<ArrowsPointingOutIcon className="w-6 h-6" />} label="Estimasi Ukuran (meter)" value={kitchenSetData.estimasiUkuran} onChange={(e) => handleChange(setKitchenSetData, e)} isOptional type="text" placeholder="Contoh: 3m x 2m" />
            <EditableFormField id="infoTambahan" icon={<InformationCircleIcon className="w-6 h-6" />} label="Informasi Tambahan" value={kitchenSetData.infoTambahan} onChange={(e) => handleChange(setKitchenSetData, e)} isOptional type="textarea" placeholder="Termasuk top table granit, backsplash" />
            <FileUploadField id="photos" icon={<CameraIcon className="w-6 h-6" />} label="Foto Dapur & Referensi" onFilesChange={setPhotos} selectedFiles={photos} accept="image/*" isOptional />
        </div>
    );
    
    const renderFurnitureForm = () => (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100 animate-fade-in-up">
            <EditableFormField id="jenisFurniture" icon={<CubeTransparentIcon className="w-6 h-6" />} label="Jenis Furniture*" value={furnitureData.jenisFurniture} onChange={(e) => handleChange(setFurnitureData, e)} type="text" placeholder="Contoh: Lemari, Meja TV, Partisi" />
            <EditableFormField id="jumlah" icon={<WrenchScrewdriverIcon className="w-6 h-6" />} label="Jumlah Unit*" value={furnitureData.jumlah} onChange={(e) => handleChange(setFurnitureData, e)} type="number" placeholder="1" />
            <EditableFormField id="material" icon={<CubeTransparentIcon className="w-6 h-6" />} label="Material yang Diinginkan*" value={furnitureData.material} onChange={(e) => handleChange(setFurnitureData, e)} type="text" placeholder="Contoh: Kayu Jati, Plywood, Besi" />
            <EditableFormField id="estimasiUkuran" icon={<ArrowsPointingOutIcon className="w-6 h-6" />} label="Estimasi Ukuran" value={furnitureData.estimasiUkuran} onChange={(e) => handleChange(setFurnitureData, e)} isOptional type="text" placeholder="P: 2m, L: 0.6m, T: 2.2m" />
            <EditableFormField id="infoTambahan" icon={<InformationCircleIcon className="w-6 h-6" />} label="Informasi Tambahan" value={furnitureData.infoTambahan} onChange={(e) => handleChange(setFurnitureData, e)} isOptional type="textarea" placeholder="Finishing HPL, model custom" />
            <FileUploadField id="photos" icon={<CameraIcon className="w-6 h-6" />} label="Foto Referensi Desain" onFilesChange={setPhotos} selectedFiles={photos} accept="image/*" isOptional />
        </div>
    );
    
    const renderRmForm = () => (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100 animate-fade-in-up">
            <EditableFormField id="jenisProperti" icon={<BuildingOfficeIcon className="w-6 h-6" />} label="Jenis Properti*" value={rmData.jenisProperti} onChange={(e) => handleChange(setRmData, e)} type="select" options={['Rumah', 'Ruko', 'Apartemen', 'Kantor']} notification={rmData.jenisProperti !== 'Rumah' ? <SurchargeNotification /> : null} />
            {jobType === 'RM Bangunan' && <EditableFormField id="estimasiLuas" icon={<ArrowsPointingOutIcon className="w-6 h-6" />} label="Estimasi Luas Kerusakan (m²)" value={rmData.estimasiLuas} onChange={(e) => handleChange(setRmData, e)} isOptional type="number" placeholder="Contoh: 5" />}
            {jobType === 'RM MEP' && <EditableFormField id="jenisMasalahMEP" icon={<WrenchScrewdriverIcon className="w-6 h-6" />} label="Jenis Masalah MEP*" value={rmData.jenisMasalahMEP} onChange={(e) => handleChange(setRmData, e)} type="select" options={['Listrik', 'Saluran Air', 'AC', 'Lainnya']} />}
            {jobType === 'RM Interior & Eksterior' && <EditableFormField id="area" icon={<Squares2x2Icon className="w-6 h-6" />} label="Area Kerusakan*" value={rmData.area} onChange={(e) => handleChange(setRmData, e)} type="select" options={['Interior', 'Eksterior']} />}
            {jobType === 'RM Furniture' && <>
                <EditableFormField id="jenisFurniture" icon={<CubeTransparentIcon className="w-6 h-6" />} label="Jenis Furniture*" value={rmData.jenisFurniture} onChange={(e) => handleChange(setRmData, e)} type="text" placeholder="Contoh: Kaki meja, pintu lemari" />
                <EditableFormField id="jumlahUnit" icon={<WrenchScrewdriverIcon className="w-6 h-6" />} label="Jumlah Unit*" value={rmData.jumlahUnit} onChange={(e) => handleChange(setRmData, e)} type="number" />
            </>}
            <EditableFormField id="detailKerusakan" icon={<DocumentTextIcon className="w-6 h-6" />} label="Detail Kerusakan*" value={rmData.detailKerusakan} onChange={(e) => handleChange(setRmData, e)} type="textarea" placeholder="Jelaskan kerusakan secara rinci..." />
            <FileUploadField id="photos" icon={<CameraIcon className="w-6 h-6" />} label="Foto Kerusakan" onFilesChange={setPhotos} selectedFiles={photos} accept="image/*" isOptional />
        </div>
    );

    const renderPabrikasiForm = () => (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100 animate-fade-in-up">
            <EditableFormField id="jenisProperti" icon={<BuildingOfficeIcon className="w-6 h-6" />} label="Lokasi Pemasangan*" value={pabrikasiData.jenisProperti} onChange={(e) => handleChange(setPabrikasiData, e)} type="select" options={['Rumah', 'Ruko', 'Gudang', 'Area Publik']} notification={pabrikasiData.jenisProperti !== 'Rumah' ? <SurchargeNotification /> : null} />
            {jobType === 'Canopy' && <>
                <EditableFormField id="materialRangka" icon={<CubeTransparentIcon className="w-6 h-6" />} label="Material Rangka*" value={pabrikasiData.materialRangka} onChange={(e) => handleChange(setPabrikasiData, e)} type="select" options={['Baja Ringan', 'Besi Hollow', 'Stainless Steel']} />
                <EditableFormField id="materialAtap" icon={<CubeTransparentIcon className="w-6 h-6" />} label="Material Atap*" value={pabrikasiData.materialAtap} onChange={(e) => handleChange(setPabrikasiData, e)} type="select" options={['Spandek', 'Polycarbonate', 'Kaca Tempered', 'Alderon']} />
            </>}
            {jobType === 'Pagar' && <EditableFormField id="materialPagar" icon={<CubeTransparentIcon className="w-6 h-6" />} label="Material Pagar*" value={pabrikasiData.materialPagar} onChange={(e) => handleChange(setPabrikasiData, e)} type="select" options={['Besi Hollow', 'Stainless Steel', 'GRC', 'Kayu']} />}
            {jobType === 'Canopy' || jobType === 'Pagar' ?
                <EditableFormField id="estimasiUkuran" icon={<ArrowsPointingOutIcon className="w-6 h-6" />} label="Estimasi Ukuran*" value={pabrikasiData.estimasiUkuran} onChange={(e) => handleChange(setPabrikasiData, e)} type="text" placeholder="Contoh: 5m x 3m atau Panjang 10m" />
                : <EditableFormField id="detailKebutuhan" icon={<DocumentTextIcon className="w-6 h-6" />} label="Detail Kebutuhan*" value={pabrikasiData.detailKebutuhan} onChange={(e) => handleChange(setPabrikasiData, e)} type="textarea" placeholder="Jelaskan kebutuhan pabrikasi Anda..." />
            }
            <FileUploadField id="photos" icon={<CameraIcon className="w-6 h-6" />} label="Foto Lokasi / Referensi Desain" onFilesChange={setPhotos} selectedFiles={photos} accept="image/*" isOptional />
        </div>
    );

    const renderTukangForm = () => (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100 animate-fade-in-up">
            {jobType === 'Tukang Harian' ? <>
                <EditableFormField id="jenisPekerjaan" icon={<WrenchScrewdriverIcon className="w-6 h-6" />} label="Jenis Pekerjaan*" value={tukangData.jenisPekerjaan} onChange={(e) => handleChange(setTukangData, e)} type="text" placeholder="Contoh: Pengecatan, pasang keramik" />
                <EditableFormField id="jumlahTukang" icon={<UserGroupIcon className="w-6 h-6" />} label="Jumlah Tukang*" value={tukangData.jumlahTukang} onChange={(e) => handleChange(setTukangData, e)} type="number" />
                <EditableFormField id="durasi" icon={<CalendarDaysIcon className="w-6 h-6" />} label="Durasi (hari)*" value={tukangData.durasi} onChange={(e) => handleChange(setTukangData, e)} type="number" />
            </> : <>
                <EditableFormField id="detailProyek" icon={<DocumentTextIcon className="w-6 h-6" />} label="Detail Proyek Borongan*" value={tukangData.detailProyek} onChange={(e) => handleChange(setTukangData, e)} type="textarea" placeholder="Jelaskan lingkup pekerjaan borongan secara rinci..." />
            </>}
            <FileUploadField id="photos" icon={<CameraIcon className="w-6 h-6" />} label="Foto Lokasi Pekerjaan" onFilesChange={setPhotos} selectedFiles={photos} accept="image/*" isOptional />
        </div>
    );

    const renderForm = () => {
        switch (categoryGroupName) {
            case 'Desain Konstruksi':
                return renderDesainForm();
            case 'Bangun / Renovasi':
                return jobType === 'Bangun' ? renderBangunForm() : renderRenovasiForm();
            case 'Interior / Eksterior':
                switch (jobType) {
                    case 'Interior': return renderInteriorForm();
                    case 'Eksterior': return renderEksteriorForm();
                    case 'Kitchen Set': return renderKitchenSetForm();
                    case 'Furniture': return renderFurnitureForm();
                    default: return null;
                }
            case 'Repair Maintenance':
                return renderRmForm();
            case 'Pabrikasi':
                return renderPabrikasiForm();
            case 'Panggil Tukang':
                return renderTukangForm();
            default:
                return (
                    <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-slate-200">
                        <InformationCircleIcon className="w-12 h-12 mx-auto text-slate-300" />
                        <h3 className="mt-4 font-semibold text-slate-700">Detail Proyek</h3>
                        <p className="text-sm text-slate-500">Untuk layanan ini, detail proyek akan didiskusikan lebih lanjut setelah penjadwalan survei.</p>
                    </div>
                );
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
                            <h1 className="text-lg font-bold text-slate-800">{categoryGroupName}</h1>
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
                        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 flex items-center space-x-4">
                            <img src={jobImage} alt={jobType} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-orange-600">{categoryGroupName}</p>
                                <h2 className="font-bold text-xl text-slate-800 mt-1">{jobType}</h2>
                                <p className="text-sm text-slate-500 mt-1 line-clamp-2">{jobDescription}</p>
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