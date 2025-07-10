import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Polygon } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import clsx from "clsx";

// Import komponen & data
import SearchBar from "../components/ui/SearchBar";
import BottomSheet from "../components/ui/BottomSheet";
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
	iconSize: [40, 40],
	iconAnchor: [20, 40],
});

const MapPage = () => {
	const [mapCenter, setMapCenter] = useState([-6.9929, 110.4253]);
	const [userPin, setUserPin] = useState(null); // Pin yang dipilih pengguna
	const [showResults, setShowResults] = useState(false);
	const [facilities] = useState(dummyFacilities);
	const [selectedFacility, setSelectedFacility] = useState(null);

	const handleMapClick = (latlng) => {
		if (showResults) return; // Jangan letakkan pin baru jika hasil sudah ditampilkan
		setUserPin(latlng);
		setSelectedFacility(null);
	};

	const handleUseMyLocation = () => {
		navigator.geolocation.getCurrentPosition((position) => {
			const myLocation = {
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			};
			setMapCenter([myLocation.lat, myLocation.lng]);
			setUserPin(myLocation);
			setSelectedFacility(null);
		});
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
		// Jangan hapus userPin agar user tahu titik awal pencariannya
	};

	return (
		<div className="h-screen w-screen flex flex-col font-sans">
			<header
				className="relative shadow-md z-30 flex items-center justify-between px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12"
				style={{
					backgroundColor: "#213448",
					opacity: "1",
					height: "clamp(80px, 10.76vh, 155px)",
					maxWidth: "100vw",
					width: "100%",
				}}
			>
				{/* Container untuk layout responsif */}
				<div
					className="w-full flex items-center justify-between"
					style={{ gap: "clamp(16px, 2.78vw, 40px)" }}
				>
					{/* Judul di kiri */}
					<h1
						className="font-bold flex items-center font-poppins flex-shrink-0"
						style={{
							fontWeight: "700",
							color: "#ECEFCA",
							opacity: "1",
							display: "flex",
							alignItems: "center",
							lineHeight: "1.1",
							fontSize: "clamp(16px, 2.78vw, 40px)",
							width: "clamp(180px, 22.22vw, 320px)",
							height: "clamp(auto, 7.64vh, 110px)",
							wordBreak: "break-word",
							hyphens: "auto",
						}}
					>
						15 Minute's Semarang City
					</h1>

					{/* Search Bar di kanan */}
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
							{facilities.map((facility) => (
								<FacilityMarker
									key={facility.id}
									facility={facility}
									onSelect={handleFacilitySelect}
								/>
							))}
						</>
					)}
				</MapContainer>

				{/* Initial State UI (Output-Page-Awal) */}
				<div
					className={clsx(
						"absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col gap-3 sm:gap-4 transition-opacity duration-300",
						{ "opacity-0 pointer-events-none": showResults }
					)}
					style={{
						width: "clamp(280px, 80vw, 450px)",
						maxWidth: "90vw",
					}}
				>
					<button
						onClick={handleUseMyLocation}
						className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-brand-light-blue text-brand-dark-blue font-semibold rounded-xl shadow-lg hover:bg-white transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 font-poppins"
						style={{
							fontSize: "clamp(14px, 1.1vw, 16px)",
							height: "clamp(50px, 4vh, 60px)",
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-5 h-5 sm:w-6 sm:h-6"
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
						className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-brand-accent text-brand-dark-blue font-semibold rounded-xl shadow-lg hover:bg-white transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 font-poppins"
						style={{
							fontSize: "clamp(14px, 1.1vw, 16px)",
							height: "clamp(50px, 4vh, 60px)",
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-5 h-5 sm:w-6 sm:h-6"
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
				{/* Facility Detail Card (Output-Page-Zoom-Area) */}
				<FacilityDetailCard
					facility={selectedFacility}
					onClose={() => setSelectedFacility(null)}
				/>

				<BottomSheet
					isVisible={showResults && !selectedFacility}
					facilities={facilities}
					geoInfo={dummyGeographicInfo}
					onFacilitySelect={handleFacilitySelect}
					onClose={resetView}
				/>
			</main>
		</div>
	);
};

export default MapPage;
