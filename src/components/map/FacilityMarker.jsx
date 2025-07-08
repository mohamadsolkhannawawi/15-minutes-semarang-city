import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Contoh custom icons
const hospitalIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3063/3063202.png', // Ganti dengan path ikon lokal Anda
    iconSize: [35, 35],
});

const restaurantIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/4331/4331495.png', // Ganti dengan path ikon lokal Anda
    iconSize: [35, 35],
});

const getIcon = (type) => {
    switch(type) {
        case 'hospital': return hospitalIcon;
        case 'restaurant': return restaurantIcon;
        default: return new L.Icon.Default(); // Ikon default Leaflet
    }
}

// Marker yang akan berubah menjadi icon unik saat di-zoom
const FacilityMarker = ({ facility, onSelect, zoomLevel }) => {
    const { position, name, type } = facility;
    
    // Tampilkan ikon custom jika zoom level cukup dekat
    const displayIcon = zoomLevel >= 16 ? getIcon(type) : L.divIcon({
        className: 'custom-dot-icon',
        html: `<div style="background-color:${type === 'hospital' ? 'cyan' : 'purple'}; width: 12px; height: 12px; border-radius: 50%;"></div>`,
        iconSize: [12, 12]
    });
    
    return (
        <Marker position={position} icon={displayIcon}>
            <Popup>
                {name} <br />
                <button onClick={() => onSelect(facility)} className="text-blue-500">Lihat Detail</button>
            </Popup>
        </Marker>
    );
};

export default FacilityMarker;