import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { BRAND, mailtoUrl, whatsappUrl } from "@/lib/brand";
import { useSiteContent } from "@/hooks/use-site-content";

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
  const { content } = useSiteContent();
  const terms = content.legal.terms;
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="px-6 pt-32 pb-20 md:px-12 md:pt-44 md:pb-28">
        <article className="mx-auto max-w-3xl">
          <p className="eyebrow">{terms.eyebrow}</p>
          <h1 className="display-lg mt-5">{terms.title}</h1>
          <div className="mt-10 space-y-8">
            {terms.sections.map((section) => <section key={section.heading}>
              <h2 className="display-md">{section.heading}</h2>
              <p className="body-editorial mt-3">{section.body}</p>
            </section>)}
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
