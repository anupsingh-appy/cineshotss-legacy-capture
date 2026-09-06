import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { BRAND, whatsappUrl } from "@/lib/brand";
import { useSiteContent } from "@/hooks/use-site-content";
import {
  CATEGORIES,
  categoryLabel,
  fetchPublishedByCategory,
  isCategorySlug,
  type CategorySlug,
} from "@/lib/gallery";

const COPY: Record<CategorySlug, string> = {
  wedding:
    "Rituals, portraits and the quiet moments in between — photographed as one continuous story.",
  "pre-wedding":
    "An unhurried shoot built around your chemistry, in locations chosen for cinematic light.",
  engagement:
    "The first celebration: rings, applause and the people who love you most.",
  haldi: "Turmeric, marigolds and laughter — the warmest morning of the celebration.",
};

export const Route = createFileRoute("/gallery/$category")({
  beforeLoad: ({ params }) => {
    if (!isCategorySlug(params.category)) throw notFound();
  },
  head: ({ params }) => {
    const label = categoryLabel(params.category);
    const title = `${label} Photography Gallery | ${BRAND.name}`;
    const description = `${label} photography and films by ${BRAND.name} — cinematic, editorial wedding storytelling.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: GalleryPage,
  errorComponent: GalleryError,
  notFoundComponent: GalleryNotFound,
});

function GalleryPage() {
  const { category } = Route.useParams();
  const slug = category as CategorySlug;
  const label = categoryLabel(slug);
  const { content } = useSiteContent();
  const galleryCopy = content.galleries[slug];

  const { data, isLoading, error } = useQuery({
    queryKey: ["gallery", slug],
    queryFn: () => fetchPublishedByCategory(slug, { limit: 60 }),
  });

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="px-6 pt-32 pb-20 md:px-12 md:pt-44 md:pb-28">
        <div className="mx-auto max-w-[1500px]">
          <header className="max-w-2xl">
            <p className="eyebrow">Gallery</p>
            <h1 className="display-lg mt-5">{galleryCopy?.label ?? label}</h1>
            <p className="body-editorial mt-6">{galleryCopy?.description ?? COPY[slug]}</p>
          </header>

          <nav className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-y border-border py-5">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/gallery/$category"
                params={{ category: c.slug }}
                className="text-[0.6875rem] uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {c.label}
              </Link>
            ))}
          </nav>

          <div className="mt-12">
            {isLoading && <p className="eyebrow">Loading photographs…</p>}
            {error && (
              <p className="body-editorial">
                We couldn't load this gallery just now. Please refresh and try again.
              </p>
            )}
            {!isLoading && !error && (data?.length ?? 0) === 0 && (
              <div className="border border-border px-8 py-20 text-center">
                <p className="font-display text-2xl">This gallery is being curated.</p>
                <p className="body-editorial mx-auto mt-4 max-w-md">
                  New {label.toLowerCase()} work is added regularly. Reach out and we'll share a
                  private selection.
                </p>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline-lux mt-8 text-foreground hover:bg-foreground hover:text-background"
                >
                  Connect on WhatsApp
                </a>
              </div>
            )}
            {data && data.length > 0 && <GalleryGrid photos={data} />}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function GalleryError() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <h1 className="display-md">This gallery didn't load</h1>
        <p className="body-editorial mt-4">Please refresh the page or head back home.</p>
        <Link to="/" className="btn-outline-lux mt-8 text-foreground">
          Go home
        </Link>
      </div>
    </div>
  );
}

function GalleryNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <h1 className="display-md">Gallery not found</h1>
        <p className="body-editorial mt-4">
          Choose Wedding, Pre-Wedding, Engagement or Haldi.
        </p>
        <Link to="/" className="btn-outline-lux mt-8 text-foreground">
          Go home
        </Link>
      </div>
    </div>
  );
}
