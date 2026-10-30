// SMK WIHDATUL UMMAH - Main Client Script

let siteData = null;

// Fallback default data for offline / standalone HTML viewing
const DEFAULT_SITE_DATA = {
  settings: {
    schoolName: "SMK WIHDATUL UMMAH",
    schoolSub: "SEKOLAH MENENGAH KEJURUAN",
    tagline: "Berkarakter, Kreatif, dan Siap Bersaing di Dunia Kerja",
    address: "Jl. Bromo 2 Raya No.51, Kel. Banjarsari, Surakarta.",
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
    heroCtaText: "Kenali Lebih Dekat",
    heroSlogan: "Saatnya Bergabung Jadi Bagian dari Sekolah Hebat!",
    heroImage: "/images/banner-reference.jpg",
    googleFormEmbedUrl: "https://docs.google.com/forms/d/e/1FAIpQLSc3wG2v1lR7Y_SAMPLE_FORM_ID/viewform?embedded=true",
    googleFormPublicUrl: "https://forms.gle/samplePPDB",
    googleSheetViewUrl: "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing"
  },
  profile: {
    sambutanKepala: "Assalamu'alaikum Warahmatullahi Wabarakatuh.\n\nSelamat datang di website resmi SMK Wihdatul Ummah Surakarta. Kami berkomitmen mendampingi setiap peserta didik untuk menjadi insan yang cerdas, kreatif, berintegritas, dan siap bersaing di dunia kerja maupun perguruan tinggi.",
    namaKepala: "H. Muhammad Rasyid, S.Kom., M.Pd.",
    nipKepala: "19780512 200312 1 004",
    fotoKepala: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80",
    visi: "Menjadi Sekolah Menengah Kejuruan Islam Terdepan yang Menghasilkan Generasi Berkarakter Qur'ani, Mandiri, Berkompetensi Digital, dan Siap Menembus Dunia Industri Global.",
    misi: [
      "Menanamkan nilai-nilai keislaman dan akhlak mulia dalam setiap aktivitas pembelajaran.",
      "Melaksanakan program pelatihan upskilling di bidang teknologi informasi, multimedia, dan desain secara intensif.",
      "Menyediakan fasilitas sarana dan prasarana belajar berstandar industri modern.",
      "Membangun kemitraan strategis dengan dunia usaha dan industri (DUDI) untuk penyaluran magang dan kerja.",
      "Menumbuhkan jiwa kewirausahaan (entrepreneurship) santri berbasis teknologi digital."
    ]
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
  news: [
    {
      id: "news-1",
      title: "SMK Wihdatul Ummah Gelar Pelatihan Digital Marketing",
      category: "Pelatihan",
      date: "25 Agustus 2026",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
      summary: "Siswa dibekali keahlian strategi pemasaran digital, SEO, dan optimasi media sosial oleh praktisi industri.",
      content: "Surakarta — SMK Wihdatul Ummah sukses menyelenggarakan Pelatihan Digital Marketing untuk seluruh siswa kelas XI dan XII. Pelatihan ini menghadirkan praktisi profesional yang telah berpengalaman di industri digital advertising.\n\nMelalui kegiatan ini, siswa diajarkan cara mengelola kampanye iklan online, riset kata kunci, optimasi konten video, hingga strategi konversi penjualan. Kepala SMK Wihdatul Ummah menegaskan bahwa keahlian digital marketing adalah salah satu bekal paling esensial bagi lulusan agar langsung dapat berkarya di dunia kerja maupun membangun agensi digital secara mandiri."
    },
    {
      id: "news-2",
      title: "Siswa SMK Wihdatul Ummah Raih Juara Lomba Tingkat Kabupaten",
      category: "Prestasi",
      date: "20 Agustus 2026",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80",
      summary: "Karya inovatif multimedia dan desain grafis siswa berhasil memboyong Juara 1 pada LKS Tingkat Kabupaten.",
      content: "Prestasi membanggakan kembali ditorehkan oleh siswa SMK Wihdatul Ummah. Pada ajang Lomba Keterampilan Siswa (LKS) tingkat Kabupaten yang berlangsung pekan lalu, perwakilan sekolah berhasil menyabet Juara 1 untuk cabang Graphic Design Technology dan Juara 2 untuk Web Technologies.\n\nTorehan ini membuktikan kualitas kurikulum upskilling yang diterapkan di SMK Wihdatul Ummah terbukti unggul dan kompetitif."
    },
    {
      id: "news-3",
      title: "Kegiatan P5: Projek Penguatan Profil Pelajar Pancasila",
      category: "Kegiatan",
      date: "15 Agustus 2026",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80",
      summary: "Pameran hasil karya P5 mengusung tema Kearifan Lokal dan Rekayasa Teknologi Ramah Lingkungan.",
      content: "Dalam rangka implementasi Kurikulum Merdeka, SMK Wihdatul Ummah menggelar Gelar Karya Projek Penguatan Profil Pelajar Pancasila (P5). Seluruh siswa memamerkan karya inovasi kreatif ramah lingkungan."
    },
    {
      id: "news-4",
      title: "Semarak Lomba 17 Agustus di SMK Wihlatul Ummah",
      category: "Kesiswaan",
      date: "10 Agustus 2026",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80",
      summary: "Keceriaan dan semangat kemerdekaan dirayakan dengan berbagai lomba kreatif antar kelas.",
      content: "Menyambut HUT Republik Indonesia, OSIS SMK Wihdatul Ummah menggelar berbagai perlombaan kreatif menarik antar kelas."
    }
  ],
  fasilitas: [
    { id: 1, name: "Lab. Komputer", icon: "laptop", desc: "Spesifikasi PC modern untuk web design, programming, dan rendering video." },
    { id: 2, name: "Masjid", icon: "moon", desc: "Pusat ibadah, pembinaan akhlak, dan kajian tahfidz Al-Qur'an santri." },
    { id: 3, name: "Ruang Kelas Ber-AC", icon: "wind", desc: "Ruang kelas sejuk, bersih, dan dilengkapi proyektor multimedia modern." },
    { id: 4, name: "Akses Internet (WiFi)", icon: "wifi", desc: "Jaringan internet berkecepatan tinggi di seluruh area sekolah & asrama." },
    { id: 5, name: "Lapangan Olahraga", icon: "dribbble", desc: "Fasilitas olahraga futsal, basket, bulu tangkis, dan senam santri." },
    { id: 6, name: "Tempat Parkir Luas", icon: "parking", desc: "Area parkir kendaraan tertata rapi, beratap, dan ber-CCTV 24 jam." },
    { id: 7, name: "Ruang Studio", icon: "camera", desc: "Studio rekaman audio visual, podcast, green screen, dan fotografi." },
    { id: 8, name: "Proyektor", icon: "tv", desc: "Perangkat proyektor interaktif di setiap ruang teori dan workshop kejuruan." }
  ]
};

// Icons mapping helper (Lucide / Feather SVG)
const ICONS = {
  check: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  star: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
  trophy: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>`,
  users: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
  award: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`,
  laptop: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="12" x="3" y="4" rx="2"></rect><line x1="2" x2="22" y1="20" y2="20"></line></svg>`,
  moon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>`,
  wind: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path><path d="M9.6 4.6A2 2 0 1 1 11 8H2"></path><path d="M12.6 19.4A2 2 0 1 0 14 16H2"></path></svg>`,
  wifi: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h.01"></path><path d="M2 8.82a15 15 0 0 1 20 0"></path><path d="M5 12.859a10 10 0 0 1 14 0"></path><path d="M8.5 16.429a5 5 0 0 1 7 0"></path></svg>`,
  dribbble: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"></path><path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"></path><path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"></path></svg>`,
  parking: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M9 17V7h4a3 3 0 0 1 0 6H9"></path></svg>`,
  camera: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>`,
  tv: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="15" x="2" y="7" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>`,
  calendar: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>`
};

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

async function initApp() {
  await loadData();
  setupSearch();
  setupPPDBForm();
  setupStatusCheck();
}

async function loadData() {
  try {
    const res = await fetch('/api/data');
    if (!res.ok) throw new Error('Network response was not ok');
    siteData = await res.json();
  } catch (err) {
    console.warn('Backend API tidak tersambung, menggunakan data default lokal:', err);
    siteData = JSON.parse(JSON.stringify(DEFAULT_SITE_DATA));
  }
  renderContent(siteData);
}

function renderContent(data) {
  if (!data) return;

  const { settings, upskilling, ekstrakurikuler, programSekolah, news, fasilitas } = data;

  // Header & Brand
  if (settings) {
    const brandSubs = document.querySelectorAll('.school-sub-text');
    brandSubs.forEach(el => el.textContent = settings.schoolSub || 'SEKOLAH MENENGAH KEJURUAN');

    const brandNames = document.querySelectorAll('.school-name-text');
    brandNames.forEach(el => el.textContent = settings.schoolName || 'SMK WIHDATUL UMMAH');

    const brandAddresses = document.querySelectorAll('.school-address-text');
    brandAddresses.forEach(el => el.textContent = settings.address || '');

    // Hero Section
    const heroTitle = document.getElementById('heroTitle');
    if (heroTitle) heroTitle.textContent = settings.heroTitle || 'SMK WIHDATUL UMMAH';

    const heroSubtitle = document.getElementById('heroSubtitle');
    if (heroSubtitle) heroSubtitle.textContent = settings.heroSubtitle || settings.tagline || '';

    const heroBadge = document.getElementById('heroBadge');
    if (heroBadge) heroBadge.textContent = settings.heroBadge || 'Selamat Datang di';

    const heroSlogan = document.getElementById('heroSlogan');
    if (heroSlogan) heroSlogan.innerHTML = `<span>Saatnya</span> Bergabung Jadi Bagian dari Sekolah Hebat!`;

    const heroImg = document.getElementById('heroImg');
    if (heroImg && settings.heroImage) {
      heroImg.src = settings.heroImage;
    }

    // Footer Phone & Social
    const phoneSaraEl = document.getElementById('phoneSara');
    if (phoneSaraEl) phoneSaraEl.textContent = `${settings.phoneSara || '0895 3599 5604'} : Bu Sara`;

    const phoneAnaEl = document.getElementById('phoneAna');
    if (phoneAnaEl) phoneAnaEl.textContent = `${settings.phoneAna || '0813 3604 3338'} : Bu Ana`;

    const fbEl = document.getElementById('fbName');
    if (fbEl) fbEl.textContent = settings.facebook || 'ponpes wihdatulummah';

    const igEl = document.getElementById('igName');
    if (igEl) igEl.textContent = settings.instagram || 'smkponpes_wihdatulummah';

    // Google Form embed if present
    const gformIframe = document.getElementById('googleFormIframe');
    if (gformIframe && settings.googleFormEmbedUrl) {
      gformIframe.src = settings.googleFormEmbedUrl;
    }
    const gformDirectLink = document.getElementById('gformDirectLink');
    if (gformDirectLink && (settings.googleFormPublicUrl || settings.googleFormEmbedUrl)) {
      gformDirectLink.href = settings.googleFormPublicUrl || settings.googleFormEmbedUrl.replace('?embedded=true', '');
    }
  }

  // Program Keahlian (Upskilling)
  const upskillingContainer = document.getElementById('upskillingList');
  if (upskillingContainer && upskilling) {
    upskillingContainer.innerHTML = upskilling.map(skill => `
      <div class="check-item">
        <span class="check-icon">${ICONS.check}</span>
        <span>${skill}</span>
      </div>
    `).join('');
  }

  // Ekstrakurikuler
  const ekskulContainer = document.getElementById('ekskulList');
  if (ekskulContainer && ekstrakurikuler) {
    ekskulContainer.innerHTML = ekstrakurikuler.map(item => `
      <div class="check-item">
        <span class="check-icon">${ICONS.check}</span>
        <span>${item}</span>
      </div>
    `).join('');
  }

  // Program Sekolah (4 cards)
  const progContainer = document.getElementById('programSekolahList');
  if (progContainer && programSekolah) {
    progContainer.innerHTML = programSekolah.map(p => `
      <div class="program-card" onclick="openProgramModal(${p.id})">
        <div class="program-img-wrapper">
          <img src="${p.image}" alt="${p.title}" loading="lazy" onerror="this.src='/images/banner-reference.jpg'">
          <div class="program-badge-icon">
            ${ICONS[p.icon] || ICONS.star}
          </div>
        </div>
        <div class="program-card-body">
          <h4>${p.title}</h4>
        </div>
      </div>
    `).join('');
  }

  // Berita Terbaru (4 items)
  const newsContainer = document.getElementById('newsList');
  if (newsContainer && news) {
    const topNews = news.slice(0, 4);
    newsContainer.innerHTML = topNews.map(n => `
      <div class="news-item" onclick="openNewsModal('${n.id}')">
        <img src="${n.image}" alt="${n.title}" class="news-thumb" onerror="this.src='/images/banner-reference.jpg'">
        <div class="news-item-content">
          <h4 class="news-item-title">${n.title}</h4>
          <div class="news-item-meta">
            ${ICONS.calendar}
            <span>${n.date}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Fasilitas Sekolah
  const fasContainer = document.getElementById('fasilitasItems');
  if (fasContainer && fasilitas) {
    fasContainer.innerHTML = fasilitas.map(f => `
      <div class="fasilitas-single-item" title="${f.desc || f.name}">
        <div class="fasilitas-item-icon">
          ${ICONS[f.icon] || ICONS.laptop}
        </div>
        <span>${f.name}</span>
      </div>
    `).join('');
  }
}

// Search Feature
function setupSearch() {
  const searchInput = document.getElementById('globalSearchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) return;

    // Search in news, upskilling, and fasilitas
    if (e.key === 'Enter' || query.length >= 3) {
      const matchNews = (siteData.news || []).find(n => n.title.toLowerCase().includes(query) || n.content.toLowerCase().includes(query));
      if (matchNews) {
        openNewsModal(matchNews.id);
        searchInput.value = '';
        return;
      }

      const matchFas = (siteData.fasilitas || []).find(f => f.name.toLowerCase().includes(query));
      if (matchFas) {
        alert(`Fasilitas Ditemukan: ${matchFas.name}\n${matchFas.desc}`);
        return;
      }
    }
  });
}

