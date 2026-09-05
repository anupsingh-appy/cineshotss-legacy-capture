import { Link } from "@tanstack/react-router";
import { BRAND, mailtoUrl, whatsappUrl } from "@/lib/brand";
import { CATEGORIES } from "@/lib/gallery";
import { useSiteContent } from "@/hooks/use-site-content";
import { whatsappUrlFor, mailtoUrlFor } from "@/lib/brand";

export function SiteFooter() {
  const { content } = useSiteContent();
  const brand = content.brand;
  const labels = content.navigation;
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-12 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl uppercase tracking-[0.32em]">{brand.name}</p>
            <p className="body-editorial mt-5 max-w-xs">{brand.statement}</p>
          </div>

          <nav className="flex flex-col gap-3">
            <p className="eyebrow mb-2">{labels.galleries ?? "Galleries"}</p>
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/gallery/$category"
                params={{ category: c.slug }}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {c.label}
              </Link>
            ))}
            <Link to="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {labels.about ?? "About"}
            </Link>
            <Link to="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {labels.contact ?? "Contact"}
            </Link>
          </nav>

          <div className="flex flex-col gap-3">
            <p className="eyebrow mb-2">{labels.connect ?? "Connect"}</p>
            <a
              href={brand.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {brand.instagramHandle}
            </a>
            <a
              href={whatsappUrlFor(brand.whatsappNumber)}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              WhatsApp {brand.whatsappDisplay}
            </a>
            <a
              href={mailtoUrlFor(brand.email)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {brand.email}
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="transition-colors hover:text-foreground">
              {labels.privacy ?? "Privacy Policy"}
            </Link>
            <Link to="/terms" className="transition-colors hover:text-foreground">
              {labels.terms ?? "Terms & Support"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
