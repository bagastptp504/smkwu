// SMK WIHDATUL UMMAH - Admin Dashboard Controller

let adminData = null;
let currentToken = localStorage.getItem('smk_admin_token');

document.addEventListener('DOMContentLoaded', () => {
  initAdmin();
});

function initAdmin() {
  if (currentToken) {
    showDashboard();
    fetchAdminData();
  } else {
    showLogin();
  }

  setupLoginListener();
  setupSidebarNavigation();
}

// Auth UI toggles
function showLogin() {
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('adminApp').style.display = 'none';
}

function showDashboard() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('adminApp').style.display = 'block';
}

function setupLoginListener() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button');
    btn.innerHTML = 'Memverifikasi...';
    btn.disabled = true;

    const u = form.username.value.trim();
    const p = form.password.value.trim();

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: u, password: p })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login gagal');

      currentToken = data.token;
      localStorage.setItem('smk_admin_token', currentToken);
      showDashboard();
      fetchAdminData();
    } catch (err) {
      // If offline / opened as file, check fallback credentials
      if (u === 'admin' && p === 'admin123') {
        currentToken = 'local_token_' + Date.now();
        localStorage.setItem('smk_admin_token', currentToken);
        showDashboard();
        fetchAdminData();
      } else {
        alert('Login Gagal: ' + err.message);
      }
    } finally {
      btn.innerHTML = 'Masuk ke Dashboard';
      btn.disabled = false;
    }
  });
}

window.adminLogout = function() {
  if (confirm('Apakah Anda yakin ingin keluar dari panel admin?')) {
    localStorage.removeItem('smk_admin_token');
    currentToken = null;
    showLogin();
  }
};

// Sidebar Nav Switching
function setupSidebarNavigation() {
  document.querySelectorAll('.sidebar-btn[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.admin-tab-pane').forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');

      // Update title
      const titleEl = document.getElementById('topbarTitle');
      if (titleEl) titleEl.textContent = btn.innerText.trim();
    });
  });
}

