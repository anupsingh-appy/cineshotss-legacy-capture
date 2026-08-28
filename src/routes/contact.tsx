import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Reveal } from "@/components/site/Reveal";
import { BRAND, mailtoUrl, whatsappUrl } from "@/lib/brand";
import ctaImage from "@/assets/cta.jpg";

const title = `Contact ${BRAND.name} | Wedding Photography Enquiries`;
const description =
  "Enquire about wedding, pre-wedding, engagement and haldi coverage with Cineshotss on WhatsApp, email or Instagram.";

export const Route = createFileRoute("/contact")({
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
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="px-6 pt-32 pb-20 md:px-12 md:pt-44 md:pb-28">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Contact</p>
            <h1 className="display-lg mt-5">Let's talk about your dates</h1>
            <p className="body-editorial mt-6">
              Tell us where you're celebrating, the dates you're holding and what matters most to
              you. We'll reply with availability, coverage options and a selection of recent work.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <Reveal>
              <dl className="space-y-10">
                <div className="border-t border-border pt-5">
                  <dt className="eyebrow">WhatsApp</dt>
                  <dd className="mt-3">
                    <a
                      href={whatsappUrl()}
                      target="_blank"
                      rel="noreferrer"
                      className="font-display text-2xl transition-opacity hover:opacity-70"
                    >
                      {BRAND.whatsappDisplay}
                    </a>
                  </dd>
                </div>
                <div className="border-t border-border pt-5">
                  <dt className="eyebrow">Email</dt>
                  <dd className="mt-3">
                    <a
                      href={mailtoUrl()}
                      className="font-display text-2xl transition-opacity hover:opacity-70"
                    >
                      {BRAND.email}
                    </a>
                  </dd>
                </div>
                <div className="border-t border-border pt-5">
                  <dt className="eyebrow">Instagram</dt>
                  <dd className="mt-3">
                    <a
                      href={BRAND.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-display text-2xl transition-opacity hover:opacity-70"
                    >
                      {BRAND.instagramHandle}
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="mt-12 flex flex-wrap gap-4">
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-solid-lux"
                >
                  Connect on WhatsApp
                </a>
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline-lux text-foreground hover:bg-foreground hover:text-background"
                >
                  Follow Us
                </a>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <figure className="overflow-hidden bg-charcoal">
                <img
                  src={ctaImage}
                  alt="Couple photographed at night against city lights"
                  width={1920}
                  height={1088}
                  loading="lazy"
                  decoding="async"
                  className="img-cinematic h-full w-full object-cover"
                />
              </figure>
            </Reveal>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
