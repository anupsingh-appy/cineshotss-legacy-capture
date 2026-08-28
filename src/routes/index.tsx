import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Reveal } from "@/components/site/Reveal";
import { EditorialSection } from "@/components/site/EditorialSection";
import { BRAND, mailtoUrl, whatsappUrl } from "@/lib/brand";
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
  return (
    <div className="min-h-screen">
      <SiteHeader overlay />

      {/* 1 — Hero */}
      <section className="relative flex h-[100svh] min-h-[560px] items-end overflow-hidden">
        <img
          src={heroImage}
          alt="Bride and groom photographed together in golden hour mist"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/25" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-charcoal/70 to-transparent" />

        <div className="relative z-10 w-full px-6 pb-24 md:px-12 md:pb-28">
          <div className="mx-auto max-w-[1600px] text-ondark">
            <h1 className="display-xl uppercase tracking-[0.12em]">{BRAND.name}</h1>
            <p className="mt-6 text-[0.75rem] uppercase tracking-[0.42em] text-ondark/85">
              {BRAND.tagline}
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
            <p className="font-display text-3xl uppercase tracking-[0.3em]">{BRAND.name}</p>
            <span className="mt-6 block h-px w-16 bg-champagne" />
            <p className="body-editorial mt-6 max-w-xs">{BRAND.statement}</p>
            <figure className="mt-12 hidden overflow-hidden bg-muted lg:block">
              <img
                src={aboutImage}
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
            <h2 className="display-lg">About {BRAND.name}</h2>
            <div className="mt-8 max-w-xl space-y-6">
              <p className="body-editorial">
                We photograph and film weddings the way they are actually lived — in glances,
                in laughter, in the pause before a ritual begins. Nothing staged for the sake of a
                photograph, everything shaped by the emotion already in the room.
              </p>
              <p className="body-editorial">
                Our work moves between the intimate and the cinematic: the tremble of hands during
                a ceremony, the scale of a celebration at dusk, the details you spent months
                choosing. Photographs and films made to be revisited for decades.
              </p>
            </div>
            <Link
              to="/contact"
              className="btn-outline-lux mt-12 text-foreground hover:bg-foreground hover:text-background"
            >
              Get in Touch
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 3 — Wedding */}
      <EditorialSection
        eyebrow="Signature Coverage"
        heading="Wedding"
        category="wedding"
        cta="View Wedding Gallery"
        paragraphs={[
          "A full wedding day told as one story — the rituals, the portraits and every candid moment that happens between them.",
          "We stay close to the emotion: parents watching, siblings laughing, the couple stealing a private second in the middle of a crowded room. Then we photograph the details you planned so carefully, so the day is remembered completely.",
        ]}
        notes={["Candid moments", "Emotions", "Couple portraits", "Family celebrations", "Rituals", "Details"]}
        images={[
          { src: wedding1, alt: "Wedding ceremony garlands and falling petals", width: 1024, height: 1408 },
          { src: wedding2, alt: "Bridal bangles and mehndi detail", width: 1024, height: 1024 },
        ]}
      />

      {/* 4 — Pre-Wedding */}
      <EditorialSection
        eyebrow="Before the Day"
        heading="Pre-Wedding"
        category="pre-wedding"
        cta="View Pre-Wedding Gallery"
        reverse
        paragraphs={[
          "A romantic, unhurried session built entirely around your chemistry — no rigid poses, no forced smiles.",
          "We choose locations for their light and mood, then let you simply be together. Cinematic portraits, natural moments and the kind of easy warmth that only appears when nobody is performing.",
        ]}
        notes={["Genuine chemistry", "Beautiful locations", "Cinematic portraits", "Natural moments"]}
        images={[
          { src: preWedding1, alt: "Couple laughing on a coastal cliff at dusk", width: 1408, height: 1024 },
          { src: heroImage, alt: "Couple in golden hour mist", width: 1920, height: 1088 },
        ]}
      />

      {/* 5 — Engagement */}
      <EditorialSection
        eyebrow="The First Celebration"
        heading="Engagement"
        category="engagement"
        cta="View Engagement Gallery"
        paragraphs={[
          "The evening it becomes official — rings, applause and a room full of people who have been waiting for this.",
          "We photograph the intimacy and the excitement side by side: elegant portraits of the two of you, and the candid celebration unfolding around you.",
        ]}
        notes={["Celebration", "Intimacy", "Excitement", "Elegant portraits", "Candid moments"]}
        images={[
          { src: engagement1, alt: "Ring exchange in candlelight", width: 1024, height: 1408 },
          { src: aboutImage, alt: "Portrait in soft window light", width: 1024, height: 1408 },
        ]}
      />

      {/* 6 — Haldi */}
      <EditorialSection
        eyebrow="Tradition & Colour"
        heading="Haldi Ceremony"
        category="haldi"
        cta="View Haldi Gallery"
        reverse
        warm
        paragraphs={[
          "The warmest, loudest, most joyful morning of the celebration — turmeric everywhere, marigolds underfoot, nobody staying clean.",
          "We photograph haldi for what it truly is: family in the middle of the ritual, laughter that cannot be posed, colour and light at their most alive.",
        ]}
        notes={["Vibrant colours", "Laughter", "Family", "Traditions", "Candid moments", "Joyful celebration"]}
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
              Let us capture
              <br />
              your story…
            </h2>
            <p className="mt-8 text-[0.6875rem] uppercase tracking-[0.4em] text-ondark/70">
              {BRAND.name}
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-outline-lux text-ondark hover:bg-ondark hover:text-charcoal"
              >
                Follow Us
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                className="btn-outline-lux text-ondark hover:bg-ondark hover:text-charcoal"
              >
                Connect on WhatsApp
              </a>
            </div>

            <dl className="mt-16 grid gap-8 border-t border-ondark/20 pt-8 sm:grid-cols-3">
              <div>
                <dt className="eyebrow text-ondark/60">Email</dt>
                <dd className="mt-2">
                  <a href={mailtoUrl()} className="text-sm transition-opacity hover:opacity-70">
                    {BRAND.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-ondark/60">Instagram</dt>
                <dd className="mt-2">
                  <a
                    href={BRAND.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm transition-opacity hover:opacity-70"
                  >
                    {BRAND.instagramHandle}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-ondark/60">WhatsApp</dt>
                <dd className="mt-2">
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm transition-opacity hover:opacity-70"
                  >
                    {BRAND.whatsappDisplay}
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
