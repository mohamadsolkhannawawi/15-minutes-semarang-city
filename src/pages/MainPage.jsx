import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

import semarangBg from "../assets/images/semarang-background.jpg";

const MainPage = ({ onCheckLocation }) => {
	const backgroundStyle = {
		backgroundImage: `url(${semarangBg})`,
	};

	return (
		<div
			style={backgroundStyle}
			className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat overflow-hidden main-page-container no-horizontal-scroll viewport-safe"
		>
			{/* Overlay Gelap */}
			<div className="absolute inset-0 bg-black/50"></div>

			{/* Container dengan responsive layout */}
			<div className="relative z-10 w-full min-h-screen">
				{/* Judul - Responsive dengan clamp */}
				<h1
					className="absolute font-bold text-left font-poppins leading-tight responsive-title-position main-page-title"
					style={{
						fontSize: "clamp(28px, 4.44vw, 64px)",
						fontWeight: "700",
						color: "#213448",
						opacity: "1",
						lineHeight: "1.1",
						textAlign: "left",
						wordBreak: "break-word",
						hyphens: "auto",
						webkitHyphens: "auto",
					}}
				>
					15 Minute's<br />Semarang City
				</h1>

				{/* Kotak Deskripsi - Responsive dengan better width calculation */}
				<div
					className="absolute rounded-lg shadow-xl font-poppins responsive-description-position main-page-description"
					style={{
						backgroundColor: "#94B4C1",
						opacity: "0.75",
						padding: "clamp(20px, 2.78vw, 40px)",
						boxSizing: "border-box",
					}}
				>
					<p
						className="text-justify leading-relaxed responsive-text-container main-page-text"
						style={{
							fontWeight: "500",
							color: "#213448",
							opacity: "1",
							textShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
							textAlign: "justify",
							margin: 0,
							padding: 0,
							fontSize: "clamp(14px, 1.8vw, 26px)",
							lineHeight: "1.4",
							wordBreak: "break-word",
							hyphens: "auto",
							webkitHyphens: "auto",
						}}
					>
						Program Kota 15-Menit Semarang adalah platform strategis untuk
						menganalisis kemudahan warga dalam mengakses fasilitas krusial dalam
						15 menit dengan berjalan kaki. Data yang dihasilkan dari pemetaan
						ini bertujuan untuk mendukung perumusan kebijakan tata ruang yang
						lebih efektif demi meningkatkan konektivitas dan kualitas hidup
						masyarakat.
					</p>
				</div>

				{/* Tombol - Responsive dengan clamp */}
				<button
					onClick={onCheckLocation}
					className="absolute flex items-center justify-center gap-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 font-poppins responsive-button-position"
					style={{
						backgroundColor: "#547792",
						color: "#ECEFCA",
						opacity: "1",
						fontWeight: "700",
						fontSize: "clamp(14px, 1.25vw, 18px)",
						boxShadow:
							"inset 0 2px 4px rgba(0,0,0,0.2), 0 4px 8px rgba(0,0,0,0.3)",
						border: "none",
						cursor: "pointer",
						whiteSpace: "nowrap",
					}}
				>
					Periksa Lokasi Saya
					<ArrowRightIcon
						className="ml-2 flex-shrink-0"
						style={{
							width: "clamp(20px, 2.5vw, 35px)",
							height: "clamp(25px, 3vw, 40px)",
							strokeWidth: "5",
							filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))",
						}}
					/>
				</button>
			</div>
		</div>
	);
};

export default MainPage;
