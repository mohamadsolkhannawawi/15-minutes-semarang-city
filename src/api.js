// src/api.js
import axios from "axios";

// Fungsi untuk mendapatkan base URL API berdasarkan host
const getApiBaseUrl = () => {
	const host = window.location.hostname;
	const port = "8000"; // Port Laravel backend

	// Jika menggunakan localhost atau 127.0.0.1
	if (host === "localhost" || host === "127.0.0.1") {
		return `http://localhost:${port}/api`;
	}

	// Jika menggunakan network IP, gunakan IP yang sama
	return `http://${host}:${port}/api`;
};

// Buat instance axios
const api = axios.create({
	baseURL: getApiBaseUrl(),
	headers: {
		"Content-Type": "application/json",
		// Authorization bisa ditambahkan jika pakai token nanti
	},
});

// Contoh interceptor error (optional)
api.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error("API Error:", error?.response || error);
		console.error("API URL:", error?.config?.url);
		console.error("API Base URL:", getApiBaseUrl());
		return Promise.reject(error);
	}
);

export default api;
