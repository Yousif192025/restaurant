import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (!isZoomed) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsZoomed(false);
      if (e.key === "ArrowRight") setActiveIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setActiveIndex((i) => (i - 1 + images.length) % images.length);
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isZoomed, images.length]);

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => setIsZoomed(true)}
        aria-label="Zoom image"
        className="group relative aspect-square w-full overflow-hidden rounded-leaf border border-forest-900/10 dark:border-parchment-100/10"
      >
        <img src={images[activeIndex]} alt={alt} className="h-full w-full object-cover" />
        <span className="absolute bottom-3 end-3 flex h-9 w-9 items-center justify-center rounded-full bg-parchment-100/90 text-forest-900 opacity-0 transition-opacity group-hover:opacity-100">
          <ZoomIn className="h-4 w-4" />
        </span>
      </button>

      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={activeIndex === i}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                activeIndex === i ? "border-gold-500" : "border-transparent"
              }`}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Zoomed product image"
            className="fixed inset-0 z-50 flex items-center justify-center bg-forest-950/90 p-6"
            onClick={() => setIsZoomed(false)}
          >
            <button
              onClick={() => setIsZoomed(false)}
              aria-label="Close"
              className="absolute top-5 end-5 flex h-10 w-10 items-center justify-center rounded-full bg-parchment-100/10 text-parchment-100 hover:bg-parchment-100/20"
            >
              <X className="h-5 w-5" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex((i) => (i - 1 + images.length) % images.length);
                  }}
                  aria-label="Previous image"
                  className="absolute start-5 flex h-10 w-10 items-center justify-center rounded-full bg-parchment-100/10 text-parchment-100 hover:bg-parchment-100/20"
                >
                  <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex((i) => (i + 1) % images.length);
                  }}
                  aria-label="Next image"
                  className="absolute end-5 flex h-10 w-10 items-center justify-center rounded-full bg-parchment-100/10 text-parchment-100 hover:bg-parchment-100/20"
                >
                  <ChevronRight className="h-5 w-5 rtl:rotate-180" />
                </button>
              </>
            )}

            <motion.img
              key={activeIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={images[activeIndex]}
              alt={alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
