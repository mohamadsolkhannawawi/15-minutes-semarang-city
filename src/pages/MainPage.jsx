import React, { useState, useEffect } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

import semarangBg from "../assets/images/semarang-background.jpg";

const MainPage = ({ onCheckLocation }) => {
	const [fontSize, setFontSize] = useState("clamp(16px, 4vw, 56px)");

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 320) {
				setFontSize("clamp(12px, 4vw, 22px)");
			} else if (window.innerWidth <= 420) {
				setFontSize("22px");
			} else if (window.innerWidth <= 610) {
				setFontSize("24px");
			} else if (window.innerWidth <= 769) {
				setFontSize("30px");
			} else if (window.innerWidth <= 810) {
				setFontSize("34px");
			} else if (window.innerWidth <= 1025) {
				setFontSize("38px");
			} else {
				setFontSize("clamp(16px, 4vw, 56px)");
			}
		};

		handleResize(); // Set initial size
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

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
						fontWeight: "700",
						color: "#213448",
						top: "clamp(40px, 10vh, 140px)",
						left: horizontalMargin,
						width: "clamp(300px, 45vw, 600px)",
						lineHeight: "1.2",
						textAlign: "left",
						minWidth: "250px",
						fontSize: fontSize,
					}}
				>
					<div style={{ whiteSpace: "nowrap" }}>15 Minutes</div>
					<div style={{ whiteSpace: "nowrap" }}>Semarang City</div>
				</h1>

				{/* Style untuk media query */}
				<style>
					{`
						/* Desktop (above 1025px) menggunakan clamp default */
						.responsive-description {
							font-size: clamp(12px, 1.8vw, 26px);
						}

						/* Aturan tombol untuk layar dibawah 770px */
						@media (max-width: 770px) {
							.action-button-wrapper {
								width: 100%;
							}
							.action-button {
								width: 100% !important;
								justify-content: center !important;
							}
						}

						/* 810px - 1025px */
						@media (max-width: 1025px) {
							.responsive-description {
								font-size: 19px !important;
							}
							.content-wrapper {
								top: clamp(210px, 27vh, 330px) !important;
								gap: clamp(32px, 5vh, 52px) !important;
							}
							.description-box {
								padding: clamp(28px, 3.5vw, 48px) !important;
							}
						}

						/* 769px - 810px */
						@media (max-width: 810px) and (min-width: 769px) {
							.responsive-description {
								font-size: 16px !important;
							}
							.content-wrapper {
								top: clamp(200px, 26vh, 320px) !important;
								gap: clamp(28px, 4.5vh, 48px) !important;
							}
							.description-box {
								padding: clamp(24px, 3vw, 44px) !important;
							}
						}

						/* 610px - 769px */
						@media (max-width: 769px) {
							.responsive-description {
								font-size: 16px !important;
							}
							.content-wrapper {
								top: clamp(190px, 25vh, 310px) !important;
								gap: clamp(26px, 4vh, 44px) !important;
								align-items: flex-end !important;
							}
							.description-box {
								padding: clamp(22px, 2.8vw, 40px) !important;
							}
						}

						/* 420px - 610px */
						@media (max-width: 610px) {
							.responsive-description {
								font-size: 15px !important;
							}
							.content-wrapper {
								top: clamp(180px, 24vh, 300px) !important;
								gap: clamp(24px, 3.5vh, 40px) !important;
							}
							.description-box {
								padding: clamp(20px, 2.5vw, 36px) !important;
							}
						}

						/* 320px - 420px */
						@media (max-width: 420px) {
							.responsive-description {
								font-size: 14px !important;
							}
							.content-wrapper {
								top: clamp(160px, 22vh, 280px) !important;
								gap: clamp(20px, 3vh, 36px) !important;
							}
							.description-box {
								padding: clamp(18px, 2.2vw, 32px) !important;
							}
						}

						/* Below 320px */
						@media (max-width: 320px) {
							.responsive-description {
								font-size: clamp(10px, 3vw, 14px) !important;
							}
							.content-wrapper {
								top: clamp(140px, 20vh, 260px) !important;
								gap: clamp(16px, 2.5vh, 32px) !important;
							}
							.description-box {
								padding: clamp(16px, 2vw, 28px) !important;
							}
							.action-button {
								font-size: clamp(10px, 3vw, 12px) !important;
								height: clamp(40px, 5vh, 70px) !important;
								padding: 0 clamp(16px, 2vw, 28px) !important;
							}
						}
					`}
				</style>

				{/* Wrapper untuk Deskripsi dan Tombol */}
				<div
					className="absolute content-wrapper"
					style={{
						top: "clamp(240px, 30vh, 360px)",
						left: horizontalMargin,
						right: horizontalMargin,
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-end",
						gap: "clamp(32px, 5vh, 52px)",
					}}
				>
					{/* Kotak Deskripsi */}
					<div
						className="w-full rounded-lg shadow-xl font-poppins description-box"
						style={{
							backgroundColor: "rgba(148, 180, 193, 0.75)",
							padding: "clamp(28px, 3.5vw, 48px)",
							boxSizing: "border-box",
						}}
					>
						<p
							className="text-justify leading-relaxed description-text responsive-description"
							style={{
								fontWeight: "500",
								color: "#213448",
								textShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
								lineHeight: "1.5",
								fontFamily:
									"system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
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

					{/* Wrapper untuk Button */}
					<div className="action-button-wrapper">
						{/* Tombol - Di bawah Deskripsi */}
						<button
							onClick={onCheckLocation}
							className="flex items-center justify-center gap-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 font-poppins action-button"
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
								fontFamily:
									"system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
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
		</div>
	);
};

export default MainPage;
