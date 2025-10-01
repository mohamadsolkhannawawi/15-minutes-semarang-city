# Dokumentasi Backend - 15 Minutes Semarang City (Lengkap)

Dokumen ini menjelaskan secara detail arsitektur, struktur folder, endpoint API, dan alur kerja dari proyek backend yang dibangun menggunakan Laravel.

## 1. Ringkasan Proyek

Proyek ini adalah sebuah REST API yang berfungsi sebagai penyedia data untuk aplikasi frontend "15 Minutes Semarang City". Backend ini bertanggung jawab untuk mengelola data geografis, data fasilitas publik, otentikasi admin, dan menyediakan kalkulasi terkait konsep "Kota 15 Menit".

- **Framework**: Laravel 11
- **Bahasa**: PHP 8.2+
- **Database**: SQLite (default), dapat diganti ke MySQL, PostgreSQL, dll.
- **Otentikasi**: Laravel Sanctum (untuk otentikasi API)
- **Server**: PHP Built-in Server / Apache / Nginx

## 2. Instalasi & Setup

Untuk menjalankan proyek backend ini secara lokal, ikuti langkah-langkah berikut:

1.  **Clone Repository**
    Sudah dilakukan jika Anda membaca ini dari dalam proyek.

2.  **Masuk ke Direktori Backend**
    ```bash
    cd backend/laravel-backend
    ```

3.  **Install Dependencies**
    Pastikan Anda memiliki Composer terinstal.
    ```bash
    composer install
    ```

4.  **Setup Environment File**
    Salin file `.env.example` menjadi `.env`.
    ```bash
    cp .env.example .env
    ```
    File ini berisi konfigurasi aplikasi, termasuk koneksi database. Secara default, aplikasi ini dikonfigurasi untuk menggunakan SQLite.

5.  **Generate Application Key**
    ```bash
    php artisan key:generate
    ```

6.  **Buat File Database SQLite**
    Buat file kosong untuk database SQLite.
    ```bash
    touch database/database.sqlite
    ```

7.  **Jalankan Migrasi Database**
    Perintah ini akan membuat semua tabel yang diperlukan di dalam database.
    ```bash
    php artisan migrate
    ```

8.  **Jalankan Database Seeder (Opsional)**
    Jika Anda ingin mengisi database dengan data awal (contoh: fasilitas publik), jalankan seeder.
    ```bash
    php artisan db:seed
    ```

9.  **Jalankan Server Development**
    ```bash
    php artisan serve
    ```
    Secara default, server akan berjalan di `http://127.0.0.1:8000`.

## 3. Struktur Folder Penting

```
laravel-backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/  # Logika untuk menangani request HTTP
│   │   │   ├── Api/        # Controller khusus untuk endpoint API
│   │   │   └── AuthController.php
│   │   └── Middleware/   # Middleware untuk request (misal: CORS)
│   ├── Models/           # Representasi tabel database (Eloquent ORM)
│   └── Providers/        # Service provider aplikasi
├── config/               # File-file konfigurasi (database, cache, dll.)
├── database/
│   ├── factories/        # Factory untuk membuat data dummy
│   ├── migrations/       # Skema struktur database
│   └── seeders/          # Seeder untuk mengisi data awal ke database
├── routes/
│   ├── api.php           # Definisi semua rute API
│   └── web.php           # Definisi rute untuk web (jika ada)
└── storage/
    ├── app/public/       # File yang dapat diakses publik
    └── logs/             # Log aplikasi
```

## 4. Model & Skema Database

Berikut adalah model utama yang digunakan dalam aplikasi, merepresentasikan tabel-tabel di database.

-   **`User`**: Menyimpan data pengguna (khususnya admin).
-   **`ServiceCategory`**: Kategori untuk layanan/fasilitas publik (contoh: Pendidikan, Kesehatan).
-   **`PublicService`**: Data inti fasilitas publik, termasuk nama, alamat, lokasi (latitude, longitude), dan relasi ke `ServiceCategory`.
-   **`ServiceImage`**: Menyimpan path gambar yang terkait dengan `PublicService`.
-   **`ServiceReview`**: Menyimpan ulasan atau rating untuk `PublicService`.
-   **`District`**: Data kecamatan di Semarang.
-   **`kelurahan`**: Data kelurahan di Semarang, berelasi dengan `District`.
-   **`WalkabilityZone`**: Menyimpan data poligon area yang dapat dijangkau (isochrone).
-   **`UserSearch`**: Mencatat riwayat pencarian yang dilakukan oleh pengguna.

