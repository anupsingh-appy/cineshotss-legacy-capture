import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { BRAND, mailtoUrl, whatsappUrl } from "@/lib/brand";

const title = `Terms & Support | ${BRAND.name}`;
const description =
  "Booking, coverage, delivery and support terms for Cineshotss wedding photography and cinematography.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="px-6 pt-32 pb-20 md:px-12 md:pt-44 md:pb-28">
        <article className="mx-auto max-w-3xl">
          <p className="eyebrow">Legal</p>
          <h1 className="display-lg mt-5">Terms &amp; Support</h1>
          <div className="mt-10 space-y-8">
            <section>
              <h2 className="display-md">Bookings</h2>
              <p className="body-editorial mt-3">
                Dates are confirmed once coverage, deliverables and timelines have been agreed in
                writing. Specific terms are shared with each proposal.
              </p>
            </section>
            <section>
              <h2 className="display-md">Coverage &amp; delivery</h2>
              <p className="body-editorial mt-3">
                Coverage hours, team size and delivery timelines are set out in your agreement. All
                photographs and films are curated and colour graded before delivery.
              </p>
            </section>
            <section>
              <h2 className="display-md">Usage &amp; copyright</h2>
              <p className="body-editorial mt-3">
                {BRAND.name} retains copyright of the images and films created, and you receive full
                personal usage rights. Portfolio use is always discussed with you first.
              </p>
            </section>
            <section>
              <h2 className="display-md">Support</h2>
              <p className="body-editorial mt-3">
                For any question about an ongoing or completed project, reach us on{" "}
                <a href={whatsappUrl("Hi Cineshotss, I have a question about my project.")} target="_blank" rel="noreferrer" className="underline">
                  WhatsApp
                </a>{" "}
                or at{" "}
                <a href={mailtoUrl("Support request")} className="underline">
                  {BRAND.email}
                </a>
                .
              </p>
            </section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
