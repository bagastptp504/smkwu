# Website Resmi SMK WIHDATUL UMMAH & Admin Panel Terintegrasi

Website profesional untuk **SMK Wihdatul Ummah Surakarta** yang didesain presisi sesuai dengan rancangan visual (Islamic Green Theme, Modern Vocational School layout), dilengkapi dengan **Admin Panel CMS mandiri**, **Sistem PPDB terintegrasi Google Form & Google Sheets**, serta **Manajemen Konten (Posting Berita & Ganti Gambar)**.

---

## 🚀 Fitur Utama

### 1. Website Publik (Frontend Sesuai Gambar Desain)
- **Top Navigation Bar**: Identitas sekolah (Logo, Nama SMK, Alamat di Jl. Bromo 2 Raya No.51, Surakarta), menu navigasi lengkap, live search interaktif, dan tombol akses Admin Panel.
- **Hero Section**:
  - Gradien hijau modern dan pola islami elegan.
  - Heading: *Selamat Datang di SMK WIHDATUL UMMAH*.
  - Subtitle: *Berkarakter, Kreatif, dan Siap Bersaing di Dunia Kerja*.
  - 4 Keunggulan: *Program Unggulan, Fasilitas Modern, Tenaga Pendidik Profesional, Lulusan Berkualitas*.
  - Tombol CTA: *Kenali Lebih Dekat*.
  - Visual Siswa & Gedung SMK dengan stiker slogan: *"Saatnya Bergabung Jadi Bagian dari Sekolah Hebat!"*.
- **Tata Letak 3 Kolom Presisi**:
  1. **Program Keahlian**:
     - *Program Upskilling*: Web Design, Graphic Design, Komputer Dasar, Video & Fotografi, Audio & Video Editing, Digital Marketing.
     - *Ekstrakurikuler*: Fotografi, Cinematografi, Public Speaking, Desain Grafis, Pramuka, PMR, Tahfidz.
  2. **Program Sekolah**:
     - 4 Kartu program bergambar: *Siswa Berprestasi Akademik*, *Siswa Berprestasi Non-Akademik*, *Siswa Kurang Mampu (Afirmasi)*, dan *Kategori Khusus*.
  3. **Berita Terbaru**:
     - Menampilkan kabar dan kegiatan terkini lengkap dengan tanggal rilis, thumbnail, serta modal baca artikel lengkap.
- **Fasilitas Sekolah**:
  - Banner hijau: *Didukung fasilitas lengkap dan modern untuk menunjang proses belajar mengajar*.
  - 8 Fasilitas: *Lab. Komputer, Masjid, Ruang Kelas Ber-AC, Akses Internet (WiFi), Lapangan Olahraga, Tempat Parkir Luas, Ruang Studio, Proyektor*.
- **Footer & Kontak**:
  - No. WhatsApp Bu Sara (`0895 3599 5604`) & Bu Ana (`0813 3604 3338`).
  - Akun Facebook (`ponpes wihdatulummah`) & Instagram (`smkponpes_wihdatulummah`).
  - Logo dan hak cipta sekolah.

---

### 2. Sistem PPDB (Penerimaan Peserta Didik Baru)
- **Formulir Pendaftaran Online Mandiri**: Pendaftaran calon siswa lengkap dengan NISN, nama, asal sekolah, jurusan pilihan, jalur pendaftaran, dan nomor kontak.
- **Integrasi Google Form**:
  - Embed Google Form langsung di dalam website.
  - Link langsung untuk membuka Google Form resmi di tab baru.
  - Live Viewer hasil Google Sheet langsung di Admin Panel sehingga admin bisa melihat pendaftar Google Form secara real-time.
- **Cek Status Pendaftar**: Calon siswa cukup mengetikkan NISN atau No Pendaftaran untuk melihat status berkas (Menunggu Verifikasi, Diterima, Perlu Lengkapi Berkas).
- **Cetak Bukti Pendaftaran**: Cetak kartu bukti pendaftaran resmi berlogo sekolah.

---

### 3. Admin Panel Mandiri (`/admin`)
- **Autentikasi Aman**: Login admin dengan token sesi.
  - **Username Bawaan**: `admin`
  - **Password Bawaan**: `admin123`
- **Dashboard Statistik**: Rekap jumlah pendaftar PPDB, siswa diterima, total berita, dan fasilitas.
- **Kelola PPDB**:
  - Tabel pendaftar lengkap dengan fitur pencarian nama/NISN dan filter jurusan.
  - Ubah status pendaftaran (Menunggu / Diterima / Perlu Lengkapi Berkas / Ditolak) dan berikan catatan panitia.
  - Cetak kartu pendaftaran calon siswa.
  - Ekspor seluruh data pendaftar ke file Excel / CSV.
- **Kelola Integrasi Google Form & Sheets**:
  - Ubah link Google Form Embed, Link Form Publik, dan Link Google Sheets Respon kapan saja.
- **Posting Berita**:
  - Tambah berita baru dengan judul, kategori, tanggal, ringkasan, dan konten lengkap.
  - Unggah gambar langsung dari komputer/laptop atau gunakan tautan URL gambar.
  - Edit dan hapus berita.
- **CMS Tampilan Website (Ganti Gambar & Teks)**:
  - **Hero Banner**: Ganti foto utama hero, judul, tagline, dan teks badge.
  - **Profil Sekolah**: Ganti foto Kepala Sekolah, sambutan Kepala Sekolah, Visi & Misi.
  - **Program Keahlian**: Edit daftar keahlian upskilling dan ekstrakurikuler.
  - **Program Sekolah**: Edit 4 kartu program sekolah (judul, deskripsi, dan upload foto kartu).
  - **Fasilitas Sekolah**: Tambah, ubah, dan hapus fasilitas serta ikonnya.
  - **Kontak & Medsos**: Ubah nomor telepon Bu Sara, Bu Ana, tautan Instagram, Facebook, dan alamat sekolah.
- **Pengaturan Akun**: Ganti username dan password admin kapan saja.

---

## 🛠️ Cara Menjalankan Aplikasi

1. Buka PowerShell atau Terminal di direktori proyek:
   ```powershell
   cd C:\Users\Administrator\.gemini\antigravity\scratch\smk-wihdatul-ummah
   ```
2. Jalankan server:
   ```powershell
   node server.js
   ```
3. Buka browser:
   - **Website Publik**: [http://localhost:3000](http://localhost:3000)
   - **Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin)
     - Username: `admin`
     - Password: `admin123`
