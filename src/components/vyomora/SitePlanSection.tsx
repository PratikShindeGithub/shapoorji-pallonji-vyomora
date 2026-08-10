import { useCallback, useEffect, useState } from "react";
import { Download, Maximize2, Minus, Plus, X } from "lucide-react";

import { MASTER_PLAN, UNIT_PLANS } from "./site-plans";

type Props = {
  onEnquire: (intent: string, cta?: string, title?: string, copy?: string) => void;
};

type Viewing = { title: string; src: string; alt: string; intent: string };

const ENQUIRY_COPY =
  "Share your details and our sales desk will send the complete plan set with carpet areas and pricing.";

function PlanLightbox({
  item,
  onClose,
  onEnquire,
}: {
  item: Viewing;
  onClose: () => void;
  onEnquire: Props["onEnquire"];
}) {
  const [zoom, setZoom] = useState(1);
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

  const step = (dir: 1 | -1) =>
    setZoom((z) => Math.min(3, Math.max(1, Number((z + dir * 0.5).toFixed(2)))));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} — full view`}
      onClick={onClose}
      className="fixed inset-0 z-[80] flex flex-col bg-ink/85 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none"
      style={{ opacity: entered ? 1 : 0 }}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <p className="min-w-0 truncate text-sm font-semibold tracking-wide text-secondary">
          {item.title}
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Zoom out"
            className="rounded-full border border-secondary/30 p-2 text-secondary transition hover:bg-secondary/10"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center text-xs text-secondary/80">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Zoom in"
            className="rounded-full border border-secondary/30 p-2 text-secondary transition hover:bg-secondary/10"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full border border-secondary/30 p-2 text-secondary transition hover:bg-secondary/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        className="flex-1 overflow-auto px-4 pb-4 sm:px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto grid min-h-full place-items-center">
          <img
            src={item.src}
            alt={item.alt}
            className="max-h-[70vh] w-auto max-w-full origin-center rounded-lg bg-card object-contain shadow-lift transition-transform duration-300 motion-reduce:transition-none"
            style={{
              transform: `scale(${entered ? zoom : 0.92})`,
            }}
          />
        </div>
      </div>

      <div
        className="flex flex-wrap items-center justify-center gap-3 border-t border-secondary/15 px-4 py-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            onClose();
            onEnquire(item.intent, "Enquire Now", "Enquire Now", ENQUIRY_COPY);
          }}
          className="rounded-md bg-gold px-6 py-2.5 text-xs font-bold tracking-widest text-ink uppercase shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
        >
          Enquire Now
        </button>
        <a
          href={item.src}
          download
          className="inline-flex items-center gap-2 rounded-md border border-secondary/40 px-6 py-2.5 text-xs font-bold tracking-widest text-secondary uppercase transition hover:bg-secondary/10"
        >
          <Download className="h-4 w-4" /> Download Floor Plan
        </a>
      </div>
    </div>
  );
}

export function SitePlanSection({ onEnquire }: Props) {
  const [viewing, setViewing] = useState<Viewing | null>(null);
  const close = useCallback(() => setViewing(null), []);

  return (
    <section
      id="plans"
      className="bg-background pt-10 pb-8 sm:pt-12 sm:pb-10"
      aria-labelledby="site-plan-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="reveal mx-auto max-w-2xl text-center" data-reveal>
          <p className="eyebrow text-gold">Plans</p>
          <h2
            id="site-plan-heading"
            className="mt-3 text-3xl leading-tight text-foreground sm:text-4xl"
          >
            Site &amp; Floor Plan
          </h2>
          <div className="hairline mx-auto mt-5 w-24" />
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Explore the master plan and thoughtfully designed residences
          </p>
        </div>

        {/* Floor plans */}
        <p className="reveal mt-12 text-center eyebrow text-primary" data-reveal>
          Floor Plans
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {UNIT_PLANS.map((p, i) => (
            <button
              type="button"
              key={p.title}
              onClick={() =>
                onEnquire(
                  p.title,
                  "Submit Enquiry",
                  `${p.title} floor plan`,
                  "Share your details and our sales desk will send the detailed floor plan right away.",
                )
              }
              className="reveal group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card text-left shadow-soft transition duration-500 hover:scale-[1.02] hover:shadow-lift motion-reduce:transform-none"
              data-reveal
              data-reveal-delay={(i + 1) * 120}
            >
              <span className="relative block flex-1 overflow-hidden bg-secondary">
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-56 w-full scale-105 object-contain blur-sm transition duration-700 select-none group-hover:blur-[2px] motion-reduce:transform-none motion-reduce:transition-none"
                  draggable={false}
                />
                <span className="pointer-events-none absolute inset-0 grid place-items-center bg-ink/0 opacity-0 transition duration-500 group-hover:bg-ink/45 group-hover:opacity-100 motion-reduce:transition-none">
                  <span className="rounded-md border border-secondary/70 px-5 py-2.5 text-xs font-bold tracking-widest text-secondary uppercase">
                    Enquire Now
                  </span>
                </span>
              </span>
              <span className="block bg-[linear-gradient(90deg,#544573_0%,#56436f_55%,#3d3258_100%)] px-5 py-3.5 text-center">
                <span className="block text-lg font-semibold tracking-wide text-white">
                  {p.label}
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* Master plan */}
        <button
          type="button"
          onClick={() =>
            setViewing({ ...MASTER_PLAN, intent: "master-plan" })
          }
          className="reveal group mx-auto mt-10 block w-full max-w-3xl overflow-hidden rounded-xl bg-card text-left shadow-soft transition duration-500 hover:shadow-lift"
          data-reveal
          aria-label="View master plan"
        >
          <span className="relative block overflow-hidden bg-secondary">
            <img
              src={MASTER_PLAN.src}
              alt={MASTER_PLAN.alt}
              loading="lazy"
              decoding="async"
              className="mx-auto block max-h-[320px] w-full object-contain transition duration-700 group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
            />
            <span className="pointer-events-none absolute inset-0 grid place-items-center bg-ink/0 opacity-0 transition duration-500 group-hover:bg-ink/40 group-hover:opacity-100 motion-reduce:transition-none">
              <span className="inline-flex items-center gap-2 rounded-md border border-secondary/70 px-6 py-2.5 text-xs font-bold tracking-widest text-secondary uppercase">
                <Maximize2 className="h-4 w-4" /> View Master Plan
              </span>
            </span>
          </span>
        </button>

        <div className="reveal mt-10 text-center" data-reveal>
          <button
            type="button"
            onClick={() =>
              onEnquire(
                "More Floor Plans",
                "Submit Enquiry",
                "Request for more floor plans",
                "Share your details and our sales desk will send the complete floor plan set for every configuration.",
              )
            }
            className="inline-flex items-center justify-center rounded-md border border-primary px-8 py-3.5 text-xs font-bold tracking-widest text-primary uppercase transition hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground hover:shadow-lift"
          >
            Request for More Floor Plans
          </button>
        </div>
      </div>

      {viewing ? (
        <PlanLightbox item={viewing} onClose={close} onEnquire={onEnquire} />
      ) : null}
    </section>
  );
}
