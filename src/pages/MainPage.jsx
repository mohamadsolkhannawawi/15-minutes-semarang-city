import React from "react";
// (PENYESUAIAN 1) Mengimpor ikon dari 'outline' bukan 'solid'
import { ArrowRightIcon } from "@heroicons/react/24/outline";

import semarangBg from "../assets/images/semarang-background.jpg";

const MainPage = ({ onCheckLocation }) => {
	const backgroundStyle = {
		backgroundImage: `url(${semarangBg})`,
	};

	// Definisikan nilai responsif untuk margin kiri dan kanan
	const horizontalMargin = "clamp(20px, 8.3vw, 120px)";

	return (
		<div
			style={backgroundStyle}
			className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat overflow-hidden main-page-container no-horizontal-scroll viewport-safe"
		>
			{/* Overlay Gelap */}
			<div className="absolute inset-0 bg-black/50"></div>

			{/* Container untuk Konten */}
			<div className="relative z-10 w-full min-h-screen">
				{/* Judul - Diposisikan dengan margin kiri */}
				<h1
					className="font-bold text-left font-poppins leading-tight"
					style={{
						position: "absolute",
						fontSize: "clamp(28px, 4.44vw, 64px)",
						fontWeight: "700",
						color: "#213448",
						top: "clamp(60px, 12.5vh, 180px)",
						left: horizontalMargin,
						width: "clamp(280px, 36vw, 520px)",
						lineHeight: "1.1",
						textAlign: "left",
					}}
				>
					15 Minute's<br />Semarang City
				</h1>

				{/* Wrapper untuk Deskripsi dan Tombol */}
				<div
					className="absolute"
					style={{
						// (PENYESUAIAN) Mengurangi nilai 'top' untuk memperkecil jarak dari judul
						top: "clamp(260px, 31vh, 390px)",
						left: horizontalMargin,
						right: horizontalMargin,
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-end",
						gap: "clamp(24px, 4vh, 40px)",
					}}
				>
					{/* Kotak Deskripsi */}
					<div
						className="w-full rounded-lg shadow-xl font-poppins"
						style={{
							backgroundColor: "rgba(148, 180, 193, 0.75)",
							padding: "clamp(20px, 2.78vw, 40px)",
							boxSizing: "border-box",
						}}
					>
						<p
							className="text-justify leading-relaxed"
							style={{
								fontWeight: "500",
								color: "#213448",
								textShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
								fontSize: "clamp(14px, 1.8vw, 26px)",
								lineHeight: "1.4",
							}}
						>
							Program Kota 15-Menit Semarang adalah platform strategis untuk
							menganalisis kemudahan warga dalam mengakses fasilitas krusial
							dalam 15 menit dengan berjalan kaki. Data yang dihasilkan dari
							pemetaan ini bertujuan untuk mendukung perumusan kebijakan tata
							ruang yang lebih efektif demi meningkatkan konektivitas dan
							kualitas hidup masyarakat.
						</p>
					</div>

					{/* Tombol - Di bawah Deskripsi */}
					<button
						onClick={onCheckLocation}
						className="flex items-center justify-center gap-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 font-poppins"
						style={{
							backgroundColor: "#547792",
							color: "#ECEFCA",
							fontWeight: "700",
							fontSize: "clamp(14px, 1.25vw, 18px)",
							boxShadow:
								"inset 0 2px 4px rgba(0,0,0,0.2), 0 4px 8px rgba(0,0,0,0.3)",
							cursor: "pointer",
							whiteSpace: "nowrap",
							padding: "0 clamp(24px, 2.5vw, 40px)",
							height: "clamp(50px, 5.56vh, 80px)",
						}}
					>
						Periksa Lokasi Saya
						<ArrowRightIcon
							className="ml-2 flex-shrink-0"
							style={{
								width: "clamp(20px, 2.5vw, 35px)",
								height: "clamp(25px, 3vw, 40px)",
								strokeWidth: "3",
								filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))",
							}}
						/>
					</button>
				</div>
			</div>
		</div>
	);
};

export default MainPage;