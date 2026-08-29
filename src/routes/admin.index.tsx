import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import {
  CATEGORIES,
  categoryLabel,
  createGalleryItem,
  deleteGalleryItem,
  fetchAllForAdmin,
  setPublished,
  updateGalleryItem,
  type CategorySlug,
  type GalleryInput,
  type GalleryItem,
  type GalleryPhoto,
} from "@/lib/gallery";
import { signOut, useAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboardPage,
});

type FormValues = GalleryInput;

const emptyForm: FormValues = {
  title: "",
  category: "wedding",
  description: "",
  display_order: 0,
  is_published: true,
};

function AdminDashboardPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState<GalleryPhoto[]>([]);
  const [values, setValues] = useState<Record<string, FormValues>>({});
  const [replacementFiles, setReplacementFiles] = useState<Record<string, File | null>>({});
  const [newForm, setNewForm] = useState<FormValues>(emptyForm);
  const [newFile, setNewFile] = useState<File | null>(null);
  const [loadingItems, setLoadingItems] = useState(false);
  const [saving, setSaving] = useState(false);

  const groupedCount = useMemo(() => {
    return CATEGORIES.map((category) => ({
      ...category,
      count: items.filter((item) => item.category === category.slug).length,
    }));
  }, [items]);

  useEffect(() => {
    if (!auth.loading && (!auth.user || !auth.admin)) {
      void navigate({ to: "/admin/login", replace: true });
    }
  }, [auth.admin, auth.loading, auth.user, navigate]);

  async function refreshItems() {
    setLoadingItems(true);
    try {
      const nextItems = await fetchAllForAdmin();
      setItems(nextItems);
      setValues(
        Object.fromEntries(
          nextItems.map((item) => [item.id, {
            title: item.title,
            category: item.category,
            description: item.description ?? "",
            display_order: item.display_order,
            is_published: item.is_published,
          }]),
        ),
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to load the gallery");
    } finally {
      setLoadingItems(false);
    }
  }

  useEffect(() => {
    if (!auth.loading && auth.admin) {
      void refreshItems();
    }
  }, [auth.admin, auth.loading]);

  function updateNewForm<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setNewForm((current) => ({ ...current, [key]: value }));
  }

  function updateItemForm(id: string, key: keyof FormValues, value: string | number | boolean) {
    setValues((current) => ({
      ...current,
      [id]: { ...current[id], [key]: value } as FormValues,
    }));
  }

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newFile) {
      toast.error("Choose a photograph first");
      return;
    }
    setSaving(true);
    try {
      await createGalleryItem(newForm, newFile);
      setNewForm(emptyForm);
      setNewFile(null);
      const input = document.getElementById("new-gallery-file") as HTMLInputElement | null;
      if (input) input.value = "";
      await refreshItems();
      toast.success("Photograph added to the gallery");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to add photograph");
    } finally {
      setSaving(false);
    }
  }

  async function handleSave(item: GalleryItem) {
    const input = values[item.id];
    if (!input) return;
    setSaving(true);
    try {
      await updateGalleryItem(item, input, replacementFiles[item.id]);
      await refreshItems();
      setReplacementFiles((current) => ({ ...current, [item.id]: null }));
      toast.success("Gallery item updated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update gallery item");
    } finally {
      setSaving(false);
    }
  }

  async function handlePublish(item: GalleryItem) {
    setSaving(true);
    try {
      await setPublished(item.id, !item.is_published);
      await refreshItems();
      toast.success(item.is_published ? "Photograph unpublished" : "Photograph published");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to change publication status");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item: GalleryItem) {
    if (!window.confirm(`Delete “${item.title || "Untitled photograph"}”?`)) return;
    setSaving(true);
    try {
      await deleteGalleryItem(item);
      await refreshItems();
      toast.success("Photograph deleted");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to delete photograph");
    } finally {
      setSaving(false);
    }
  }

  async function handleSignOut() {
    await signOut();
    await navigate({ to: "/admin/login", replace: true });
  }

  if (auth.loading || !auth.user || !auth.admin) {
    return <div className="flex min-h-screen items-center justify-center bg-ivory"><p className="eyebrow">Checking access…</p></div>;
  }

  return (
    <div className="min-h-screen bg-ivory text-foreground">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-6 py-6 md:px-12">
          <div>
            <Link to="/" className="font-display text-xl uppercase tracking-[0.3em]">{BRAND.name}</Link>
            <p className="eyebrow mt-2">Studio administration</p>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="hidden text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground sm:inline">
              View site
            </Link>
            <Button type="button" variant="outline" onClick={() => void handleSignOut()}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-6 py-12 md:px-12 md:py-16">
        <div className="flex flex-col justify-between gap-8 border-b border-border pb-10 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">The archive</p>
            <h1 className="display-md mt-4">Shape the story.</h1>
            <p className="body-editorial mt-4 max-w-xl">Upload, order and publish the photographs that make each collection feel like memory.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
            {groupedCount.map((category) => (
              <div key={category.slug}>
                <p className="eyebrow">{category.label}</p>
                <p className="mt-1 font-display text-2xl">{category.count}</p>
              </div>
            ))}
          </div>
        </div>

        <section className="border-b border-border py-12" aria-labelledby="upload-heading">
          <div className="max-w-2xl">
            <p className="eyebrow">Add a photograph</p>
            <h2 id="upload-heading" className="display-md mt-4">Bring a new moment into focus.</h2>
          </div>
          <form onSubmit={handleCreate} className="mt-8 grid gap-5 lg:grid-cols-12">
            <label className="block lg:col-span-5">
              <span className="eyebrow mb-2 block">Photograph</span>
              <input id="new-gallery-file" required type="file" accept="image/*" onChange={(event) => setNewFile(event.target.files?.[0] ?? null)} className="form-input-lux file:mr-4 file:border-0 file:bg-transparent file:font-sans file:text-xs file:uppercase file:tracking-[0.14em]" />
            </label>
            <label className="block lg:col-span-3">
              <span className="eyebrow mb-2 block">Collection</span>
              <select value={newForm.category} onChange={(event) => updateNewForm("category", event.target.value as CategorySlug)} className="form-input-lux">
                {CATEGORIES.map((category) => <option key={category.slug} value={category.slug}>{category.label}</option>)}
              </select>
            </label>
            <label className="block lg:col-span-2">
              <span className="eyebrow mb-2 block">Display order</span>
              <input type="number" min="0" value={newForm.display_order} onChange={(event) => updateNewForm("display_order", Number(event.target.value))} className="form-input-lux" />
            </label>
            <label className="flex items-center gap-3 self-end pb-3 lg:col-span-2">
              <input type="checkbox" checked={newForm.is_published} onChange={(event) => updateNewForm("is_published", event.target.checked)} className="size-4 accent-foreground" />
              <span className="text-sm">Publish now</span>
            </label>
            <label className="block lg:col-span-7">
              <span className="eyebrow mb-2 block">Title</span>
              <input value={newForm.title} onChange={(event) => updateNewForm("title", event.target.value)} placeholder="Optional title" className="form-input-lux" />
            </label>
            <label className="block lg:col-span-5">
              <span className="eyebrow mb-2 block">Description</span>
              <input value={newForm.description} onChange={(event) => updateNewForm("description", event.target.value)} placeholder="Optional note" className="form-input-lux" />
            </label>
            <div className="lg:col-span-12">
              <Button type="submit" disabled={saving} className="btn-solid-lux h-auto rounded-none">{saving ? "Saving…" : "Add photograph"}</Button>
            </div>
          </form>
        </section>

        <section className="pt-12" aria-labelledby="archive-heading">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">All photographs</p>
              <h2 id="archive-heading" className="display-md mt-4">Your live archive.</h2>
            </div>
            <Button type="button" variant="outline" disabled={loadingItems || saving} onClick={() => void refreshItems()}>
              {loadingItems ? "Refreshing…" : "Refresh"}
            </Button>
          </div>

          {items.length === 0 && !loadingItems ? (
            <div className="border border-border py-20 text-center">
              <p className="font-display text-2xl">No photographs yet.</p>
              <p className="body-editorial mt-3">Your first upload will appear here for editing.</p>
            </div>
          ) : (
            <div className="mt-8 space-y-5">
              {items.map((item) => {
                const itemForm = values[item.id] ?? emptyForm;
                return (
                  <article key={item.id} className="grid gap-6 border-y border-border py-6 xl:grid-cols-[180px_1fr_auto]">
                    <div className="aspect-[4/5] overflow-hidden bg-muted">
                      <img src={item.src} alt={item.title || `${categoryLabel(item.category)} photograph`} loading="lazy" className="h-full w-full object-cover" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="eyebrow mb-2 block">Title</span>
                        <input value={itemForm.title} onChange={(event) => updateItemForm(item.id, "title", event.target.value)} className="form-input-lux" />
                      </label>
                      <label className="block">
                        <span className="eyebrow mb-2 block">Collection</span>
                        <select value={itemForm.category} onChange={(event) => updateItemForm(item.id, "category", event.target.value)} className="form-input-lux">
                          {CATEGORIES.map((category) => <option key={category.slug} value={category.slug}>{category.label}</option>)}
                        </select>
                      </label>
                      <label className="block sm:col-span-2">
                        <span className="eyebrow mb-2 block">Description</span>
                        <textarea value={itemForm.description} onChange={(event) => updateItemForm(item.id, "description", event.target.value)} className="form-input-lux min-h-24 resize-y" />
                      </label>
                      <label className="block">
                        <span className="eyebrow mb-2 block">Display order</span>
                        <input type="number" min="0" value={itemForm.display_order} onChange={(event) => updateItemForm(item.id, "display_order", Number(event.target.value))} className="form-input-lux" />
                      </label>
                      <label className="flex items-center gap-3 self-end pb-3">
                        <input type="checkbox" checked={itemForm.is_published} onChange={(event) => updateItemForm(item.id, "is_published", event.target.checked)} className="size-4 accent-foreground" />
                        <span className="text-sm">Published</span>
                      </label>
                    </div>
                    <div className="flex flex-wrap content-start gap-3 xl:w-44 xl:flex-col">
                      <label className="btn-outline-lux w-full cursor-pointer text-center text-foreground hover:bg-foreground hover:text-background">
                        Replace image
                        <input type="file" accept="image/*" className="sr-only" onChange={(event: ChangeEvent<HTMLInputElement>) => setReplacementFiles((current) => ({ ...current, [item.id]: event.target.files?.[0] ?? null }))} />
                      </label>
                      {replacementFiles[item.id] && <p className="w-full truncate text-xs text-muted-foreground" title={replacementFiles[item.id]?.name}>{replacementFiles[item.id]?.name}</p>}
                      <Button type="button" disabled={saving} onClick={() => void handleSave(item)} className="btn-solid-lux h-auto w-full rounded-none">Save changes</Button>
                      <Button type="button" variant="outline" disabled={saving} onClick={() => void handlePublish(item)} className="w-full">{item.is_published ? "Unpublish" : "Publish"}</Button>
                      <Button type="button" variant="ghost" disabled={saving} onClick={() => void handleDelete(item)} className="w-full text-destructive hover:text-destructive">Delete</Button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}