// Fetch All Admin Data
async function fetchAdminData() {
  try {
    const res = await fetch('/api/admin/data');
    if (!res.ok) throw new Error('Gagal mengambil data dari server');
    adminData = await res.json();
  } catch (err) {
    console.warn('API backend tidak tersambung, menggunakan data penyimpanan lokal:', err);
    const local = localStorage.getItem('smk_local_admin_db');
    if (local) {
      adminData = JSON.parse(local);
    } else {
      adminData = {
        settings: {
          schoolName: "SMK WIHDATUL UMMAH",
          schoolSub: "SEKOLAH MENENGAH KEJURUAN",
          tagline: "Berkarakter, Kreatif, dan Siap Bersaing di Dunia Kerja",
          address: "Jl. Bromo 2 Raya No.51, Kel. Banjarsari, Surakarta",
          phoneSara: "0895 3599 5604",
          phoneAna: "0813 3604 3338",
          facebook: "ponpes wihdatulummah",
          facebookUrl: "https://facebook.com",
          instagram: "smkponpes_wihdatulummah",
          instagramUrl: "https://instagram.com",
          email: "info@smkwihdatulummah.sch.id",
          heroBadge: "Selamat Datang di",
          heroTitle: "SMK WIHDATUL UMMAH",
          heroSubtitle: "Berkarakter, Kreatif, dan Siap Bersaing di Dunia Kerja",
          heroImage: "/images/banner-reference.jpg",
          googleFormEmbedUrl: "https://docs.google.com/forms/d/e/1FAIpQLSc3wG2v1lR7Y_SAMPLE_FORM_ID/viewform?embedded=true",
          googleFormPublicUrl: "https://forms.gle/samplePPDB",
          googleSheetViewUrl: "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing"
        },
        profile: {
          namaKepala: "H. Muhammad Rasyid, S.Kom., M.Pd.",
          nipKepala: "19780512 200312 1 004",
          fotoKepala: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80",
          sambutanKepala: "Assalamu'alaikum Warahmatullahi Wabarakatuh.\n\nSelamat datang di website resmi SMK Wihdatul Ummah Surakarta.",
          visi: "Menjadi Sekolah Menengah Kejuruan Islam Terdepan.",
          misi: ["Pendidikan vokasi berkualitas", "Berakhlakul karimah"]
        },
        upskilling: ["Web Design", "Video & Fotografi", "Graphic Design", "Audio & Video Editing", "Komputer Dasar", "Digital Marketing"],
        ekstrakurikuler: ["Fotografi, Cinematografi", "Pramuka", "Public Speaking", "PMR", "Desain Grafis", "Tahfidz"],
        programSekolah: [
          { id: 1, title: "Siswa Berprestasi Akademik", image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&auto=format&fit=crop&q=80", desc: "Program beasiswa akademik" },
          { id: 2, title: "Siswa Berprestasi Non-Akademik", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80", desc: "Program pengembangan bakat" },
          { id: 3, title: "Siswa Kurang Mampu (Afirmasi)", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80", desc: "Bantuan pendidikan penuh" },
          { id: 4, title: "Kategori Khusus", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80", desc: "Beasiswa Tahfidzul Qur'an" }
        ],
        news: [
          { id: "news-1", title: "SMK Wihdatul Ummah Gelar Pelatihan Digital Marketing", category: "Pelatihan", date: "25 Agustus 2026", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80", summary: "Pelatihan digital marketing intensif.", content: "Pelatihan digital marketing..." }
        ],
        fasilitas: [
          { id: 1, name: "Lab. Komputer", icon: "laptop", desc: "PC modern" },
          { id: 2, name: "Masjid", icon: "moon", desc: "Pusat ibadah" }
        ],
        registrations: [
          { id: "reg-1", registrationNo: "PPDB-2026-001", fullName: "Muhammad Fatih Al-Farisi", nisn: "0082910293", gender: "Laki-laki", originSchool: "SMP Negeri 4 Surakarta", majorChoice: "Web Design & Digital Marketing", phone: "081298765432", status: "Diterima", createdAt: new Date().toISOString() }
        ]
      };
      localStorage.setItem('smk_local_admin_db', JSON.stringify(adminData));
    }
  }

  renderOverviewStats();
  renderPPDBTable();
  renderGoogleFormSettings();
  renderNewsTable();
  renderHeroSettings();
  renderProfileSettings();
  renderProgramsSettings();
  renderFasilitasTable();
  renderContactSettings();
}

// 1. Overview Stats
function renderOverviewStats() {
  if (!adminData) return;
  const regs = adminData.registrations || [];
  const news = adminData.news || [];
  const fas = adminData.fasilitas || [];

  document.getElementById('statTotalPPDB').textContent = regs.length;
  document.getElementById('statTotalNews').textContent = news.length;
  document.getElementById('statTotalFasilitas').textContent = fas.length;

  const accepted = regs.filter(r => r.status === 'Diterima').length;
  document.getElementById('statAcceptedPPDB').textContent = accepted;

  // Recent PPDB Table on Dashboard
  const recentTbody = document.getElementById('recentPPDBTbody');
  if (recentTbody) {
    recentTbody.innerHTML = regs.slice(0, 5).map(r => `
      <tr>
        <td><strong>${r.registrationNo}</strong></td>
        <td>${r.fullName}</td>
        <td>${r.majorChoice}</td>
        <td><span class="badge ${getStatusBadge(r.status)}">${r.status}</span></td>
        <td>${new Date(r.createdAt).toLocaleDateString('id-ID')}</td>
      </tr>
    `).join('');
  }
}

function getStatusBadge(status) {
  if (status === 'Diterima') return 'badge-green';
  if (status === 'Menunggu Verifikasi') return 'badge-amber';
  if (status === 'Perlu Lengkapi Berkas') return 'badge-red';
  return 'badge-blue';
}

// 2. PPDB Management
function renderPPDBTable() {
  if (!adminData || !adminData.registrations) return;
  const tbody = document.getElementById('ppdbFullTbody');
  if (!tbody) return;

  const search = (document.getElementById('searchPPDBInput')?.value || '').toLowerCase();
  const filterMajor = document.getElementById('filterMajorSelect')?.value || '';
  const filterStatus = document.getElementById('filterStatusSelect')?.value || '';

  const filtered = adminData.registrations.filter(r => {
    const matchesSearch = !search || 
      r.fullName.toLowerCase().includes(search) || 
      r.nisn.toLowerCase().includes(search) || 
      r.registrationNo.toLowerCase().includes(search);
    const matchesMajor = !filterMajor || r.majorChoice === filterMajor;
    const matchesStatus = !filterStatus || r.status === filterStatus;
    return matchesSearch && matchesMajor && matchesStatus;
  });

  tbody.innerHTML = filtered.map(r => `
    <tr>
      <td><strong>${r.registrationNo}</strong></td>
      <td>
        <strong>${r.fullName}</strong><br>
        <span style="font-size: 11px; color: #64748b;">NISN: ${r.nisn} | ${r.gender}</span>
      </td>
      <td>${r.originSchool}</td>
      <td><span style="font-size: 12px; font-weight: 600; color: #0a5c36;">${r.majorChoice}</span></td>
      <td>${r.phone}</td>
      <td><span class="badge ${getStatusBadge(r.status)}">${r.status}</span></td>
      <td>
        <button class="btn-action-icon" title="Lihat & Edit Status" onclick="openEditRegModal('${r.id}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
        </button>
        <button class="btn-action-icon" title="Cetak Kartu" onclick="printRegSlip('${r.id}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect width="12" height="8" x="6" y="14"></rect></svg>
        </button>
        <button class="btn-action-icon delete" title="Hapus Data" onclick="deleteReg('${r.id}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
        </button>
      </td>
    </tr>
  `).join('');
}

window.filterPPDB = renderPPDBTable;

window.openEditRegModal = function(id) {
  const reg = adminData.registrations.find(r => r.id === id);
  if (!reg) return;

  const modal = document.getElementById('editRegModal');
  const form = document.getElementById('editRegForm');
  if (!modal || !form) return;

  form.regId.value = reg.id;
  document.getElementById('editRegNo').textContent = reg.registrationNo;
  document.getElementById('editRegName').textContent = reg.fullName;
  document.getElementById('editRegDetails').innerHTML = `
    <div><strong>NISN:</strong> ${reg.nisn}</div>
    <div><strong>Asal Sekolah:</strong> ${reg.originSchool}</div>
    <div><strong>Jurusan:</strong> ${reg.majorChoice}</div>
    <div><strong>Jalur:</strong> ${reg.pathway}</div>
    <div><strong>Wali:</strong> ${reg.parentName} (${reg.phone})</div>
    <div><strong>Alamat:</strong> ${reg.address}</div>
    <div><strong>Waktu Daftar:</strong> ${new Date(reg.createdAt).toLocaleString('id-ID')}</div>
  `;

  form.regStatus.value = reg.status;
  form.regNotes.value = reg.notes || '';

  modal.classList.add('active');
};

document.getElementById('editRegForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const id = form.regId.value;

  try {
    const res = await fetch(`/api/admin/registrations/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: form.regStatus.value,
        notes: form.regNotes.value
      })
    });
    if (!res.ok) throw new Error('Gagal update status');

    closeAdminModal('editRegModal');
    await fetchAdminData();
    alert('Status pendaftar berhasil diperbarui!');
  } catch (err) {
    alert(err.message);
  }
});

window.deleteReg = async function(id) {
  if (!confirm('Apakah Anda yakin ingin menghapus data pendaftar ini?')) return;
  try {
    const res = await fetch(`/api/admin/registrations/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Gagal menghapus');
    await fetchAdminData();
  } catch (err) {
    alert(err.message);
  }
};

window.printRegSlip = function(id) {
  const reg = adminData.registrations.find(r => r.id === id);
  if (!reg) return;

  const printWin = window.open('', '_blank', 'width=800,height=600');
  printWin.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Kartu Bukti Pendaftaran - ${reg.registrationNo}</title>
      <style>
        body { font-family: sans-serif; padding: 30px; line-height: 1.6; }
        .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
        .header h2 { margin: 0; color: #0a5c36; }
        .header p { margin: 2px 0; font-size: 12px; }
        .table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        .table td { padding: 8px; border-bottom: 1px solid #ddd; }
        .table td:first-child { font-weight: bold; width: 35%; }
        .box { background: #f0fdf4; border: 2px solid #0a5c36; padding: 15px; border-radius: 8px; text-align: center; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>SMK WIHDATUL UMMAH SURAKARTA</h2>
        <p>Jl. Bromo 2 Raya No.51, Banjarsari, Surakarta | Telp: 0895 3599 5604</p>
        <p><strong>BUKTI PENERIMAAN PESERTA DIDIK BARU (PPDB) 2026/2027</strong></p>
      </div>

      <div class="box">
        <div style="font-size: 13px;">NOMOR PENDAFTARAN</div>
        <div style="font-size: 26px; font-weight: bold; color: #0a5c36;">${reg.registrationNo}</div>
        <div style="font-weight: bold; margin-top: 5px;">Status: ${reg.status}</div>
      </div>

      <table class="table">
        <tr><td>Nama Lengkap</td><td>: ${reg.fullName}</td></tr>
        <tr><td>NISN</td><td>: ${reg.nisn}</td></tr>
        <tr><td>Jenis Kelamin</td><td>: ${reg.gender}</td></tr>
        <tr><td>Tempat, Tgl Lahir</td><td>: ${reg.birthPlace}, ${reg.birthDate}</td></tr>
        <tr><td>Asal Sekolah</td><td>: ${reg.originSchool}</td></tr>
        <tr><td>Pilihan Jurusan</td><td>: ${reg.majorChoice}</td></tr>
        <tr><td>Jalur Pendaftaran</td><td>: ${reg.pathway}</td></tr>
        <tr><td>Nama Orang Tua/Wali</td><td>: ${reg.parentName}</td></tr>
        <tr><td>No. HP / WhatsApp</td><td>: ${reg.phone}</td></tr>
        <tr><td>Alamat</td><td>: ${reg.address}</td></tr>
        <tr><td>Tanggal Pendaftaran</td><td>: ${new Date(reg.createdAt).toLocaleDateString('id-ID')}</td></tr>
        <tr><td>Catatan Panitia</td><td>: ${reg.notes || '-'}</td></tr>
      </table>

      <div style="margin-top: 40px; display: flex; justify-content: space-between;">
        <div style="text-align: center; width: 200px;">
          <p>Calon Peserta Didik,</p>
          <br><br><br>
          <p><strong>(${reg.fullName})</strong></p>
        </div>
        <div style="text-align: center; width: 250px;">
          <p>Surakarta, ${new Date().toLocaleDateString('id-ID')}<br>Panitia PPDB,</p>
          <br><br><br>
          <p><strong>( Panitia PPDB SMK WU )</strong></p>
        </div>
      </div>
      <script>window.print();</script>
    </body>
    </html>
  `);
  printWin.document.close();
};

// 3. Google Form & Sheet Integration Settings
function renderGoogleFormSettings() {
  if (!adminData || !adminData.settings) return;
  const s = adminData.settings;

  const form = document.getElementById('googleFormSettingsForm');
  if (form) {
    form.googleFormEmbedUrl.value = s.googleFormEmbedUrl || '';
    form.googleFormPublicUrl.value = s.googleFormPublicUrl || '';
    form.googleSheetViewUrl.value = s.googleSheetViewUrl || '';
  }

  // Update live preview iframe
  const iframeSheet = document.getElementById('adminGoogleSheetPreview');
  if (iframeSheet && s.googleSheetViewUrl) {
    iframeSheet.src = s.googleSheetViewUrl;
  }
}

document.getElementById('googleFormSettingsForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;

  try {
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        googleFormEmbedUrl: form.googleFormEmbedUrl.value.trim(),
        googleFormPublicUrl: form.googleFormPublicUrl.value.trim(),
        googleSheetViewUrl: form.googleSheetViewUrl.value.trim()
      })
    });
    if (!res.ok) throw new Error('Gagal menyimpan pengaturan Google Form');

    await fetchAdminData();
    alert('Pengaturan Integrasi Google Form & Spreadsheet Berhasil Disimpan!');
  } catch (err) {
    alert(err.message);
  }
});

// 4. News Management (Posting Berita)
function renderNewsTable() {
  if (!adminData || !adminData.news) return;
  const tbody = document.getElementById('newsAdminTbody');
  if (!tbody) return;

  tbody.innerHTML = adminData.news.map(n => `
    <tr>
      <td>
        <img src="${n.image}" style="width: 50px; height: 40px; object-fit: cover; border-radius: 6px;" onerror="this.src='/images/banner-reference.jpg'">
      </td>
      <td>
        <strong>${n.title}</strong>
        <p style="font-size: 11px; color: #64748b; margin-top: 2px;">${n.summary ? n.summary.substring(0, 75) + '...' : ''}</p>
      </td>
      <td><span class="badge badge-blue">${n.category}</span></td>
      <td>${n.date}</td>
      <td>
        <button class="btn-action-icon" title="Edit Berita" onclick="openEditNewsModal('${n.id}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
        </button>
        <button class="btn-action-icon delete" title="Hapus Berita" onclick="deleteNews('${n.id}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
        </button>
      </td>
    </tr>
  `).join('');
}

window.openAddNewsModal = function() {
  const form = document.getElementById('newsForm');
  if (!form) return;
  form.reset();
  form.newsId.value = '';
  document.getElementById('newsModalTitle').textContent = 'Posting Berita Baru';
  document.getElementById('newsImagePreview').src = '/images/banner-reference.jpg';
  openAdminModal('newsModal');
};

window.openEditNewsModal = function(id) {
  const n = adminData.news.find(item => item.id === id);
  if (!n) return;

  const form = document.getElementById('newsForm');
  if (!form) return;

  form.newsId.value = n.id;
  form.title.value = n.title;
  form.category.value = n.category;
  form.date.value = n.date;
  form.image.value = n.image;
  form.summary.value = n.summary || '';
  form.content.value = n.content;

  document.getElementById('newsImagePreview').src = n.image;
  document.getElementById('newsModalTitle').textContent = 'Edit Berita';
  openAdminModal('newsModal');
};

document.getElementById('newsForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const id = form.newsId.value;

  const payload = {
    title: form.title.value.trim(),
    category: form.category.value,
    date: form.date.value,
    image: form.image.value.trim() || '/images/banner-reference.jpg',
    summary: form.summary.value.trim(),
    content: form.content.value.trim()
  };

  try {
    let url = '/api/admin/news';
    let method = 'POST';
    if (id) {
      url = `/api/admin/news/${id}`;
      method = 'PUT';
    }

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Gagal menyimpan berita');

    closeAdminModal('newsModal');
    await fetchAdminData();
    alert('Berita berhasil disimpan!');
  } catch (err) {
    alert(err.message);
  }
});

window.deleteNews = async function(id) {
  if (!confirm('Hapus berita ini secara permanen?')) return;
  try {
    const res = await fetch(`/api/admin/news/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Gagal menghapus berita');
    await fetchAdminData();
  } catch (err) {
    alert(err.message);
  }
};

// Generic file upload helper for news & CMS images
window.uploadImageFile = async function(fileInput, targetUrlInputId, previewImgId) {
  const file = fileInput.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('image', file);

  try {
    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Upload gagal');

    if (targetUrlInputId) {
      document.getElementById(targetUrlInputId).value = data.url;
    }
    if (previewImgId) {
      document.getElementById(previewImgId).src = data.url;
    }
    alert('Gambar berhasil diunggah!');
  } catch (err) {
    alert('Gagal mengunggah gambar: ' + err.message);
  }
};

// 5. Hero Banner Settings (CMS)
function renderHeroSettings() {
  if (!adminData || !adminData.settings) return;
  const s = adminData.settings;
  const form = document.getElementById('heroSettingsForm');
  if (!form) return;

  form.heroTitle.value = s.heroTitle || '';
  form.heroSubtitle.value = s.heroSubtitle || '';
  form.heroBadge.value = s.heroBadge || '';
  form.heroImage.value = s.heroImage || '';
  document.getElementById('heroPreviewImg').src = s.heroImage || '/images/banner-reference.jpg';
}

document.getElementById('heroSettingsForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;

  try {
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        heroTitle: form.heroTitle.value.trim(),
        heroSubtitle: form.heroSubtitle.value.trim(),
        heroBadge: form.heroBadge.value.trim(),
        heroImage: form.heroImage.value.trim()
      })
    });
    if (!res.ok) throw new Error('Gagal menyimpan pengaturan Hero');

    await fetchAdminData();
    alert('Pengaturan Hero Banner & Foto Utama Berhasil Disimpan!');
  } catch (err) {
    alert(err.message);
  }
});

// 6. Profile & Sambutan Kepala Sekolah Settings (CMS)
function renderProfileSettings() {
  if (!adminData || !adminData.profile) return;
  const p = adminData.profile;
  const form = document.getElementById('profileSettingsForm');
  if (!form) return;

  form.namaKepala.value = p.namaKepala || '';
  form.nipKepala.value = p.nipKepala || '';
  form.fotoKepala.value = p.fotoKepala || '';
  form.sambutanKepala.value = p.sambutanKepala || '';
  form.visi.value = p.visi || '';
  form.misi.value = (p.misi || []).join('\n');
  document.getElementById('kepalaPreviewImg').src = p.fotoKepala || '/images/banner-reference.jpg';
}

document.getElementById('profileSettingsForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;

  const misiArr = form.misi.value.split('\n').map(m => m.trim()).filter(m => m.length > 0);

  try {
    const res = await fetch('/api/admin/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        namaKepala: form.namaKepala.value.trim(),
        nipKepala: form.nipKepala.value.trim(),
        fotoKepala: form.fotoKepala.value.trim(),
        sambutanKepala: form.sambutanKepala.value.trim(),
        visi: form.visi.value.trim(),
        misi: misiArr
      })
    });
    if (!res.ok) throw new Error('Gagal update profil');

    await fetchAdminData();
    alert('Profil dan Sambutan Kepala Sekolah Berhasil Diperbarui!');
  } catch (err) {
    alert(err.message);
  }
});

