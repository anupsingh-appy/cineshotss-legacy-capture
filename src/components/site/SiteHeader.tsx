import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BRAND } from "@/lib/brand";

const NAV = [
  { label: "Wedding", to: "/gallery/$category", params: { category: "wedding" } },
  { label: "Pre-Wedding", to: "/gallery/$category", params: { category: "pre-wedding" } },
  { label: "Engagement", to: "/gallery/$category", params: { category: "engagement" } },
  { label: "Haldi", to: "/gallery/$category", params: { category: "haldi" } },
  { label: "About", to: "/about", params: undefined },
  { label: "Contact", to: "/contact", params: undefined },
] as const;

interface SiteHeaderProps {
  /** Overlay mode sits on top of a dark hero image. */
  overlay?: boolean;
}

export function SiteHeader({ overlay = false }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = !overlay || scrolled;
  const tone = solid ? "text-foreground" : "text-ondark";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-700 ${
        solid ? "bg-background/92 backdrop-blur-sm border-b border-border" : "bg-transparent"
      }`}
    >
      <div className={`mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12 ${tone}`}>
        <Link
          to="/"
          className="font-display text-xl tracking-[0.34em] uppercase md:text-2xl"
          onClick={() => setOpen(false)}
        >
          {BRAND.name}
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              params={item.params as never}
              className="text-[0.6875rem] uppercase tracking-[0.24em] opacity-75 transition-opacity hover:opacity-100"
              activeProps={{ className: "opacity-100" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center lg:hidden"
        >
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 bg-background transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="flex h-full flex-col justify-center gap-2 px-8">
          {NAV.map((item, index) => (
            <Link
              key={item.label}
              to={item.to}
              params={item.params as never}
              onClick={() => setOpen(false)}
              className="font-display border-b border-border py-4 text-3xl text-foreground"
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              {item.label}
            </Link>
          ))}
          <p className="eyebrow mt-10">{BRAND.statement}</p>
        </nav>
      </div>
    </header>
  );
}
