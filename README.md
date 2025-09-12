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

# authentication
ACCESS_TOKEN_KEY=
REFRESH_TOKEN_KEY=
ACCESS_TOKEN_AGE=1800
```

Kamu bisa generate ssl untuk `ACCESS_TOKEN_KEY` dan `REFRESH_TOKEN_KEY`:

```bash
# script
npm run generate:ssl

# or

# hex string (default, panjang 128 karakter karena 64 byte)
node -e 'console.log(require("crypto").randomBytes(64).toString("hex"))'

# base64 string (lebih pendek, cocok buat secret)
node -e 'console.log(require("crypto").randomBytes(64).toString("base64"))'

# url-safe string (biar bisa dipakai di URL/JWT dsb.)
node -e 'console.log(require("crypto").randomBytes(64).toString("base64url"))'

# pakai crypto.randomUUID() (UUID v4)
node -e 'console.log(require("crypto").randomUUID())'

# pake crypto.createHash (misalnya SHA256 dari randomBytes)
node -e 'console.log(require("crypto").createHash("sha256").update(require("crypto").randomBytes(64)).digest("hex"))'

# secret yang aman buat JWT atau session
node -e 'console.log(require("crypto").randomBytes(32).toString("hex"))'

# or

# openssl (hex / base64)
openssl rand -hex 64
openssl rand -base64 64

# or

# Linux / Mac: urandom + xxd
head -c 64 /dev/urandom | xxd -p -c 64

# Linux / Mac: urandom + base64
head -c 64 /dev/urandom | base64

# or

# uuid (kalau cukup unik aja)
uuidgen

# or

# pwsh: native GUID
[guid]::NewGuid()

# pwsh: base64 random
[Convert]::ToBase64String((1..64 | ForEach-Object {Get-Random -Maximum 256}))
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
├── migrations          # Folder berisi skrip migrasi database (PostgreSQL)
├── postman             # Folder berisi collection Postman untuk testing API
├── src                 # Folder utama kode sumber aplikasi
│   ├── api             # Route & handler Hapi untuk endpoint API
│   ├── exceptions      # Kelas custom error handling
│   ├── services        # Logic bisnis aplikasi (interaksi DB)
│   ├── validator       # Validasi data input menggunakan Joi
│   └── server.js       # Entry point aplikasi, konfigurasi Hapi server
├── .env                # Environment variables untuk konfigurasi lokal
├── .env.example        # Contoh format file .env
├── .eslintrc.json      # Konfigurasi ESLint untuk menjaga kualitas kode
├── .gitignore          # File untuk mengecualikan file/folder dari Git
├── .prettierrc         # Konfigurasi Prettier untuk format kode
├── package-lock.json   # Lock file npm, mencatat versi pasti dependensi
├── package.json        # Metadata proyek, dependensi, script npm
└── README.md           # Dokumentasi proyek, cara setup dan penggunaan

```
