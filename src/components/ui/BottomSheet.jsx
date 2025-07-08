import React from 'react';

const BottomSheet = ({ isVisible, facilities, geoInfo, onFacilitySelect }) => {
  return (
    <div
      className={`absolute bottom-0 left-0 right-0 z-10 transition-transform duration-500 ease-in-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-white/80 backdrop-blur-md rounded-t-2xl max-h-[80vh] flex flex-col shadow-2xl">
        {/* Handle untuk drag */}
        <div className="w-full py-3 flex justify-center">
          <div className="w-12 h-1.5 bg-gray-400 rounded-full"></div>
        </div>

        <div className="px-6 pb-4">
          <h2 className="text-lg font-bold text-brand-dark-blue">{facilities.length} Fasilitas Publik Ditemukan</h2>
        </div>

        {/* List Fasilitas yang bisa di-scroll */}
        <div className="overflow-y-auto px-6">
          <ul>
            {facilities.map((facility) => (
              <li key={facility.id} className="py-2 border-b border-gray-200">
                <a 
                  href="#" 
                  onClick={(e) => {
                      e.preventDefault();
                      onFacilitySelect(facility);
                  }} 
                  className="text-blue-600 hover:underline"
                >
                  {facility.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Info Geografis (selalu di bawah) */}
        <div className="mt-auto p-6 border-t border-gray-300 bg-brand-accent/50">
          <button className="w-full py-3 px-4 bg-brand-accent text-brand-dark-blue font-semibold rounded-lg shadow-lg mb-4">
            Detail Informasi Geografis
          </button>
          <div className="text-sm text-gray-700">
            <p><b>Kepadatan Penduduk:</b> {geoInfo.populationDensity}</p>
            <p><b>Kelurahan:</b> {geoInfo.kelurahan}</p>
            <p><b>Kecamatan:</b> {geoInfo.kecamatan}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;