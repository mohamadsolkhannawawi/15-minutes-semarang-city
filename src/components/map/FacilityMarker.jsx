import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useMapZoom } from '../../hooks/useMapZoom';

// Fungsi untuk membuat ikon kustom dengan SVG
const createIcon = (svg) => {
    return L.divIcon({
        html: svg,
        className: 'bg-transparent border-0',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
    });
};

// Ikon untuk berbagai tipe fasilitas
const icons = {
    hospital: createIcon(`<svg ...>...</svg>`), // Ganti dengan SVG ikon rumah sakit
    restaurant: createIcon(`<svg ...>...</svg>`), // Ganti dengan SVG ikon restoran
    park: createIcon(`<svg ...>...</svg>`),
    school: createIcon(`<svg ...>...</svg>`),
    shop: createIcon(`<svg ...>...</svg>`),
    default: new L.Icon.Default(),
};

// Ikon titik sederhana untuk saat zoom out
const createDotIcon = (color) => {
    return L.divIcon({
        className: 'custom-dot-icon',
        html: `<div style="background-color:${color}; width: 12px; height: 12px; border-radius: 50%; border: 1px solid white;"></div>`,
        iconSize: [12, 12]
    });
};

const getIcon = (type, zoomLevel) => {
    if (zoomLevel < 16) {
        const color = {
            hospital: 'deepskyblue', restaurant: 'orange', park: 'limegreen',
            school: 'gold', shop: 'violet',
        }[type] || 'gray';
        return createDotIcon(color);
    }
    return icons[type] || icons.default;
};

const FacilityMarker = ({ facility, onSelect }) => {
    const { position, name, type } = facility;
    const zoomLevel = useMapZoom();

    return (
        <Marker position={position} icon={getIcon(type, zoomLevel)}>
            <Popup>
                <div className="font-sans">
                    <p className="font-bold m-0">{name}</p>
                    <button onClick={() => onSelect(facility)} className="text-blue-600 hover:underline text-sm font-semibold">
                        Lihat Detail
                    </button>
                </div>
            </Popup>
        </Marker>
    );
};

export default FacilityMarker;