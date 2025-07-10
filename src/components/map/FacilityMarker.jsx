import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useMapZoom } from "../../hooks/useMapZoom";

// Import semua icon SVG lokal
import BandaraIcon from "../../assets/icons/Bandara.svg";
import GerejaIcon from "../../assets/icons/Gereja.svg";
import KesehatanIcon from "../../assets/icons/Kesehatan.svg";
import KlentengIcon from "../../assets/icons/Klenteng.svg";
import MasjidIcon from "../../assets/icons/Masjid.svg";
import PemerintahIcon from "../../assets/icons/Pemerintah.svg";
import PendidikanIcon from "../../assets/icons/Pendidikan.svg";
import PerpustakaanIcon from "../../assets/icons/Perpustakaan.svg";
import PuraIcon from "../../assets/icons/Pura.svg";
import RestoranIcon from "../../assets/icons/Restoran.svg";
import StasiunIcon from "../../assets/icons/Stasiun.svg";
import TamanIcon from "../../assets/icons/Taman.svg";
import TerminalIcon from "../../assets/icons/Terminal.svg";
import TokoIcon from "../../assets/icons/Toko.svg";
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
	bandara: createIcon(BandaraIcon),
	gereja: createIcon(GerejaIcon),
	kesehatan: createIcon(KesehatanIcon),
	klenteng: createIcon(KlentengIcon),
	masjid: createIcon(MasjidIcon),
	pemerintah: createIcon(PemerintahIcon),
	pendidikan: createIcon(PendidikanIcon),
	perpustakaan: createIcon(PerpustakaanIcon),
	pura: createIcon(PuraIcon),
	restoran: createIcon(RestoranIcon),
	stasiun: createIcon(StasiunIcon),
	taman: createIcon(TamanIcon),
	terminal: createIcon(TerminalIcon),
	toko: createIcon(TokoIcon),
	vihara: createIcon(ViharaIcon),
	// Aliases untuk kompatibilitas
	hospital: createIcon(KesehatanIcon),
	church: createIcon(GerejaIcon),
	mosque: createIcon(MasjidIcon),
	temple: createIcon(KlentengIcon),
	school: createIcon(PendidikanIcon),
	restaurant: createIcon(RestoranIcon),
	shop: createIcon(TokoIcon),
	park: createIcon(TamanIcon),
	library: createIcon(PerpustakaanIcon),
	government: createIcon(PemerintahIcon),
	station: createIcon(StasiunIcon),
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
				bandara: "#0066cc",
				gereja: "#4444ff",
				kesehatan: "#ff4444",
				klenteng: "#ffaa00",
				masjid: "#00aa00",
				pemerintah: "#666666",
				pendidikan: "#ffdd00",
				perpustakaan: "#aa44ff",
				pura: "#00ff44",
				restoran: "#ff8800",
				stasiun: "#8800ff",
				taman: "#00aa00",
				terminal: "#ff4400",
				toko: "#ff00aa",
				vihara: "#aa00ff",
				// Aliases
				hospital: "#ff4444",
				church: "#4444ff",
				mosque: "#00aa00",
				temple: "#ffaa00",
				school: "#ffdd00",
				restaurant: "#ff8800",
				shop: "#ff00aa",
				park: "#00aa00",
				library: "#aa44ff",
				government: "#666666",
				station: "#8800ff",
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
