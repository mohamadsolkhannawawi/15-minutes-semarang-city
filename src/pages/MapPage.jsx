import React, { useState, useMemo, useRef, useEffect } from "react";
import axios from "axios";
import api from "../api";
import { MapContainer, TileLayer, Marker, Polygon } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import clsx from "clsx";

// Import CSS untuk mobile layout
import "../styles/mobile.css";

// Import komponen & data
import SearchBar from "../components/ui/SearchBar";
import SidePanel from "../components/ui/SidePanel";
import FacilityDetailCard from "../components/ui/FacilityDetailCard";
import FacilityMarker from "../components/map/FacilityMarker";
import MapEvents from "../components/map/MapEvents";
/*import { dummyGeographicInfo } from "../data/dummyData";*/

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
	const [facilities, setFacilities] = useState([]);
	const [selectedFacility, setSelectedFacility] = useState(null);
	const [activeFilter, setActiveFilter] = useState("all");
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 810);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [polygonCoords, setPolygonCoords] = useState([]);
	const [isLandscape, setIsLandscape] = useState(
		window.innerWidth > window.innerHeight
	);
	const mapRef = useRef(null);

	const [maximizeConfig, setMaximizeConfig] = useState({
		// buttonSize: "w-12 h-12",
		iconSize: "w-6 h-6",
		buttonPadding: "p-3",
		bottomPosition: "bottom-6",
		rightPosition: "right-6",
		buttonWidth: "40px",
		buttonHeight: "40px",
	});

	// Tambahkan state untuk button styling
	const [buttonConfig, setButtonConfig] = useState({
		fontSize: "text-base",
		padding: "py-4 px-6",
		iconSize: "w-6 h-6",
		buttonWidth: "48px", // ← TAMBAH INI
		buttonHeight: "48px", // ← TAMBAH INI
		height: "60px", // <-- Perbaikan
		width: "300px",
		gap: "gap-3",
		containerStyle: "flex-col gap-3",
	});

	// Tambahkan state untuk header style
	const [headerStyle, setHeaderStyle] = useState({
		fontSize: "clamp(14px, 2vw, 24px)",
		wordBreak: "break-word",
		whiteSpace: "normal",
	});

	useEffect(() => {
		const handleMaximizeResize = () => {
			const width = window.innerWidth;

			if (width <= 375) {
				// 📱 Mobile Small - Tombol BESAR (layar kecil butuh tombol besar)
				setMaximizeConfig({
					iconSize: "w-7 h-7",
					buttonPadding: "p-4",
					buttonWidth: "56px",
					buttonHeight: "56px",
					bottomPosition: "bottom-[calc(env(safe-area-inset-bottom,0px)+60px)]",
					rightPosition: "right-4",
				});
			} else if (width <= 414) {
				// 📱 Mobile Medium - Sedikit lebih kecil
				setMaximizeConfig({
					iconSize: "w-6 h-6",
					buttonPadding: "p-3.5",
					buttonWidth: "48px",
					buttonHeight: "48px",
					bottomPosition: "bottom-[calc(env(safe-area-inset-bottom,0px)+60px)]",
					rightPosition: "right-4",
				});
			} else if (width <= 440) {
				// 📱 Mobile Large - Ukuran sedang
				setMaximizeConfig({
					iconSize: "w-6 h-6",
					buttonPadding: "p-3",
					buttonWidth: "44px",
					buttonHeight: "44px",
					bottomPosition: "bottom-[calc(env(safe-area-inset-bottom,0px)+60px)]",
					rightPosition: "right-5",
				});
			} else if (width <= 884) {
				// 📊 Tablets - Lebih kecil
				setMaximizeConfig({
					iconSize: "w-5 h-5",
					buttonPadding: "p-3",
					buttonWidth: "40px",
					buttonHeight: "40px",
					bottomPosition: "bottom-[calc(env(safe-area-inset-bottom,0px)+60px)]",
					rightPosition: "right-5",
				});
			} else if (width >= 1280) {
				// 💻 Laptops - Tombol KECIL (layar besar butuh tombol kecil)
				setMaximizeConfig({
					iconSize: "w-5 h-5",
					buttonPadding: "p-2.5",
					buttonWidth: "36px",
					buttonHeight: "36px",
					bottomPosition: "bottom-6",
					rightPosition: "right-6",
				});
			} else {
				// Default untuk ukuran diantara tablet dan laptop (885px-1279px)
				setMaximizeConfig({
					iconSize: "w-5 h-5",
					buttonPadding: "p-3",
					buttonWidth: "40px",
					buttonHeight: "40px",
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

			if (width <= 375) {
				// 📱 Mobile Small
				setHeaderStyle({
					fontSize: "clamp(14px, 1.5vw, 18px)",
					wordBreak: "break-word",
				});
			} else if (width <= 414) {
				// 📱 Mobile Medium
				setHeaderStyle({
					fontSize: "clamp(15px, 1.6vw, 19px)",
					wordBreak: "break-word",
				});
			} else if (width <= 440) {
				// 📱 Mobile Large
				setHeaderStyle({
					fontSize: "clamp(16px, 1.7vw, 20px)",
					wordBreak: "break-word",
				});
			} else if (width <= 884) {
				// 📊 Tablets
				setHeaderStyle({
					fontSize: "clamp(20px, 2vw, 24px)",
					wordBreak: "normal",
					whiteSpace: "nowrap",
				});
			} else if (width >= 1280) {
				// 💻 Laptops
				setHeaderStyle({
					fontSize: "clamp(20px, 2vw, 24px)",
					wordBreak: "normal",
					whiteSpace: "nowrap",
				});
			} else {
				// Default untuk ukuran diantara tablet dan laptop (885px-1279px)
				setHeaderStyle({
					fontSize: "clamp(20px, 2vw, 24px)",
					wordBreak: "normal",
					whiteSpace: "nowrap",
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
			const height = window.innerHeight;
			const currentIsLandscape = width > height;

			let newConfig;

			// UPDATE STATE LANDSCAPE DAN MOBILE
			setIsLandscape(currentIsLandscape);
			setIsMobile(width <= 810);

			if (currentIsLandscape && width <= 1024) {
				// Landscape mobile styling
				newConfig = {
					fontSize: "clamp(14px, 1.8vw, 16px)",
					padding: "py-2 px-3",
					iconSize: "w-5 h-5",
					height: "40px",
					width: "220px",
					gap: "gap-2",
					containerStyle: "flex-row justify-center items-center gap-4",
				};
				setButtonConfig(newConfig);
			} else if (width <= 375) {
				// Keep existing mobile styles
				newConfig = {
					fontSize: "text-[16px]",
					padding: "py-2 px-3",
					iconSize: "w-6 h-6",
					height: "45px",
					width: "70vw",
					gap: "gap-1.5",
					containerStyle: "flex-col gap-3",
				};
				setButtonConfig(newConfig);
			} else if (width <= 414) {
				// Keep existing mobile styles
				newConfig = {
					fontSize: "text-[18px]",
					padding: "py-2 px-3",
					iconSize: "w-7 h-7",
					height: "42px",
					width: "70vw",
					gap: "gap-1.5",
					containerStyle: "flex-col gap-3",
				};
				setButtonConfig(newConfig);
			} else {
				// Keep existing desktop styles
				newConfig = {
					fontSize: "text-base",
					padding: "py-4 px-6",
					iconSize: "w-6 h-6",
					height: "60px",
					width: "320px",
					gap: "gap-3",
					containerStyle: "flex-col gap-3",
				};
				setButtonConfig(newConfig);
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

	const formatFacilities = (data) => {
		console.log('Raw data from backend:', data); // Debug log
		const formatted = data.map((facility) => ({
			id: facility.id,
			name: facility.name,
			type: facility.category_name, // Ambil dari backend
			position: [facility.lat, facility.lng],
			address: facility.description,
		}));
		console.log('Formatted facilities:', formatted); // Debug log
		return formatted;
	};

	const handleMapClick = (latlng) => {
		if (showResults) return;
		setUserPin(latlng);
		setSelectedFacility(null);
	};

	const handleUseMyLocation = () => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const myLocation = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};
				setMapCenter([myLocation.lat, myLocation.lng]);
				setUserPin(myLocation);
				setSelectedFacility(null);

				if (mapRef.current) {
					setTimeout(() => {
						mapRef.current.flyTo([myLocation.lat, myLocation.lng], 16);
					}, 100);
				}
			},
			(error) => {
				console.error("Error getting location:", error);
				// Fallback ke Simpang Lima jika gagal mendapatkan lokasi
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
			}
		);
	};

	const handleCheckFacilities = async () => {
		if (!userPin) {
			alert("Silakan tandai lokasi di peta atau gunakan lokasi Anda.");
			return;
		}

		console.log("🚀 Mulai proses pencarian fasilitas...");
		setIsLoading(true);
		setError(null);
		setPolygonCoords([]);

		try {
			const { lat, lng } = userPin;
			console.log(`📍 Lokasi dipilih: ${lat}, ${lng}`);

			console.log("🔍 [1/5] Mengecek cache di database...");
			const checkResult = await api.post("/walkability-zones/check", {
				lat,
				lng,
			});
			console.log("🔍 [2/5] Respons dari DB:", checkResult.data);

			if (checkResult.data.exists && checkResult.data.zone_polygon) {
				const polygon = checkResult.data.zone_polygon.coordinates[0].map(
					([lng, lat]) => [lat, lng]
				);
				setPolygonCoords(polygon);
				console.log("✅ [3/5] Polygon dari DB akan ditampilkan.");

				console.log("📦 [4/5] Mengambil fasilitas dari zona yang ada...");
				const servicesResponse = await api.get(
					`/services/in-zone/${checkResult.data.search_id}`
				);
				setFacilities(formatFacilities(servicesResponse.data));
				console.log(
					`📦 [5/5] Ditemukan ${servicesResponse.data.length} fasilitas.`
				);
			} else {
				console.log("🔄 [3/5] Tidak ada data di DB, mengambil dari ORS...");
				if (!import.meta.env.VITE_ORS_API_KEY) {
					throw new Error(
						"ORS API Key tidak ditemukan. Pastikan ada di file .env"
					);
				}

				const orsResponse = await axios.post(
					"https://api.openrouteservice.org/v2/isochrones/foot-walking",
					{ locations: [[lng, lat]], range: [900], attributes: ["area"] },
					{
						headers: {
							Authorization: import.meta.env.VITE_ORS_API_KEY,
							"Content-Type": "application/json",
						},
					}
				);
				console.log("🌐 [4/5] Respons dari ORS diterima.");

				const newCoords =
					orsResponse.data.features[0].geometry.coordinates[0].map(
						([lng, lat]) => [lat, lng]
					);
				setPolygonCoords(newCoords);

				console.log("💾 [5/5] Menyimpan data baru ke backend...");
				const searchResponse = await api.post("/user-searches", { lat, lng });
				const searchId = searchResponse.data.id;
				console.log("💾 -> ID Pencarian baru:", searchId);

				if (searchId) {
					const geojson = {
						type: "Polygon",
						coordinates: [newCoords.map(([lat, lng]) => [lng, lat])],
					};
					await api.post("/walkability-zones", {
						search_id: searchId,
						polygon: geojson,
						zone_type: "walking",
						travel_time: 15,
					});
					console.log("💾 -> Polygon berhasil disimpan.");

					const servicesResponse = await api.get(
						`/services/in-zone/${searchId}`
					);
					setFacilities(formatFacilities(servicesResponse.data));
					console.log(
						`📦 Ditemukan ${servicesResponse.data.length} fasilitas dari data baru.`
					);
				}
			}
			setShowResults(true);
			console.log("✅ Proses selesai!");
		} catch (err) {
			// Log error yang lebih detail
			console.error("❌ Terjadi Error:", {
				message: err.message,
				response: err.response?.data,
				status: err.response?.status,
				config: err.config, // Menampilkan detail request yang gagal
			});
			setError(
				`Gagal memproses data: ${err.response?.data?.message || err.message}`
			);
		} finally {
			setIsLoading(false);
		}
	};

	const handleFacilitySelect = (facility) => {
		setSelectedFacility(facility);
		setMapCenter(facility.position);
	};

	const resetView = () => {
		setShowResults(false);
		setSelectedFacility(null);
		setActiveFilter("all");
		setFacilities([]); // Kosongkan fasilitas saat reset
		setPolygonCoords([]); // Kosongkan poligon saat reset
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
				{isLoading && (
					<div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
						<p className="text-white text-xl font-bold">Mencari Fasilitas...</p>
					</div>
				)}
				{error && (
					<div className="absolute top-20 left-1/2 -translate-x-1/2 bg-red-500 text-white p-4 rounded-lg z-50 shadow-lg">
						<p>{error}</p>
					</div>
				)}
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
							{polygonCoords.length > 0 && (
								<Polygon
									pathOptions={{
										color: "orange",
										fillColor: "orange",
										fillOpacity: 0.2,
									}}
									positions={polygonCoords}
								/>
							)}
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
						"absolute left-1/2 -translate-x-1/2 z-20 flex transition-opacity duration-300",
						buttonConfig.containerStyle,
						{ "opacity-0 pointer-events-none": showResults }
					)}
					style={{
						bottom:
							isLandscape && window.innerWidth <= 1024
								? "calc(env(safe-area-inset-bottom, 0px) + 60px)"
								: "clamp(40px, 10vh, 80px)",
					}}
				>
					<button
						onClick={handleUseMyLocation}
						className={clsx(
							"bg-brand-light-blue text-brand-dark-blue font-semibold rounded-xl shadow-lg hover:bg-white transition-all duration-200 flex items-center justify-center font-poppins whitespace-nowrap",
							buttonConfig.padding,
							buttonConfig.fontSize,
							buttonConfig.gap
						)}
						style={{
							height: buttonConfig.height,
							width: buttonConfig.width,
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
							"bg-brand-accent text-brand-dark-blue font-semibold rounded-xl shadow-lg hover:bg-white transition-all duration-200 flex items-center justify-center font-poppins whitespace-nowrap",
							buttonConfig.padding,
							buttonConfig.fontSize,
							buttonConfig.gap
						)}
						style={{
							height: buttonConfig.height,
							width: buttonConfig.width,
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
				{isMobile && showResults && !selectedFacility && (
					<button
						className={clsx(
							"fixed z-30 bg-brand-accent text-brand-dark-blue rounded-full shadow-lg hover:bg-brand-light-blue transition-all duration-200 flex items-center justify-center",
							maximizeConfig.buttonPadding,
							maximizeConfig.bottomPosition,
							maximizeConfig.rightPosition
						)}
						style={{
							width: maximizeConfig.buttonWidth,
							height: maximizeConfig.buttonHeight,
						}}
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
					geoInfo={{}}
					onFacilitySelect={handleFacilitySelect}
					onClose={resetView}
				/>
			</main>
		</div>
	);
};

export default MapPage;