// News Modal
window.openNewsModal = function(id) {
  if (!siteData || !siteData.news) return;
  const article = siteData.news.find(n => n.id === id);
  if (!article) return;

  const modal = document.getElementById('newsDetailModal');
  const modalContent = document.getElementById('newsDetailContent');
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div style="margin-bottom: 16px;">
      <span style="background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 700;">${article.category}</span>
      <span style="color: #6b7280; font-size: 12px; margin-left: 8px;">${article.date}</span>
    </div>
    <h2 style="font-size: 22px; font-weight: 800; color: #111827; margin-bottom: 16px; line-height: 1.3;">${article.title}</h2>
    <img src="${article.image}" style="width: 100%; max-height: 380px; object-fit: cover; border-radius: 12px; margin-bottom: 18px;" onerror="this.src='/images/banner-reference.jpg'">
    <div style="font-size: 14px; line-height: 1.8; color: #374151; white-space: pre-line;">
      ${article.content}
    </div>
  `;

  modal.classList.add('active');
};

// All News Modal
window.openAllNewsModal = function() {
  if (!siteData || !siteData.news) return;
  const modal = document.getElementById('allNewsModal');
  const container = document.getElementById('allNewsListContainer');
  if (!modal || !container) return;

  container.innerHTML = siteData.news.map(n => `
    <div class="news-item" style="padding: 12px;" onclick="closeModal('allNewsModal'); openNewsModal('${n.id}')">
      <img src="${n.image}" alt="${n.title}" class="news-thumb" style="width: 90px; height: 65px;" onerror="this.src='/images/banner-reference.jpg'">
      <div class="news-item-content">
        <span style="font-size: 10px; font-weight: 700; color: #0a5c36;">${n.category}</span>
        <h4 class="news-item-title" style="font-size: 13px;">${n.title}</h4>
        <p style="font-size: 11px; color: #6b7280; margin: 4px 0;">${n.summary}</p>
        <div class="news-item-meta">${ICONS.calendar} <span>${n.date}</span></div>
      </div>
    </div>
  `).join('');

  modal.classList.add('active');
};

// Program Sekolah Modal
window.openProgramModal = function(id) {
  if (!siteData || !siteData.programSekolah) return;
  const p = siteData.programSekolah.find(item => item.id === id);
  if (!p) return;

  const modal = document.getElementById('programDetailModal');
  const content = document.getElementById('programDetailContent');
  if (!modal || !content) return;

  content.innerHTML = `
    <img src="${p.image}" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 12px; margin-bottom: 16px;" onerror="this.src='/images/banner-reference.jpg'">
    <h3 style="font-size: 20px; font-weight: 800; color: #0a5c36; margin-bottom: 10px;">${p.title}</h3>
    <p style="font-size: 14px; line-height: 1.7; color: #374151;">${p.desc}</p>
    <div style="margin-top: 20px; padding: 12px 16px; background: #ecfdf5; border-radius: 8px; border-left: 4px solid #0a5c36;">
      <p style="font-size: 13px; font-weight: 600; color: #065f46;">Ingin bergabung melalui program ini? Segera daftarkan diri Anda di menu PPDB Online!</p>
    </div>
  `;

  modal.classList.add('active');
};

// Profile Modal (Visi, Misi, Sambutan)
window.openProfileModal = function() {
  if (!siteData || !siteData.profile) return;
  const prof = siteData.profile;
  const modal = document.getElementById('profileModal');
  const content = document.getElementById('profileContent');
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="display: flex; gap: 24px; align-items: flex-start; margin-bottom: 24px; flex-wrap: wrap;">
      <img src="${prof.fotoKepala}" style="width: 140px; height: 180px; object-fit: cover; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.15);" onerror="this.src='/images/banner-reference.jpg'">
      <div style="flex: 1; min-width: 250px;">
        <h3 style="font-size: 18px; font-weight: 800; color: #0a5c36; margin-bottom: 4px;">Sambutan Kepala Sekolah</h3>
        <h4 style="font-size: 14px; font-weight: 700; color: #1f2937;">${prof.namaKepala}</h4>
        <p style="font-size: 12px; color: #6b7280; margin-bottom: 12px;">NIP. ${prof.nipKepala || '-'}</p>
        <div style="font-size: 13px; line-height: 1.7; color: #4b5563; white-space: pre-line;">${prof.sambutanKepala}</div>
      </div>
    </div>
    
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
    
    <div style="margin-bottom: 20px;">
      <h3 style="font-size: 16px; font-weight: 800; color: #0a5c36; margin-bottom: 8px;">VISI SEKOLAH</h3>
      <p style="font-size: 13.5px; font-style: italic; background: #f0fdf4; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #10b981; color: #065f46; font-weight: 600;">
        "${prof.visi}"
      </p>
    </div>

    <div>
      <h3 style="font-size: 16px; font-weight: 800; color: #0a5c36; margin-bottom: 10px;">MISI SEKOLAH</h3>
      <ul style="padding-left: 20px; font-size: 13px; line-height: 1.8; color: #374151;">
        ${(prof.misi || []).map(m => `<li>${m}</li>`).join('')}
      </ul>
    </div>
  `;

  modal.classList.add('active');
};

