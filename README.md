# CINESHOTSS

Build a premium, elegant, cinematic photography portfolio website for a professional Indian wedding photography and cinematography company called “Cineshotss”.

IMPORTANT:

This is NOT a generic photography template.

The website should feel like a high-end luxury wedding photography brand, inspired by editorial wedding magazines, cinematic films, and premium photography portfolios.

I have attached screenshots of a reference website.

Use the screenshots as visual inspiration for the overall layout, spacing, typography, image composition, section structure and premium aesthetic, but DO NOT copy the exact branding, text, logo, or assets from the reference.

BRAND:

Name: Cineshotss

Business type: Wedding Photography & Cinematography

Primary services:

- Wedding Photography

- Pre-Wedding Photography

- Engagement Photography

- Haldi Photography

- Wedding Films / Cinematography

DESIGN DIRECTION:

- Premium

- Minimal

- Elegant

- Cinematic

- Editorial

- Romantic

- Luxury wedding photography aesthetic

- Mostly warm ivory / off-white backgrounds

- Black / charcoal typography

- Subtle beige and champagne accents

- Large cinematic photography

- Elegant serif typography for major headings

- Clean modern typography for supporting text

- Lots of whitespace

- Smooth scrolling

- Subtle animations

- No excessive gradients

- No flashy SaaS-style UI

- No generic card-heavy design

HOME PAGE STRUCTURE:

1. HERO SECTION

Create a full-screen cinematic hero section using a large wedding/pre-wedding photograph.

Overlay:

“Cineshotss”

Small supporting line:

“Stories of Love, Captured Forever”

Navigation at the top:

- Wedding

- Pre-Wedding

- Engagement

- Haldi

- About

- Contact

The hero should feel cinematic and immersive.

Add subtle scroll indicator.

2. ABOUT SECTION

Create a sophisticated split-screen About section.

Left side:

- Cineshotss logo / brand mark

- Small statement:

  “A luxury wedding photography & cinematography studio”

Right side:

Large heading:

“About Cineshotss”

Write premium, emotional brand copy explaining that Cineshotss captures real emotions, intimate moments, celebrations and timeless stories through photography and films.

Add CTA:

“Get in Touch”

3. WEDDING SECTION

Create a large editorial section dedicated to Wedding Photography.

Use a split layout:

- Text on one side

- Beautiful photo collage/grid on the other

Heading:

“Wedding”

Description should focus on:

- candid moments

- emotions

- bride and groom portraits

- family celebrations

- rituals

- details

- storytelling

CTA:

“View Wedding Gallery”

Clicking this should open a dedicated Wedding Gallery page.

4. PRE-WEDDING SECTION

Create a similar but visually distinct editorial section.

Heading:

“Pre-Wedding”

Description:

A romantic pre-wedding experience focused on genuine chemistry, beautiful locations, cinematic portraits and natural moments.

CTA:

“View Pre-Wedding Gallery”

Open a dedicated gallery page.

5. ENGAGEMENT SECTION

Heading:

“Engagement”

Create an elegant photography collage and supporting text.

Focus on:

- celebration

- intimacy

- excitement

- elegant portraits

- candid moments

CTA:

“View Engagement Gallery”

6. HALDI SECTION

Heading:

“Haldi Ceremony”

Use warm yellow/orange visual styling very subtly.

Focus on:

- vibrant colors

- laughter

- family

- traditions

- candid moments

- joyful celebration

CTA:

“View Haldi Gallery”

7. CINEMATIC CTA SECTION

Create a full-width dark cinematic image section near the bottom.

Large text:

“Let us capture

your story…”

Small text:

“Cineshotss”

Buttons:

“Follow Us”

“Connect on WhatsApp”

Also show:

Email

Instagram

WhatsApp

8. FOOTER

Minimal luxury footer containing:

Cineshotss

Navigation links

Instagram

WhatsApp

Email

Privacy Policy

Terms & Support

Copyright

-----------------------------------

GALLERY SYSTEM

-----------------------------------

This website must NOT have hardcoded gallery images.

All gallery content should be dynamically managed through Supabase.

Create dynamic gallery pages for:

/gallery/wedding

/gallery/pre-wedding

/gallery/engagement

/gallery/haldi

