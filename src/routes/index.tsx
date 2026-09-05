import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Reveal } from "@/components/site/Reveal";
import { EditorialSection } from "@/components/site/EditorialSection";
import { BRAND, mailtoUrlFor, whatsappUrlFor } from "@/lib/brand";
import { useSiteContent } from "@/hooks/use-site-content";
import { mediaUrl } from "@/lib/content";
import heroImage from "@/assets/hero.jpg";
import aboutImage from "@/assets/about.jpg";
import wedding1 from "@/assets/wedding-1.jpg";
import wedding2 from "@/assets/wedding-2.jpg";
import preWedding1 from "@/assets/pre-wedding-1.jpg";
import engagement1 from "@/assets/engagement-1.jpg";
import haldi1 from "@/assets/haldi-1.jpg";
import ctaImage from "@/assets/cta.jpg";

const title = `${BRAND.name} | Wedding Photography & Cinematography`;
const description =
  "Cineshotss is a luxury wedding photography and cinematography studio — cinematic, editorial coverage of weddings, pre-weddings, engagements and haldi ceremonies.";

export const Route = createFileRoute("/")({
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
  component: Home,
});

function Home() {
  const contentResult = useSiteContent();
  const { content } = contentResult;
  const brand = content.brand;
  const home = content.home;
  const wedding = home.sections.wedding;
  const preWedding = home.sections["pre-wedding"];
  const engagement = home.sections.engagement;
  const haldi = home.sections.haldi;

  return (
    <div className="min-h-screen">
      <SiteHeader overlay />

      {/* 1 — Hero */}
      <section className="relative flex h-[100svh] min-h-[560px] items-end overflow-hidden">
        <img
          src={mediaUrl(contentResult, home.hero.imagePath, heroImage)}
          alt="Bride and groom photographed together in golden hour mist"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/25" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-charcoal/70 to-transparent" />

        <div className="relative z-10 w-full px-6 pb-24 md:px-12 md:pb-28">
          <div className="mx-auto max-w-[1600px] text-ondark">
            <h1 className="display-xl uppercase tracking-[0.12em]">{home.hero.title || brand.name}</h1>
            <p className="mt-6 text-[0.75rem] uppercase tracking-[0.42em] text-ondark/85">
              {home.hero.tagline || brand.tagline}
            </p>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-7 z-10 flex flex-col items-center gap-2 text-ondark/80">
          <span className="text-[0.5625rem] uppercase tracking-[0.4em]">Scroll</span>
          <span className="scroll-hint block h-9 w-px bg-current" />
        </div>
      </section>

      {/* 2 — About */}
      <section id="about" className="px-6 py-20 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <Reveal>
            <p className="font-display text-3xl uppercase tracking-[0.3em]">{brand.name}</p>
            <span className="mt-6 block h-px w-16 bg-champagne" />
            <p className="body-editorial mt-6 max-w-xs">{brand.statement}</p>
            <figure className="mt-12 hidden overflow-hidden bg-muted lg:block">
              <img
                src={mediaUrl(contentResult, home.about.imagePath, aboutImage)}
                alt="Bride portrait in soft window light"
                width={1024}
                height={1408}
                loading="lazy"
                decoding="async"
                className="img-cinematic w-full object-cover"
              />
            </figure>
          </Reveal>

          <Reveal delay={100}>
            <p className="eyebrow">{home.about.eyebrow}</p>
            <h2 className="display-lg mt-5">{home.about.heading}</h2>
            <div className="mt-8 max-w-xl space-y-6">
              {home.about.paragraphs.map((paragraph) => <p key={paragraph} className="body-editorial">{paragraph}</p>)}
            </div>
            <Link
              to="/contact"
              className="btn-outline-lux mt-12 text-foreground hover:bg-foreground hover:text-background"
            >
              {home.about.cta}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 3 — Wedding */}
      <EditorialSection
        eyebrow={wedding.eyebrow}
        heading={wedding.heading}
        category="wedding"
        cta={wedding.cta}
        paragraphs={wedding.paragraphs}
        notes={wedding.notes}
        images={[
          { src: wedding1, alt: "Wedding ceremony garlands and falling petals", width: 1024, height: 1408 },
          { src: wedding2, alt: "Bridal bangles and mehndi detail", width: 1024, height: 1024 },
        ]}
      />

      {/* 4 — Pre-Wedding */}
      <EditorialSection
        eyebrow={preWedding.eyebrow}
        heading={preWedding.heading}
        category="pre-wedding"
        cta={preWedding.cta}
        reverse
        paragraphs={preWedding.paragraphs}
        notes={preWedding.notes}
        images={[
          { src: preWedding1, alt: "Couple laughing on a coastal cliff at dusk", width: 1408, height: 1024 },
          { src: heroImage, alt: "Couple in golden hour mist", width: 1920, height: 1088 },
        ]}
      />

      {/* 5 — Engagement */}
      <EditorialSection
        eyebrow={engagement.eyebrow}
        heading={engagement.heading}
        category="engagement"
        cta={engagement.cta}
        paragraphs={engagement.paragraphs}
        notes={engagement.notes}
        images={[
          { src: engagement1, alt: "Ring exchange in candlelight", width: 1024, height: 1408 },
          { src: aboutImage, alt: "Portrait in soft window light", width: 1024, height: 1408 },
        ]}
      />

      {/* 6 — Haldi */}
      <EditorialSection
        eyebrow={haldi.eyebrow}
        heading={haldi.heading}
        category="haldi"
        cta={haldi.cta}
        reverse
        warm
        paragraphs={haldi.paragraphs}
        notes={haldi.notes}
        images={[
          { src: haldi1, alt: "Turmeric applied to a laughing bride during haldi", width: 1408, height: 1024 },
          { src: wedding2, alt: "Marigold and bangle details on ivory fabric", width: 1024, height: 1024 },
        ]}
      />

      {/* 7 — Cinematic CTA */}
      <section className="relative overflow-hidden">
        <img
          src={ctaImage}
          alt="Couple silhouetted against distant city lights at night"
          width={1920}
          height={1088}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/70" />
        <div className="relative z-10 mx-auto max-w-[1500px] px-6 py-28 text-ondark md:px-12 md:py-44">
          <Reveal>
            <h2 className="display-lg max-w-2xl">
              {home.cta.heading}
            </h2>
            <p className="mt-8 text-[0.6875rem] uppercase tracking-[0.4em] text-ondark/70">
              {home.cta.eyebrow || brand.name}
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              <a
                href={brand.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-outline-lux text-ondark hover:bg-ondark hover:text-charcoal"
              >
                {content.contact.instagramCta}
              </a>
              <a
                href={whatsappUrlFor(brand.whatsappNumber)}
                target="_blank"
                rel="noreferrer"
                className="btn-outline-lux text-ondark hover:bg-ondark hover:text-charcoal"
              >
                {content.contact.whatsappCta}
              </a>
            </div>

            <dl className="mt-16 grid gap-8 border-t border-ondark/20 pt-8 sm:grid-cols-3">
              <div>
                <dt className="eyebrow text-ondark/60">{content.contact.emailLabel}</dt>
                <dd className="mt-2">
                    <a href={mailtoUrlFor(brand.email)} className="text-sm transition-opacity hover:opacity-70">
                     {brand.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-ondark/60">{content.contact.instagramLabel}</dt>
                <dd className="mt-2">
                  <a
                      href={brand.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm transition-opacity hover:opacity-70"
                  >
                      {brand.instagramHandle}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-ondark/60">{content.contact.whatsappLabel}</dt>
                <dd className="mt-2">
                  <a
                    href={whatsappUrlFor(brand.whatsappNumber)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm transition-opacity hover:opacity-70"
                  >
                    {brand.whatsappDisplay}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