// PPDB Modal
window.openPPDBModal = function(defaultTab = 'form') {
  const modal = document.getElementById('ppdbModal');
  if (modal) {
    modal.classList.add('active');
    switchPPDBTab(defaultTab);
  }
};

window.switchPPDBTab = function(tabName) {
  document.querySelectorAll('.ppdb-tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.ppdb-tab-pane').forEach(p => p.style.display = 'none');

  const activeBtn = document.getElementById(`tabBtn_${tabName}`);
  const activePane = document.getElementById(`tabPane_${tabName}`);
  if (activeBtn) activeBtn.classList.add('active');
  if (activePane) activePane.style.display = 'block';
};

// PPDB Form Submission
function setupPPDBForm() {
  const form = document.getElementById('ppdbInternalForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Mengirim data pendaftaran...';
    btn.disabled = true;

    const payload = {
      fullName: form.fullName.value,
      nisn: form.nisn.value,
      gender: form.gender.value,
      birthPlace: form.birthPlace.value,
      birthDate: form.birthDate.value,
      originSchool: form.originSchool.value,
      majorChoice: form.majorChoice.value,
      parentName: form.parentName.value,
      phone: form.phone.value,
      address: form.address.value,
      pathway: form.pathway.value
    };

    try {
      const res = await fetch('/api/ppdb/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Gagal mengirim pendaftaran');
      }

      // Show success modal / slip
      showRegistrationSuccess(result.data);
      form.reset();
    } catch (err) {
      alert('Perhatian: ' + err.message);
    } finally {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  });
}

