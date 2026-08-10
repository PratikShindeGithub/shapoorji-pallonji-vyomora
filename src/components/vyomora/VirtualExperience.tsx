import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";

import sampleApartment from "@/assets/vyomora-living-dining.jpg.asset.json";
import siteTour from "@/assets/vyomora-tower-exterior.jpg.asset.json";

type Experience = {
  id: string;
  title: string;
  subtitle: string;
  thumb: string;
  videoId: string;
};

const EXPERIENCES: Experience[] = [
  {
    id: "sample-apartment",
    title: "Sample Apartment",
    subtitle: "Vyomora — Hinjawadi Phase 1, Pune",
    thumb: sampleApartment.url,
    videoId: "px3uOvvAbas",
  },
  {
    id: "virtual-site-tour",
    title: "Virtual Site Tour",
    subtitle: "Vyomora — Hinjawadi Phase 1, Pune",
    thumb: siteTour.url,
    videoId: "px3uOvvAbas",
  },
];

function VideoModal({ item, onClose }: { item: Experience; onClose: () => void }) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntered(true));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} video`}
      onClick={onClose}
      className="fixed inset-0 z-[90] grid place-items-center bg-ink/90 p-4 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none"
      style={{ opacity: entered ? 1 : 0 }}
    >
      <div
        className="relative w-full max-w-[90vw] lg:max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-12 right-0 rounded-full border border-secondary/30 p-2 text-secondary transition hover:bg-secondary/10"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="aspect-video max-h-[85vh] w-full overflow-hidden rounded-xl bg-black shadow-lift">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={`${item.title} — ${item.subtitle}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default function VirtualExperience() {
  const [active, setActive] = useState<Experience | null>(null);

  return (
    <section
      id="experience"
      className="bg-background py-12 sm:py-14"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="reveal mx-auto max-w-2xl text-center" data-reveal>
          <p className="eyebrow text-gold">Virtual experience</p>
          <h2
            id="experience-heading"
            className="mt-3 text-3xl leading-tight text-primary sm:text-4xl"
          >
            Experience It Before You Live It
          </h2>
          <div className="hairline mx-auto mt-5 w-24" />
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Take a closer look at your future home and explore the project from anywhere.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:gap-8 md:grid-cols-2">
          {EXPERIENCES.map((item, i) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setActive(item)}
              aria-label={`Play ${item.title} video`}
              className="reveal group relative aspect-video w-full overflow-hidden rounded-xl shadow-soft transition duration-500 hover:scale-[1.015] hover:shadow-lift motion-reduce:transform-none motion-reduce:transition-none"
              data-reveal
              data-reveal-delay={i * 120}
            >
              <img
                src={item.thumb}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
              />
              <span
                className="absolute inset-0 bg-black/30 transition-colors duration-500 group-hover:bg-black/40 motion-reduce:transition-none"
                aria-hidden="true"
              />

              <span
                aria-hidden="true"
                className="absolute left-1/2 top-[40%] grid h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-lift transition-transform duration-300 group-hover:scale-[1.08] motion-reduce:transform-none motion-reduce:transition-none sm:h-[110px] sm:w-[110px] lg:h-[130px] lg:w-[130px]"
              >
                <Play
                  className="ml-1 h-7 w-7 text-primary sm:h-10 sm:w-10 lg:h-12 lg:w-12"
                  fill="currentColor"
                  strokeWidth={0}
                />
              </span>

              <span className="absolute inset-x-4 bottom-6 block text-center transition-transform duration-500 group-hover:-translate-y-1.5 motion-reduce:transform-none motion-reduce:transition-none sm:bottom-8">
                <span
                  className="block truncate font-display text-[clamp(1.25rem,4vw,2.5rem)] font-medium tracking-wide text-white uppercase"
                  style={{ textShadow: "0 2px 16px rgba(0,0,0,0.45)" }}
                >
                  {item.title}
                </span>
                <span
                  className="mt-1 block truncate text-xs text-white/85 sm:text-sm"
                  style={{ textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}
                >
                  {item.subtitle}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {active ? <VideoModal item={active} onClose={() => setActive(null)} /> : null}
    </section>
  );
}
