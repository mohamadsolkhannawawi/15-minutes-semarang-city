// Data dummy ini mensimulasikan fasilitas yang ditemukan dalam radius 15 menit
// Koordinat berpusat di sekitar Simpang Lima Semarang (-6.9929, 110.4253)
export const dummyFacilities = [
  {
    id: 1,
    name: 'RS St. Elisabeth Semarang',
    type: 'hospital',
    position: [-6.9910, 110.4230],
    address: 'Jl. Kawi No.1, Tegalsari',
    contact: '(024) 8310035',
    hours: '24 Jam',
  },
  {
    id: 2,
    name: 'Ayam Goreng & Sop Buntut Daging Sapi',
    type: 'restaurant',
    position: [-6.9895, 110.4248],
    address: 'Jl. Pahlawan No. 7, Simpang Lima',
    contact: '08123456789',
    hours: '10:00 - 22:00',
  },
  {
    id: 3,
    name: 'LCM (Lunpia Cik Me Me)',
    type: 'restaurant',
    position: [-6.9902, 110.4265],
    address: 'Jl. Gajahmada No. 107',
    contact: '(024) 3564233',
    hours: '07:00 - 21:00',
  },
  {
    id: 4,
    name: 'Taman Pandanaran',
    type: 'park',
    position: [-6.9950, 110.4200],
    address: 'Jl. Pandanaran, Pekunden',
    contact: 'N/A',
    hours: '24 Jam',
  },
  // ... tambahkan lebih banyak data (misalnya 30-40 data) untuk membuat list bisa di-scroll
];

export const dummyGeographicInfo = {
  populationDensity: 'Tinggi',
  kelurahan: 'Mugassari',
  kecamatan: 'Semarang Selatan',
};