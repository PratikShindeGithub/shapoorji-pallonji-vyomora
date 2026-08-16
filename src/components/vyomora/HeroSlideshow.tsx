import { useEffect, useState } from "react";
import { HERO_SLIDES } from "./logo";

export function HeroSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative h-56 w-full sm:h-72 lg:absolute lg:inset-0 lg:h-full">
      {HERO_SLIDES.map((slide, i) => (
        <img
          key={slide.url}
          src={slide.url}
          srcSet={slide.srcSet}
          sizes="(max-width: 1023px) 100vw, 55vw"
          alt={slide.alt}
          width={1600}
          height={1067}
          loading={i === 0 ? "eager" : "lazy"}
          fetchPriority={i === 0 ? "high" : "low"}
          decoding={i === 0 ? "sync" : "async"}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center lg:bottom-2">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={slide.url}
            type="button"
            aria-label={`Show slide ${i + 1}`}
            aria-current={i === active}
            onClick={() => setActive(i)}
            className="flex h-11 min-w-11 items-center justify-center"
          >
            <span
              className={`block h-1.5 rounded-full transition-all ${
                i === active ? "w-6 bg-gold" : "w-1.5 bg-background/70"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
