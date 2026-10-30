const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const multer = require('multer');
const supabaseService = require('./supabase-client');

const app = express();
const PORT = process.env.PORT || 3000;

// Path Konfigurasi
const DB_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');
const ROOT_DB_FILE = path.join(__dirname, 'db.json');
const UPLOAD_DIR = path.join(__dirname, 'public', 'uploads');

// Pastikan folder data/ dan public/uploads/ selalu tersedia
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Konfigurasi Multer untuk Upload Gambar
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'img-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Maksimal 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Hanya file gambar yang diperbolehkan!'));
    }
  }
});

// Middleware
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(express.static(path.join(__dirname, 'public'), { dotfiles: 'allow' }));

// Data Default Cadangan jika database belum ada
const DEFAULT_DB = {
  settings: {
    schoolName: "SMK WIHDATUL UMMAH",
    schoolSub: "SEKOLAH MENENGAH KEJURUAN",
    tagline: "Berkarakter, Kreatif, dan Siap Bersaing di Dunia Kerja",
    address: "Jl. Bromo 2 Raya No.51, Kel. Banjarsari, Surakarta",
    phoneSara: "0895 3599 5604",
    phoneAna: "0813 3604 3338",
    facebook: "ponpes wihdatulummah",
    facebookUrl: "https://facebook.com/ponpes.wihdatulummah",
    instagram: "smkponpes_wihdatulummah",
    instagramUrl: "https://instagram.com/smkponpes_wihdatulummah",
    email: "info@smkwihdatulummah.sch.id",
    heroBadge: "Selamat Datang di",
    heroTitle: "SMK WIHDATUL UMMAH",
    heroSubtitle: "Berkarakter, Kreatif, dan Siap Bersaing di Dunia Kerja",
    heroCtaText: "Kenali Lebih Dekat",
    heroSlogan: "Saatnya Bergabung Jadi Bagian dari Sekolah Hebat!",
    heroImage: "/images/banner-reference.jpg",
    highlights: [
      "Program Unggulan",
      "Fasilitas Modern",
      "Tenaga Pendidik Profesional",
      "Lulusan Berkualitas"
    ],
    googleFormEmbedUrl: "",
    googleFormPublicUrl: "",
    googleSheetViewUrl: "",
    ppdbStatus: "Buka",
    academicYear: "2026/2027",
    ppdbMode: "both"
  },
  profile: {
    namaKepala: "Herlambang Gilang S.N., S.Kom., M.M.",
    nipKepala: "19780512 200312 1 004",
    fotoKepala: "/images/banner-reference.jpg",
    sambutanKepala: "Assalamu'alaikum Warahmatullahi Wabarakatuh.\n\nSelamat datang di website resmi SMK Wihdatul Ummah Surakarta...",
    visi: "Menjadi Sekolah Menengah Kejuruan Islam Terdepan yang Menghasilkan Generasi Berkarakter Qur'ani, Mandiri, Berkompetensi Digital, dan Siap Menembus Dunia Industri Global.",
    misi: [
      "Menanamkan nilai-nilai keislaman dan akhlak mulia dalam setiap aktivitas pembelajaran.",
      "Melaksanakan program pelatihan upskilling di bidang teknologi informasi, multimedia, dan desain secara intensif.",
      "Menyediakan fasilitas sarana dan prasarana belajar berstandar industri modern.",
      "Membangun kemitraan strategis dengan dunia usaha dan industri (DUDI) untuk penyaluran magang dan kerja.",
      "Menumbuhkan jiwa kewirausahaan (entrepreneurship) santri berbasis teknologi digital."
    ],
    sejarah: "SMK Wihdatul Ummah didirikan dengan komitmen untuk menjawab tantangan zaman akan kebutuhan generasi muda yang tidak hanya menguasai keterampilan vokasi industri modern, tetapi juga memiliki landasan tauhid dan akhlak yang kokoh."
  },
  upskilling: [
    "Web Design",
    "Video & Fotografi",
    "Graphic Design",
    "Audio & Video Editing",
    "Komputer Dasar",
    "Digital Marketing"
  ],
  ekstrakurikuler: [
    "Fotografi, Cinematografi",
    "Pramuka",
    "Public Speaking",
    "PMR",
    "Desain Grafis",
    "Tahfidz"
  ],
  programSekolah: [
    {
      id: 1,
      title: "Siswa Berprestasi Akademik",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&auto=format&fit=crop&q=80",
      icon: "trophy",
      desc: "Program pembinaan intensif bagi siswa berprestasi di bidang sains, olimpiade mata pelajaran, dan kompetensi keahlian kejuruan dengan fasilitas beasiswa khusus."
    },
    {
      id: 2,
      title: "Siswa Berprestasi Non-Akademik",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80",
      icon: "star",
      desc: "Wadah pengembangan bakat siswa di bidang kepemimpinan, olahraga, seni multimedia, public speaking, dan kompetisi kreatif tingkat regional hingga nasional."
    },
    {
      id: 3,
      title: "Siswa Kurang Mampu (Afirmasi)",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80",
      icon: "users",
      desc: "Bantuan pendidikan penuh dan program asrama santri untuk siswa berpotensi dari keluarga prasejahtera agar mendapatkan hak pendidikan berkualitas yang setara."
    },
    {
      id: 4,
      title: "Kategori Khusus",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
      icon: "award",
      desc: "Jalur beasiswa Tahfidzul Qur'an minimal 5 Juz, putra-putri guru, dan kelas industri khusus dengan jaminan uji sertifikasi kompetensi keahlian BNSP."
    }
  ],
  news: [],
  fasilitas: [],
  registrations: [],
  adminUser: {
    username: "admin",
    password: "admin123"
  }
};

