import { useEffect, useState } from "react";
import { AMENITY_SLIDES } from "./amenity-slides";

export function AmenitySlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % AMENITY_SLIDES.length);
    }, 3500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="mx-auto mt-10 max-w-lg">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-secondary/15 shadow-soft">
        {AMENITY_SLIDES.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            loading={i === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-3 pb-2.5 pt-8">
          <p className="text-xs font-semibold tracking-wide text-secondary">
            {AMENITY_SLIDES[active]!.label}
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        {AMENITY_SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show ${slide.label}`}
            aria-current={i === active}
            onClick={() => setActive(i)}
            className="flex h-11 min-w-11 items-center justify-center"
          >
            <span
              className={`block h-1.5 rounded-full transition-all ${
                i === active ? "w-5 bg-gold" : "w-1.5 bg-secondary/40"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
