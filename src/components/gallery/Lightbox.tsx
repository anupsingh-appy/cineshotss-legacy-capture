import { useCallback, useEffect, useRef } from "react";
import type { GalleryPhoto } from "@/lib/gallery";

interface LightboxProps {
  photos: GalleryPhoto[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

/** Full-screen viewer: keyboard arrows on desktop, swipe on touch. */
export function Lightbox({ photos, index, onClose, onIndexChange }: LightboxProps) {
  const touchStart = useRef<number | null>(null);
  const photo = photos[index];

  const next = useCallback(
    () => onIndexChange((index + 1) % photos.length),
    [index, photos.length, onIndexChange],
  );
  const prev = useCallback(
    () => onIndexChange((index - 1 + photos.length) % photos.length),
    [index, photos.length, onIndexChange],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [next, prev, onClose]);

  if (!photo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.title || "Gallery image"}
      className="fixed inset-0 z-[100] flex flex-col bg-charcoal/97"
      onTouchStart={(e) => {
        touchStart.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        const start = touchStart.current;
        const end = e.changedTouches[0]?.clientX;
        if (start == null || end == null) return;
        const delta = end - start;
        if (Math.abs(delta) > 45) {
          if (delta < 0) next();
          else prev();
        }
        touchStart.current = null;
      }}
    >
      <div className="flex items-center justify-between px-6 py-5 text-ondark">
        <span className="eyebrow text-ondark/70">
          {index + 1} / {photos.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="link-underline text-ondark"
        >
          Close
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-6">
        {photos.length > 1 && (
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-2 z-10 hidden h-14 w-14 items-center justify-center text-ondark/70 transition-colors hover:text-ondark md:flex"
          >
            &#8592;
          </button>
        )}
        <img
          key={photo.id}
          src={photo.src}
          alt={photo.title || "Cineshotss photograph"}
          className="max-h-full max-w-full object-contain"
        />
        {photos.length > 1 && (
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="absolute right-2 z-10 hidden h-14 w-14 items-center justify-center text-ondark/70 transition-colors hover:text-ondark md:flex"
          >
            &#8594;
          </button>
        )}
      </div>

      {(photo.title || photo.description) && (
        <div className="px-6 pb-8 text-center text-ondark">
          {photo.title && <p className="font-display text-xl">{photo.title}</p>}
          {photo.description && (
            <p className="mx-auto mt-2 max-w-xl text-sm text-ondark/65">{photo.description}</p>
          )}
        </div>
      )}
    </div>
  );
}
