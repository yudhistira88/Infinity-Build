import type { Service } from '../types';

export const allServicesData: Service[] = [
    // Desain Konstruksi
    { id: 'dsn-01', name: 'Denah 2D', priceRange: 'Rp300K - Rp1JT', image: 'https://picsum.photos/seed/denah2d/200/200', category: 'Desain Konstruksi', description: 'Rancangan denah 2D detail untuk tata ruang bangunan Anda.' },
    { id: 'dsn-02', name: 'Desain 2D Lengkap', priceRange: 'Rp500K - Rp2.5JT', image: 'https://picsum.photos/seed/desain2dlengkap/200/200', category: 'Desain Konstruksi', description: 'Gambar kerja komprehensif untuk denah, tampak, dan potongan.' },
    { id: 'dsn-03', name: 'Desain 3D', priceRange: 'Rp1JT - Rp5JT', image: 'https://picsum.photos/seed/desain3d/200/200', category: 'Desain Konstruksi', description: 'Visualisasi 3D fotorealistik untuk melihat hasil akhir proyek.' },
    { id: 'dsn-04', name: 'RAB', priceRange: 'Rp500K - Rp3JT', image: 'https://picsum.photos/seed/rab/200/200', category: 'Desain Konstruksi', description: 'Perhitungan Rencana Anggaran Biaya (RAB) yang detail dan akurat.' },
    { id: 'dsn-05', name: 'Analisa Struktur Bangunan', priceRange: 'Hubungi kami', image: 'https://picsum.photos/seed/analisastruktur/200/200', category: 'Desain Konstruksi', description: 'Analisis kekuatan dan kelayakan struktur untuk keamanan bangunan.' },
    { id: 'dsn-06', name: 'Gambar IMB/PBG', priceRange: 'Rp1.5JT - Rp5JT', image: 'https://picsum.photos/seed/imbpbg/200/200', category: 'Desain Konstruksi', description: 'Penyusunan gambar teknis lengkap untuk perizinan IMB/PBG.' },

    // Bangun / Renovasi
    { id: 'bgn-01', name: 'Bangun', priceRange: 'Hubungi kami', image: 'https://picsum.photos/seed/bangun/200/200', category: 'Bangun / Renovasi', description: 'Wujudkan bangunan impian Anda dari tahap desain hingga serah terima kunci.' },
    { id: 'bgn-02', name: 'Renovasi', priceRange: 'Hubungi kami', image: 'https://picsum.photos/seed/renovasi/200/200', category: 'Bangun / Renovasi', description: 'Perbarui dan perbaiki bagian bangunan sesuai keinginan dan kebutuhan.' },

    // Repair Maintenance
    { id: 'rpm-01', name: 'RM Bangunan', priceRange: 'Rp250K - Rp2JT', image: 'https://picsum.photos/seed/rmbangunan/200/200', category: 'Repair Maintenance', description: 'Perbaikan dan pemeliharaan struktur bangunan, seperti atap bocor, dinding retak.' },
    { id: 'rpm-02', name: 'RM MEP', priceRange: 'Rp300K - Rp1.5JT', image: 'https://picsum.photos/seed/rmmep/200/200', category: 'Repair Maintenance', description: 'Pemeliharaan sistem Mekanikal, Elektrikal, & Plumbing (saluran air, listrik).' },
    { id: 'rpm-03', name: 'RM Interior & Eksterior', priceRange: 'Rp200K - Rp1JT', image: 'https://picsum.photos/seed/rmie/200/200', category: 'Repair Maintenance', description: 'Perbaikan dan perawatan elemen interior (cat, plafon) dan eksterior.' },
    { id: 'rpm-04', name: 'RM Furniture', priceRange: 'Rp150K - Rp800K', image: 'https://picsum.photos/seed/rmfurniture/200/200', category: 'Repair Maintenance', description: 'Servis, perbaikan, dan finishing ulang furniture Anda.' },

    // Pabrikasi
    { id: 'pab-01', name: 'Canopy', priceRange: 'Rp450K/m²', image: 'https://picsum.photos/seed/canopy/200/200', category: 'Pabrikasi', description: 'Pemasangan kanopi berkualitas untuk melindungi carport atau teras Anda.' },
    { id: 'pab-02', name: 'Pagar', priceRange: 'Rp500K/m', image: 'https://picsum.photos/seed/pagarbesi/200/200', category: 'Pabrikasi', description: 'Pembuatan pagar dengan berbagai material dan desain modern.' },
    { id: 'pab-03', name: 'Gazebo', priceRange: 'Hubungi kami', image: 'https://picsum.photos/seed/gazebo/200/200', category: 'Pabrikasi', description: 'Pembuatan gazebo custom untuk menambah estetika taman dan area santai.' },
    { id: 'pab-04', name: 'Shelter / Halte', priceRange: 'Hubungi kami', image: 'https://picsum.photos/seed/shelter/200/200', category: 'Pabrikasi', description: 'Pabrikasi shelter atau halte bus custom sesuai kebutuhan proyek.' },
    { id: 'pab-05', name: 'JPU', priceRange: 'Hubungi kami', image: 'https://picsum.photos/seed/jpu/200/200', category: 'Pabrikasi', description: 'Pabrikasi dan pemasangan Jembatan Penyeberangan Umum (JPU).' },
    
    // Interior / Eksterior
    { id: 'int-01', name: 'Interior', priceRange: 'Hubungi kami', image: 'https://picsum.photos/seed/interior/200/200', category: 'Interior / Eksterior', description: 'Desain dan pengerjaan interior ruangan, dari pengecatan hingga layout.' },
    { id: 'int-02', name: 'Eksterior', priceRange: 'Hubungi kami', image: 'https://picsum.photos/seed/eksterior/200/200', category: 'Interior / Eksterior', description: 'Pengerjaan fasad, taman, dan elemen eksterior lainnya.' },
    { id: 'int-03', name: 'Kitchen Set', priceRange: 'Rp2JT/m', image: 'https://picsum.photos/seed/kitchen/200/200', category: 'Interior / Eksterior', description: 'Pembuatan kitchen set custom sesuai desain dan ukuran dapur Anda.' },
    { id: 'int-04', name: 'Furniture', priceRange: 'Hubungi kami', image: 'https://picsum.photos/seed/furniture/200/200', category: 'Interior / Eksterior', description: 'Pembuatan furniture custom (lemari, meja, partisi) sesuai keinginan.' },
    
    // Panggil Tukang
    { id: 'tkg-01', name: 'Tukang Harian', priceRange: 'Rp150K/hari', image: 'https://picsum.photos/seed/tukang/200/200', category: 'Panggil Tukang', description: 'Penyediaan tukang terampil untuk pekerjaan konstruksi skala kecil harian.' },
    { id: 'tkg-02', name: 'Tukang Borongan', priceRange: 'Hubungi kami', image: 'https://picsum.photos/seed/borongan/200/200', category: 'Panggil Tukang', description: 'Pengerjaan proyek renovasi atau perbaikan dengan sistem borongan.' },
];

export const popularServiceIds = [
    'bgn-02', // Renovasi
    'tkg-01', // Tukang Harian
    'rpm-01', // RM Bangunan
    'pab-01', // Canopy
    'int-03', // Kitchen Set
    'dsn-03', // Desain 3D
    'rpm-02', // RM MEP
    'pab-02', // Pagar
    'bgn-01', // Bangun
    'tkg-02', // Tukang Borongan
];

export const popularServicesData: Service[] = allServicesData
    .filter(s => popularServiceIds.includes(s.id))
    .sort((a, b) => popularServiceIds.indexOf(a.id) - popularServiceIds.indexOf(b.id));