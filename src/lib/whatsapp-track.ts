import { trackWhatsappClick } from "@/lib/analytics.functions";

const SECTION_IDS = ["top", "overview", "pricing", "floor-plans", "amenities", "gallery", "location", "experience"];

/** The section id closest to the middle of the viewport, i.e. what the visitor was looking at. */
function currentSection(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const mid = window.innerHeight / 2;
  let best: { id: string; distance: number } | undefined;
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    const distance = rect.top <= mid && rect.bottom >= mid ? 0 : Math.min(Math.abs(rect.top - mid), Math.abs(rect.bottom - mid));
    if (!best || distance < best.distance) best = { id, distance };
  }
  return best?.id;
}

function scrollDepth(): number {
  if (typeof document === "undefined") return 0;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollable <= 0) return 100;
  return Math.max(0, Math.min(100, Math.round((window.scrollY / scrollable) * 100)));
}

/** Fire-and-forget WhatsApp click tracking; never blocks the outgoing link. */
export function trackWhatsapp(source: string, unit?: string) {
  if (typeof window === "undefined") return;
  void trackWhatsappClick({
    data: {
      source,
      section: currentSection(),
      unit,
      scrollDepth: scrollDepth(),
      device: window.innerWidth < 1024 ? "mobile" : "desktop",
      path: window.location.pathname,
    },
  }).catch(() => {});
}