// ----------------------------------------------------
// FUNGSI BANTU MEMBACA & MENYIMPAN DATABASE LOKAL
// ----------------------------------------------------

function readLocalDb() {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }

    if (fs.existsSync(ROOT_DB_FILE) && !fs.existsSync(DB_FILE)) {
      try {
        fs.copyFileSync(ROOT_DB_FILE, DB_FILE);
      } catch (err) {
        console.error('Peringatan saat menyalin db.json dari root:', err.message);
      }
    }

    if (!fs.existsSync(DB_FILE)) {
      writeLocalDb(DEFAULT_DB);
      return JSON.parse(JSON.stringify(DEFAULT_DB));
    }

    const raw = fs.readFileSync(DB_FILE, 'utf8');
    if (!raw.trim()) {
      writeLocalDb(DEFAULT_DB);
      return JSON.parse(JSON.stringify(DEFAULT_DB));
    }

    const data = JSON.parse(raw);

    // Proteksi fallback
    data.settings = { ...DEFAULT_DB.settings, ...(data.settings || {}) };
    data.profile = { ...DEFAULT_DB.profile, ...(data.profile || {}) };
    data.upskilling = Array.isArray(data.upskilling) ? data.upskilling : DEFAULT_DB.upskilling;
    data.ekstrakurikuler = Array.isArray(data.ekstrakurikuler) ? data.ekstrakurikuler : DEFAULT_DB.ekstrakurikuler;
    data.programSekolah = Array.isArray(data.programSekolah) ? data.programSekolah : DEFAULT_DB.programSekolah;
    data.news = Array.isArray(data.news) ? data.news : DEFAULT_DB.news;
    data.fasilitas = Array.isArray(data.fasilitas) ? data.fasilitas : DEFAULT_DB.fasilitas;
    data.registrations = Array.isArray(data.registrations) ? data.registrations : DEFAULT_DB.registrations;
    data.adminUser = { ...DEFAULT_DB.adminUser, ...(data.adminUser || {}) };

    return data;
  } catch (err) {
    console.error('Error saat membaca db.json:', err);
    return null;
  }
}

function writeLocalDb(data) {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }

    const jsonStr = JSON.stringify(data, null, 2);
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, jsonStr, 'utf8');

    try {
      if (fs.existsSync(DB_FILE)) {
        fs.copyFileSync(DB_FILE, `${DB_FILE}.bak`);
      }
    } catch (bakErr) {}

    fs.renameSync(tempFile, DB_FILE);
    return true;
  } catch (err) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
      return true;
    } catch (fallbackErr) {
      console.error('Gagal menulis ke db.json:', fallbackErr);
      return false;
    }
  }
}

