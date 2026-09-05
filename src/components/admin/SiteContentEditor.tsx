import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  fetchSiteContentForAdmin,
  mediaUrl,
  publishSiteContent,
  resolveSiteContentMedia,
  saveSiteContentDraft,
  uploadSiteContentImage,
  type SiteContent,
  type SiteContentResult,
} from "@/lib/content";
import { CATEGORIES, type CategorySlug } from "@/lib/gallery";

interface SiteContentEditorProps {
  onPublished?: () => void;
}

const inputClass = "form-input-lux";

function updatePath<T>(value: T, path: (string | number)[], nextValue: unknown): T {
  const copy = structuredClone(value) as Record<string, unknown>;
  let cursor: Record<string, unknown> | unknown[] = copy;
  path.slice(0, -1).forEach((key) => {
    const current = cursor[key as keyof typeof cursor];
    if (current && typeof current === "object") cursor = current as Record<string, unknown>;
  });
  const finalKey = path[path.length - 1];
  if (finalKey !== undefined) cursor[finalKey as keyof typeof cursor] = nextValue as never;
  return copy as T;
}

function Field({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean }) {
  return (
    <label className="block">
      <span className="eyebrow mb-2 block text-muted-foreground">{label}</span>
      {multiline ? (
        <textarea value={value} onChange={(event) => onChange(event.target.value)} className={`${inputClass} min-h-28 resize-y`} />
      ) : (
        <input value={value} onChange={(event) => onChange(event.target.value)} className={inputClass} />
      )}
    </label>
  );
}

function ListField({ label, value, onChange }: { label: string; value: string[]; onChange: (value: string[]) => void }) {
  return <Field label={`${label} — one per line`} value={value.join("\n")} onChange={(next) => onChange(next.split("\n"))} multiline />;
}

function ImageField({ label, path, fallback, media, onChange }: { label: string; path: string | null; fallback: string; media: SiteContentResult | null; onChange: (path: string) => void }) {
  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      const nextPath = await uploadSiteContentImage(file, label.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
      onChange(nextPath);
      toast.success(`${label} image uploaded. Save or publish to apply it.`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to upload image");
    }
  }

  return (
    <label className="block">
      <span className="eyebrow mb-2 block text-muted-foreground">{label}</span>
      <div className="flex items-center gap-4 border border-border p-3">
        <img src={mediaUrl(media, path, fallback)} alt={`${label} preview`} className="size-20 object-cover" />
        <span className="btn-outline-lux cursor-pointer text-center text-foreground hover:bg-foreground hover:text-background">
          Replace image
          <input type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" className="sr-only" onChange={(event) => void handleFile(event)} />
        </span>
      </div>
    </label>
  );
}

