-- ==============================================================================
-- MEHEDI HASAN PORTFOLIO — SUPABASE DATABASE & STORAGE INITIALIZATION
-- ==============================================================================
-- Run this script in the Supabase Dashboard: SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. Create travel_locations table
CREATE TABLE IF NOT EXISTS public.travel_locations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  district TEXT,
  division TEXT,
  country TEXT DEFAULT 'Bangladesh',
  latitude NUMERIC NOT NULL,
  longitude NUMERIC NOT NULL,
  cover_image TEXT,
  description TEXT,
  quote TEXT,
  favourite_moment TEXT,
  visited_date TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create travel_photos table
CREATE TABLE IF NOT EXISTS public.travel_photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  location_id TEXT REFERENCES public.travel_locations(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  caption TEXT,
  taken_at TEXT,
  aspect_ratio TEXT DEFAULT 'landscape',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.travel_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.travel_photos ENABLE ROW LEVEL SECURITY;

-- 4. Policies for travel_locations
DROP POLICY IF EXISTS "Public can view travel locations" ON public.travel_locations;
CREATE POLICY "Public can view travel locations" ON public.travel_locations
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow anon insert/upsert on travel locations" ON public.travel_locations;
CREATE POLICY "Allow anon insert/upsert on travel locations" ON public.travel_locations
  FOR ALL USING (true) WITH CHECK (true);

-- 5. Policies for travel_photos
DROP POLICY IF EXISTS "Public can view travel photos" ON public.travel_photos;
CREATE POLICY "Public can view travel photos" ON public.travel_photos
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow anon insert/upsert on travel photos" ON public.travel_photos;
CREATE POLICY "Allow anon insert/upsert on travel photos" ON public.travel_photos
  FOR ALL USING (true) WITH CHECK (true);

-- 6. Storage Bucket setup for travel-photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('travel-photos', 'travel-photos', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 7. Storage Policies for travel-photos bucket
DROP POLICY IF EXISTS "Public can view travel photos in storage" ON storage.objects;
CREATE POLICY "Public can view travel photos in storage" ON storage.objects
  FOR SELECT USING (bucket_id = 'travel-photos');

DROP POLICY IF EXISTS "Public can upload travel photos to storage" ON storage.objects;
CREATE POLICY "Public can upload travel photos to storage" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'travel-photos');

DROP POLICY IF EXISTS "Public can update/delete travel photos in storage" ON storage.objects;
CREATE POLICY "Public can update/delete travel photos in storage" ON storage.objects
  FOR ALL USING (bucket_id = 'travel-photos');

-- 8. Create contact_messages table for portfolio inquiries
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  read BOOLEAN DEFAULT false
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can insert contact messages" ON public.contact_messages;
CREATE POLICY "Public can insert contact messages" ON public.contact_messages
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public can view contact messages" ON public.contact_messages;
CREATE POLICY "Public can view contact messages" ON public.contact_messages
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can delete contact messages" ON public.contact_messages;
CREATE POLICY "Public can delete contact messages" ON public.contact_messages
  FOR DELETE USING (true);
