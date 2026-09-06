import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Reveal } from "@/components/site/Reveal";
import { BRAND } from "@/lib/brand";
import { useSiteContent } from "@/hooks/use-site-content";
import { mediaUrl } from "@/lib/content";
import aboutImage from "@/assets/about.jpg";

const title = `About ${BRAND.name} | Wedding Photography & Films`;
const description =
  "Cineshotss is a wedding photography and cinematography studio documenting real emotion, ritual and celebration with an editorial, cinematic eye.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const contentResult = useSiteContent();
  const { content } = contentResult;
  const about = content.about;
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="px-6 pt-32 pb-20 md:px-12 md:pt-44 md:pb-28">
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <Reveal>
            <figure className="overflow-hidden bg-muted">
              <img
                src={mediaUrl(contentResult, about.imagePath, aboutImage)}
                alt="Bride portrait photographed in soft window light"
                width={1024}
                height={1408}
                loading="lazy"
                decoding="async"
                className="img-cinematic w-full object-cover"
              />
            </figure>
          </Reveal>

          <Reveal delay={100}>
            <p className="eyebrow">{about.eyebrow}</p>
            <h1 className="display-lg mt-5">{about.heading}</h1>
            <div className="mt-8 space-y-6">
              {about.paragraphs.map((paragraph) => <p key={paragraph} className="body-editorial">{paragraph}</p>)}
            </div>

            <dl className="mt-12 grid gap-8 sm:grid-cols-2">
              {about.services.map(({ term, detail }) => (
                <div key={term} className="border-t border-border pt-4">
                  <dt className="eyebrow">{term}</dt>
                  <dd className="body-editorial mt-2">{detail}</dd>
                </div>
              ))}
            </dl>

            <Link
              to="/contact"
              className="btn-outline-lux mt-12 text-foreground hover:bg-foreground hover:text-background"
            >
              {about.cta}
            </Link>
          </Reveal>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
