import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

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
	const [isOpen, setIsOpen] = useState(!!facility);
	const [startY, setStartY] = useState(0);
	const [currentY, setCurrentY] = useState(0);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 810);
	const [isLandscapeMobile, setIsLandscapeMobile] = useState(false);
	const sheetRef = useRef(null);

	useEffect(() => {
		setIsOpen(!!facility);
	}, [facility]);

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
            const height = window.innerHeight;
			const currentIsLandscape = width > height;
			setIsMobile(width <= 1024);
			setIsLandscapeMobile(currentIsLandscape && width <= 926);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	if (!facility) return null;

	const { name, type, address, contact, hours } = facility;
	const facilityIcon = getIconForType(type);

	const handleTouchStart = (e) => {
		setStartY(e.touches[0].clientY);
	};

	const handleTouchMove = (e) => {
		setCurrentY(e.touches[0].clientY);
		const deltaY = currentY - startY;

		if (deltaY > 0 && sheetRef.current) {
			sheetRef.current.style.transform = `translateY(${deltaY}px)`;
		}
	};

	const handleTouchEnd = () => {
		const deltaY = currentY - startY;
		if (deltaY > 100) {
			onClose();
		} else if (sheetRef.current) {
			sheetRef.current.style.transform = "";
		}
		setStartY(0);
		setCurrentY(0);
	};

	// Mobile view content
	const renderMobileContent = () => (
		<div
			ref={sheetRef}
			className={clsx("facility-detail-mobile", { open: isOpen })}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
		>
			<div className="facility-detail-content px-6">
				<div className="relative bg-white pt-4 pb-1 mb-2">
					<button
						onClick={onClose}
						className="absolute top-0 -right-2 p-1.5 bg-white hover:bg-gray-100 rounded-full transition-colors shadow-md"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="w-4 h-4 text-brand-dark-blue"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
				<div className="flex justify-center mb-3">
					<p className="text-sm sm:text-base md:text-lg text-brand-dark-blue bg-[#F0EAD6] py-1.5 px-6 rounded-lg font-semibold inline-block font-poppins">
						Detail Informasi Fasilitas
					</p>
				</div>
				<div className="flex items-center justify-between mb-4 pt-2">
					<div className="flex items-center gap-2 sm:gap-3">
						<img
							src={facilityIcon}
							alt={type}
							className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
						/>
						<h2 className="text-base sm:text-lg font-bold text-brand-dark-blue">
							{name}
						</h2>
					</div>
				</div>
				{/* Detail informasi */}
				<div className="space-y-3 sm:space-y-4">
					<div className="flex items-start gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-4 h-4 sm:w-5 sm:h-5 text-brand-medium-blue mt-0.5 flex-shrink-0"
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
							<p className="text-xs sm:text-sm font-semibold text-gray-600">
								Alamat
							</p>
							<p className="text-xs sm:text-sm text-gray-800">{address}</p>
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
								className="w-4 h-4 sm:w-5 sm:h-5 text-brand-medium-blue mt-0.5 flex-shrink-0"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
								/>
							</svg>
							<div>
								<p className="text-xs sm:text-sm font-semibold text-gray-600">
									Kontak
								</p>
								<p className="text-xs sm:text-sm text-gray-800">{contact}</p>
							</div>
						</div>
					)}
					{hours && (
						<div className="flex items-start gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4 sm:w-5 sm:h-5 text-brand-medium-blue mt-0.5 flex-shrink-0"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
								/>
							</svg>
							<div>
								<p className="text-xs sm:text-sm font-semibold text-gray-600">
									Jam Kerja Instansi
								</p>
								<p className="text-xs sm:text-sm text-gray-800">{hours}</p>
							</div>
						</div>
					)}
					{/* Action buttons */}
					<div className="flex gap-2 mt-3 sm:mt-4">
						<button
							onClick={() =>
								window.open(
									`https://www.google.com/maps/dir/?api=1&destination=${facility.lat},${facility.lng}`
								)
							}
							className="flex-1 bg-brand-dark-blue text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center gap-1.5 sm:gap-2"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4 sm:w-5 sm:h-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
								/>
							</svg>
							Rute
						</button>
						<button
							onClick={() =>
								window.open(
									`https://www.google.com/maps/search/?api=1&query=${facility.lat},${facility.lng}`
								)
							}
							className="flex-1 bg-white border-2 border-brand-dark-blue text-brand-dark-blue py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5 sm:gap-2"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4 sm:w-5 sm:h-5"
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
							Maps
						</button>
					</div>
				</div>
			</div>
		</div>
	);

	 // 🔥 MOBILE LANDSCAPE CONTENT - OPTIMIZED UNTUK LANDSCAPE
    const renderMobileLandscapeContent = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div 
                ref={sheetRef}
                className={clsx("bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden", { open: isOpen })}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
					marginTop: "clamp(75px, 9vh, 130px)",
                    maxHeight: "clamp(240px, 9vh, 280px)",
                    maxWidth: "380px"
                }}
            >
                {/* HEADER SECTION - COMPACT */}
                <div className="relative bg-white border-b border-gray-200 px-4 py-2">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 p-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4 text-brand-dark-blue"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    {/* Header Badge - SMALLER */}
                    <div className="flex justify-center">
                        <h2 className="text-brand-dark-blue bg-[#F0EAD6] py-1 px-3 rounded-lg font-semibold text-xs">
                            Detail Informasi Fasilitas
                        </h2>
                    </div>

                    {/* Facility Title - COMPACT */}
                    <div className="flex items-center pt-2 gap-2">
                        <img
                            src={facilityIcon}
                            alt={type}
                            className="w-4 h-4 object-contain flex-shrink-0"
                        />
                        <h2 className="font-bold text-brand-dark-blue text-sm flex-1 truncate">
                            {name}
                        </h2>
                    </div>
                </div>

                {/* SCROLLABLE CONTENT SECTION - COMPACT */}
                <div 
                    className="overflow-y-auto px-4 py-3"
                    style={{
                        maxHeight: "calc(100vh - 275px)" 
                    }}
                >
                    <div className="space-y-2">
                        {/* Alamat - COMPACT */}
                        <div className="flex items-start gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-3 h-3 text-brand-medium-blue mt-0.5 flex-shrink-0"
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
                                <p className="font-semibold text-gray-600 text-xs">Alamat</p>
                                <p className="text-gray-800 text-xs leading-tight">{address}</p>
                            </div>
                        </div>

                        {/* Kontak - COMPACT */}
                        {contact && contact !== "N/A" && (
                            <div className="flex items-start gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-3 h-3 text-brand-medium-blue mt-0.5 flex-shrink-0"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                                    />
                                </svg>
                                <div>
                                    <p className="font-semibold text-gray-600 text-xs">Kontak</p>
                                    <p className="text-gray-800 text-xs">{contact}</p>
                                </div>
                            </div>
                        )}

                        {/* Jam Kerja - COMPACT */}
                        {hours && (
                            <div className="flex items-start gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-3 h-3 text-brand-medium-blue mt-0.5 flex-shrink-0"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                </svg>
                                <div>
                                    <p className="font-semibold text-gray-600 text-xs">Jam Kerja Instansi</p>
                                    <p className="text-gray-800 text-xs">{hours}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* FIXED BUTTON SECTION - ALWAYS VISIBLE */}
                <div className="border-t border-gray-200 bg-white px-4 py-2">
                    <div className="flex gap-2">
                        <button
                            onClick={() =>
                                window.open(
                                    `https://www.google.com/maps/dir/?api=1&destination=${facility.lat},${facility.lng}`
                                )
                            }
                            className="flex-1 bg-brand-dark-blue text-white py-2 px-3 rounded-lg text-xs font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center gap-1"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-3 h-3"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
                                />
                            </svg>
                            Rute
                        </button>
                        <button
                            onClick={() =>
                                window.open(
                                    `https://www.google.com/maps/search/?api=1&query=${facility.lat},${facility.lng}`
                                )
                            }
                            className="flex-1 bg-white border-2 border-brand-dark-blue text-brand-dark-blue py-2 px-3 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-1"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-3 h-3"
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
                            Maps
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

	// Desktop view content with only box size adjustment
	const renderDesktopContent = () => (
		<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[480px] max-w-[95vw]">
			<div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
				<div className="relative bg-white pt-4 pb-1 mb-2">
					<button
						onClick={onClose}
						className="absolute top-2 right-4 p-1.5 bg-white hover:bg-gray-100 rounded-full transition-colors shadow-md"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="w-4 h-4 text-brand-dark-blue"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
				<div className="flex justify-center mb-3">
					<p className="text-sm sm:text-base md:text-lg text-brand-dark-blue bg-[#F0EAD6] py-1.5 px-6 rounded-lg font-semibold inline-block font-poppins">
						Detail Informasi Fasilitas
					</p>
				</div>
				<div className="flex items-center justify-between mb-4 pt-2 px-6">
					<div className="flex items-center gap-2 sm:gap-3">
						<img
							src={facilityIcon}
							alt={type}
							className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
						/>
						<h2 className="text-base sm:text-lg font-bold text-brand-dark-blue">
							{name}
						</h2>
					</div>
				</div>
				{/* Detail informasi */}
				<div className="space-y-3 sm:space-y-4 px-6">
					<div className="flex items-start gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-4 h-4 sm:w-5 sm:h-5 text-brand-medium-blue mt-0.5 flex-shrink-0"
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
							<p className="text-xs sm:text-sm font-semibold text-gray-600">
								Alamat
							</p>
							<p className="text-xs sm:text-sm text-gray-800">{address}</p>
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
								className="w-4 h-4 sm:w-5 sm:h-5 text-brand-medium-blue mt-0.5 flex-shrink-0"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
								/>
							</svg>
							<div>
								<p className="text-xs sm:text-sm font-semibold text-gray-600">
									Kontak
								</p>
								<p className="text-xs sm:text-sm text-gray-800">{contact}</p>
							</div>
						</div>
					)}

					{hours && (
						<div className="flex items-start gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4 sm:w-5 sm:h-5 text-brand-medium-blue mt-0.5 flex-shrink-0"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
								/>
							</svg>
							<div>
								<p className="text-xs sm:text-sm font-semibold text-gray-600">
									Jam Kerja Instansi
								</p>
								<p className="text-xs sm:text-sm text-gray-800">{hours}</p>
							</div>
						</div>
					)}

					{/* Action buttons with bottom padding */}
					<div className="flex gap-2 mt-3 sm:mt-4 pb-6">
						<button
							onClick={() =>
								window.open(
									`https://www.google.com/maps/dir/?api=1&destination=${facility.lat},${facility.lng}`
								)
							}
							className="flex-1 bg-brand-dark-blue text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center gap-1.5 sm:gap-2"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4 sm:w-5 sm:h-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
								/>
							</svg>
							Rute
						</button>
						<button
							onClick={() =>
								window.open(
									`https://www.google.com/maps/search/?api=1&query=${facility.lat},${facility.lng}`
								)
							}
							className="flex-1 bg-white border-2 border-brand-dark-blue text-brand-dark-blue py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5 sm:gap-2"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4 sm:w-5 sm:h-5"
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
							Maps
						</button>
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<>
			{/* Overlay */}
			{!isMobile && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-20"
					onClick={onClose}
				/>
			)}

			{/* Render content based on screen size */}
			{!isMobile 
                ? renderDesktopContent() 
                : isLandscapeMobile 
                    ? renderMobileLandscapeContent() 
                    : renderMobileContent() 
            }
		</>
	);
};

export default FacilityDetailCard;
