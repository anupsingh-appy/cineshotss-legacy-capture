import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { BRAND, mailtoUrl } from "@/lib/brand";

const title = `Privacy Policy | ${BRAND.name}`;
const description =
  "How Cineshotss handles enquiry details, photographs and personal information shared with the studio.";

export const Route = createFileRoute("/privacy")({
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
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="px-6 pt-32 pb-20 md:px-12 md:pt-44 md:pb-28">
        <article className="mx-auto max-w-3xl">
          <p className="eyebrow">Legal</p>
          <h1 className="display-lg mt-5">Privacy Policy</h1>
          <div className="mt-10 space-y-8">
            <section>
              <h2 className="display-md">Information we collect</h2>
              <p className="body-editorial mt-3">
                When you contact {BRAND.name} we receive the details you choose to share — such as
                your name, contact details, event dates and location — so we can respond to your
                enquiry.
              </p>
            </section>
            <section>
              <h2 className="display-md">How we use it</h2>
              <p className="body-editorial mt-3">
                Your details are used only to reply to your enquiry, plan coverage and deliver your
                photographs and films. We do not sell or rent personal information.
              </p>
            </section>
            <section>
              <h2 className="display-md">Photographs</h2>
              <p className="body-editorial mt-3">
                Photographs and films from your celebration are shared publicly only with your
                permission. If you would prefer your images stay private, tell us and we will keep
                them out of our portfolio and social channels.
              </p>
            </section>
            <section>
              <h2 className="display-md">Contact</h2>
              <p className="body-editorial mt-3">
                For any privacy request, including removal of your images, write to{" "}
                <a href={mailtoUrl("Privacy request")} className="underline">
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