// 7. Program Keahlian & Ekstrakurikuler + 4 Program Sekolah Cards (CMS)
function renderProgramsSettings() {
  if (!adminData) return;
  const upskillingInput = document.getElementById('upskillingTextarea');
  const ekskulInput = document.getElementById('ekskulTextarea');
  if (upskillingInput) upskillingInput.value = (adminData.upskilling || []).join('\n');
  if (ekskulInput) ekskulInput.value = (adminData.ekstrakurikuler || []).join('\n');

  // 4 School Program Cards list
  const container = document.getElementById('programSekolahAdminCards');
  if (container && adminData.programSekolah) {
    container.innerHTML = adminData.programSekolah.map(p => `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; margin-bottom: 12px; display: flex; gap: 14px; align-items: center;">
        <img src="${p.image}" style="width: 70px; height: 60px; object-fit: cover; border-radius: 8px;" onerror="this.src='/images/banner-reference.jpg'">
        <div style="flex-grow: 1;">
          <h4 style="font-size: 13px; font-weight: 700; margin-bottom: 3px;">${p.title}</h4>
          <p style="font-size: 11.5px; color: #64748b;">${p.desc ? p.desc.substring(0, 90) + '...' : ''}</p>
        </div>
        <button class="btn-action-icon" title="Edit Kartu" onclick="openEditProgModal(${p.id})">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
        </button>
      </div>
    `).join('');
  }
}