// Mengambil database (Dual-mode: Supabase jika aktif, db.json sebagai fallback)
async function getActiveDb() {
  const localDb = readLocalDb();
  if (supabaseService.isSupabaseEnabled()) {
    try {
      const cloudDb = await supabaseService.fetchFullData(localDb);
      return cloudDb;
    } catch (e) {
      console.warn('Gagal membaca dari Supabase, beralih ke db.json lokal:', e.message);
      return localDb;
    }
  }
  return localDb;
}

// ----------------------------------------------------
// API PUBLIK (FRONTEND)
// ----------------------------------------------------

const getPublicData = async (req, res) => {
  const db = await getActiveDb();
  if (!db) return res.status(500).json({ error: 'Gagal membaca database' });

  res.json({
    settings: db.settings,
    profile: db.profile,
    upskilling: db.upskilling,
    ekstrakurikuler: db.ekstrakurikuler,
    programSekolah: db.programSekolah,
    news: db.news,
    fasilitas: db.fasilitas
  });
};

app.get('/api/data', getPublicData);
app.get('/api/db', getPublicData);

// POST Pendaftaran PPDB Online
app.post('/api/ppdb/register', async (req, res) => {
  const db = await getActiveDb();
  if (!db) return res.status(500).json({ error: 'Gagal membaca database' });

  const {
    fullName,
    nisn,
    gender,
    birthPlace,
    birthDate,
    originSchool,
    majorChoice,
    parentName,
    phone,
    address,
    pathway
  } = req.body;

  if (!fullName || !nisn || !phone || !originSchool || !majorChoice) {
    return res.status(400).json({ error: 'Mohon lengkapi data wajib (Nama, NISN, Asal Sekolah, Jurusan, No HP/WA)' });
  }

  // Cek duplikasi NISN
  const cleanNisn = nisn.toString().trim();
  const existing = db.registrations.find(r => r.nisn && r.nisn.toString().trim() === cleanNisn);
  if (existing) {
    return res.status(409).json({
      error: `NISN ${cleanNisn} sudah terdaftar dengan Nomor Pendaftaran: ${existing.registrationNo}. Silakan cek status pendaftaran Anda.`
    });
  }

  const count = (db.registrations.length + 1).toString().padStart(3, '0');
  const regNumber = `PPDB-2026-${count}`;

  let newReg = {
    id: 'reg-' + Date.now(),
    registrationNo: regNumber,
    fullName: fullName.trim(),
    nisn: cleanNisn,
    gender: gender || 'Laki-laki',
    birthPlace: birthPlace ? birthPlace.trim() : '',
    birthDate: birthDate || '',
    originSchool: originSchool.trim(),
    majorChoice: majorChoice.trim(),
    parentName: parentName ? parentName.trim() : '',
    phone: phone.trim(),
    address: address ? address.trim() : '',
    pathway: pathway || 'Reguler',
    status: 'Menunggu Verifikasi',
    createdAt: new Date().toISOString(),
    notes: 'Pendaftaran mandiri melalui website. Mohon simpan bukti nomor pendaftaran ini.'
  };

  // Simpan ke Supabase jika aktif
  if (supabaseService.isSupabaseEnabled()) {
    try {
      const savedReg = await supabaseService.addRegistration(newReg);
      if (savedReg) newReg = savedReg;
    } catch (sbErr) {
      console.error('Error saat menyimpan ke Supabase:', sbErr.message);
    }
  }

  // Selalu simpan ke db.json lokal sebagai sinkronisasi cadangan
  db.registrations.unshift(newReg);
  writeLocalDb(db);

  res.status(201).json({
    success: true,
    message: 'Pendaftaran berhasil dikirim!',
    data: newReg
  });
});

