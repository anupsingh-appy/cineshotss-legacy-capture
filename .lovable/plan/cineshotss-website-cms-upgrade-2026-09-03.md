# Cineshotss website CMS upgrade

## Outcome
Make the existing public Cineshotss website editable from `/admin` without changing its visual design or enabling public signup.

## Work
1. Add a `site_content` database record containing structured draft and published website content, seeded with the current visible copy. Keep anonymous access limited to published content and admin writes protected by the existing admin role.
2. Add client-safe content helpers for reading published content, reading/saving admin drafts, publishing changes, and uploading/replacing page images in the existing private gallery bucket.
3. Update the existing public components and routes to consume published content with the current hardcoded assets/copy as fallback, covering branding, hero, homepage sections, about, category introductions, contact details, footer, and legal pages.
4. Extend `/admin` with a Site Content editor that groups fields by brand, homepage, about, galleries, contact, and legal pages. Include image previews/replacement, draft save, publish, and a preview link while preserving the existing gallery and account settings tools.
5. Validate the route behavior, typecheck/build signals, and public/admin rendering without changing the existing public visual system.

## Technical details
- Use a JSONB content document so related page fields remain together and can evolve without repeated schema migrations.
- Store image paths in the content document; resolve private storage images to signed URLs at read time.
- Keep `site_content` RLS locked to published public reads and existing admin role checks for management.
- Do not store passwords or add profile data; keep public signup disabled.
