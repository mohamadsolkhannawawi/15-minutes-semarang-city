# Dokumentasi Frontend - 15 Minutes Semarang City (Lengkap)

Dokumen ini menjelaskan secara detail struktur folder, file, komponen, dan alur kerja dari proyek frontend `15-minutes-semarang-city`.

## 1. Ringkasan Proyek

Proyek ini adalah aplikasi web interaktif untuk menganalisis dan memvisualisasikan konsep "Kota 15 Menit" di Semarang. Pengguna dapat memilih lokasi dan melihat fasilitas publik yang dapat diakses dalam 15 menit berjalan kaki. Aplikasi ini juga memiliki panel admin untuk mengelola data geografis dan fasilitas.

- **Framework**: React.js (v19)
- **Build Tool**: Vite
- **Bahasa**: JavaScript (dengan JSX)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM (v6)
- **Manajemen State**: State lokal React (useState, useEffect, useMemo)
- **Peta**: Leaflet & React Leaflet
- **HTTP Client**: Axios
- **Animasi**: Framer Motion
- **Linting**: ESLint

## 2. Alur Kerja Utama Aplikasi

1.  **Entry Point (`src/main.jsx`)**: Aplikasi di-render ke DOM.
2.  **Root Component (`src/App.jsx`)**: Mengatur semua rute aplikasi menggunakan `react-router-dom`.
    -   Rute publik: `/` (MainPage) dan `/map` (MapPage).
    -   Rute admin: `/admin/login` (Login) dan rute terproteksi di bawah `/admin/dashboard`.
3.  **Halaman Utama (`src/pages/MainPage.jsx`)**: Halaman landing yang menjelaskan tujuan aplikasi dan memiliki tombol untuk masuk ke halaman peta.
4.  **Halaman Peta (`src/pages/MapPage.jsx`)**: Halaman inti di mana pengguna berinteraksi dengan peta.
    -   Pengguna bisa memilih lokasi dengan mengklik peta atau menggunakan lokasi GPS mereka.
    -   Setelah lokasi dipilih, pengguna menekan tombol "Cari Fasilitas Publik".
    -   Aplikasi mengirim permintaan ke backend (`/api/walkability-zones/check`) untuk mendapatkan poligon area 15 menit (isochrone) dan daftar fasilitas di dalamnya.
    -   Hasilnya (poligon dan fasilitas) ditampilkan di peta dan di `SidePanel`.
    -   Pengguna dapat mengklik fasilitas di peta atau di `SidePanel` untuk melihat detailnya di `FacilityDetailCard`.
5.  **Halaman Admin**:
    -   Admin login melalui halaman `/admin/login`.
    -   Setelah berhasil, token disimpan di `localStorage` dan admin diarahkan ke `/admin/dashboard`.
    -   `DashboardAdmin` menyediakan layout dengan sidebar navigasi untuk mengelola data `District`, `Public Service`, dan `Kelurahan`.

## 3. Struktur Folder `src`

```
src/
├── api.js
├── App.css
├── App.jsx
├── index.css
├── main.jsx
├── assets/
│   ├── icons/
│   └── images/
├── components/
│   ├── map/
│   │   ├── FacilityMarker.jsx
│   │   └── MapEvents.jsx
│   └── ui/
│       ├── BottomSheet.jsx
│       ├── CustomAlert.jsx
│       ├── FacilityDetailCard.jsx
│       ├── SearchBar.jsx
│       └── SidePanel.jsx
├── data/
│   └── dummyData.js
├── hooks/
│   └── useMapZoom.js
├── pages/
│   ├── admin/
│   │   ├── AddPublicServicePage.jsx
│   │   ├── DashboardHome.jsx
│   │   ├── DistrictPage.jsx
│   │   ├── KelurahansPage.jsx
│   │   └── PublicServicePage.jsx
│   ├── DashboardAdmin.jsx
│   ├── Login.jsx
│   ├── MainPage.jsx
│   └── MapPage.jsx
└── styles/
    ├── bottom-sheet.css
    ├── mobile.css
    └── responsive.css
```

