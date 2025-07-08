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
			className="relative h-screen w-full flex items-center justify-center bg-cover bg-center" // Hapus "bg-main-page-bg"
		>
			{/* Overlay Gelap */}
			<div className="absolute inset-0 bg-black/50"></div>

			<div className="relative z-10 flex flex-col items-center text-center max-w-xl mx-4 p-6">
				<h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
					15 Minute's Semarang City
				</h1>

				<div className="mt-6 p-5 bg-brand-medium-blue/80 backdrop-blur-sm rounded-lg shadow-xl">
					<p className="text-base md:text-lg text-brand-accent">
						Program Kota 15-Menit Semarang adalah platform strategis untuk
						menganalisis kemudahan warga dalam mengakses fasilitas krusial dalam
						15 menit dengan berjalan kaki. Data yang dihasilkan dari pemetaan
						ini bertujuan untuk mendukung perumusan kebijakan tata ruang yang
						lebih efektif demi meningkatkan konektivitas dan kualitas hidup
						masyarakat.
					</p>
				</div>

				<button
					onClick={onCheckLocation}
					className="mt-8 flex items-center gap-3 px-8 py-4 bg-brand-accent text-brand-dark-blue font-bold rounded-full shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-105"
				>
					Periksa Lokasi Saya
					<ArrowRightIcon className="h-6 w-6" />
				</button>
			</div>
		</div>
	);
};

export default MainPage;