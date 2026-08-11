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
    <div ref={ref} className="w-full">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-gold/25 bg-black shadow-lift">
        {play ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&playsinline=1&rel=0&controls=1&enablejsapi=1`}
            title="Vyomora Hinjawadi project film"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        ) : null}
      </div>
    </div>
  );
}