// GET Cek Status PPDB berdasarkan NISN atau No Pendaftaran
app.get('/api/ppdb/check/:query', async (req, res) => {
  const db = await getActiveDb();
  if (!db) return res.status(500).json({ error: 'Gagal membaca database' });

  const q = req.params.query.trim().toLowerCase();
  const found = db.registrations.find(r =>
    (r.nisn && r.nisn.toString().toLowerCase() === q) ||
    (r.registrationNo && r.registrationNo.toLowerCase() === q) ||
    (r.phone && r.phone.replace(/\D/g, '') === q.replace(/\D/g, ''))
  );

  if (!found) {
    return res.status(404).json({ error: 'Data pendaftaran tidak ditemukan. Pastikan NISN atau No Pendaftaran sudah sesuai.' });
  }

  res.json({
    success: true,
    data: found
  });
});

// ----------------------------------------------------
// API ADMIN PANEL
// ----------------------------------------------------

// POST Login Admin
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  const db = await getActiveDb();
  if (!db) return res.status(500).json({ error: 'Gagal membaca database' });

  if (db.adminUser && db.adminUser.username === username && db.adminUser.password === password) {
    const token = 'token_' + Date.now() + '_' + Math.random().toString(36).substring(2);
    res.json({ success: true, token, user: { username } });
  } else {
    res.status(401).json({ error: 'Username atau password admin salah!' });
  }
});

// GET Data Lengkap untuk Admin Dashboard
app.get('/api/admin/data', async (req, res) => {
  const db = await getActiveDb();
  if (!db) return res.status(500).json({ error: 'Gagal membaca database' });
  res.json(db);
});

// PUT Pengaturan Website (Hero, Kontak, Google Form URL, dll)
app.put('/api/admin/settings', async (req, res) => {
  const db = await getActiveDb();
  if (!db) return res.status(500).json({ error: 'Gagal membaca database' });

  db.settings = { ...db.settings, ...req.body };

  if (supabaseService.isSupabaseEnabled()) {
    await supabaseService.saveSiteData('settings', db.settings);
  }
  writeLocalDb(db);

  res.json({ success: true, settings: db.settings });
});

// PUT Profil Sekolah & Sambutan Kepala Sekolah
app.put('/api/admin/profile', async (req, res) => {
  const db = await getActiveDb();
  if (!db) return res.status(500).json({ error: 'Gagal membaca database' });

  db.profile = { ...db.profile, ...req.body };

  if (supabaseService.isSupabaseEnabled()) {
    await supabaseService.saveSiteData('profile', db.profile);
  }
  writeLocalDb(db);

  res.json({ success: true, profile: db.profile });
});

// POST Tambah Berita Baru
app.post('/api/admin/news', async (req, res) => {
  const db = await getActiveDb();
  if (!db) return res.status(500).json({ error: 'Gagal membaca database' });

  const { title, category, date, image, summary, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Judul dan konten berita wajib diisi' });
  }

  const newArticle = {
    id: 'news-' + Date.now(),
    title,
    category: category || 'Berita',
    date: date || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    image: image || '/images/banner-reference.jpg',
    summary: summary || (content.substring(0, 150) + '...'),
    content
  };

  if (supabaseService.isSupabaseEnabled()) {
    try {
      await supabaseService.addNews(newArticle);
    } catch (e) {
      console.error('Supabase news error:', e.message);
    }
  }

  db.news.unshift(newArticle);
  writeLocalDb(db);

  res.status(201).json({ success: true, news: newArticle });
});

