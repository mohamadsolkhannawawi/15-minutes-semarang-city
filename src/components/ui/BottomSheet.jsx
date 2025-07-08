import React from 'react';
import { motion } from 'framer-motion';

const BottomSheet = ({ isVisible, facilities, geoInfo, onFacilitySelect, onClose }) => {
  return (
    <motion.div
      drag="y"
      dragConstraints={{ top: 0, bottom: 500 }} // Batas drag
      dragElastic={0.2}
      onDragEnd={(event, info) => {
        if (info.offset.y > 150) onClose(); // Tutup jika digeser ke bawah
      }}
      initial={{ y: '100%' }}
      animate={{ y: isVisible ? 0 : '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute bottom-0 left-0 right-0 z-20 mx-auto w-full max-w-2xl"
    >
      <div className="bg-white/80 backdrop-blur-md rounded-t-2xl max-h-[85vh] flex flex-col shadow-2xl">
        <div className="w-full py-3 flex justify-center cursor-grab active:cursor-grabbing">
          <div className="w-12 h-1.5 bg-gray-400 rounded-full"></div>
        </div>

        <div className="px-6 pb-4 flex-shrink-0">
          <h2 className="text-xl font-bold text-brand-dark-blue">{facilities.length} Fasilitas Publik Ditemukan</h2>
        </div>

        <div className="overflow-y-auto px-6 flex-grow">
          <ul className="divide-y divide-gray-200">
            {facilities.map((facility, index) => (
              <li key={facility.id} className="py-3">
                <a href="#" onClick={(e) => { e.preventDefault(); onFacilitySelect(facility); }}
                  className="group flex items-center gap-4">
                  <span className="flex-shrink-0 w-6 text-center font-semibold text-gray-500">{index + 1}.</span>
                  <span className="flex-grow text-blue-600 group-hover:underline">{facility.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto p-6 border-t border-gray-300 bg-brand-accent/30 flex-shrink-0">
          <button className="w-full py-3 px-4 bg-brand-accent text-brand-dark-blue font-semibold rounded-lg shadow-lg mb-4 hover:bg-white transition-colors">
            Detail Informasi Geografis
          </button>
          <div className="text-sm text-gray-700 space-y-1">
            <p><b>Kepadatan Penduduk:</b> {geoInfo.populationDensity}</p>
            <p><b>Kelurahan:</b> {geoInfo.kelurahan}</p>
            <p><b>Kecamatan:</b> {geoInfo.kecamatan}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BottomSheet;