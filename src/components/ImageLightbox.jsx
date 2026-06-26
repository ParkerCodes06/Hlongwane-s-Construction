import { useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageLightbox({ images, index, onClose, onPrev, onNext }) {
  const handleKey = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (index === null) return;
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey, index]);

  if (index === null) return null;

  return (
    <div className={`lightbox-overlay${index !== null ? " open" : ""}`} onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close">
        &times;
      </button>
      <button
        className="lightbox-nav prev"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous"
      >
        <ChevronLeft size={24} />
      </button>
      <img
        src={images[index]}
        alt={`Gallery image ${index + 1}`}
        onClick={(e) => e.stopPropagation()}
      />
      <button
        className="lightbox-nav next"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
