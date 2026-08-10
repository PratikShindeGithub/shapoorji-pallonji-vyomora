import { useEffect, useRef, useState } from "react";

const VIDEO_ID = "px3uOvvAbas";

export default function ProjectVideo() {
  const ref = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || play) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setPlay(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [play]);

  return (
    <section className="border-t border-gold/15 bg-ink py-12 sm:py-14">
      <div ref={ref} className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <p className="eyebrow text-gold">Project film</p>
          <h2 className="mt-3 text-3xl leading-tight text-secondary sm:text-4xl">
            See Vyomora come to life
          </h2>
          <div className="hairline mx-auto mt-5 w-24" />
        </div>
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-gold/25 bg-black shadow-lift">
          {play ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&loop=1&playlist=${VIDEO_ID}&playsinline=1&rel=0`}
              title="Vyomora Hinjawadi project film"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
