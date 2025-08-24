# 🎵 OpenMusic API

OpenMusic API adalah aplikasi backend untuk mengelola data lagu, dibangun menggunakan **JavaScript**, **Node.js**, dan **Hapi Framework**. API ini menyediakan fitur untuk menambah, membaca, memperbarui, dan menghapus lagu dengan validasi data yang aman dan efisien.

> 💡 **Submission ini dibuat untuk Dicoding Fundamental Backend JavaScript.**

[![Node.js](https://img.shields.io/badge/Node.js-22.x-green?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Hapi.js](https://img.shields.io/badge/Hapi.js-v21-blue)](https://hapi.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.3-blue?logo=postgresql&logoColor=white)](https://www.postgresql.org/)

---

## ⚡ Fitur

- **CRUD Lagu:** Create, Read, Update, Delete lagu.
- **Filter Lagu:** Cari lagu berdasarkan judul atau performer.
- **Data Validation:** Menggunakan **Joi** untuk memastikan input valid.
- **Database:** Menggunakan **PostgreSQL** untuk penyimpanan data yang handal.
- **Hapi Plugin:** Struktur modular untuk memisahkan fitur dan service.

---

## 🛠 Teknologi

- **JavaScript (ES6+)**
- **Node.js**
- **Hapi.js Framework**
- **Hapi Plugin Architecture**
- **Joi** (Data Validation)
- **PostgreSQL** (Database)

---

## 🚀 Instalasi & Setup

1. Clone repository:

```bash
git clone https://github.com/username/openmusic-api.git
cd openmusic-api
```

2. Install dependencies:

```bash
npm install
```

3. Konfigurasi environment variables:

Buat file .env dan sesuaikan:

```env
# server configuration
NODE_ENV=development
PORT=5000
HOST=localhost

# database configuration
PGUSER=your_db_user
PGPASSWORD=your_db_password
PGHOST=localhost
PGDATABASE=openmusic
PGPORT=5432
PORT=5000
```

4. Jalankan server:

```bash
npm run start
# or
npm run dev
```

Server berjalan di: http://localhost:5000

## 📌 Endpoint Utama

| Method | Endpoint     | Deskripsi                        |
| ------ | ------------ | -------------------------------- |
| GET    | /albums/{id} | Ambil albums berdasarkan id      |
| POST   | /albums      | Tambah album baru                |
| PUT    | /albums/{id} | Update data album                |
| DELETE | /albums/{id} | Hapus album                      |
| GET    | /songs       | Ambil semua lagu                 |
| GET    | /songs/{id}  | Ambil detail lagu berdasarkan id |
| POST   | /songs       | Tambah lagu baru                 |
| PUT    | /songs/{id}  | Update data lagu                 |
| DELETE | /songs/{id}  | Hapus lagu                       |

## ✅ Testing

Gunakan Postman untuk menguji API.

Pastikan header: Content-Type: application/json

Test semua endpoint dengan validasi data sesuai requirement.

## 📂 Struktur Proyek

```tree
openmusic-api/
├─ api/             # Route & handler
├─ services/        # Logic bisnis
├─ validator/       # Validasi dengan Joi
├─ db/              # Koneksi dan query PostgreSQL
├─ exceptions/      # Custom error handling
├─ server.js        # Entry point aplikasi
├─ package.json
└─ README.md
```