Relasi antar model (dapat dilihat dari struktur migrasi):
-   `PublicService` memiliki relasi `belongsTo` ke `ServiceCategory`.
-   `PublicService` memiliki relasi `hasMany` ke `ServiceImage` dan `ServiceReview`.
-   `kelurahan` memiliki relasi `belongsTo` ke `District`.

## 5. API Endpoints (`routes/api.php`)

API ini menyediakan beberapa endpoint untuk diakses oleh frontend. Otentikasi untuk endpoint admin dilindungi oleh middleware `auth:sanctum`.

### 5.1. Otentikasi

-   **`POST /api/login`**
    -   **Controller**: `AuthController@login`
    -   **Fungsi**: Mengotentikasi pengguna (admin) dan mengembalikan token Sanctum jika berhasil.
    -   **Request Body**: `{ "email": "...", "password": "..." }`

-   **`POST /api/logout`** (Membutuhkan otentikasi)
    -   **Controller**: `AuthController@logout`
    -   **Fungsi**: Menghapus token otentikasi pengguna.

### 5.2. Data Publik (Tanpa Otentikasi)

-   **`GET /api/service-categories`**: Mendapatkan semua kategori layanan.
-   **`GET /api/public-services`**: Mendapatkan semua fasilitas publik.
-   **`GET /api/public-services/{id}`**: Mendapatkan detail satu fasilitas publik.
-   **`GET /api/districts`**: Mendapatkan semua data kecamatan.
-   **`GET /api/kelurahans`**: Mendapatkan semua data kelurahan.

### 5.3. Fungsionalitas Inti

-   **`POST /api/walkability-zones/check`**
    -   **Controller**: `WalkabilityZoneController@check`
    -   **Fungsi**: Endpoint utama untuk kalkulasi "Kota 15 Menit". Menerima koordinat (latitude, longitude), menghitung poligon area yang dapat dijangkau dalam 15 menit berjalan kaki, dan mengembalikan poligon tersebut beserta daftar fasilitas publik di dalamnya.
    -   **Request Body**: `{ "latitude": "...", "longitude": "..." }`

### 5.4. Endpoint Admin (Membutuhkan Otentikasi)

Endpoint ini digunakan oleh panel admin untuk melakukan operasi CRUD (Create, Read, Update, Delete).

-   **Resource `PublicService`**:
    -   `POST /api/public-services` (Create)
    -   `PUT /api/public-services/{id}` (Update)
    -   `DELETE /api/public-services/{id}` (Delete)
-   **Resource `District`**:
    -   `POST /api/districts`
    -   `DELETE /api/districts/{id}`
-   **Resource `Kelurahan`**:
    -   `POST /api/kelurahans`
    -   `DELETE /api/kelurahans/{id}`
-   **Endpoint lainnya**:
    -   `GET /api/admin/stats`: Mendapatkan statistik data (jumlah fasilitas, kecamatan, dll.) untuk ditampilkan di dashboard.

## 6. Variabel Lingkungan (`.env`)

File `.env` digunakan untuk menyimpan konfigurasi yang sensitif atau yang mungkin berbeda antar lingkungan (development, production).

-   `APP_NAME`: Nama aplikasi (contoh: "Laravel").
-   `APP_ENV`: Lingkungan aplikasi (contoh: `local`, `production`).
-   `APP_KEY`: Kunci enkripsi aplikasi (dihasilkan oleh `php artisan key:generate`).
-   `APP_DEBUG`: Mode debug (`true` untuk development).
-   `APP_URL`: URL utama aplikasi (contoh: `http://localhost`).

-   `DB_CONNECTION`: Jenis koneksi database (contoh: `sqlite`, `mysql`).
-   `DB_DATABASE`: Path absolut ke file database SQLite atau nama database untuk MySQL/PostgreSQL.

-   `SANCTUM_STATEFUL_DOMAINS`: Domain frontend yang diizinkan untuk melakukan otentikasi stateful (contoh: `localhost:5173`).
-   `SESSION_DOMAIN`: Domain untuk sesi, penting agar cookie otentikasi berfungsi antara frontend dan backend.

---
Dokumentasi ini memberikan gambaran umum arsitektur dan fungsionalitas backend. Untuk detail implementasi setiap fungsi, silakan merujuk langsung ke kode sumber di controller dan model terkait.
