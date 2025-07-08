import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, Polygon } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import komponen & data
import SearchBar from '../components/ui/SearchBar';
import BottomSheet from '../components/ui/BottomSheet';
import FacilityMarker from '../components/map/FacilityMarker';
import { dummyFacilities, dummyGeographicInfo } from '../data/dummyData';

// Fix untuk icon marker default di React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Komponen untuk menangani klik pada peta
const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
};


const MapPage = () => {
  // --- STATES ---
  const [userPin, setUserPin] = useState(null); // Posisi pin yang dipilih pengguna
  const [mapCenter, setMapCenter] = useState([-6.9929, 110.4253]); // Default: Simpang Lima
  const [showResults, setShowResults] = useState(false); // Mengontrol visibilitas BottomSheet
  const [facilities, setFacilities] = useState([]); // Daftar fasilitas yang ditemukan
  const [selectedFacility, setSelectedFacility] = useState(null); // Fasilitas yang dipilih untuk detail

  // --- HANDLERS ---
  const handleMapClick = (latlng) => {
    setUserPin(latlng);
    setShowResults(false); // Sembunyikan hasil lama jika pin baru diletakkan
    setSelectedFacility(null);
  };

  const handleUseMyLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const myLocation = { lat: latitude, lng: longitude };
      setMapCenter([latitude, longitude]);
      setUserPin(myLocation);
      setShowResults(false);
      setSelectedFacility(null);
    });
  };

  const handleCheckFacilities = () => {
    if (!userPin) {
      alert("Silakan tandai lokasi terlebih dahulu di peta atau gunakan lokasi saya.");
      return;
    }
    // Simulasi fetch data
    console.log("Mencari fasilitas di sekitar:", userPin);
    setFacilities(dummyFacilities);
    setShowResults(true);
    setSelectedFacility(null);
  };
  
  const handleFacilitySelect = (facility) => {
    setSelectedFacility(facility);
    setMapCenter(facility.position); // Pusatkan peta ke fasilitas yang dipilih
  };

  // Contoh polygon untuk area 15 menit
  const polygonArea = [
      [-6.985, 110.420],
      [-6.988, 110.435],
      [-7.000, 110.430],
      [-6.998, 110.418],
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="p-4 bg-brand-dark-blue text-white shadow-md z-20">
        <h1 className="text-xl font-bold text-center">15 Minute's Semarang City</h1>
        <div className="mt-2 max-w-lg mx-auto">
          <SearchBar onSearch={(query) => console.log('Mencari:', query)} />
        </div>
      </header>

      <main className="relative flex-grow">
        <MapContainer center={mapCenter} zoom={15} scrollWheelZoom={true} className="h-full w-full z-0">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapClickHandler onMapClick={handleMapClick} />

          {/* Pin Merah Pilihan Pengguna */}
          {userPin && !showResults && <Marker position={userPin} />}
          
          {/* Tampilan Hasil Pencarian Fasilitas */}
          {showResults && (
            <>
              {/* Pin Abu-abu di tengah area */}
              <Marker position={userPin} opacity={0.6} />
              
              {/* Polygon Area 15 Menit */}
              <Polygon pathOptions={{ color: 'orange', fillColor: 'orange', fillOpacity: 0.2 }} positions={polygonArea} />
              
              {/* Marker untuk setiap fasilitas */}
              {facilities.map(facility => (
                <FacilityMarker 
                  key={facility.id} 
                  facility={facility} 
                  onSelect={handleFacilitySelect}
                  zoomLevel={16} // Ganti dengan zoom level peta saat ini
                />
              ))}
            </>
          )}

          {/* Detail Fasilitas yang Dipilih */}
          {selectedFacility && (
             <Marker position={selectedFacility.position}>
                {/* Implementasi Pop Up Detail seperti pada gambar Output-Page-Zoom-Area */}
             </Marker>
          )}

        </MapContainer>

        {/* --- UI KONTROL DI ATAS PETA --- */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col gap-2 w-11/12 max-w-sm">
            {!showResults && (
                <>
                    <button onClick={handleUseMyLocation} className="w-full py-3 px-4 bg-brand-light-blue text-brand-dark-blue font-semibold rounded-lg shadow-lg">Gunakan Lokasi Saya</button>
                    <button onClick={handleCheckFacilities} className="w-full py-3 px-4 bg-brand-accent text-brand-dark-blue font-semibold rounded-lg shadow-lg">Cek Fasilitas Tersedia</button>
                </>
            )}
        </div>
        
        {/* Detail Info untuk Facility Zoom */}
        {selectedFacility && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 p-4 bg-white rounded-lg shadow-xl w-11/12 max-w-sm">
                 <button onClick={() => setSelectedFacility(null)} className="absolute top-2 right-2 font-bold">X</button>
                 <h3 className="font-bold text-lg">{selectedFacility.name}</h3>
                 <p className="text-sm"><b>Alamat Lengkap:</b> {selectedFacility.address}</p>
                 <p className="text-sm"><b>Kontak:</b> {selectedFacility.contact}</p>
                 <p className="text-sm"><b>Jam Kerja Instansi:</b> {selectedFacility.hours}</p>
            </div>
        )}


        {/* --- BOTTOM SHEET UNTUK HASIL --- */}
        <BottomSheet 
          isVisible={showResults && !selectedFacility}
          facilities={facilities}
          geoInfo={dummyGeographicInfo}
          onFacilitySelect={handleFacilitySelect}
        />
      </main>
    </div>
  );
};

export default MapPage;