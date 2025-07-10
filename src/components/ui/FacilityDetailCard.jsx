import React from "react";

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

// Mapping icon berdasarkan tipe fasilitas
const getIconForType = (type) => {
	const iconMap = {
		bandara: BandaraIcon,
		gereja: GerejaIcon,
		kesehatan: KesehatanIcon,
		klenteng: KlentengIcon,
		masjid: MasjidIcon,
		pemerintah: PemerintahIcon,
		pendidikan: PendidikanIcon,
		perpustakaan: PerpustakaanIcon,
		pura: PuraIcon,
		restoran: RestoranIcon,
		stasiun: StasiunIcon,
		taman: TamanIcon,
		terminal: TerminalIcon,
		toko: TokoIcon,
		vihara: ViharaIcon,
		// Aliases
		hospital: KesehatanIcon,
		church: GerejaIcon,
		mosque: MasjidIcon,
		temple: KlentengIcon,
		school: PendidikanIcon,
		restaurant: RestoranIcon,
		shop: TokoIcon,
		park: TamanIcon,
		library: PerpustakaanIcon,
		government: PemerintahIcon,
		station: StasiunIcon,
	};

	return iconMap[type] || KesehatanIcon;
};

const FacilityDetailCard = ({ facility, onClose }) => {
	if (!facility) return null;

	const { name, type, address, contact, hours } = facility;
	const facilityIcon = getIconForType(type);

	return (
		<div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 w-11/12 max-w-sm">
			<div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
				{/* Header dengan tombol close */}
				<div className="flex justify-between items-center p-4 bg-brand-dark-blue text-white">
					<h3 className="text-lg font-bold">Detail Fasilitas</h3>
					<button
						onClick={onClose}
						className="p-1 hover:bg-brand-medium-blue rounded-full transition-colors"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				{/* Konten detail */}
				<div className="p-6">
					{/* Nama fasilitas dengan icon */}
					<div className="flex items-center gap-3 mb-4">
						<img
							src={facilityIcon}
							alt={type}
							className="w-8 h-8 object-contain"
						/>
						<h2 className="text-xl font-bold text-brand-dark-blue flex-1">
							{name}
						</h2>
					</div>

					{/* Detail informasi */}
					<div className="space-y-3">
						<div className="flex items-start gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5 text-brand-medium-blue mt-0.5 flex-shrink-0"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
								/>
							</svg>
							<div>
								<p className="text-sm font-semibold text-gray-600">
									Alamat Lengkap
								</p>
								<p className="text-sm text-gray-800">{address}</p>
							</div>
						</div>

						{contact && contact !== "N/A" && (
							<div className="flex items-start gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-5 h-5 text-brand-medium-blue mt-0.5 flex-shrink-0"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
									/>
								</svg>
								<div>
									<p className="text-sm font-semibold text-gray-600">Kontak</p>
									<p className="text-sm text-gray-800">{contact}</p>
								</div>
							</div>
						)}

						<div className="flex items-start gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5 text-brand-medium-blue mt-0.5 flex-shrink-0"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
								/>
							</svg>
							<div>
								<p className="text-sm font-semibold text-gray-600">
									Jam Kerja Instansi
								</p>
								<p className="text-sm text-gray-800">{hours}</p>
							</div>
						</div>
					</div>

					{/* Action buttons */}
					<div className="flex gap-2 mt-6">
						<button className="flex-1 py-3 px-4 bg-brand-light-blue text-brand-dark-blue font-semibold rounded-lg hover:bg-brand-accent transition-colors">
							Buka di Maps
						</button>
						<button className="flex-1 py-3 px-4 bg-brand-accent text-brand-dark-blue font-semibold rounded-lg hover:bg-white transition-colors border border-brand-light-blue">
							Rute ke Sini
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FacilityDetailCard;
