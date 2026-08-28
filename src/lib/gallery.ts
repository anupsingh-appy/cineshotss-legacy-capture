import { supabase } from "@/integrations/supabase/client";

export const GALLERY_BUCKET = "gallery";

export const CATEGORIES = [
  { slug: "wedding", label: "Wedding" },
  { slug: "pre-wedding", label: "Pre-Wedding" },
  { slug: "engagement", label: "Engagement" },
  { slug: "haldi", label: "Haldi" },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export const isCategorySlug = (value: string): value is CategorySlug =>
  CATEGORIES.some((c) => c.slug === value);

export const categoryLabel = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  storage_path: string | null;
  description: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
}

/** An item plus a browser-usable src (signed URL for private storage objects). */
export interface GalleryPhoto extends GalleryItem {
  src: string;
}

const SIGNED_URL_TTL = 60 * 60; // 1 hour

/**
 * Resolves display URLs for a batch of items. Storage-backed items get a
 * signed URL; externally hosted items keep their stored URL.
 */
export async function withDisplayUrls(items: GalleryItem[]): Promise<GalleryPhoto[]> {
  const paths = items
    .map((i) => i.storage_path)
    .filter((p): p is string => typeof p === "string" && p.length > 0);

  const signed = new Map<string, string>();
  if (paths.length > 0) {
    const { data } = await supabase.storage
      .from(GALLERY_BUCKET)
      .createSignedUrls(paths, SIGNED_URL_TTL);
    data?.forEach((entry, index) => {
      const path = paths[index];
      if (path && entry.signedUrl) signed.set(path, entry.signedUrl);
    });
  }

  return items.map((item) => ({
    ...item,
    src: (item.storage_path && signed.get(item.storage_path)) || item.image_url,
  }));
}

/** Public read: published photos of one category, ordered for display. */
export async function fetchPublishedByCategory(
  category: CategorySlug,
  opts: { limit?: number; offset?: number } = {},
): Promise<GalleryPhoto[]> {
  const from = opts.offset ?? 0;
  const to = from + (opts.limit ?? 24) - 1;

  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .eq("category", category)
    .eq("is_published", true)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true })
    .range(from, to);

  if (error) throw error;
  return withDisplayUrls((data ?? []) as GalleryItem[]);
}

/** Admin read: everything, published or not. */
export async function fetchAllForAdmin(): Promise<GalleryPhoto[]> {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("category", { ascending: true })
    .order("display_order", { ascending: true });

  if (error) throw error;
  return withDisplayUrls((data ?? []) as GalleryItem[]);
}

const publicUrlFor = (path: string) =>
  supabase.storage.from(GALLERY_BUCKET).getPublicUrl(path).data.publicUrl;

export async function uploadGalleryFile(file: File, category: string) {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${category}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from(GALLERY_BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false, contentType: file.type });
  if (error) throw error;
  return { path, url: publicUrlFor(path) };
}

export async function removeGalleryFile(path: string | null) {
  if (!path) return;
  await supabase.storage.from(GALLERY_BUCKET).remove([path]);
}

export interface GalleryInput {
  title: string;
  category: string;
  description: string;
  display_order: number;
  is_published: boolean;
}

export async function createGalleryItem(input: GalleryInput, file: File) {
  const { path, url } = await uploadGalleryFile(file, input.category);
  const { error } = await supabase
    .from("gallery")
    .insert({ ...input, image_url: url, storage_path: path });
  if (error) {
    await removeGalleryFile(path);
    throw error;
  }
}

export async function updateGalleryItem(
  item: GalleryItem,
  input: GalleryInput,
  replacementFile?: File | null,
) {
  const patch: Record<string, unknown> = { ...input };
  let oldPath: string | null = null;

  if (replacementFile) {
    const { path, url } = await uploadGalleryFile(replacementFile, input.category);
    patch['image_url'] = url;
    patch['storage_path'] = path;
    oldPath = item.storage_path;
  }

  const { error } = await supabase.from("gallery").update(patch).eq("id", item.id);
  if (error) throw error;
  if (oldPath) await removeGalleryFile(oldPath);
}

export async function setPublished(id: string, is_published: boolean) {
  const { error } = await supabase.from("gallery").update({ is_published }).eq("id", id);
  if (error) throw error;
}

export async function deleteGalleryItem(item: GalleryItem) {
  const { error } = await supabase.from("gallery").delete().eq("id", item.id);
  if (error) throw error;
  await removeGalleryFile(item.storage_path);
}