Gallery images should come from Supabase Storage.

Use the existing Supabase database table:

gallery

Existing columns:

id

title

category

image_url

description

display_order

is_published

created_at

Use:

category = wedding

category = pre-wedding

category = engagement

category = haldi

Only show records where:

is_published = true

Sort by:

display_order ascending

-----------------------------------

ADMIN PANEL

-----------------------------------

Create a secure admin dashboard.

Admin routes:

/admin/login

/admin

Use Supabase Authentication with email/password.

Only authenticated admin users can access /admin.

Admin dashboard should allow the administrator to:

1. Upload photos

2. Select category

3. Enter title

4. Enter description

5. Change display order

6. Publish/unpublish photos

7. Delete photos

8. Replace/update photos

9. View all uploaded gallery items

10. Manage gallery content without editing code

Use Supabase Storage bucket:

gallery

The bucket already exists and is public.

Use the existing Supabase gallery table rather than creating a duplicate gallery table.

The admin interface should be clean, simple and professional.

-----------------------------------

SECURITY

-----------------------------------

Do not expose Supabase service-role keys in frontend code.

Use only the public/publishable Supabase key on the client.

Use Supabase authentication for admin access.

Implement appropriate Row Level Security policies.

Public users should only be able to read published gallery content.

Only authenticated admin users should be able to create, update or delete gallery records and storage files.

-----------------------------------

RESPONSIVE DESIGN

-----------------------------------

The website must work beautifully on:

- MacBook/Desktop

- Laptop

- iPad

- Android phones

- iPhone

Mobile design must NOT simply shrink the desktop layout.

Create a proper mobile experience:

- responsive navigation

- mobile menu

- optimized typography

- properly cropped images

- touch-friendly buttons

- smooth scrolling

- fast-loading galleries

-----------------------------------

IMAGE EXPERIENCE

-----------------------------------

Photography is the most important part of this website.

Use:

- large high-quality images

- elegant image grids

- masonry-style layouts where appropriate

- hover effects on desktop

- smooth image reveal animations

- lightbox when opening gallery images

- keyboard navigation on desktop

- swipe-friendly gallery experience on mobile

Avoid:

- tiny images

- excessive cards

- generic stock photography

- overly complicated animations

-----------------------------------

PERFORMANCE

-----------------------------------

Optimize images properly.

Use lazy loading for gallery images.

Avoid loading the entire gallery at once.

Use modern responsive image handling.

Keep the website fast even with hundreds of photographs.

-----------------------------------

FUTURE APP REQUIREMENT

-----------------------------------

Architect the project so it can later be converted into a mobile application.

Keep:

- reusable components

- clean API/data layer

- responsive layouts

- centralized Supabase integration

- reusable gallery components

- authentication logic separated from UI

Do not build the website in a way that makes future mobile-app conversion difficult.

-----------------------------------

IMPORTANT UX

-----------------------------------

The website should feel like a premium photography brand, not a software product.

Visitors should immediately understand:

1. Cineshotss is a professional wedding photography/cinematography company.

2. They can view beautiful work.

3. They can browse Wedding, Pre-Wedding, Engagement and Haldi galleries.

4. They can contact Cineshotss easily through WhatsApp/email/Instagram.

Make the experience emotional, visual and cinematic.

-----------------------------------

CONTENT

-----------------------------------

Use realistic placeholder copy where exact business information is not provided.

Do NOT invent fake awards, fake clients, fake reviews, fake locations or fake statistics.

Keep the content easy to replace later.

-----------------------------------

TECHNICAL REQUIREMENTS

-----------------------------------

Use a modern React/Next.js architecture.

Use TypeScript.

Use Tailwind CSS or an equally clean styling system.

Use Supabase for:

- Authentication

- PostgreSQL database

- Storage

Keep components modular and reusable.

Do not create unnecessary dependencies.

Before making major architectural changes, prioritize simplicity and maintainability.

Most importantly:

BUILD THE ACTUAL FUNCTIONAL WEBSITE, NOT JUST A STATIC MOCKUP.

The galleries, admin login, image uploads, publishing/unpublishing and gallery management must actually work with Supabase.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://cineshotss-legacy-capture.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f85cbefa-9088-4d24-bc5c-b0c0948e7f90).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
