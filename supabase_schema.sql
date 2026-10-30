-- ====================================================
-- SKEMA DATABASE SUPABASE UNTUK SMK WIHDATUL UMMAH
-- Salin seluruh isi file ini, pastikan TIDAK ADA teks yang ter-blok/highlight,
-- lalu klik RUN di Supabase SQL Editor.
-- ====================================================

-- Pastikan schema aktif mengarah ke public & storage
SET search_path TO public, storage;

-- ====================================================
-- 1. TABEL REGISTRASI PENDAFTAR PPDB ONLINE
-- ====================================================
CREATE TABLE IF NOT EXISTS public.ppdb_registrations (
  id TEXT PRIMARY KEY,
  registration_no TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  nisn TEXT UNIQUE NOT NULL,
  gender TEXT DEFAULT 'Laki-laki',
  birth_place TEXT DEFAULT '',
  birth_date TEXT DEFAULT '',
  origin_school TEXT NOT NULL,
  major_choice TEXT NOT NULL,
  parent_name TEXT DEFAULT '',
  phone TEXT NOT NULL,
  address TEXT DEFAULT '',
  pathway TEXT DEFAULT 'Reguler',
  status TEXT DEFAULT 'Menunggu Verifikasi',
  notes TEXT DEFAULT 'Pendaftaran mandiri melalui website. Mohon simpan bukti nomor pendaftaran ini.',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pencarian cepat untuk NISN dan Nomor Registrasi
CREATE INDEX IF NOT EXISTS idx_ppdb_nisn ON public.ppdb_registrations(nisn);
CREATE INDEX IF NOT EXISTS idx_ppdb_reg_no ON public.ppdb_registrations(registration_no);

-- Hak akses RLS
ALTER TABLE public.ppdb_registrations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Akses Penuh Registrasi" ON public.ppdb_registrations;
CREATE POLICY "Akses Penuh Registrasi" ON public.ppdb_registrations FOR ALL USING (true) WITH CHECK (true);


-- ====================================================
-- 2. TABEL BERITA & PENGUMUMAN SEKOLAH
-- ====================================================
CREATE TABLE IF NOT EXISTS public.news (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT DEFAULT 'Berita',
  date TEXT,
  image TEXT DEFAULT '/images/banner-reference.jpg',
  summary TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hak akses RLS
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Akses Penuh Berita" ON public.news;
CREATE POLICY "Akses Penuh Berita" ON public.news FOR ALL USING (true) WITH CHECK (true);


-- ====================================================
-- 3. TABEL FASILITAS SEKOLAH
-- ====================================================
CREATE TABLE IF NOT EXISTS public.fasilitas (
  id BIGINT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT DEFAULT 'building',
  "desc" TEXT DEFAULT ''
);

-- Hak akses RLS
ALTER TABLE public.fasilitas ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Akses Penuh Fasilitas" ON public.fasilitas;
CREATE POLICY "Akses Penuh Fasilitas" ON public.fasilitas FOR ALL USING (true) WITH CHECK (true);


-- ====================================================
-- 4. TABEL PROGRAM SEKOLAH (KARTU PROGRAM)
-- ====================================================
CREATE TABLE IF NOT EXISTS public.program_sekolah (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  image TEXT,
  icon TEXT DEFAULT 'star',
  "desc" TEXT DEFAULT ''
);

-- Hak akses RLS
ALTER TABLE public.program_sekolah ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Akses Penuh Program Sekolah" ON public.program_sekolah;
CREATE POLICY "Akses Penuh Program Sekolah" ON public.program_sekolah FOR ALL USING (true) WITH CHECK (true);


-- ====================================================
-- 5. TABEL KONFIGURASI WEB (SITE DATA)
-- ====================================================
CREATE TABLE IF NOT EXISTS public.site_data (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hak akses RLS
ALTER TABLE public.site_data ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Akses Penuh Site Data" ON public.site_data;
CREATE POLICY "Akses Penuh Site Data" ON public.site_data FOR ALL USING (true) WITH CHECK (true);


-- ====================================================
-- 6. STORAGE BUCKET UNTUK FILE UPLOAD
-- ====================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Kebijakan Akses Storage
DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
CREATE POLICY "Public Read Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'uploads');

DROP POLICY IF EXISTS "Public Upload Access" ON storage.objects;
CREATE POLICY "Public Upload Access" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'uploads');

DROP POLICY IF EXISTS "Public Update Access" ON storage.objects;
CREATE POLICY "Public Update Access" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'uploads');

DROP POLICY IF EXISTS "Public Delete Access" ON storage.objects;
CREATE POLICY "Public Delete Access" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'uploads');