---

## 4. Detail File dan Fungsi

### 4.1. File Inti (`src/`)

-   **`main.jsx`**
    -   **Tujuan**: Titik masuk (entry point) aplikasi React.
    -   **Fungsi**: Mengimpor `App` dan me-rendernya ke dalam elemen `#root` di `index.html` menggunakan `createRoot`.
    -   **Koneksi**:
        -   Mengimpor `App` dari `./App.jsx`.
        -   Mengimpor CSS global dari `./index.css`.

-   **`App.jsx`**
    -   **Tujuan**: Komponen root yang mengatur semua logika routing aplikasi.
    -   **Fungsi/Komponen**:
        -   `App()`: Komponen utama yang membungkus semua rute dengan `<Router>`.
        -   `ProtectedRoute({ children })`: Komponen HOC (Higher-Order Component) yang memeriksa otentikasi pengguna. Jika tidak ada token di `localStorage`, pengguna akan diarahkan ke halaman login.
        -   `MainPageWrapper()`: Wrapper untuk `MainPage` agar bisa menggunakan `useNavigate` hook untuk berpindah ke `/map`.
    -   **Koneksi**:
        -   Mengimpor `BrowserRouter`, `Routes`, `Route`, `Navigate`, `useNavigate` dari `react-router-dom`.
        -   Mengimpor semua komponen halaman ( `MainPage`, `MapPage`, `DashboardAdmin`, `Login`, dll.) dari direktori `pages`.

-   **`api.js`**
    -   **Tujuan**: Mengkonfigurasi dan mengekspor instance Axios terpusat untuk semua permintaan API ke backend.
    -   **Fungsi**:
        -   Membuat instance Axios dengan `baseURL` yang mengarah ke `/api`. Ini memungkinkan Vite untuk mem-proxy permintaan ke server backend yang sebenarnya (didefinisikan di `vite.config.js` dan `.env`).
        -   Menambahkan *interceptor* untuk menangani dan mencatat error API secara global.
    -   **Koneksi**: Digunakan oleh komponen yang perlu mengambil atau mengirim data, terutama `MapPage.jsx` dan halaman-halaman admin.

### 4.2. Komponen UI (`src/components/`)

#### `components/map/`

-   **`FacilityMarker.jsx`**
    -   **Tujuan**: Menampilkan marker (penanda) untuk setiap fasilitas di peta Leaflet.
    -   **Fungsi/Komponen**:
        -   `FacilityMarker({ facility, onSelect })`: Menerima data satu fasilitas dan fungsi `onSelect`.
        -   `createIcon()`: Membuat ikon Leaflet kustom dari file SVG.
        -   `getIcon()`: Secara dinamis memilih ikon berdasarkan tipe fasilitas dan level zoom peta. Saat zoom out, ikon berubah menjadi titik berwarna untuk performa yang lebih baik.
    -   **Hooks**: `useMapZoom()` untuk mendapatkan level zoom peta saat ini.
    -   **Koneksi**:
        -   Mengimpor `Marker`, `Popup` dari `react-leaflet`.
        -   Mengimpor semua ikon fasilitas dari `src/assets/icons/`.
        -   Digunakan di dalam `MapPage.jsx` untuk me-render setiap fasilitas.

-   **`MapEvents.jsx`**
    -   **Tujuan**: Komponen "tak terlihat" untuk menangani event pada peta.
    -   **Fungsi/Komponen**: `MapEvents({ onMapClick })`: Menggunakan hook `useMapEvents` dari `react-leaflet` untuk mendeteksi klik pada peta dan memanggil fungsi `onMapClick` dengan koordinat yang diklik.
    -   **Koneksi**: Digunakan di dalam `MapPage.jsx`.

#### `components/ui/`

