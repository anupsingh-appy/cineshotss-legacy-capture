-- Create the gallery storage bucket (private — the app uses signed URLs)
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for the gallery bucket
-- Public read via signed URLs (bucket is private, so anon needs SELECT to use signed URLs)
DROP POLICY IF EXISTS "Gallery images are readable" ON storage.objects;
CREATE POLICY "Gallery images are readable" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'gallery');

DROP POLICY IF EXISTS "Admins can upload gallery images" ON storage.objects;
CREATE POLICY "Admins can upload gallery images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update gallery images" ON storage.objects;
CREATE POLICY "Admins can update gallery images" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete gallery images" ON storage.objects;
CREATE POLICY "Admins can delete gallery images" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'));

-- Seed the site_content row with default content (empty JSON — the app falls back to DEFAULT_SITE_CONTENT)
INSERT INTO site_content (id, draft_content, published_content, published_at)
VALUES ('main', '{}'::jsonb, '{}'::jsonb, now())
ON CONFLICT (id) DO NOTHING;