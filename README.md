# Backend Sistem Survei

## Struktur Backend

Backend sistem survei ini dibangun dengan Node.js dan Express, menggunakan Firebase Firestore sebagai database. Berikut adalah struktur utama dari backend:

### Controllers

- **adminControllers.js** - Menangani autentikasi dan manajemen admin
- **adminDashboardController.js** - Menangani manajemen pengguna admin untuk dashboard
- **dashboardController.js** - Menyediakan statistik dan visualisasi data untuk dashboard admin
- **questionController.js** - Menangani CRUD untuk pertanyaan kuesioner
- **responsesController.js** - Menangani penyimpanan dan pengambilan respons kuesioner
- **surveyorController.js** - Menangani registrasi dan login surveyor
- **surveyorDashboardController.js** - Menangani manajemen surveyor untuk dashboard admin

### Models

- **adminmodel.js** - Model untuk manajemen admin
- **questionModel.js** - Model untuk manajemen pertanyaan
- **surveyormodel.js** - Model untuk manajemen surveyor

### Middleware

- **auth.js** - Verifikasi token autentikasi
- **chekrole.js** - Memeriksa peran pengguna untuk otorisasi
- **validateAnswers.js** - Memvalidasi format jawaban kuesioner
- **validateRange.js** - Memvalidasi range nomor kuesioner untuk surveyor

### Routes

- **adminRoutes.js** - Rute untuk manajemen admin
- **dashboardRoutes.js** - Rute untuk dashboard admin
- **questionRoutes.js** - Rute untuk manajemen pertanyaan
- **responsesRoutes.js** - Rute untuk manajemen respons
- **surveyorRoutes.js** - Rute untuk manajemen surveyor

## Fitur Dashboard Admin

### Manajemen Surveyor

- Membuat surveyor baru dengan UUID, kode, dan range nomor kuesioner
- Membuat batch surveyor sekaligus
- Melihat daftar semua surveyor dengan statistik penggunaan range
- Melihat detail surveyor termasuk statistik pengumpulan data
- Memperbarui data surveyor (kode dan range)
- Menghapus surveyor (jika tidak memiliki respons)

### Manajemen Pertanyaan Kuesioner

- Membuat pertanyaan baru dengan berbagai tipe (text, number, radio, checkbox, select)
- Melihat daftar semua pertanyaan
- Memperbarui pertanyaan
- Menghapus pertanyaan (soft delete)
- Menghapus pertanyaan secara permanen

### Visualisasi Data dan Statistik

- Statistik umum (jumlah surveyor, pertanyaan aktif, respons)
- Respons per hari dalam 7 hari terakhir
- Tingkat penyelesaian untuk setiap surveyor
- Ringkasan jawaban untuk pertanyaan tertentu
- Data ekspor untuk analisis lebih lanjut

### Manajemen Admin

- Membuat admin baru
- Melihat daftar semua admin
- Memperbarui data admin
- Menghapus admin

## Penggunaan API

### Autentikasi

Semua endpoint dashboard admin memerlukan autentikasi dengan token JWT dan peran admin.

```
Authorization: Bearer <token>
```

### Endpoint Utama

- `/api/admin` - Manajemen admin
- `/api/questions` - Manajemen pertanyaan
- `/api/responses` - Manajemen respons
- `/api/surveyors` - Manajemen surveyor
- `/api/dashboard` - Statistik dan visualisasi data

## Pengembangan Selanjutnya

- Implementasi sistem notifikasi untuk admin
- Peningkatan keamanan dengan rate limiting
- Implementasi logging aktivitas admin
- Fitur ekspor data dalam format Excel/CSV
- Integrasi dengan layanan analitik eksternal
