import React, { useState, useEffect } from "react";

// Import icon minimize/maximize dari folder assets
import MinimizeIcon from "../../assets/icons/Minimize-Icon.svg";
import MaximizeIcon from "../../assets/icons/Maximize-Icon.svg";

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

const SidePanel = ({
	isVisible,
	facilities,
	geoInfo,
	onFacilitySelect,
	onClose,
}) => {
	const [isMinimized, setIsMinimized] = useState(false);
	const [responsiveConfig, setResponsiveConfig] = useState({
		minimizeIconSize: "w-5 h-5",
		maximizeIconSize: "w-6 h-6",
		minimizePadding: "p-2",
		maximizePadding: "p-2",
		minimizedButtonSize: "60px",
		headerFontSize: "text-base", // Default font size for headers
		listFontSize: "text-sm", // Default font size for list items
		infoFontSize: "text-sm", // Default font size for info text
	});

	// Sistem responsif mirip MainPage
	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;

			if (width <= 320) {
				// Mobile sangat kecil
				setResponsiveConfig({
					...responsiveConfig,
					minimizeIconSize: "w-3 h-3",
					maximizeIconSize: "w-4 h-4",
					minimizePadding: "p-1",
					maximizePadding: "p-1",
					topPosition: "75px",
					marginTop: "10px",
					minimizedButtonSize: "35px",
					headerFontSize: "text-[12px]",
					listFontSize: "text-[11px]",
					infoFontSize: "text-[11px]",
				});
			} else if (width <= 420) {
				// Mobile kecil
				setResponsiveConfig({
					...responsiveConfig,
					minimizeIconSize: "w-4 h-4",
					maximizeIconSize: "w-4 h-4",
					minimizePadding: "p-1",
					maximizePadding: "p-1",
					topPosition: "clamp(75px, 10vh, 75px)",
					marginTop: "clamp(10px, 1.5vh, 10px)",
					minimizedButtonSize: "40px",
					headerFontSize: "text-[12px]",
					listFontSize: "text-[11px]",
					infoFontSize: "text-[11px]",
				});
			} else if (width <= 610) {
				// Mobile medium
				setResponsiveConfig({
					...responsiveConfig,
					minimizeIconSize: "w-4 h-4",
					maximizeIconSize: "w-5 h-5",
					minimizePadding: "p-1.5",
					maximizePadding: "p-1.5",
					topPosition: "clamp(85px, 12vh, 100px)",
					marginTop: "clamp(12px, 2vh, 16px)",
					minimizedButtonSize: "45px",
					headerFontSize: "text-[12px]", // Mengubah dari text-xs
					listFontSize: "text-xs",
					infoFontSize: "text-xs",
				});
			} else if (width <= 769) {
				// Tablet kecil
				setResponsiveConfig({
					...responsiveConfig,
					minimizeIconSize: "w-4 h-4",
					maximizeIconSize: "w-5 h-5",
					minimizePadding: "p-1.5",
					maximizePadding: "p-2",
					topPosition: "clamp(85px, 12vh, 100px)",
					marginTop: "clamp(12px, 2vh, 16px)",
					minimizedButtonSize: "50px",
					headerFontSize: "text-sm",
					listFontSize: "text-xs",
					infoFontSize: "text-xs",
				});
			} else if (width <= 810) {
				// Tablet medium
				setResponsiveConfig({
					...responsiveConfig,
					minimizeIconSize: "w-5 h-5",
					maximizeIconSize: "w-5 h-5",
					minimizePadding: "p-2",
					maximizePadding: "p-2",
					topPosition: "clamp(85px, 12vh, 100px)",
					marginTop: "clamp(12px, 2vh, 16px)",
					minimizedButtonSize: "50px",
					headerFontSize: "text-[12px]",
					listFontSize: "text-[11px]",
					infoFontSize: "text-[11px]",
				});
			} else if (width <= 983) {
				setResponsiveConfig({
					...responsiveConfig,
					minimizeIconSize: "w-5 h-5",
					maximizeIconSize: "w-5 h-5",
					minimizePadding: "p-2",
					maximizePadding: "p-2",
					topPosition: "clamp(85px, 12vh, 100px)",
					marginTop: "clamp(12px, 2vh, 16px)",
					minimizedButtonSize: "50px",
					headerFontSize: "text-[12px]",
					listFontSize: "text-[11px]",
					infoFontSize: "text-[11px]",
				});
			} else if (width <= 1178) {
				// Tablet besar
				setResponsiveConfig({
					...responsiveConfig,
					minimizeIconSize: "w-5 h-5",
					maximizeIconSize: "w-6 h-6",
					minimizePadding: "p-2",
					maximizePadding: "p-2",
					minimizedButtonSize: "65px",
					headerFontSize: "text-sm",
					listFontSize: "text-sm",
					infoFontSize: "text-sm",
				});
			} else {
				// Desktop (default - ukuran terbesar)
				setResponsiveConfig({
					...responsiveConfig,
					minimizeIconSize: "w-5 h-5",
					maximizeIconSize: "w-6 h-6",
					minimizePadding: "p-2",
					maximizePadding: "p-2",
					minimizedButtonSize: "65px",
					headerFontSize: "text-base",
					listFontSize: "text-sm",
					infoFontSize: "text-sm",
				});
			}
		};

		handleResize(); // Set initial size
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const toggleMinimize = () => {
		setIsMinimized(!isMinimized);
	};

	return (
		<>
			{/* Overlay - hanya muncul saat panel tidak diminimize */}
			{isVisible && !isMinimized && (
				<div
					className="fixed inset-0 bg-black/20 z-40 transition-opacity duration-300"
					onClick={onClose}
				/>
			)}

			{/* Panel utama */}
			<div
				className={`fixed right-0 z-50 shadow-2xl transition-all duration-300 ease-in-out ${
					isVisible ? "translate-x-0" : "translate-x-full"
				}`}
				style={{
					top: responsiveConfig.topPosition || "clamp(65px, 9vh, 110px)",
					width: isMinimized ? responsiveConfig.minimizedButtonSize : "33.33vw",
					backgroundColor: isMinimized ? "#2A3A4E" : "#9DB2C8",
					borderRadius: isMinimized ? "50%" : "16px 0 0 16px",
					marginTop: isMinimized
						? "20px"
						: responsiveConfig.marginTop || "clamp(8px, 1vh, 16px)",
					marginRight: isMinimized ? "20px" : "0",
					minWidth: isMinimized
						? responsiveConfig.minimizedButtonSize
						: "320px",
					maxWidth: isMinimized
						? responsiveConfig.minimizedButtonSize
						: "600px",
					aspectRatio: isMinimized ? "1/1" : "auto",
					height: isMinimized
						? responsiveConfig.minimizedButtonSize
						: `calc(100vh - ${
								responsiveConfig.topPosition || "clamp(65px, 9vh, 110px)"
						  })`,
					flexShrink: isMinimized ? 0 : "auto",
				}}
			>
				{/* Konten saat tidak diminimize */}
				{!isMinimized && (
					<div className="flex flex-col h-full relative">
						{/* Tombol minimize di pojok kanan atas - RESPONSIF */}
						<div className="absolute top-6 right-4 z-10">
							<button
								onClick={toggleMinimize}
								className={`${responsiveConfig.minimizePadding} hover:bg-white/30 rounded-full transition-colors`}
								title="Minimize"
							>
								<img
									src={MinimizeIcon}
									alt="Minimize"
									className={responsiveConfig.minimizeIconSize}
								/>
							</button>
						</div>

						{/* Header dengan background brand-accent */}
						<div className="flex-shrink-0 mx-14 px-4 pt-4 pb-1">
							<div className="flex justify-center">
								<div className="p-3 rounded-lg mb-3 bg-brand-accent inline-block">
									<h2
										className={`font-bold text-brand-dark-blue text-center whitespace-nowrap ${responsiveConfig.headerFontSize}`}
									>
										{facilities.length} Fasilitas Publik Ditemukan
									</h2>
								</div>
							</div>
						</div>

						{/* List fasilitas dengan background brand-accent */}
						<div
							className="overflow-y-auto px-4 pb-1"
							style={{ maxHeight: "53vh" }}
						>
							<ul className="space-y-2">
								{facilities.map((facility, index) => (
									<li key={facility.id}>
										<button
											onClick={() => onFacilitySelect(facility)}
											className="group flex items-center gap-3 hover:bg-white/50 p-3 rounded-lg transition-colors w-full text-left"
										>
											<span
												className={`flex-shrink-0 w-6 text-center font-semibold text-brand-dark-blue ${responsiveConfig.listFontSize}`}
											>
												{index + 1}.
											</span>
											<img
												src={getIconForType(facility.type)}
												alt={facility.type}
												className="w-6 h-6 object-contain flex-shrink-0"
											/>
											<span
												className={`flex-grow font-medium group-hover:underline text-brand-dark-blue ${responsiveConfig.listFontSize}`}
											>
												{facility.name}
											</span>
										</button>
									</li>
								))}
							</ul>
						</div>

						{/* Header Detail Informasi Geografis */}
						<div className="flex-shrink-0 mx-14 px-4 pt-4 pb-1">
							<div className="flex justify-center">
								<div className="p-3 rounded-lg mb-2 bg-brand-accent inline-block">
									<h3
										className={`font-semibold text-brand-dark-blue text-center whitespace-nowrap ${responsiveConfig.headerFontSize}`}
									>
										Detail Informasi Geografis
									</h3>
								</div>
							</div>
						</div>

						{/* Konten Detail Informasi Geografis */}
						<div className="flex-shrink-0 px-4 pb-4">
							<div
								className={`text-brand-dark-blue ${responsiveConfig.infoFontSize}`}
							>
								<div
									className="grid gap-1"
									style={{
										gridTemplateColumns: "1rem auto auto 1fr",
										alignItems: "center",
									}}
								>
									{/* Baris 1: Kepadatan Penduduk */}
									<span></span>
									<span className="font-bold">Kepadatan Penduduk</span>
									<span className="font-bold">:</span>
									<span className="ml-1">{geoInfo.populationDensity}</span>

									{/* Baris 2: Kecamatan */}
									<span></span>
									<span className="font-bold">Kecamatan</span>
									<span className="font-bold">:</span>
									<span className="ml-1">{geoInfo.kecamatan}</span>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Konten saat diminimize - icon maximize di tengah - RESPONSIF */}
				{isMinimized && (
					<div className="flex items-center justify-center h-full w-full">
						<button
							onClick={toggleMinimize}
							className={`${responsiveConfig.maximizePadding} hover:bg-white/30 rounded-full transition-colors`}
							title="Maximize"
						>
							<img
								src={MaximizeIcon}
								alt="Maximize"
								className={responsiveConfig.maximizeIconSize}
								style={{ filter: "brightness(0) invert(1)" }}
							/>
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export default SidePanel;
