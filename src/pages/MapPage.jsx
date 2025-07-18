import React, { useState, useMemo, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polygon } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import clsx from "clsx";

// Import CSS untuk mobile layout
import "../styles/mobile.css";

// Import komponen & data
import SearchBar from "../components/ui/SearchBar";
import BottomSheet from "../components/ui/BottomSheet";
import SidePanel from "../components/ui/SidePanel";
import FacilityDetailCard from "../components/ui/FacilityDetailCard";
import FacilityMarker from "../components/map/FacilityMarker";
import MapEvents from "../components/map/MapEvents";
import {
	dummyFacilities,
	dummyGeographicInfo,
	dummyIsochrone,
} from "../data/dummyData";

// Fix ikon default
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;
const userPinIcon = L.icon({
	iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
	iconSize: [60, 60],
	iconAnchor: [30, 60],
});

const MapPage = () => {
	// Lokasi Default Simpang Lima
	const SIMPANG_LIMA_COORDS = [-6.9904397128823295, 110.42294902766812];
	const [mapCenter, setMapCenter] = useState(SIMPANG_LIMA_COORDS);
	const [userPin, setUserPin] = useState(null);
	const [showResults, setShowResults] = useState(false);
	const [facilities] = useState(dummyFacilities);
	const [selectedFacility, setSelectedFacility] = useState(null);
	const [activeFilter, setActiveFilter] = useState("all");
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 810);
	const mapRef = useRef(null);

	const [maximizeConfig, setMaximizeConfig] = useState({
		buttonSize: "w-12 h-12",
		iconSize: "w-6 h-6",
		buttonPadding: "p-3",
	});

	// Tambahkan state untuk button styling
	const [buttonConfig, setButtonConfig] = useState({
		fontSize: "text-base",
		padding: "py-4 px-6",
		iconSize: "w-6 h-6",
		height: "h-[60px]",
		width: "w-[300px]",
		gap: "gap-3",
	});

	// Tambahkan state untuk header style
	const [headerStyle, setHeaderStyle] = useState({
		fontSize: "clamp(14px, 2vw, 24px)",
		wordBreak: "break-word",
	});

	// Detect mobile screen
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 810);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		const handleMaximizeResize = () => {
			const width = window.innerWidth;

			if (width <= 320) {
				setMaximizeConfig({
					iconSize: "w-4 h-4",
					buttonPadding: "p-1",
					bottomPosition: "bottom-4",
					rightPosition: "right-4",
				});
			} else if (width <= 420) {
				setMaximizeConfig({
					iconSize: "w-4 h-4",
					buttonPadding: "p-1.5",
					bottomPosition: "bottom-4",
					rightPosition: "right-4",
				});
			} else if (width <= 610) {
				setMaximizeConfig({
					iconSize: "w-5 h-5",
					buttonPadding: "p-2",
					bottomPosition: "bottom-5",
					rightPosition: "right-5",
				});
			} else if (width <= 810) {
				setMaximizeConfig({
					iconSize: "w-6 h-6",
					buttonPadding: "p-2.5",
					bottomPosition: "bottom-6",
					rightPosition: "right-6",
				});
			} else {
				// Desktop (default - ukuran terbesar)
				setMaximizeConfig({
					iconSize: "w-6 h-6",
					buttonPadding: "p-3",
					bottomPosition: "bottom-6",
					rightPosition: "right-6",
				});
			}
		};

		handleMaximizeResize();
		window.addEventListener("resize", handleMaximizeResize);
		return () => window.removeEventListener("resize", handleMaximizeResize);
	}, []);

	// Tambahkan useEffect untuk mengatur font size header
	useEffect(() => {
		const handleHeaderResize = () => {
			const width = window.innerWidth;
			if (width >= 1043 && width <= 1167) {
				setHeaderStyle({
					fontSize: "clamp(16px, 1.7vw, 22px)",
					wordBreak: "normal",
					whiteSpace: "nowrap",
				});
			} else if (width >= 887 && width < 1043) {
				setHeaderStyle({
					fontSize: "clamp(16px, 1.7vw, 22px)",
					wordBreak: "break-word",
				});
			} else if (width < 887) {
				setHeaderStyle({
					fontSize: "clamp(14px, 1.5vw, 20px)",
					wordBreak: "break-word",
				});
			} else {
				setHeaderStyle({
					fontSize: "clamp(14px, 2vw, 24px)",
					wordBreak: "break-word",
				});
			}
		};

		handleHeaderResize();
		window.addEventListener("resize", handleHeaderResize);
		return () => window.removeEventListener("resize", handleHeaderResize);
	}, []);

	// Tambahkan useEffect untuk button styling
	useEffect(() => {
		const handleButtonResize = () => {
			const width = window.innerWidth;

			if (width <= 340) {
				setButtonConfig({
					fontSize: "text-[10px]",
					padding: "py-1.5 px-2",
					iconSize: "w-3.5 h-3.5",
					height: "h-[40px]",
					width: "w-[200px]",
					gap: "gap-1",
				});
			} else if (width <= 420) {
				setButtonConfig({
					fontSize: "text-[11px]",
					padding: "py-2 px-3",
					iconSize: "w-4 h-4",
					height: "h-[40px]",
					width: "w-[220px]",
					gap: "gap-1.5",
				});
			} else if (width <= 610) {
				setButtonConfig({
					fontSize: "text-[11px]",
					padding: "py-2 px-3",
					iconSize: "w-4 h-4",
					height: "h-[42px]",
					width: "w-[225px]",
					gap: "gap-1.5",
				});
			} else if (width <= 769) {
				setButtonConfig({
					fontSize: "text-[13px]",
					padding: "py-3 px-4",
					iconSize: "w-5 h-5",
					height: "h-[48px]",
					width: "w-[260px]",
					gap: "gap-2",
				});
			} else if (width <= 810) {
				setButtonConfig({
					fontSize: "text-[13px]",
					padding: "py-3 px-5",
					iconSize: "w-5 h-5",
					height: "h-[50px]",
					width: "w-[270px]",
					gap: "gap-2",
				});
			} else if (width <= 983) {
				setButtonConfig({
					fontSize: "text-[13px]",
					padding: "py-2.5 px-4",
					iconSize: "w-5 h-5",
					height: "h-[45px]",
					width: "w-[250px]",
					gap: "gap-2",
				});
			} else if (width <= 1178) {
				setButtonConfig({
					fontSize: "text-[14px]",
					padding: "py-3 px-4",
					iconSize: "w-5 h-5",
					height: "h-[48px]",
					width: "w-[260px]",
					gap: "gap-2",
				});
			} else {
				setButtonConfig({
					fontSize: "text-base",
					padding: "py-4 px-6",
					iconSize: "w-6 h-6",
					height: "h-[60px]",
					width: "w-[300px]",
					gap: "gap-3",
				});
			}
		};

		handleButtonResize();
		window.addEventListener("resize", handleButtonResize);
		return () => window.removeEventListener("resize", handleButtonResize);
	}, []);

	const filteredFacilities = useMemo(() => {
		if (activeFilter === "all") {
			return facilities;
		}
		return facilities.filter((facility) => facility.type === activeFilter);
	}, [activeFilter, facilities]);

	const handleMapClick = (latlng) => {
		if (showResults) return;
		setUserPin(latlng);
		setSelectedFacility(null);
	};

	const handleUseMyLocation = () => {
		// Di non aktifkan untuk nanti saat data sudah siap
		// navigator.geolocation.getCurrentPosition((position) => {
		// 	const myLocation = {
		// 		lat: position.coords.latitude,
		// 		lng: position.coords.longitude,
		// 	};
		// 	setMapCenter([myLocation.lat, myLocation.lng]);
		// 	setUserPin(myLocation);
		// 	setSelectedFacility(null);
		// });
		const defaultLocation = {
			lat: SIMPANG_LIMA_COORDS[0],
			lng: SIMPANG_LIMA_COORDS[1],
		};

		setMapCenter(SIMPANG_LIMA_COORDS);
		setUserPin(defaultLocation);
		setSelectedFacility(null);

		if (mapRef.current) {
			setTimeout(() => {
				mapRef.current.flyTo(SIMPANG_LIMA_COORDS, 16);
			}, 100);
		}
	};

	const handleCheckFacilities = () => {
		if (!userPin) {
			alert("Silakan tandai lokasi di peta atau gunakan lokasi Anda.");
			return;
		}
		setShowResults(true);
		setSelectedFacility(null);
	};

	const handleFacilitySelect = (facility) => {
		setSelectedFacility(facility);
		setMapCenter(facility.position);
	};

	const resetView = () => {
		setShowResults(false);
		setSelectedFacility(null);
		setActiveFilter("all");
	};

	return (
		<div className="h-screen w-screen flex flex-col font-sans">
			<header
				className="mappage-header relative shadow-md z-30 flex items-center justify-between px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12"
				style={{
					backgroundColor: "#213448",
					height: "clamp(65px, 9vh, 110px)",
					boxSizing: "border-box",
				}}
			>
				<div
					className="w-full flex items-center justify-between"
					style={{ gap: "clamp(16px, 2.78vw, 40px)" }}
				>
					<h1
						className="font-bold flex items-center font-poppins flex-shrink-0"
						style={{
							fontWeight: "700",
							color: "#ECEFCA",
							lineHeight: "1",
							fontSize: headerStyle.fontSize,
							width: "clamp(240px, 15vw, 400px)",
							wordBreak: headerStyle.wordBreak,
							whiteSpace: headerStyle.whiteSpace,
						}}
					>
						15 Minute's Semarang City
					</h1>

					<div
						className="flex-shrink-0"
						style={{
							width: "clamp(200px, 52.78vw, 760px)",
							maxWidth: "760px",
							minWidth: "200px",
						}}
					>
						<SearchBar
							onSearch={(q) => console.log("Search:", q)}
							onClear={() => console.log("Clear search")}
						/>
					</div>
				</div>
			</header>

			<main className="relative flex-grow">
				<MapContainer
					center={mapCenter}
					zoom={15}
					scrollWheelZoom={true}
					className="h-full w-full z-0"
					ref={mapRef}
				>
					<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
					<MapEvents onMapClick={handleMapClick} />

					{userPin && <Marker position={userPin} icon={userPinIcon} />}

					{showResults && (
						<>
							<Polygon
								pathOptions={{
									color: "orange",
									fillColor: "orange",
									fillOpacity: 0.2,
								}}
								positions={dummyIsochrone}
							/>
							{filteredFacilities.map((facility) => (
								<FacilityMarker
									key={facility.id}
									facility={facility}
									onSelect={handleFacilitySelect}
								/>
							))}
						</>
					)}
				</MapContainer>

				<div
					className={clsx(
						"absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col gap-3 sm:gap-4 transition-opacity duration-300",
						{ "opacity-0 pointer-events-none": showResults }
					)}
					style={{
						width: buttonConfig.width,
						maxWidth: "90vw",
					}}
				>
					<button
						onClick={handleUseMyLocation}
						className={clsx(
							"w-full bg-brand-light-blue text-brand-dark-blue font-semibold rounded-xl shadow-lg hover:bg-white transition-all duration-200 flex items-center justify-center font-poppins",
							buttonConfig.padding,
							buttonConfig.fontSize,
							buttonConfig.gap
						)}
						style={{
							height: buttonConfig.height,
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className={buttonConfig.iconSize}
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
						Gunakan Lokasi Saya
					</button>
					<button
						onClick={handleCheckFacilities}
						className={clsx(
							"w-full bg-brand-accent text-brand-dark-blue font-semibold rounded-xl shadow-lg hover:bg-white transition-all duration-200 flex items-center justify-center font-poppins",
							buttonConfig.padding,
							buttonConfig.fontSize,
							buttonConfig.gap
						)}
						style={{
							height: buttonConfig.height,
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className={buttonConfig.iconSize}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
							/>
						</svg>
						Cari Fasilitas Publik
					</button>
				</div>

				<FacilityDetailCard
					facility={selectedFacility}
					onClose={() => setSelectedFacility(null)}
				/>

				{/* Tombol Maximize untuk Mobile */}
				{isMobile && showResults && (
					<button
						className={clsx(
							"fixed z-30 bg-brand-accent text-brand-dark-blue rounded-full shadow-lg hover:bg-brand-light-blue transition-all duration-200 flex items-center justify-center",
							maximizeConfig.buttonPadding,
							maximizeConfig.bottomPosition,
							maximizeConfig.rightPosition
						)}
						onClick={() => setSelectedFacility(null)}
						aria-label="Tampilkan daftar fasilitas"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className={clsx(maximizeConfig.iconSize, "text-brand-dark-blue")}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
							/>
						</svg>
					</button>
				)}

				<SidePanel
					isVisible={showResults && !selectedFacility}
					facilities={filteredFacilities}
					geoInfo={dummyGeographicInfo}
					onFacilitySelect={handleFacilitySelect}
					onClose={resetView}
				/>
			</main>
		</div>
	);
};

export default MapPage;
