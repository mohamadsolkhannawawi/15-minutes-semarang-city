import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

// Pastikan Anda sudah membuat routing, misal dengan React Router
// import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  // const navigate = useNavigate();

  const handleCheckLocation = () => {
    // navigate('/map'); // Arahkan ke halaman peta
    console.log("Navigasi ke Halaman Peta");
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center text-white bg-main-page-bg bg-cover bg-center">
      {/* Overlay Gelap */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      
      <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left max-w-lg mx-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
          15 Minute's Semarang City
        </h1>
        
        <div className="mt-6 p-4 bg-brand-medium-blue bg-opacity-80 backdrop-blur-sm rounded-lg shadow-xl">
          <p className="text-base md:text-lg text-brand-accent">
            Program Kota 15-Menit Semarang adalah platform strategis untuk menganalisis kemudahan warga dalam mengakses fasilitas krusial dalam 15 menit dengan berjalan kaki. Data yang dihasilkan dari pemetaan ini bertujuan untuk mendukung perumusan kebijakan tata ruang yang lebih efektif demi meningkatkan konektivitas dan kualitas hidup masyarakat.
          </p>
        </div>

        <button 
          onClick={handleCheckLocation}
          className="mt-8 flex items-center gap-3 px-8 py-4 bg-brand-light-blue text-brand-dark-blue font-bold rounded-full shadow-lg hover:bg-brand-accent transition-colors duration-300 transform hover:scale-105"
        >
          Periksa Lokasi Saya
          <ArrowRightIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default MainPage;