-   **`BottomSheet.jsx`** (Tidak terpakai, digantikan oleh `SidePanel.jsx`)
    -   **Tujuan**: Awalnya dirancang untuk menampilkan daftar fasilitas dari bawah layar pada perangkat mobile.

-   **`CustomAlert.jsx`**
    -   **Tujuan**: Menampilkan dialog alert modal yang menarik secara visual.
    -   **Fungsi/Komponen**: `CustomAlert({ isOpen, onClose, title, children })`: Menggunakan `framer-motion` untuk animasi muncul dan hilang.
    -   **Koneksi**: Digunakan di `MapPage.jsx` untuk memberi tahu pengguna jika mereka belum memilih lokasi.

-   **`FacilityDetailCard.jsx`**
    -   **Tujuan**: Menampilkan kartu detail informasi dari satu fasilitas yang dipilih.
    -   **Fungsi/Komponen**:
        -   `FacilityDetailCard({ facility, onClose })`: Menerima data fasilitas dan fungsi untuk menutup kartu.
        -   `handleOpenRoute()`: Membuka Google Maps dengan rute dari lokasi pengguna (jika diizinkan) ke lokasi fasilitas.
        -   `handleOpenMaps()`: Membuka Google Maps yang berpusat pada lokasi fasilitas.
        -   Memiliki layout responsif yang berbeda untuk mobile (portrait/landscape) dan desktop.
    -   **Koneksi**:
        -   Digunakan di `MapPage.jsx`. Muncul ketika sebuah fasilitas dipilih.
        -   Mengimpor ikon dari `src/assets/icons/`.

-   **`SearchBar.jsx`**
    -   **Tujuan**: Menyediakan input pencarian untuk mencari wilayah (kecamatan/kelurahan).
    -   **Fungsi/Komponen**: `SearchBar({ onSearch, onClear })`: Mengelola state query pencarian dan memanggil `onSearch` saat form di-submit.
    -   **Koneksi**: Digunakan di header `MapPage.jsx`.

-   **`SidePanel.jsx`**
    -   **Tujuan**: Menampilkan panel di sisi kanan layar yang berisi daftar fasilitas yang ditemukan dan informasi geografis area tersebut.
    -   **Fungsi/Komponen**:
        -   `SidePanel({ isVisible, facilities, geoInfo, onFacilitySelect, onClose })`.
        -   Panel ini bisa di-minimize menjadi sebuah tombol dan di-maximize kembali.
        -   Layout-nya sangat responsif, menyesuaikan ukuran dan orientasi layar.
    -   **Koneksi**:
        -   Digunakan di `MapPage.jsx`.
        -   Mengimpor ikon dari `src/assets/icons/`.

### 4.3. Halaman (`src/pages/`)

-   **`MainPage.jsx`**
    -   **Tujuan**: Halaman penyambut (landing page).
    -   **Fungsi/Komponen**: `MainPage({ onCheckLocation })`: Menampilkan judul, deskripsi singkat aplikasi, dan tombol "Periksa Lokasi Saya" yang akan menavigasi pengguna ke `MapPage`. Sangat responsif untuk berbagai ukuran layar.
    -   **Koneksi**: Dipanggil oleh `App.jsx` pada rute `/`.

