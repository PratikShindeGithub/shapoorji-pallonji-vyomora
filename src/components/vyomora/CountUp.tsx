import { useEffect, useRef, useState } from "react";

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function CountUp({
  target,
  duration = 1800,
  suffix = "+",
  className,
}: {
  target: number;
  duration?: number;
  suffix?: string;
  className?: string;
}) {
  const [value, setValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
            const start = performance.now();
            let raf: number;

            const tick = (now: number) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = easeOutCubic(progress);
              setValue(Math.round(eased * target));

              if (progress < 1) {
                raf = requestAnimationFrame(tick);
              } else {
                setFinished(true);
              }
            };

            raf = requestAnimationFrame(tick);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.3 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
    };
  }, [target, duration, hasStarted]);

  return (
    <span ref={ref} className={className}>
      {value}
      {finished ? suffix : ""}
    </span>
  );
}
