const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

let supabase = null;
let isConfigured = false;

if (supabaseUrl && supabaseKey && supabaseUrl.trim() !== '' && supabaseKey.trim() !== '') {
  try {
    supabase = createClient(supabaseUrl.trim(), supabaseKey.trim());
    isConfigured = true;
    console.log('⚡ Koneksi Supabase terdeteksi dan diaktifkan.');
  } catch (err) {
    console.error('❌ Gagal inisialisasi Supabase client:', err.message);
    isConfigured = false;
  }
} else {
  console.log('ℹ️ SUPABASE_URL belum disetel di .env -> Menggunakan penyimpanan lokal (data/db.json).');
}

// Mapper Objek Registrasi Database <-> Frontend
function mapRegFromDb(r) {
  if (!r) return null;
  return {
    id: r.id,
    registrationNo: r.registration_no,
    fullName: r.full_name,
    nisn: r.nisn,
    gender: r.gender,
    birthPlace: r.birth_place,
    birthDate: r.birth_date,
    originSchool: r.origin_school,
    majorChoice: r.major_choice,
    parentName: r.parent_name,
    phone: r.phone,
    address: r.address,
    pathway: r.pathway,
    status: r.status,
    notes: r.notes,
    createdAt: r.created_at
  };
}

function mapRegToDb(r) {
  const obj = {};
  if (r.id !== undefined) obj.id = r.id;
  if (r.registrationNo !== undefined) obj.registration_no = r.registrationNo;
  if (r.fullName !== undefined) obj.full_name = r.fullName;
  if (r.nisn !== undefined) obj.nisn = r.nisn;
  if (r.gender !== undefined) obj.gender = r.gender;
  if (r.birthPlace !== undefined) obj.birth_place = r.birthPlace;
  if (r.birthDate !== undefined) obj.birth_date = r.birthDate;
  if (r.originSchool !== undefined) obj.origin_school = r.originSchool;
  if (r.majorChoice !== undefined) obj.major_choice = r.majorChoice;
  if (r.parentName !== undefined) obj.parent_name = r.parentName;
  if (r.phone !== undefined) obj.phone = r.phone;
  if (r.address !== undefined) obj.address = r.address;
  if (r.pathway !== undefined) obj.pathway = r.pathway;
  if (r.status !== undefined) obj.status = r.status;
  if (r.notes !== undefined) obj.notes = r.notes;
  if (r.createdAt !== undefined) obj.created_at = r.createdAt;
  return obj;
}