document.getElementById('programKeahlianForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const upskilling = document.getElementById('upskillingTextarea').value.split('\n').map(s => s.trim()).filter(Boolean);
  const ekstrakurikuler = document.getElementById('ekskulTextarea').value.split('\n').map(s => s.trim()).filter(Boolean);

  try {
    const res = await fetch('/api/admin/program-keahlian', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ upskilling, ekstrakurikuler })
    });
    if (!res.ok) throw new Error('Gagal menyimpan program keahlian');

    await fetchAdminData();
    alert('Daftar Program Upskilling & Ekstrakurikuler Berhasil Diperbarui!');
  } catch (err) {
    alert(err.message);
  }
});

window.openEditProgModal = function(id) {
  const p = adminData.programSekolah.find(item => item.id === id);
  if (!p) return;

  const form = document.getElementById('progCardForm');
  if (!form) return;

  form.progId.value = p.id;
  form.title.value = p.title;
  form.image.value = p.image;
  form.desc.value = p.desc || '';
  document.getElementById('progCardImagePreview').src = p.image;

  openAdminModal('progCardModal');
};

document.getElementById('progCardForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const id = form.progId.value;

  try {
    const res = await fetch(`/api/admin/program-sekolah/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: form.title.value.trim(),
        image: form.image.value.trim(),
        desc: form.desc.value.trim()
      })
    });
    if (!res.ok) throw new Error('Gagal update kartu program');

    closeAdminModal('progCardModal');
    await fetchAdminData();
    alert('Kartu Program Sekolah Berhasil Diperbarui!');
  } catch (err) {
    alert(err.message);
  }
});

// 8. Fasilitas Management
function renderFasilitasTable() {
  if (!adminData || !adminData.fasilitas) return;
  const tbody = document.getElementById('fasilitasAdminTbody');
  if (!tbody) return;

  tbody.innerHTML = adminData.fasilitas.map(f => `
    <tr>
      <td><strong>${f.id}</strong></td>
      <td><strong>${f.name}</strong></td>
      <td><code>${f.icon || 'laptop'}</code></td>
      <td>${f.desc || '-'}</td>
      <td>
        <button class="btn-action-icon" title="Edit" onclick="openEditFasModal(${f.id})">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
        </button>
        <button class="btn-action-icon delete" title="Hapus" onclick="deleteFasilitas(${f.id})">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
        </button>
      </td>
    </tr>
  `).join('');
}

window.openAddFasModal = function() {
  const form = document.getElementById('fasilitasForm');
  if (!form) return;
  form.reset();
  form.fasId.value = '';
  document.getElementById('fasModalTitle').textContent = 'Tambah Fasilitas Sekolah';
  openAdminModal('fasilitasModal');
};

window.openEditFasModal = function(id) {
  const f = adminData.fasilitas.find(item => item.id === id);
  if (!f) return;

  const form = document.getElementById('fasilitasForm');
  if (!form) return;

  form.fasId.value = f.id;
  form.name.value = f.name;
  form.icon.value = f.icon || 'laptop';
  form.desc.value = f.desc || '';

  document.getElementById('fasModalTitle').textContent = 'Edit Fasilitas Sekolah';
  openAdminModal('fasilitasModal');
};

document.getElementById('fasilitasForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const id = form.fasId.value;

  const payload = {
    name: form.name.value.trim(),
    icon: form.icon.value.trim(),
    desc: form.desc.value.trim()
  };

  try {
    let url = '/api/admin/fasilitas';
    let method = 'POST';
    if (id) {
      url = `/api/admin/fasilitas/${id}`;
      method = 'PUT';
    }

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Gagal simpan fasilitas');

    closeAdminModal('fasilitasModal');
    await fetchAdminData();
    alert('Fasilitas berhasil disimpan!');
  } catch (err) {
    alert(err.message);
  }
});

window.deleteFasilitas = async function(id) {
  if (!confirm('Hapus fasilitas ini?')) return;
  try {
    const res = await fetch(`/api/admin/fasilitas/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Gagal menghapus');
    await fetchAdminData();
  } catch (err) {
    alert(err.message);
  }
};

// 9. Contact & Social Settings (CMS)
function renderContactSettings() {
  if (!adminData || !adminData.settings) return;
  const s = adminData.settings;
  const form = document.getElementById('contactSettingsForm');
  if (!form) return;

  form.phoneSara.value = s.phoneSara || '';
  form.phoneAna.value = s.phoneAna || '';
  form.facebook.value = s.facebook || '';
  form.facebookUrl.value = s.facebookUrl || '';
  form.instagram.value = s.instagram || '';
  form.instagramUrl.value = s.instagramUrl || '';
  form.address.value = s.address || '';
  form.email.value = s.email || '';
}

document.getElementById('contactSettingsForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;

  try {
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phoneSara: form.phoneSara.value.trim(),
        phoneAna: form.phoneAna.value.trim(),
        facebook: form.facebook.value.trim(),
        facebookUrl: form.facebookUrl.value.trim(),
        instagram: form.instagram.value.trim(),
        instagramUrl: form.instagramUrl.value.trim(),
        address: form.address.value.trim(),
        email: form.email.value.trim()
      })
    });
    if (!res.ok) throw new Error('Gagal update info kontak');

    await fetchAdminData();
    alert('Kontak & Media Sosial Berhasil Diperbarui!');
  } catch (err) {
    alert(err.message);
  }
});

// 10. Account Security (Change Password)
document.getElementById('accountForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;

  if (form.newPassword.value !== form.confirmPassword.value) {
    alert('Konfirmasi password baru tidak cocok!');
    return;
  }

  try {
    const res = await fetch('/api/admin/account', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        oldPassword: form.oldPassword.value,
        newUsername: form.newUsername.value,
        newPassword: form.newPassword.value
      })
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Gagal mengubah password');

    alert(result.message);
    form.reset();
  } catch (err) {
    alert(err.message);
  }
});

// Admin Modal Helpers
window.openAdminModal = function(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('active');
};

window.closeAdminModal = function(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('active');
};