function showRegistrationSuccess(reg) {
  const modal = document.getElementById('ppdbModal');
  if (modal) modal.classList.remove('active');

  const slipModal = document.getElementById('regSlipModal');
  const slipContent = document.getElementById('regSlipContent');
  if (!slipModal || !slipContent) return;

  slipContent.innerHTML = `
    <div style="text-align: center; margin-bottom: 16px;">
      <div style="width: 50px; height: 50px; border-radius: 50%; background: #dcfce7; color: #15803d; display: inline-flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 8px;">✓</div>
      <h3 style="font-size: 18px; font-weight: 800; color: #0a5c36;">Pendaftaran Berhasil Terkirim!</h3>
      <p style="font-size: 12px; color: #6b7280;">Simpan nomor pendaftaran ini untuk keperluan verifikasi dan cek kelulusan.</p>
    </div>

    <div style="background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 12px; padding: 16px; margin-bottom: 16px;">
      <div style="text-align: center; margin-bottom: 12px;">
        <span style="font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700;">Nomor Pendaftaran</span>
        <div style="font-size: 22px; font-weight: 800; color: #0a5c36; letter-spacing: 1px;">${reg.registrationNo}</div>
      </div>
      <div style="font-size: 12.5px; line-height: 1.8; color: #334155;">
        <div><strong>Nama Lengkap:</strong> ${reg.fullName}</div>
        <div><strong>NISN:</strong> ${reg.nisn}</div>
        <div><strong>Pilihan Jurusan:</strong> ${reg.majorChoice}</div>
        <div><strong>Asal Sekolah:</strong> ${reg.originSchool}</div>
        <div><strong>Jalur:</strong> ${reg.pathway}</div>
        <div><strong>Status:</strong> <span class="status-badge menunggu">${reg.status}</span></div>
      </div>
    </div>

    <div style="display: flex; gap: 10px;">
      <button onclick="window.print()" style="flex: 1; padding: 10px; background: #0a5c36; color: #fff; border: none; border-radius: 6px; font-weight: 700; cursor: pointer;">Cetak Kartu Bukti</button>
      <button onclick="closeModal('regSlipModal')" style="flex: 1; padding: 10px; background: #e2e8f0; color: #334155; border: none; border-radius: 6px; font-weight: 700; cursor: pointer;">Tutup</button>
    </div>
  `;

  slipModal.classList.add('active');
}

