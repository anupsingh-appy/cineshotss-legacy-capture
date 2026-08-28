import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import type { CategorySlug } from "@/lib/gallery";

export interface EditorialImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface EditorialSectionProps {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  notes: string[];
  cta: string;
  category: CategorySlug;
  images: [EditorialImage, EditorialImage];
  /** Flip the text/image order for editorial rhythm. */
  reverse?: boolean;
  /** Warm haldi tint on the section surface. */
  warm?: boolean;
}

export function EditorialSection({
  eyebrow,
  heading,
  paragraphs,
  notes,
  cta,
  category,
  images,
  reverse = false,
  warm = false,
}: EditorialSectionProps) {
  const [lead, support] = images;

  return (
    <section
      id={category}
      className={`px-6 py-20 md:px-12 md:py-32 ${warm ? "bg-secondary/60" : "bg-background"}`}
    >
      <div className="mx-auto grid max-w-[1500px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className={reverse ? "lg:order-2" : ""}>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="display-lg mt-5">{heading}</h2>
          <div className="mt-8 max-w-xl space-y-5">
            {paragraphs.map((p) => (
              <p key={p} className="body-editorial">
                {p}
              </p>
            ))}
          </div>

          <ul className="mt-10 grid max-w-xl grid-cols-2 gap-x-8 gap-y-3">
            {notes.map((note) => (
              <li key={note} className="border-t border-border pt-3 text-xs tracking-[0.16em] uppercase">
                {note}
              </li>
            ))}
          </ul>

          <Link
            to="/gallery/$category"
            params={{ category }}
            className="btn-outline-lux mt-12 text-foreground hover:bg-foreground hover:text-background"
          >
            {cta}
          </Link>
        </Reveal>

        <Reveal className={reverse ? "lg:order-1" : ""} delay={120}>
          <div className="grid grid-cols-5 grid-rows-6 gap-3 sm:gap-5">
            <figure className="col-span-4 row-span-6 overflow-hidden bg-muted">
              <img
                src={lead.src}
                alt={lead.alt}
                width={lead.width}
                height={lead.height}
                loading="lazy"
                decoding="async"
                className="img-cinematic h-full w-full object-cover"
              />
            </figure>
            <figure className="col-span-3 col-start-3 row-span-3 row-start-4 self-end overflow-hidden bg-muted shadow-[0_24px_60px_-30px_oklch(0.229_0.008_70/0.45)]">
              <img
                src={support.src}
                alt={support.alt}
                width={support.width}
                height={support.height}
                loading="lazy"
                decoding="async"
                className="img-cinematic h-full w-full object-cover"
              />
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
