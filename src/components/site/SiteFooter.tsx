import { Link } from "@tanstack/react-router";
import { BRAND, mailtoUrl, whatsappUrl } from "@/lib/brand";
import { CATEGORIES } from "@/lib/gallery";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-12 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl uppercase tracking-[0.32em]">{BRAND.name}</p>
            <p className="body-editorial mt-5 max-w-xs">{BRAND.statement}</p>
          </div>

          <nav className="flex flex-col gap-3">
            <p className="eyebrow mb-2">Galleries</p>
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
              About
            </Link>
            <Link to="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Contact
            </Link>
          </nav>

          <div className="flex flex-col gap-3">
            <p className="eyebrow mb-2">Connect</p>
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Instagram {BRAND.instagramHandle}
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              WhatsApp {BRAND.whatsappDisplay}
            </a>
            <a
              href={mailtoUrl()}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {BRAND.email}
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-foreground">
              Terms &amp; Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