// Check status by NISN or Reg No
function setupStatusCheck() {
  const form = document.getElementById('checkStatusForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = form.queryInput.value.trim();
    if (!query) return;

    const resultBox = document.getElementById('statusCheckResult');
    resultBox.innerHTML = '<p style="color: #6b7280; font-size: 13px;">Sedang mencari data pendaftaran...</p>';

    try {
      const res = await fetch(`/api/ppdb/check/${encodeURIComponent(query)}`);
      const data = await res.json();

      if (!res.ok) {
        resultBox.innerHTML = `<div style="background: #fee2e2; color: #991b1b; padding: 12px; border-radius: 8px; font-size: 13px; font-weight: 600;">${data.error || 'Data tidak ditemukan'}</div>`;
        return;
      }

      const r = data.data;
      let badgeClass = 'menunggu';
      if (r.status === 'Diterima') badgeClass = 'diterima';
      if (r.status === 'Perlu Lengkapi Berkas') badgeClass = 'perbaikan';

      resultBox.innerHTML = `
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <strong style="color: #0a5c36; font-size: 15px;">${r.registrationNo}</strong>
            <span class="status-badge ${badgeClass}">${r.status}</span>
          </div>
          <p style="font-size: 14px; font-weight: 700; color: #1e293b; margin-bottom: 4px;">${r.fullName}</p>
          <p style="font-size: 12px; color: #64748b; margin-bottom: 8px;">NISN: ${r.nisn} | Asal: ${r.originSchool}</p>
          <div style="font-size: 12px; color: #334155; line-height: 1.6; background: #f8fafc; padding: 10px; border-radius: 6px;">
            <div><strong>Jurusan:</strong> ${r.majorChoice}</div>
            <div><strong>Jalur:</strong> ${r.pathway}</div>
            <div><strong>Catatan Panitia:</strong> ${r.notes || '-'}</div>
          </div>
        </div>
      `;
    } catch (err) {
      resultBox.innerHTML = `<div style="color: #dc2626; font-size: 13px;">Gagal memuat status: ${err.message}</div>`;
    }
  });
}

// Modal helper
window.closeModal = function(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
};

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});
