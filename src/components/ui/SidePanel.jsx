import React, { useState } from 'react';

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

const SidePanel = ({ isVisible, facilities, geoInfo, onFacilitySelect, onClose }) => {
    const [isMinimized, setIsMinimized] = useState(false);

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
                    isVisible ? 'translate-x-0' : 'translate-x-full'
                }`}
                style={{
                    top: "clamp(65px, 9vh, 110px)",
                    width: isMinimized ? "60px" : "33.33vw",
                    backgroundColor: isMinimized ? "#2A3A4E" : "#9DB2C8",
                    borderRadius: isMinimized ? "50%" : "16px 0 0 16px",
                    marginTop: isMinimized ? "20px" : "clamp(8px, 1vh, 16px)",
                    marginRight: isMinimized ? "20px" : "0",
                    minWidth: isMinimized ? "60px" : "320px",
                    maxWidth: isMinimized ? "60px" : "600px",
                    aspectRatio: isMinimized ? "1/1" : "auto",
                    height: isMinimized ? "60px" : "calc(100vh - clamp(65px, 9vh, 110px))",
                    flexShrink: isMinimized ? 0 : "auto",
                }}
            >
                                {/* Konten saat tidak diminimize */}
                {!isMinimized && (
                    <div className="flex flex-col h-full relative">
                        {/* Tombol minimize di pojok kanan atas */}
                        <div className="absolute top-4 right-4 z-10">
                            <button
                                onClick={toggleMinimize}
                                className="p-2 hover:bg-white/30 rounded-full transition-colors"
                                title="Minimize"
                            >
                                <img src={MinimizeIcon} alt="Minimize" className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Header dengan background brand-accent */}
                        <div className="flex-shrink-0 mx-14 px-4 pt-4 pb-3">
                            <div className="p-3 rounded-lg mb-3 bg-brand-accent">
                                <h2 className="font-bold text-brand-dark-blue text-center">
                                    {facilities.length} Fasilitas Publik Ditemukan
                                </h2>
                            </div>
                        </div>

                        {/* List fasilitas dengan background brand-accent */}
                        <div className="flex-1 overflow-y-auto px-4 pb-3">
                            <ul className="space-y-2">
                                {facilities.map((facility, index) => (
                                    <li key={facility.id}>
                                        <button
                                            onClick={() => onFacilitySelect(facility)}
                                            className="group flex items-center gap-3 hover:bg-white/50 p-3 rounded-lg transition-colors w-full text-left"
                                        >
                                            <span className="flex-shrink-0 w-6 text-center font-semibold text-brand-dark-blue">
                                                {index + 1}.
                                            </span>
                                            <img
                                                src={getIconForType(facility.type)}
                                                alt={facility.type}
                                                className="w-6 h-6 object-contain flex-shrink-0"
                                            />
                                            <span className="flex-grow font-medium group-hover:underline text-brand-dark-blue">
                                                {facility.name}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Header Detail Informasi Geografis */}
                        <div className="flex-shrink-0 mx-14 px-4 pt-6 pb-3">
                            <div className="p-3 rounded-lg mb-3 bg-brand-accent">
                                <h3 className="font-semibold text-brand-dark-blue text-center">
                                    Detail Informasi Geografis
                                </h3>
                            </div>
                        </div>

                        {/* Konten Detail Informasi Geografis */}
                        <div className="flex-shrink-0 px-4 pb-4">
                            <div className="space-y-2 text-sm text-brand-dark-blue">
                                <div className="flex justify-between">
                                    <span className="font-medium">Kepadatan Penduduk:</span>
                                    <span>{geoInfo.populationDensity}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Kelurahan:</span>
                                    <span>{geoInfo.kelurahan}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Kecamatan:</span>
                                    <span>{geoInfo.kecamatan}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Konten saat diminimize - hanya icon maximize di tengah */}
                {isMinimized && (
                    <div className="flex items-center justify-center h-full w-full">
                        <button
                            onClick={toggleMinimize}
                            className="p-2 hover:bg-white/30 rounded-full transition-colors"
                            title="Maximize"
                        >
                            <img 
                                src={MaximizeIcon} 
                                alt="Maximize" 
                                className="w-6 h-6"
                                style={{ filter: 'brightness(0) invert(1)' }}
                            />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default SidePanel;