import { useState } from "react";
import type { GalleryPhoto } from "@/lib/gallery";
import { Lightbox } from "./Lightbox";

interface GalleryGridProps {
  photos: GalleryPhoto[];
}

/** Masonry-style column layout with lazy loading and a lightbox. */
export function GalleryGrid({ photos }: GalleryGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (photos.length === 0) return null;

  return (
    <>
      <div className="columns-1 gap-3 sm:columns-2 sm:gap-4 lg:columns-3 lg:gap-6">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="group mb-3 block w-full overflow-hidden bg-muted text-left sm:mb-4 lg:mb-6"
            aria-label={`Open ${photo.title || "photograph"}`}
          >
            <img
              src={photo.src}
              alt={photo.title || "Cineshotss wedding photograph"}
              loading="lazy"
              decoding="async"
              className="img-cinematic w-full"
            />
            {photo.title && (
              <span className="eyebrow mt-3 block px-1 pb-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {photo.title}
              </span>
            )}
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          photos={photos}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}