// PUT Ubah Berita
app.put('/api/admin/news/:id', async (req, res) => {
  const db = await getActiveDb();
  if (!db) return res.status(500).json({ error: 'Gagal membaca database' });

  const index = db.news.findIndex(n => n.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Berita tidak ditemukan' });

  db.news[index] = { ...db.news[index], ...req.body };

  if (supabaseService.isSupabaseEnabled()) {
    try {
      await supabaseService.updateNews(req.params.id, db.news[index]);
    } catch (e) {
      console.error('Supabase news error:', e.message);
    }
  }
  writeLocalDb(db);

  res.json({ success: true, news: db.news[index] });
});

// DELETE Hapus Berita
app.delete('/api/admin/news/:id', async (req, res) => {
  const db = await getActiveDb();
  if (!db) return res.status(500).json({ error: 'Gagal membaca database' });

  db.news = db.news.filter(n => n.id !== req.params.id);

  if (supabaseService.isSupabaseEnabled()) {
    try {
      await supabaseService.deleteNews(req.params.id);
    } catch (e) {
      console.error('Supabase news error:', e.message);
    }
  }
  writeLocalDb(db);

  res.json({ success: true, message: 'Berita berhasil dihapus' });
});

// PUT Program Keahlian (Upskilling & Ekstrakurikuler)
app.put('/api/admin/program-keahlian', async (req, res) => {
  const db = await getActiveDb();
  if (!db) return res.status(500).json({ error: 'Gagal membaca database' });

  const { upskilling, ekstrakurikuler } = req.body;
  if (upskilling) db.upskilling = upskilling;
  if (ekstrakurikuler) db.ekstrakurikuler = ekstrakurikuler;

  if (supabaseService.isSupabaseEnabled()) {
    if (upskilling) await supabaseService.saveSiteData('upskilling', db.upskilling);
    if (ekstrakurikuler) await supabaseService.saveSiteData('ekstrakurikuler', db.ekstrakurikuler);
  }
  writeLocalDb(db);

  res.json({ success: true, upskilling: db.upskilling, ekstrakurikuler: db.ekstrakurikuler });
});

// POST Tambah Kartu Program Sekolah
app.post('/api/admin/program-sekolah', async (req, res) => {
  const db = await getActiveDb();
  if (!db) return res.status(500).json({ error: 'Gagal membaca database' });

  const newProg = {
    id: Date.now(),
    title: req.body.title || 'Program Baru',
    image: req.body.image || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
    icon: req.body.icon || 'star',
    desc: req.body.desc || ''
  };

  if (supabaseService.isSupabaseEnabled()) {
    try {
      await supabaseService.addProgramSekolah(newProg);
    } catch (e) {
      console.error('Supabase program-sekolah error:', e.message);
    }
  }

  db.programSekolah.push(newProg);
  writeLocalDb(db);

  res.json({ success: true, programSekolah: db.programSekolah });
});

// PUT Ubah Kartu Program Sekolah
app.put('/api/admin/program-sekolah/:id', async (req, res) => {
  const db = await getActiveDb();
  if (!db) return res.status(500).json({ error: 'Gagal membaca database' });

  const paramId = req.params.id;
  const idx = db.programSekolah.findIndex(p => p.id == paramId || String(p.id) === String(paramId));
  if (idx === -1) return res.status(404).json({ error: 'Program sekolah tidak ditemukan' });

  db.programSekolah[idx] = { ...db.programSekolah[idx], ...req.body };

  if (supabaseService.isSupabaseEnabled()) {
    try {
      await supabaseService.updateProgramSekolah(paramId, db.programSekolah[idx]);
    } catch (e) {
      console.error('Supabase program-sekolah error:', e.message);
    }
  }
  writeLocalDb(db);

  res.json({ success: true, item: db.programSekolah[idx] });
});

// DELETE Hapus Kartu Program Sekolah
app.delete('/api/admin/program-sekolah/:id', async (req, res) => {
  const db = await getActiveDb();
  if (!db) return res.status(500).json({ error: 'Gagal membaca database' });

  const paramId = req.params.id;
  db.programSekolah = db.programSekolah.filter(p => p.id != paramId && String(p.id) !== String(paramId));

  if (supabaseService.isSupabaseEnabled()) {
    try {
      await supabaseService.deleteProgramSekolah(paramId);
    } catch (e) {
      console.error('Supabase program-sekolah error:', e.message);
    }
  }
  writeLocalDb(db);

  res.json({ success: true, programSekolah: db.programSekolah });
});

// POST Tambah Fasilitas
app.post('/api/admin/fasilitas', async (req, res) => {
  const db = await getActiveDb();
  if (!db) return res.status(500).json({ error: 'Gagal membaca database' });

  const newFas = {
    id: Date.now(),
    name: req.body.name || 'Fasilitas Baru',
    icon: req.body.icon || 'building',
    desc: req.body.desc || ''
  };

  if (supabaseService.isSupabaseEnabled()) {
    try {
      await supabaseService.addFasilitas(newFas);
    } catch (e) {
      console.error('Supabase fasilitas error:', e.message);
    }
  }

  db.fasilitas.push(newFas);
  writeLocalDb(db);

  res.json({ success: true, fasilitas: db.fasilitas });
});

// PUT Ubah Fasilitas
app.put('/api/admin/fasilitas/:id', async (req, res) => {
  const db = await getActiveDb();
  if (!db) return res.status(500).json({ error: 'Gagal membaca database' });

  const paramId = req.params.id;
  const idx = db.fasilitas.findIndex(f => f.id == paramId || String(f.id) === String(paramId));
  if (idx === -1) return res.status(404).json({ error: 'Fasilitas tidak ditemukan' });

  db.fasilitas[idx] = { ...db.fasilitas[idx], ...req.body };

  if (supabaseService.isSupabaseEnabled()) {
    try {
      await supabaseService.updateFasilitas(paramId, db.fasilitas[idx]);
    } catch (e) {
      console.error('Supabase fasilitas error:', e.message);
    }
  }
  writeLocalDb(db);

  res.json({ success: true, item: db.fasilitas[idx] });
});

// DELETE Hapus Fasilitas
app.delete('/api/admin/fasilitas/:id', async (req, res) => {
  const db = await getActiveDb();
  if (!db) return res.status(500).json({ error: 'Gagal membaca database' });

  const paramId = req.params.id;
  db.fasilitas = db.fasilitas.filter(f => f.id != paramId && String(f.id) !== String(paramId));

  if (supabaseService.isSupabaseEnabled()) {
    try {
      await supabaseService.deleteFasilitas(paramId);
    } catch (e) {
      console.error('Supabase fasilitas error:', e.message);
    }
  }
  writeLocalDb(db);

  res.json({ success: true, fasilitas: db.fasilitas });
});

// PUT Ubah Status / Catatan Pendaftar PPDB
app.put('/api/admin/registrations/:id', async (req, res) => {
  const db = await getActiveDb();
  if (!db) return res.status(500).json({ error: 'Gagal membaca database' });

  const paramId = req.params.id;
  const idx = db.registrations.findIndex(r => r.id === paramId || String(r.id) === String(paramId));
  if (idx === -1) return res.status(404).json({ error: 'Data pendaftar tidak ditemukan' });

  db.registrations[idx] = { ...db.registrations[idx], ...req.body };

  if (supabaseService.isSupabaseEnabled()) {
    try {
      await supabaseService.updateRegistration(paramId, db.registrations[idx]);
    } catch (e) {
      console.error('Supabase registration error:', e.message);
    }
  }
  writeLocalDb(db);

  res.json({ success: true, item: db.registrations[idx] });
});

// DELETE Hapus Data Pendaftar PPDB
app.delete('/api/admin/registrations/:id', async (req, res) => {
  const db = await getActiveDb();
  if (!db) return res.status(500).json({ error: 'Gagal membaca database' });

  const paramId = req.params.id;
  db.registrations = db.registrations.filter(r => r.id !== paramId && String(r.id) !== String(paramId));

  if (supabaseService.isSupabaseEnabled()) {
    try {
      await supabaseService.deleteRegistration(paramId);
    } catch (e) {
      console.error('Supabase registration error:', e.message);
    }
  }
  writeLocalDb(db);

  res.json({ success: true, message: 'Data pendaftar dihapus' });
});

// GET Ekspor CSV Data PPDB
app.get('/api/admin/export-ppdb', async (req, res) => {
  const db = await getActiveDb();
  if (!db) return res.status(500).send('Gagal membaca database');

  const headers = [
    'No Pendaftaran',
    'Nama Lengkap',
    'NISN',
    'Jenis Kelamin',
    'Tempat Lahir',
    'Tanggal Lahir',
    'Asal Sekolah',
    'Jurusan Pilihan',
    'Nama Orang Tua',
    'No WA/HP',
    'Alamat',
    'Jalur',
    'Status',
    'Tanggal Daftar'
  ];

  const rows = db.registrations.map(r => [
    `"${r.registrationNo || ''}"`,
    `"${(r.fullName || '').replace(/"/g, '""')}"`,
    `"${r.nisn || ''}"`,
    `"${r.gender || ''}"`,
    `"${(r.birthPlace || '').replace(/"/g, '""')}"`,
    `"${r.birthDate || ''}"`,
    `"${(r.originSchool || '').replace(/"/g, '""')}"`,
    `"${(r.majorChoice || '').replace(/"/g, '""')}"`,
    `"${(r.parentName || '').replace(/"/g, '""')}"`,
    `"${r.phone || ''}"`,
    `"${(r.address || '').replace(/"/g, '""')}"`,
    `"${r.pathway || ''}"`,
    `"${r.status || ''}"`,
    `"${r.createdAt ? new Date(r.createdAt).toLocaleString('id-ID') : ''}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\r\n');
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="data-pendaftar-ppdb-smk-wihdatul-ummah.csv"');
  res.send(csvContent);
});

// PUT Ganti Akun Admin (Username & Password)
app.put('/api/admin/account', async (req, res) => {
  const db = await getActiveDb();
  if (!db) return res.status(500).json({ error: 'Gagal membaca database' });

  const { oldPassword, newUsername, newPassword } = req.body;
  if (oldPassword !== db.adminUser.password) {
    return res.status(403).json({ error: 'Password lama salah!' });
  }

  if (newUsername) db.adminUser.username = newUsername.trim();
  if (newPassword) db.adminUser.password = newPassword.trim();

  if (supabaseService.isSupabaseEnabled()) {
    await supabaseService.saveSiteData('admin_user', db.adminUser);
  }
  writeLocalDb(db);

  res.json({ success: true, message: 'Akun admin berhasil diperbarui!' });
});

// POST Upload Gambar (Dual-mode: Supabase Storage jika aktif, lokal fallback)
app.post('/api/admin/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Tidak ada file yang diunggah' });
  }

  // Jika Supabase Storage aktif, unggah juga ke cloud
  if (supabaseService.isSupabaseEnabled()) {
    try {
      const fileBuffer = fs.readFileSync(req.file.path);
      const cloudUrl = await supabaseService.uploadFileToStorage(fileBuffer, req.file.filename, req.file.mimetype);
      if (cloudUrl) {
        return res.json({
          success: true,
          url: cloudUrl,
          filename: req.file.filename
        });
      }
    } catch (cloudErr) {
      console.warn('Gagal upload ke Supabase Storage, menggunakan penyimpanan lokal:', cloudErr.message);
    }
  }

  const relativePath = '/uploads/' + req.file.filename;
  res.json({
    success: true,
    url: relativePath,
    filename: req.file.filename
  });
});

// ----------------------------------------------------
// ROUTING HALAMAN HTML & STATIS
// ----------------------------------------------------

// Akses Admin Panel
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Penanganan 404 untuk rute API
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Endpoint API tidak ditemukan' });
});

// SPA Fallback untuk website umum (hanya untuk method GET yang bukan /api)
app.use((req, res) => {
  if (req.method === 'GET') {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
  res.status(404).json({ error: 'Endpoint tidak ditemukan' });
});

// Middleware Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ error: err.message || 'Terjadi kesalahan pada server' });
});

// Jalankan Server
app.listen(PORT, () => {
  console.log(`Server SMK Wihdatul Ummah aktif di http://localhost:${PORT}`);
  console.log(`Admin Panel dapat diakses di http://localhost:${PORT}/admin`);
  if (supabaseService.isSupabaseEnabled()) {
    console.log('Database Mode: 🌐 SUPABASE CLOUD (Sinkronisasi lokal aktif)');
  } else {
    console.log('Database Mode: 💾 LOKAL JSON (data/db.json)');
  }
});
