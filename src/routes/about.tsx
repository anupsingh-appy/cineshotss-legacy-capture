import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Reveal } from "@/components/site/Reveal";
import { BRAND } from "@/lib/brand";
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
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="px-6 pt-32 pb-20 md:px-12 md:pt-44 md:pb-28">
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <Reveal>
            <figure className="overflow-hidden bg-muted">
              <img
                src={aboutImage}
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
            <p className="eyebrow">About</p>
            <h1 className="display-lg mt-5">About {BRAND.name}</h1>
            <div className="mt-8 space-y-6">
              <p className="body-editorial">
                {BRAND.name} is a wedding photography and cinematography studio built around a
                simple belief: the moments worth keeping are rarely the posed ones. We photograph
                the glance before the vows, the grandmother who cannot stop crying, the cousins
                dancing before the music has properly started.
              </p>
              <p className="body-editorial">
                Our approach is unobtrusive and editorial. We work quietly through the day —
                following light, ritual and emotion — then shape what we gather into photographs
                and films that feel like memory rather than documentation.
              </p>
              <p className="body-editorial">
                From intimate ceremonies to multi-day celebrations, every collection is treated as
                one continuous story: the details, the portraits, the traditions and the
                celebration that surrounds them.
              </p>
            </div>

            <dl className="mt-12 grid gap-8 sm:grid-cols-2">
              {[
                ["Photography", "Wedding, pre-wedding, engagement and haldi coverage."],
                ["Cinematography", "Wedding films cut for emotion, not checklists."],
                ["Direction", "Gentle guidance so portraits still feel like you."],
                ["Delivery", "Carefully curated, colour-graded galleries and films."],
              ].map(([term, detail]) => (
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
              Get in Touch
            </Link>
          </Reveal>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
