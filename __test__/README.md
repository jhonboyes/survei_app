# Unit Testing untuk Aplikasi Survei

## Struktur Unit Test

Unit test untuk aplikasi ini disusun dalam struktur berikut:

```
__test__/
  ├── controllers/
  │   ├── adminController.test.js
  │   ├── questionController.test.js
  │   └── surveyorController.test.js
  ├── routes/
  │   ├── adminRoutes.test.js
  │   ├── questionRoutes.test.js
  │   └── surveyorRoutes.test.js
  └── services/
      ├── adminService.test.js
      ├── questionService.test.js
      └── surveyorService.test.js
```

## Pendekatan Testing

Unit test dibuat dengan pendekatan berikut:

1. **Isolasi** - Setiap unit test mengisolasi komponen yang diuji dengan melakukan mock pada dependensi eksternal.
2. **Cakupan** - Test mencakup kasus positif (happy path) dan kasus negatif (error handling).
3. **Struktur** - Test disusun menggunakan pola AAA (Arrange, Act, Assert).

## Menjalankan Test

Untuk menjalankan semua test:

```bash
npm test
```

Untuk menjalankan test tertentu:

```bash
npm test -- __test__/routes/adminRoutes.test.js
```

## Mocking

Dalam unit test ini, kami menggunakan Jest untuk melakukan mock pada:

1. **Service Layer** - Dalam test controller
2. **Model Layer** - Dalam test service
3. **Express Response/Request** - Dalam test controller

## Catatan Penting

- Test dibuat dengan asumsi aplikasi menggunakan ES modules.
- Konfigurasi Jest telah disesuaikan untuk mendukung ES modules.
- Pastikan semua dependensi terinstal sebelum menjalankan test.
