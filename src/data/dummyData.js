// Data dummy ini mensimulasikan fasilitas yang ditemukan dalam radius 15 menit
// Koordinat berpusat di sekitar Simpang Lima Semarang (-6.9929, 110.4253)
export const dummyFacilities = [
  { id: 1, name: 'RS St. Elisabeth Semarang', type: 'hospital', position: [-6.991, 110.423], address: 'Jl. Kawi No.1, Tegalsari', contact: '(024) 8310035', hours: '24 Jam' },
  { id: 2, name: 'Ayam Goreng & Sop Buntut', type: 'restaurant', position: [-6.9895, 110.4248], address: 'Jl. Pahlawan No. 7, Simpang Lima', contact: '08123456789', hours: '10:00 - 22:00' },
  { id: 3, name: 'Lunpia Cik Me Me', type: 'restaurant', position: [-6.9902, 110.4265], address: 'Jl. Gajahmada No. 107', contact: '(024) 3564233', hours: '07:00 - 21:00' },
  { id: 4, name: 'Taman Pandanaran', type: 'park', position: [-6.995, 110.42], address: 'Jl. Pandanaran, Pekunden', contact: 'N/A', hours: '24 Jam' },
  { id: 5, name: 'SDN Pekunden', type: 'school', position: [-6.994, 110.4215], address: 'Jl. Pekunden No. 12', contact: '(024) 123456', hours: '07:00 - 14:00' },
  { id: 6, name: 'Indomaret Point Simpang Lima', type: 'shop', position: [-6.9935, 110.425], address: 'Jl. Simpang Lima', contact: 'N/A', hours: '24 Jam' },
  { id: 7, name: 'Masjid Baiturrahman', type: 'worship', position: [-6.9918, 110.428], address: 'Jl. Pandanaran No.126', contact: 'N/A', hours: '24 Jam' },
  // ... Tambahkan 20-30 data lagi untuk memenuhi list
  { id: 8, name: 'Plaza Simpang Lima', type: 'shop', position: [-6.992, 110.424], address: 'Jl. Simpang Lima No.1', contact: '(024) 8415989', hours: '10:00 - 21:00' },
  { id: 9, name: 'Hotel Ciputra Semarang', type: 'hotel', position: [-6.9925, 110.4235], address: 'Jl. Simpang Lima', contact: '(024) 8449888', hours: '24 Jam' },
  { id: 10, name: 'Kantor Gubernur Jawa Tengah', type: 'government', position: [-6.988, 110.425], address: 'Jl. Pahlawan No.9', contact: '(024) 8311174', hours: '08:00 - 16:00' },
];

export const dummyGeographicInfo = {
  populationDensity: 'Tinggi',
  kelurahan: 'Mugassari',
  kecamatan: 'Semarang Selatan',
};

// Contoh polygon untuk area 15 menit berjalan kaki (sekitar 1.2 km radius)
// Ini adalah bentuk kasar dan idealnya didapat dari API isochrone
export const dummyIsochrone = [
  [
    [-6.9995, 110.4253], [-6.9975, 110.431], [-6.9929, 110.434],
    [-6.988, 110.431], [-6.9863, 110.4253], [-6.988, 110.419],
    [-6.9929, 110.416], [-6.9975, 110.419], [-6.9995, 110.4253],
  ]
];