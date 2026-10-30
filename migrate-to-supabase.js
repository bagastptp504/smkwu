const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config();
const fs = require('fs');
const supabaseService = require('./supabase-client');

async function migrate() {
  console.log('==============================================');
  console.log('🚀 MIGRASI DATA LOKAL KE DATABASE SUPABASE');
  console.log('==============================================');

  if (!supabaseService.isSupabaseEnabled()) {
    console.error('❌ Gagal: SUPABASE_URL atau SUPABASE_KEY belum diisi di file .env!');
    console.log('Silakan buka file .env, isi kredensial Supabase Anda, lalu coba lagi.');
    process.exit(1);
  }

  const dbPath = path.join(__dirname, 'data', 'db.json');
  if (!fs.existsSync(dbPath)) {
    console.error('❌ File data/db.json tidak ditemukan.');
    process.exit(1);
  }

  const raw = fs.readFileSync(dbPath, 'utf8');
  const db = JSON.parse(raw);
  const supabase = supabaseService.getClient();

  console.log('1. Memigrasikan Pengaturan & Profil (site_data)...');
  await supabaseService.saveSiteData('settings', db.settings || {});
  await supabaseService.saveSiteData('profile', db.profile || {});
  await supabaseService.saveSiteData('upskilling', db.upskilling || []);
  await supabaseService.saveSiteData('ekstrakurikuler', db.ekstrakurikuler || []);
  await supabaseService.saveSiteData('admin_user', db.adminUser || { username: 'admin', password: 'admin123' });
  console.log('   ✅ site_data berhasil disimpan.');

  if (Array.isArray(db.fasilitas) && db.fasilitas.length > 0) {
    console.log(`2. Memigrasikan ${db.fasilitas.length} Data Fasilitas...`);
    const { error } = await supabase.from('fasilitas').upsert(db.fasilitas);
    if (error) console.error('   ❌ Error fasilitas:', error.message);
    else console.log('   ✅ Fasilitas berhasil disimpan.');
  }

  if (Array.isArray(db.programSekolah) && db.programSekolah.length > 0) {
    console.log(`3. Memigrasikan ${db.programSekolah.length} Kartu Program Sekolah...`);
    const { error } = await supabase.from('program_sekolah').upsert(db.programSekolah);
    if (error) console.error('   ❌ Error program_sekolah:', error.message);
    else console.log('   ✅ Program sekolah berhasil disimpan.');
  }

  if (Array.isArray(db.news) && db.news.length > 0) {
    console.log(`4. Memigrasikan ${db.news.length} Artikel Berita...`);
    const { error } = await supabase.from('news').upsert(db.news);
    if (error) console.error('   ❌ Error news:', error.message);
    else console.log('   ✅ Berita berhasil disimpan.');
  }

  if (Array.isArray(db.registrations) && db.registrations.length > 0) {
    console.log(`5. Memigrasikan ${db.registrations.length} Data Pendaftar PPDB...`);
    for (const reg of db.registrations) {
      try {
        await supabaseService.upsertRegistration(reg);
      } catch (err) {
        console.warn(`   ⚠️ Gagal memigrasikan ${reg.nisn}:`, err.message);
      }
    }
    console.log('   ✅ Selesai memigrasikan pendaftar PPDB.');
  }

  // 6. Migrasi file media lokal di public/uploads ke Supabase Storage (opsional)
  const uploadsDir = path.join(__dirname, 'public', 'uploads');
  if (fs.existsSync(uploadsDir)) {
    const files = fs.readdirSync(uploadsDir).filter(f => !f.startsWith('.'));
    if (files.length > 0) {
      console.log(`6. Memigrasikan ${files.length} file dari public/uploads ke Supabase Storage...`);
      for (const file of files) {
        try {
          const filePath = path.join(uploadsDir, file);
          const stat = fs.statSync(filePath);
          if (stat.isFile()) {
            const buffer = fs.readFileSync(filePath);
            const ext = path.extname(file).toLowerCase();
            let mimeType = 'image/jpeg';
            if (ext === '.png') mimeType = 'image/png';
            if (ext === '.svg') mimeType = 'image/svg+xml';
            if (ext === '.webp') mimeType = 'image/webp';
            await supabaseService.uploadFileToStorage(buffer, file, mimeType);
            console.log(`   ✅ File ${file} terunggah ke bucket 'uploads'.`);
          }
        } catch (uploadErr) {
          console.warn(`   ⚠️ File ${file} dilewati:`, uploadErr.message);
        }
      }
    }
  }

  console.log('==============================================');
  console.log('🎉 SELURUH DATA BERHASIL DIMIGRASIKAN KE SUPABASE!');
  console.log('==============================================');
  process.exit(0);
}

migrate().catch(err => {
  console.error('Terjadi kesalahan migrasi:', err);
  process.exit(1);
});
