import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Reveal } from "@/components/site/Reveal";
import { BRAND, mailtoUrlFor, whatsappUrlFor } from "@/lib/brand";
import { useSiteContent } from "@/hooks/use-site-content";
import { mediaUrl } from "@/lib/content";
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
  const contentResult = useSiteContent();
  const { content } = contentResult;
  const brand = content.brand;
  const contact = content.contact;
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="px-6 pt-32 pb-20 md:px-12 md:pt-44 md:pb-28">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{contact.eyebrow}</p>
            <h1 className="display-lg mt-5">{contact.heading}</h1>
            <p className="body-editorial mt-6">{contact.description}</p>
          </Reveal>

          <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <Reveal>
              <dl className="space-y-10">
                <div className="border-t border-border pt-5">
                  <dt className="eyebrow">{contact.whatsappLabel}</dt>
                  <dd className="mt-3">
                    <a
                      href={whatsappUrlFor(brand.whatsappNumber)}
                      target="_blank"
                      rel="noreferrer"
                      className="font-display text-2xl transition-opacity hover:opacity-70"
                    >
                      {brand.whatsappDisplay}
                    </a>
                  </dd>
                </div>
                <div className="border-t border-border pt-5">
                  <dt className="eyebrow">{contact.emailLabel}</dt>
                  <dd className="mt-3">
                    <a
                      href={mailtoUrlFor(brand.email)}
                      className="font-display text-2xl transition-opacity hover:opacity-70"
                    >
                      {brand.email}
                    </a>
                  </dd>
                </div>
                <div className="border-t border-border pt-5">
                  <dt className="eyebrow">{contact.instagramLabel}</dt>
                  <dd className="mt-3">
                    <a
                      href={brand.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-display text-2xl transition-opacity hover:opacity-70"
                    >
                      {brand.instagramHandle}
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="mt-12 flex flex-wrap gap-4">
                <a
                  href={whatsappUrlFor(brand.whatsappNumber)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-solid-lux"
                >
                  {contact.whatsappCta}
                </a>
                <a
                  href={brand.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline-lux text-foreground hover:bg-foreground hover:text-background"
                >
                  {contact.instagramCta}
                </a>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <figure className="overflow-hidden bg-charcoal">
                <img
                  src={mediaUrl(contentResult, contact.imagePath, ctaImage)}
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
