import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useMapZoom } from "../../hooks/useMapZoom";

// Import icon SVG lokal
import KesehatanIcon from "../../assets/icons/Kesehatan.svg";
import GerejaIcon from "../../assets/icons/Gereja.svg";
import KlentengIcon from "../../assets/icons/Klenteng.svg";
import PuraIcon from "../../assets/icons/Pura.svg";
import ViharaIcon from "../../assets/icons/Vihara.svg";

// Fungsi untuk membuat ikon kustom dengan path gambar
const createIcon = (iconPath, size = [32, 32]) => {
	return L.icon({
		iconUrl: iconPath,
		iconSize: size,
		iconAnchor: [size[0] / 2, size[1]],
		popupAnchor: [0, -size[1]],
		shadowUrl: null,
		className: "custom-facility-icon",
	});
};

// Ikon untuk berbagai tipe fasilitas menggunakan icon lokal
const icons = {
	kesehatan: createIcon(KesehatanIcon),
	hospital: createIcon(KesehatanIcon),
	puskesmas: createIcon(KesehatanIcon),
	gereja: createIcon(GerejaIcon),
	church: createIcon(GerejaIcon),
	klenteng: createIcon(KlentengIcon),
	temple: createIcon(KlentengIcon),
	pura: createIcon(PuraIcon),
	hindu_temple: createIcon(PuraIcon),
	vihara: createIcon(ViharaIcon),
	buddhist_temple: createIcon(ViharaIcon),
	// Default untuk tipe lain (gunakan icon kesehatan dengan ukuran kecil)
	restaurant: createIcon(KesehatanIcon, [24, 24]),
	park: createIcon(GerejaIcon, [24, 24]),
	school: createIcon(KlentengIcon, [24, 24]),
	shop: createIcon(PuraIcon, [24, 24]),
	default: createIcon(KesehatanIcon, [28, 28]),
};

// Ikon titik sederhana untuk saat zoom out
const createDotIcon = (color) => {
	return L.divIcon({
		className: "custom-dot-icon",
		html: `<div style="background-color:${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.3);"></div>`,
		iconSize: [12, 12],
		iconAnchor: [6, 6],
	});
};

const getIcon = (type, zoomLevel) => {
	if (zoomLevel < 15) {
		const color =
			{
				kesehatan: "#ff4444",
				hospital: "#ff4444",
				puskesmas: "#ff4444",
				gereja: "#4444ff",
				church: "#4444ff",
				klenteng: "#ffaa00",
				temple: "#ffaa00",
				pura: "#00ff44",
				hindu_temple: "#00ff44",
				vihara: "#aa00ff",
				buddhist_temple: "#aa00ff",
				restaurant: "#ff8800",
				park: "#00aa00",
				school: "#ffdd00",
				shop: "#ff00aa",
			}[type] || "#666666";
		return createDotIcon(color);
	}
	return icons[type] || icons.default;
};

const FacilityMarker = ({ facility, onSelect }) => {
	const { position, name, type, address, contact, hours } = facility;
	const zoomLevel = useMapZoom();

	return (
		<Marker position={position} icon={getIcon(type, zoomLevel)}>
			<Popup className="custom-popup">
				<div className="font-sans p-2 min-w-[200px]">
					<h3 className="font-bold text-lg mb-2 text-brand-dark-blue m-0">
						{name}
					</h3>
					<div className="space-y-1 text-sm mb-3">
						<p className="m-0">
							<span className="font-semibold">Tipe:</span> {type}
						</p>
						{address && (
							<p className="m-0">
								<span className="font-semibold">Alamat:</span> {address}
							</p>
						)}
						{contact && contact !== "N/A" && (
							<p className="m-0">
								<span className="font-semibold">Kontak:</span> {contact}
							</p>
						)}
						{hours && (
							<p className="m-0">
								<span className="font-semibold">Jam:</span> {hours}
							</p>
						)}
					</div>
					<button
						onClick={() => onSelect(facility)}
						className="w-full px-3 py-2 bg-brand-light-blue text-brand-dark-blue font-semibold rounded-md hover:bg-brand-accent transition-colors text-sm"
					>
						Lihat Detail Lengkap
					</button>
				</div>
			</Popup>
		</Marker>
	);
};

export default FacilityMarker;