module.exports = {
  isSupabaseEnabled: () => isConfigured && !!supabase,

  getClient: () => supabase,

  // Mengambil seluruh data situs dari Supabase
  async fetchFullData(fallbackDb) {
    if (!isConfigured) return fallbackDb;

    try {
      const [
        siteDataRes,
        regsRes,
        newsRes,
        fasilitasRes,
        progRes
      ] = await Promise.all([
        supabase.from('site_data').select('*'),
        supabase.from('ppdb_registrations').select('*').order('created_at', { ascending: false }),
        supabase.from('news').select('*').order('created_at', { ascending: false }),
        supabase.from('fasilitas').select('*').order('id', { ascending: true }),
        supabase.from('program_sekolah').select('*').order('id', { ascending: true })
      ]);

      const result = { ...fallbackDb };

      // Map site_data (settings, profile, upskilling, ekskul, adminUser)
      if (siteDataRes.data) {
        siteDataRes.data.forEach(item => {
          if (item.key === 'settings') result.settings = { ...fallbackDb.settings, ...item.value };
          if (item.key === 'profile') result.profile = { ...fallbackDb.profile, ...item.value };
          if (item.key === 'upskilling') result.upskilling = item.value;
          if (item.key === 'ekstrakurikuler') result.ekstrakurikuler = item.value;
          if (item.key === 'admin_user') result.adminUser = item.value;
        });
      }

      if (regsRes.data) {
        result.registrations = regsRes.data.map(mapRegFromDb);
      }
      if (newsRes.data) {
        result.news = newsRes.data;
      }
      if (fasilitasRes.data) {
        result.fasilitas = fasilitasRes.data;
      }
      if (progRes.data) {
        result.programSekolah = progRes.data;
      }

      return result;
    } catch (err) {
      console.error('Error saat mengambil data dari Supabase:', err.message);
      return fallbackDb;
    }
  },

  // Simpan / update site_data key
  async saveSiteData(key, value) {
    if (!isConfigured) return false;
    const { error } = await supabase
      .from('site_data')
      .upsert({ key, value, updated_at: new Date().toISOString() });
    if (error) console.error(`Error saving site_data [${key}]:`, error.message);
    return !error;
  },

  // PPDB Registrations
  async addRegistration(reg) {
    if (!isConfigured) return null;
    const dbPayload = mapRegToDb(reg);
    const { data, error } = await supabase.from('ppdb_registrations').insert(dbPayload).select().single();
    if (error) throw error;
    return mapRegFromDb(data);
  },

  async upsertRegistration(reg) {
    if (!isConfigured) return null;
    const dbPayload = mapRegToDb(reg);
    const { data, error } = await supabase.from('ppdb_registrations').upsert(dbPayload).select().single();
    if (error) throw error;
    return mapRegFromDb(data);
  },

  async updateRegistration(id, updates) {
    if (!isConfigured) return null;
    const dbPayload = mapRegToDb(updates);
    delete dbPayload.id; // Jangan timpa primary key
    const { data, error } = await supabase.from('ppdb_registrations').update(dbPayload).eq('id', id).select().single();
    if (error) throw error;
    return mapRegFromDb(data);
  },

  async deleteRegistration(id) {
    if (!isConfigured) return false;
    const { error } = await supabase.from('ppdb_registrations').delete().eq('id', id);
    if (error) throw error;
    return true;
  },

  // News CRUD
  async addNews(newsItem) {
    if (!isConfigured) return null;
    const { data, error } = await supabase.from('news').insert(newsItem).select().single();
    if (error) throw error;
    return data;
  },

  async updateNews(id, updates) {
    if (!isConfigured) return null;
    const { data, error } = await supabase.from('news').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  async deleteNews(id) {
    if (!isConfigured) return false;
    const { error } = await supabase.from('news').delete().eq('id', id);
    if (error) throw error;
    return true;
  },

  // Fasilitas CRUD
  async addFasilitas(fas) {
    if (!isConfigured) return null;
    const { data, error } = await supabase.from('fasilitas').insert(fas).select().single();
    if (error) throw error;
    return data;
  },

  async updateFasilitas(id, updates) {
    if (!isConfigured) return null;
    const { data, error } = await supabase.from('fasilitas').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  async deleteFasilitas(id) {
    if (!isConfigured) return false;
    const { error } = await supabase.from('fasilitas').delete().eq('id', id);
    if (error) throw error;
    return true;
  },

  // Program Sekolah CRUD
  async addProgramSekolah(prog) {
    if (!isConfigured) return null;
    const { data, error } = await supabase.from('program_sekolah').insert(prog).select().single();
    if (error) throw error;
    return data;
  },

  async updateProgramSekolah(id, updates) {
    if (!isConfigured) return null;
    const { data, error } = await supabase.from('program_sekolah').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  async deleteProgramSekolah(id) {
    if (!isConfigured) return false;
    const { error } = await supabase.from('program_sekolah').delete().eq('id', id);
    if (error) throw error;
    return true;
  },

  // Upload ke Supabase Storage Bucket 'uploads'
  async uploadFileToStorage(fileBuffer, fileName, mimeType) {
    if (!isConfigured) return null;
    try {
      const filePath = `images/${fileName}`;
      const { data, error } = await supabase.storage.from('uploads').upload(filePath, fileBuffer, {
        contentType: mimeType,
        upsert: true
      });
      if (error) {
        console.error('Supabase Storage upload error:', error.message);
        return null;
      }
      const { data: publicUrlData } = supabase.storage.from('uploads').getPublicUrl(filePath);
      return publicUrlData ? publicUrlData.publicUrl : null;
    } catch (err) {
      console.error('Error saat upload ke Supabase Storage:', err.message);
      return null;
    }
  }
};