-   **`MapPage.jsx`**
    -   **Tujuan**: Komponen paling kompleks yang menjadi inti fungsionalitas aplikasi.
    -   **State Utama**:
        -   `mapCenter`, `userPin`: Menyimpan koordinat pusat peta dan lokasi yang dipilih pengguna.
        -   `facilities`, `polygonCoords`, `geoInfo`: Menyimpan hasil dari backend (daftar fasilitas, poligon isochrone, dan info geografis).
        -   `selectedFacility`: Menyimpan data fasilitas yang sedang dipilih untuk ditampilkan di `FacilityDetailCard`.
        -   `isLoading`, `isSearchingRegion`, `error`: Mengelola state UI selama proses loading dan jika terjadi error.
    -   **Fungsi Utama**:
        -   `handleUseMyLocation()`: Meminta izin dan mendapatkan lokasi GPS pengguna. Melakukan validasi apakah lokasi berada di dalam Semarang.
        -   `handleCheckFacilities()`: Fungsi utama yang dipicu saat tombol "Cari Fasilitas" ditekan. Mengirim koordinat ke backend, menerima data, dan memperbarui state.
        -   `handleSearch()`: Dipicu oleh `SearchBar` untuk mencari poligon kecamatan/kelurahan dan menampilkannya di peta.
        -   `handleMapClick()`: Menempatkan pin pengguna di peta saat peta diklik.
        -   `handleFacilitySelect()`: Mengatur `selectedFacility` saat fasilitas dipilih.
    -   **Koneksi**:
        -   Menggunakan hampir semua komponen dari `src/components/`.
        -   Menggunakan `api.js` untuk semua komunikasi dengan backend.
        -   Menggunakan `turf.js` untuk kalkulasi geografis (seperti mencari titik tengah poligon).

-   **`Login.jsx`**
    -   **Tujuan**: Halaman login untuk admin.
    -   **Fungsi**: `handleLogin()`: Mengirim email dan password ke `api/login`. Jika berhasil, menyimpan token ke `localStorage` dan mengarahkan ke `/admin/dashboard`.
    -   **Koneksi**: Dipanggil oleh `App.jsx` pada rute `/admin/login`.

-   **`DashboardAdmin.jsx`**
    -   **Tujuan**: Menyediakan layout dasar untuk panel admin, termasuk sidebar navigasi.
    -   **Fungsi**: Menggunakan komponen `<Outlet />` dari `react-router-dom` untuk me-render komponen anak sesuai dengan rute (misalnya, `DashboardHome`, `DistrictPage`).
    -   **Koneksi**: Dipanggil oleh `App.jsx`. Bertindak sebagai parent layout untuk semua halaman admin.

#### `pages/admin/`

-   **`DashboardHome.jsx`**: Menampilkan ringkasan data (jumlah district, public service, kelurahan) dengan mengambil data dari endpoint count di backend.
-   **`DistrictPage.jsx`**: Menampilkan tabel berisi daftar semua kecamatan. Memiliki fungsi untuk menghapus data.
-   **`KelurahansPage.jsx`**: Menampilkan tabel berisi daftar semua kelurahan. Memiliki fungsi untuk menghapus data.
-   **`PublicServicePage.jsx`**: Menampilkan tabel berisi daftar layanan publik. Memiliki tombol untuk menambah data baru (mengarahkan ke `AddPublicServicePage`) dan menghapus data.
-   **`AddPublicServicePage.jsx`**: Menyediakan form untuk menambah data fasilitas publik baru, termasuk peta interaktif untuk memilih lokasi.

### 4.4. Aset dan Data Lainnya

-   **`src/assets/`**: Berisi semua aset statis.
    -   `icons/`: Kumpulan file `.svg` untuk ikon-ikon fasilitas.
    -   `images/`: Gambar latar belakang dan aset gambar lainnya.
-   **`src/data/dummyData.js`**: Berisi data dummy untuk fasilitas dan isochrone. Berguna untuk pengembangan awal sebelum backend terintegrasi penuh.
-   **`src/hooks/useMapZoom.js`**: Custom hook untuk memantau dan menyediakan level zoom peta saat ini. Ini memungkinkan komponen lain (seperti `FacilityMarker`) untuk merender secara berbeda berdasarkan level zoom.
-   **`src/styles/`**: Berisi file CSS tambahan untuk styling yang lebih spesifik dan tidak mudah dicapai dengan Tailwind CSS saja.
    -   `responsive.css`, `mobile.css`: Mengandung media queries untuk layout yang sangat kompleks dan spesifik untuk perangkat mobile.
    -   `bottom-sheet.css`: Styling untuk komponen `BottomSheet`.

---
Dokumentasi ini seharusnya memberikan gambaran yang sangat jelas tentang bagaimana frontend aplikasi ini disusun dan bekerja.