export function SiteContentEditor({ onPublished }: SiteContentEditorProps) {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [published, setPublished] = useState<SiteContent | null>(null);
  const [media, setMedia] = useState<SiteContentResult | null>(null);
  const [busy, setBusy] = useState<"load" | "save" | "publish" | null>("load");

  async function load() {
    setBusy("load");
    try {
      const result = await fetchSiteContentForAdmin();
      setContent(result.draft);
      setPublished(result.published);
      setMedia(await resolveSiteContentMedia(result.draft));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to load website content");
    } finally {
      setBusy(null);
    }
  }

  useEffect(() => { void load(); }, []);

  const dirty = useMemo(() => JSON.stringify(content) !== JSON.stringify(published), [content, published]);

  function setValue(path: (string | number)[], value: unknown) {
    setContent((current) => current ? updatePath(current, path, value) : current);
  }

  async function save(publish: boolean) {
    if (!content) return;
    setBusy(publish ? "publish" : "save");
    try {
      if (publish) {
        await publishSiteContent(content);
        setPublished(content);
        onPublished?.();
        toast.success("Website content published");
      } else {
        await saveSiteContentDraft(content);
        toast.success("Draft saved");
      }
      setMedia(await resolveSiteContentMedia(content));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save website content");
    } finally {
      setBusy(null);
    }
  }

  if (busy === "load" || !content) return <p className="eyebrow">Loading website content…</p>;

  return (
    <div className="space-y-10">
      <div className="flex flex-col justify-between gap-6 border-b border-border pb-8 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="eyebrow">Site content</p>
          <h2 className="display-md mt-4">Edit the public story.</h2>
          <p className="body-editorial mt-4">Save a private draft while you work, then publish when every page is ready.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button type="button" variant="outline" disabled={busy !== null || !dirty} onClick={() => void save(false)}>{busy === "save" ? "Saving…" : "Save draft"}</Button>
          <Button type="button" disabled={busy !== null} onClick={() => void save(true)}>{busy === "publish" ? "Publishing…" : "Publish changes"}</Button>
        </div>
      </div>

      <section className="space-y-6" aria-labelledby="content-brand-heading">
        <div><p className="eyebrow">Brand and contact</p><h3 id="content-brand-heading" className="font-display mt-2 text-2xl">Your studio details</h3></div>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Studio name" value={content.brand.name} onChange={(value) => setValue(["brand", "name"], value)} />
          <Field label="Tagline" value={content.brand.tagline} onChange={(value) => setValue(["brand", "tagline"], value)} />
          <Field label="Studio statement" value={content.brand.statement} onChange={(value) => setValue(["brand", "statement"], value)} />
          <Field label="Email" value={content.brand.email} onChange={(value) => setValue(["brand", "email"], value)} />
          <Field label="Instagram handle" value={content.brand.instagramHandle} onChange={(value) => setValue(["brand", "instagramHandle"], value)} />
          <Field label="Instagram URL" value={content.brand.instagramUrl} onChange={(value) => setValue(["brand", "instagramUrl"], value)} />
          <Field label="WhatsApp number" value={content.brand.whatsappNumber} onChange={(value) => setValue(["brand", "whatsappNumber"], value)} />
          <Field label="WhatsApp display number" value={content.brand.whatsappDisplay} onChange={(value) => setValue(["brand", "whatsappDisplay"], value)} />
        </div>
      </section>

      <section className="space-y-6 border-t border-border pt-10" aria-labelledby="content-home-heading">
        <div><p className="eyebrow">Homepage</p><h3 id="content-home-heading" className="font-display mt-2 text-2xl">Opening, introduction and services</h3></div>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Opening title" value={content.home.hero.title} onChange={(value) => setValue(["home", "hero", "title"], value)} />
          <Field label="Opening tagline" value={content.home.hero.tagline} onChange={(value) => setValue(["home", "hero", "tagline"], value)} />
          <ImageField label="Opening image" path={content.home.hero.imagePath} fallback="/assets/hero.jpg" media={media} onChange={(value) => setValue(["home", "hero", "imagePath"], value)} />
          <ImageField label="Introduction image" path={content.home.about.imagePath} fallback="/assets/about.jpg" media={media} onChange={(value) => setValue(["home", "about", "imagePath"], value)} />
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Introduction eyebrow" value={content.home.about.eyebrow} onChange={(value) => setValue(["home", "about", "eyebrow"], value)} />
          <Field label="Introduction heading" value={content.home.about.heading} onChange={(value) => setValue(["home", "about", "heading"], value)} />
          <ListField label="Introduction paragraphs" value={content.home.about.paragraphs} onChange={(value) => setValue(["home", "about", "paragraphs"], value)} />
          <Field label="Introduction button" value={content.home.about.cta} onChange={(value) => setValue(["home", "about", "cta"], value)} />
        </div>
        {CATEGORIES.map((category) => {
          const section = content.home.sections[category.slug];
          return <div key={category.slug} className="space-y-5 border-t border-border pt-8">
            <h4 className="font-display text-xl">{category.label} section</h4>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Eyebrow" value={section.eyebrow} onChange={(value) => setValue(["home", "sections", category.slug, "eyebrow"], value)} />
              <Field label="Heading" value={section.heading} onChange={(value) => setValue(["home", "sections", category.slug, "heading"], value)} />
              <ListField label="Paragraphs" value={section.paragraphs} onChange={(value) => setValue(["home", "sections", category.slug, "paragraphs"], value)} />
              <ListField label="Notes" value={section.notes} onChange={(value) => setValue(["home", "sections", category.slug, "notes"], value)} />
              <Field label="Button" value={section.cta} onChange={(value) => setValue(["home", "sections", category.slug, "cta"], value)} />
            </div>
          </div>;
        })}
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Closing heading" value={content.home.cta.heading} onChange={(value) => setValue(["home", "cta", "heading"], value)} />
          <Field label="Closing eyebrow" value={content.home.cta.eyebrow} onChange={(value) => setValue(["home", "cta", "eyebrow"], value)} />
          <ImageField label="Closing image" path={content.home.cta.imagePath} fallback="/assets/cta.jpg" media={media} onChange={(value) => setValue(["home", "cta", "imagePath"], value)} />
        </div>
      </section>

      <section className="space-y-6 border-t border-border pt-10" aria-labelledby="content-about-heading">
        <div><p className="eyebrow">About page</p><h3 id="content-about-heading" className="font-display mt-2 text-2xl">Studio story and services</h3></div>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Eyebrow" value={content.about.eyebrow} onChange={(value) => setValue(["about", "eyebrow"], value)} />
          <Field label="Heading" value={content.about.heading} onChange={(value) => setValue(["about", "heading"], value)} />
          <ListField label="Paragraphs" value={content.about.paragraphs} onChange={(value) => setValue(["about", "paragraphs"], value)} />
          <Field label="Button" value={content.about.cta} onChange={(value) => setValue(["about", "cta"], value)} />
          <ImageField label="About image" path={content.about.imagePath} fallback="/assets/about.jpg" media={media} onChange={(value) => setValue(["about", "imagePath"], value)} />
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {content.about.services.map((service, index) => <div key={service.term} className="grid gap-5 border-t border-border pt-5 sm:grid-cols-2">
            <Field label={`Service ${index + 1}`} value={service.term} onChange={(value) => setValue(["about", "services", index, "term"], value)} />
            <Field label="Description" value={service.detail} onChange={(value) => setValue(["about", "services", index, "detail"], value)} />
          </div>)}
        </div>
      </section>

      <section className="space-y-6 border-t border-border pt-10" aria-labelledby="content-gallery-heading">
        <div><p className="eyebrow">Gallery pages</p><h3 id="content-gallery-heading" className="font-display mt-2 text-2xl">Collection introductions</h3></div>
        <div className="grid gap-5 md:grid-cols-2">
          {CATEGORIES.map((category) => <div key={category.slug} className="space-y-5 border-t border-border pt-5">
            <h4 className="font-display text-xl">{category.label}</h4>
            <Field label="Label" value={content.galleries[category.slug].label} onChange={(value) => setValue(["galleries", category.slug, "label"], value)} />
            <Field label="Description" value={content.galleries[category.slug].description} onChange={(value) => setValue(["galleries", category.slug, "description"], value)} multiline />
          </div>)}
        </div>
      </section>

      <section className="space-y-6 border-t border-border pt-10" aria-labelledby="content-contact-heading">
        <div><p className="eyebrow">Contact page</p><h3 id="content-contact-heading" className="font-display mt-2 text-2xl">Enquiry details and links</h3></div>
        <div className="grid gap-5 md:grid-cols-2">
          {(["eyebrow", "heading", "description", "whatsappLabel", "emailLabel", "instagramLabel", "whatsappCta", "instagramCta"] as const).map((key) => <Field key={key} label={key} value={content.contact[key]} onChange={(value) => setValue(["contact", key], value)} multiline={key === "description"} />)}
          <ImageField label="Contact image" path={content.contact.imagePath} fallback="/assets/cta.jpg" media={media} onChange={(value) => setValue(["contact", "imagePath"], value)} />
        </div>
      </section>

      <section className="space-y-6 border-t border-border pt-10" aria-labelledby="content-legal-heading">
        <div><p className="eyebrow">Legal pages</p><h3 id="content-legal-heading" className="font-display mt-2 text-2xl">Policy and support copy</h3></div>
        {(["privacy", "terms"] as const).map((page) => <div key={page} className="space-y-5 border-t border-border pt-6">
          <h4 className="font-display text-xl">{page === "privacy" ? "Privacy Policy" : "Terms & Support"}</h4>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Eyebrow" value={content.legal[page].eyebrow} onChange={(value) => setValue(["legal", page, "eyebrow"], value)} />
            <Field label="Title" value={content.legal[page].title} onChange={(value) => setValue(["legal", page, "title"], value)} />
          </div>
          <div className="space-y-5">
            {content.legal[page].sections.map((section, index) => <div key={section.heading} className="grid gap-5 border-t border-border pt-5 md:grid-cols-2">
              <Field label={`Section ${index + 1} heading`} value={section.heading} onChange={(value) => setValue(["legal", page, "sections", index, "heading"], value)} />
              <Field label="Section text" value={section.body} onChange={(value) => setValue(["legal", page, "sections", index, "body"], value)} multiline />
            </div>)}
          </div>
        </div>)}
      </section>

      <div className="flex flex-wrap justify-end gap-3 border-t border-border pt-8">
        <Button type="button" variant="outline" disabled={busy !== null || !dirty} onClick={() => void save(false)}>{busy === "save" ? "Saving…" : "Save draft"}</Button>
        <Button type="button" disabled={busy !== null} onClick={() => void save(true)}>{busy === "publish" ? "Publishing…" : "Publish changes"}</Button>
      </div>
    </div>
  );
}