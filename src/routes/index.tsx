import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BedDouble,
  Building2,
  CalendarCheck,
  Download,
  Dumbbell,
  Flower2,
  Gamepad2,
  Laptop,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  Trees,
  Trophy,
  Waves,
  X,
} from "lucide-react";

import { LeadForm, type LeadValues } from "@/components/vyomora/LeadForm";
import { FLOOR_PLAN_URL } from "@/components/vyomora/floor-plan";
import { COST_SHEET_IMAGE } from "@/components/vyomora/cost-sheet";

import {
  AMENITIES,
  CONFIGS,
  FAQS,
  HIGHLIGHTS,
  LOCATION_GROUPS,
  PROJECT,
} from "@/components/vyomora/data";
import {
  HERO_FACTS,
  HERO_STRIPS,
  NAV_ITEMS,
  PROMISES,
} from "@/components/vyomora/layout-data";

import { GALLERY_ITEMS } from "@/components/vyomora/gallery";
import plan2 from "@/assets/plan-2bhk.jpg";
import plan3 from "@/assets/plan-3bhk.jpg";
import planDuplex from "@/assets/plan-duplex.jpg";
import { LOGO_URL, SP_LOGO_URL } from "@/components/vyomora/logo";
import { HeroSlideshow } from "@/components/vyomora/HeroSlideshow";
import ProjectVideo from "@/components/vyomora/ProjectVideo";


export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        title: "Vyomora Hinjawadi Phase 1 | 2 & 3 BHK from ₹84.99 L*",
      },
      {
        name: "description",
        content:
          "Vyomora, a 25-acre township in Hinjawadi Phase 1, Pune. 2 & 3 BHK apartments and duplexes from ₹84.99 Lakhs*. Get the cost sheet, floor plans and site visit slot.",
      },
      {
        property: "og:title",
        content: "Vyomora Hinjawadi Phase 1 | 2 & 3 BHK from ₹84.99 L*",
      },
      {
        property: "og:description",
        content:
          "25-acre township in Hinjawadi Phase 1, Pune. Premium 2 & 3 BHK homes and duplexes with 40+ amenities. Request the price breakup today.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
});

const AMENITY_ICONS = [
  Building2,
  Waves,
  Dumbbell,
  Gamepad2,
  Flower2,
  Trophy,
  Laptop,
  Sparkles,
];





const GALLERY = GALLERY_ITEMS;

const PLANS = [
  { title: "2 BHK · 718 sq.ft.", src: plan2 },
  { title: "3 BHK · 1,145 sq.ft.", src: plan3 },
  { title: "3 BHK Duplex · 1,680 sq.ft.", src: planDuplex },
];

/* ---------- helpers ---------- */

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nodes = Array.from(el.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const delay = Number(target.dataset["revealDelay"] ?? 0);
            window.setTimeout(() => target.setAttribute("data-visible", "true"), delay);
            io.unobserve(target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return ref;
}


function Modal({
  open,
  onClose,
  children,
  label,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  label: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="animate-scale-in relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-card p-6 shadow-lift sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
}

function SectionHead({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="reveal mx-auto max-w-2xl text-center" data-reveal>
      <p className="eyebrow text-gold">{eyebrow}</p>
      <h2 className="mt-3 text-3xl leading-tight text-foreground sm:text-4xl">{title}</h2>
      <div className="hairline mx-auto mt-5 w-24" />
      {copy ? <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{copy}</p> : null}
    </div>
  );
}

/* ---------- page ---------- */

function Index() {
  const pageRef = useReveal<HTMLDivElement>();
  const navigate = useNavigate();
  const [modal, setModal] = useState<null | { intent: string; cta: string; title: string; copy: string }>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openEnquiry = useCallback(
    (intent: string, cta = "Submit Enquiry", title = "Request project details", copy = "Share your details and our sales desk will send the cost sheet, floor plans and brochure within minutes.") =>
      setModal({ intent, cta, title, copy }),
    [],
  );





  const [welcome, setWelcome] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setWelcome(true), 1500);
    return () => window.clearTimeout(id);
  }, []);

  const handleSuccess = (values: LeadValues) => {
    setModal(null);
    setWelcome(false);
    navigate({
      to: "/thankyou.html",
      state: { name: values.name, email: values.email, mobile: values.mobile } as any,
    });
  };


  return (
    <div ref={pageRef} className="min-h-screen bg-background text-foreground xl:pr-[22rem]">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50">


        
        <div
          className={`border-b transition-all duration-300 ${
            scrolled
              ? "border-border bg-background/95 shadow-soft backdrop-blur"
              : "border-border bg-background/95 shadow-soft backdrop-blur lg:border-transparent lg:bg-gradient-to-b lg:from-ink/80 lg:to-transparent lg:shadow-none"
          }`}
        >
          <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6">
            <a href="#top" className="flex min-w-0 items-center gap-2 sm:gap-3">
              <img
                src={SP_LOGO_URL}
                alt="Shapoorji Pallonji Real Estate"
                className={`h-10 w-auto shrink-0 sm:h-12 ${
                  scrolled ? "" : "lg:rounded-md lg:bg-secondary/95 lg:p-1"
                }`}
              />
              <span
                className={`h-8 w-px shrink-0 ${scrolled ? "bg-border" : "bg-border lg:bg-secondary/40"}`}
                aria-hidden="true"
              />
              <img
                src={LOGO_URL}
                alt="Shapoorji Pallonji Vyomora, Hinjawadi"
                className={`h-11 w-auto shrink-0 transition sm:h-12 ${
                  scrolled ? "" : "lg:brightness-0 lg:invert"
                }`}
              />
            </a>
            <div className="flex items-center gap-2">
              <a
                href={`tel:${PROJECT.phone}`}
                className={`hidden items-center gap-2 rounded-md border px-4 py-2 text-xs font-semibold transition sm:inline-flex ${
                  scrolled
                    ? "border-border text-foreground hover:border-gold"
                    : "border-secondary/40 text-secondary hover:border-gold hover:text-gold"
                }`}
              >
                <Phone className="h-3.5 w-3.5" /> Call Now
              </a>
              <button
                onClick={() =>
                  openEnquiry(
                    "site-visit-header",
                    "Organize Site Visit",
                    "Organize a site visit",
                    "Pick a slot and we'll arrange complimentary cab pickup anywhere in Pune.",
                  )
                }
                className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-primary px-2.5 py-1.5 text-[10px] font-semibold leading-tight text-primary-foreground transition hover:bg-primary/90 sm:gap-2 sm:px-4 sm:py-2 sm:text-xs"
              >
                <CalendarCheck className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" /> Organize Site Visit
              </button>

            </div>
          </div>
          {/* Icon nav rail */}
          <nav
            aria-label="Section navigation"
            className={`hidden border-t lg:block ${
              scrolled ? "border-border bg-card/95" : "border-secondary/15 bg-ink/70 backdrop-blur"
            }`}
          >
            <ul className="mx-auto flex max-w-6xl items-stretch px-4 sm:px-6">
              {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    className={`inline-flex items-center gap-2 px-4 py-3 text-xs font-semibold tracking-wide transition ${
                      scrolled
                        ? "text-foreground hover:text-primary"
                        : "text-secondary/85 hover:text-gold"
                    }`}
                  >
                    <Icon className="h-4 w-4 text-gold" /> {label}
                  </a>
                </li>
              ))}
              <li className="ml-auto">
                <button
                  onClick={() =>
                    openEnquiry("nav-brochure", "Send Brochure", "Download the brochure", "The complete Vyomora brochure will reach your email and WhatsApp instantly.")
                  }
                  className="cta-blink inline-flex h-full items-center gap-2 px-5 text-xs font-bold transition"
                >
                  <Download className="icon-nudge h-4 w-4" /> Download Brochure
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section
        id="top"
        className="relative isolate overflow-hidden pt-[72px] lg:flex lg:min-h-screen lg:items-center lg:pt-0"
      >
        <HeroSlideshow />

        <div className="absolute inset-0 hidden bg-gradient-to-r from-ink/75 via-ink/35 to-transparent lg:block" />
        <div className="relative w-full lg:px-4 lg:pb-16 lg:pt-44 lg:sm:px-6">
          <div className="mx-auto grid w-full max-w-6xl gap-6 lg:gap-8">
            {/* Reference-style project fact card */}
            <div
              className="reveal w-full overflow-hidden border-y border-gold/25 bg-card text-center lg:max-w-sm lg:rounded-xl lg:border lg:bg-card/92 lg:shadow-lift lg:backdrop-blur"
              data-reveal
            >
              <p className="eyebrow bg-primary py-3 text-primary-foreground lg:bg-primary/10 lg:text-primary">
                Booking Open
              </p>
              <div className="px-6 pb-6 pt-5">
                <h1 className="font-display text-4xl leading-none text-foreground sm:text-5xl">
                  Vyomora
                </h1>
                <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-gold" /> {PROJECT.location}
                </p>
                <ul className="mt-6 space-y-2 border-y border-border bg-muted/40 py-5 text-sm text-foreground">
                  {HERO_FACTS.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <div className="mt-5 space-y-1.5">
                  {HERO_STRIPS.map((s, i) => (
                    <p
                      key={s}
                      style={{ animationDelay: `${i * 0.35}s` }}
                      className="strip-blink rounded-sm px-3 py-2 text-[11px] font-semibold tracking-wide"
                    >
                      {s}
                    </p>
                  ))}
                </div>
                <p className="mt-5 text-sm text-muted-foreground">
                  Luxurious 2 &amp; 3 BHK Apartments &amp; Duplexes
                </p>
                <p className="text-xs tracking-wide text-muted-foreground">Starting Price</p>
                <p className="mt-1 font-display text-3xl text-gold sm:text-4xl">
                  {PROJECT.startingPrice} Onwards
                </p>
                <button
                  onClick={() => openEnquiry("hero-card")}
                  className="mt-5 w-full rounded-md bg-gold py-3 text-sm font-bold text-gold-foreground transition hover:-translate-y-0.5 hover:shadow-lift"
                >
                  Enquire Now
                </button>
              </div>
            </div>

            {/* Price breakup form — inline on smaller screens, fixed panel on xl+ */}
            <div
              className="reveal w-full border-y border-gold/25 bg-card p-5 sm:p-7 lg:max-w-md lg:rounded-xl lg:border lg:bg-card/95 lg:shadow-lift lg:backdrop-blur xl:hidden"
              data-reveal
              data-reveal-delay="120"
            >
              <h2 className="text-xl text-foreground">Get the exact price breakup</h2>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Floor-wise pricing, charges, payment plan and brochure — sent instantly.
              </p>
              <div className="mt-5">
                <LeadForm intent="hero" withCity onSuccess={handleSuccess} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Persistent price-breakup panel (desktop) — visible across the whole page */}
      <aside className="fixed right-4 top-[10.5rem] z-[45] hidden max-h-[calc(100vh-12rem)] w-[20rem] overflow-y-auto rounded-xl border border-gold/25 bg-card/95 p-5 shadow-lift backdrop-blur xl:block">
        <h2 className="text-lg text-foreground">Get the exact price breakup</h2>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          Floor-wise pricing, charges, payment plan and brochure — sent instantly.
        </p>
        <div className="mt-4">
          <LeadForm intent="sticky-panel" withCity onSuccess={handleSuccess} />
        </div>
        <div className="mt-4 flex items-center justify-center gap-3 border-t border-border pt-4">
          <a
            href={`https://wa.me/${PROJECT.whatsapp}?text=${encodeURIComponent("Hi, I'd like details about Vyomora, Hinjawadi Phase 1.")}`}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift transition hover:-translate-y-0.5 hover:bg-gold hover:text-gold-foreground"
          >
            <MessageCircle className="h-4.5 w-4.5" />
          </a>
          <a
            href={`tel:${PROJECT.phone}`}
            aria-label="Call"
            className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift transition hover:-translate-y-0.5 hover:bg-gold hover:text-gold-foreground"
          >
            <Phone className="h-4.5 w-4.5" />
          </a>
          <button
            onClick={() =>
              openEnquiry("brochure", "Send Brochure", "Get the brochure", "The complete Vyomora brochure will be sent to your email and WhatsApp.")
            }
            aria-label="Brochure"
            className="grid h-11 w-11 place-items-center rounded-full bg-gold text-gold-foreground shadow-lift transition hover:-translate-y-0.5"
          >
            <Trees className="h-4.5 w-4.5" />
          </button>
        </div>
      </aside>




      {/* Highlights */}
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-4 py-12 sm:px-6 lg:grid-cols-4">
          {HIGHLIGHTS.map((h, i) => (
            <div
              key={h.label}
              className="reveal text-center"
              data-reveal
              data-reveal-delay={i * 90}
            >
              <p className="font-display text-3xl text-primary sm:text-4xl">{h.value}</p>
              <p className="mt-2 text-xs leading-relaxed text-secondary-foreground/70">
                {h.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHead
          eyebrow="Configurations"
          title="Choose the home that fits your life"
          copy="Efficient layouts with wide living spaces, deep balconies and cross-ventilation across every tower."
        />
        <div className="mt-14 flex flex-col gap-10">
          {/* Mobile cards */}
          <div className="reveal grid gap-5 sm:hidden" data-reveal>
            {CONFIGS.map((c) => (
              <div
                key={c.type}
                className="rounded-xl border border-border bg-muted/40 px-5 py-7 text-center shadow-soft"
              >
                <p className="font-display text-3xl text-foreground">{c.type}</p>
                <p className="mt-3 text-base text-muted-foreground">
                  {c.area} <span className="text-sm">(Carpet Area)</span>
                </p>
                <p className="mt-2 font-display text-xl text-primary">{c.price} Onwards</p>
                <button
                  onClick={() =>
                    openEnquiry(
                      `cost-sheet-${c.type}`,
                      "Know More",
                      `Price breakup — ${c.type}`,
                      "We'll send the detailed cost sheet with all charges and the payment schedule.",
                    )
                  }
                  className="mt-5 w-full rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition"
                >
                  Know More
                </button>
              </div>
            ))}
          </div>

          <div className="reveal hidden overflow-hidden rounded-xl border border-border bg-card shadow-soft sm:block" data-reveal>
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:px-6">
                    Type
                  </th>
                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:px-6">
                    Carpet Area
                  </th>
                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:px-6">
                    Price
                  </th>
                  <th className="px-4 py-4 text-right text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:px-6">
                    Price Breakup
                  </th>
                </tr>
              </thead>
              <tbody>
                {CONFIGS.map((c, i) => (
                  <tr
                    key={c.type}
                    className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-muted/40" : ""}`}
                  >
                    <td className="px-4 py-5 align-middle text-sm font-semibold text-foreground sm:px-6">
                      {c.type}
                    </td>
                    <td className="px-4 py-5 align-middle text-sm text-muted-foreground sm:px-6">
                      {c.area}
                    </td>
                    <td className="px-4 py-5 align-middle sm:px-6">
                      <span className="font-display text-lg text-primary sm:text-xl">
                        {c.price} Onwards
                      </span>
                    </td>
                    <td className="px-4 py-5 text-right align-middle sm:px-6">
                      <button
                        onClick={() =>
                          openEnquiry(
                            `cost-sheet-${c.type}`,
                            "Know More",
                            `Price breakup — ${c.type}`,
                            "We'll send the detailed cost sheet with all charges and the payment schedule.",
                          )
                        }
                        className="w-32 shrink-0 rounded-md bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-soft transition hover:-translate-y-0.5"
                      >
                        Know More
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="reveal mx-auto w-full max-w-sm overflow-hidden rounded-xl border border-border bg-card shadow-soft" data-reveal data-reveal-delay="120">
            <img
              src={COST_SHEET_IMAGE}
              alt="Sample Vyomora cost sheet with detail sheet and payment schedule"
              loading="lazy"
              width={1024}
              height={768}
              className="h-40 w-full border-b border-border object-cover"
            />

            <button
              onClick={() =>
                openEnquiry(
                  "complete-costing",
                  "Request Complete Costing Details",
                  "Complete costing details",
                  "Get the full detail sheet and payment schedule for your preferred configuration.",
                )
              }
              className="cta-blink w-full px-5 py-4 text-sm font-semibold tracking-wide transition hover:-translate-y-0.5"
            >
              Request Complete Costing Details
            </button>
          </div>
        </div>

        <p className="reveal mt-8 text-center text-[11px] text-muted-foreground" data-reveal>
          {PROJECT.reraNote}
        </p>
      </section>

      {/* Amenities */}
      <section id="amenities" className="bg-ink py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="reveal mx-auto max-w-2xl text-center" data-reveal>
            <p className="eyebrow text-gold">Amenities</p>
            <h2 className="mt-3 text-3xl leading-tight text-secondary sm:text-4xl">
              Forty-Plus Reasons to Stay In
            </h2>
            <div className="hairline mx-auto mt-5 w-24" />
          </div>
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {AMENITIES.map((a, i) => {
              const Icon = AMENITY_ICONS[i % AMENITY_ICONS.length]!;
              return (
                <div
                  key={a.name}
                  className="reveal group rounded-lg border border-secondary/15 p-5 transition duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:bg-secondary/5"
                  data-reveal
                  data-reveal-delay={i * 70}
                >
                  <Icon className="h-6 w-6 text-gold transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="mt-4 text-base text-secondary">{a.name}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-secondary/60">{a.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Floor plans */}
      <section id="plans" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHead
          eyebrow="Floor plans"
          title="See Every Square foot Before you Decide"
          copy="Enquire now and our sales desk will share the complete plan set instantly."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {PLANS.map((p, i) => (
            <button
              key={p.title}
              onClick={() =>
                openEnquiry(
                  `floor-plan-${p.title}`,
                  "Enquire Now",
                  "Enquire Now",
                  "Share your details and our sales desk will send the complete floor plan set for every configuration.",
                )
              }
              className="reveal group overflow-hidden rounded-xl border border-border bg-card text-left shadow-soft transition hover:-translate-y-1.5 hover:shadow-lift"
              data-reveal
              data-reveal-delay={i * 100}
            >
              <span className="relative block overflow-hidden bg-muted">
                <img
                  src={p.src}
                  alt={`${p.title} floor plan layout`}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="h-52 w-full scale-105 object-cover blur-md transition duration-500"
                />
                <span className="absolute inset-0 grid place-items-center bg-ink/45">
                  <span className="cta-blink rounded-md px-5 py-2.5 text-xs font-bold tracking-wide shadow-soft">
                    Enquire Now
                  </span>
                </span>
              </span>
              <span className="block px-5 py-4">
                <span className="block text-sm font-semibold text-foreground">{p.title}</span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  Tap to enquire for plans
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="bg-secondary py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHead eyebrow="Gallery" title="A Closer look at Vyomora" />
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.map((g, i) => (
              <button
                key={g.alt}
                onClick={() => setLightbox(i)}
                className="reveal group relative block aspect-video w-full overflow-hidden rounded-xl shadow-soft"
                data-reveal
                data-reveal-delay={i * 80}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  width={1200}
                  height={675}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section id="location" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHead
          eyebrow="Location"
          title="Hinjawadi Phase 1, where the commute ends"
          copy="Walk-to-work proximity to Pune's largest IT belt, with schools, hospitals and the metro corridor minutes away."
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="reveal overflow-hidden rounded-xl border border-border shadow-soft" data-reveal>
            <iframe
              title="Map of Hinjawadi Phase 1, Pune"
              src="https://www.google.com/maps?q=Hinjawadi%20Phase%201%2C%20Pune&output=embed"
              loading="lazy"
              className="h-[420px] w-full border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {LOCATION_GROUPS.map((g, i) => (
              <div
                key={g.group}
                className="reveal rounded-xl border border-border bg-card p-5"
                data-reveal
                data-reveal-delay={i * 80}
              >
                <h3 className="text-sm font-semibold text-primary">{g.group}</h3>
                <ul className="mt-3 space-y-2 text-xs leading-relaxed text-muted-foreground">
                  {g.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer */}
      <section className="bg-ink py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="reveal" data-reveal>
            <p className="eyebrow text-gold">About the developer</p>
            <h2 className="mt-3 text-3xl leading-tight text-secondary sm:text-4xl">
              Township building, done the patient way
            </h2>
            <div className="hairline mt-5 w-24" />
          </div>
          <div className="reveal space-y-4 text-sm leading-relaxed text-secondary/70" data-reveal data-reveal-delay="100">
            <p>
              Vyomora is planned as an integrated 25-acre neighbourhood rather than a cluster of
              towers — with landscaped spines, a central clubhouse district and internal roads that
              keep vehicles away from where children play.
            </p>
            <p>
              Construction follows RCC shear-wall technology with third-party quality audits at every
              slab, and each phase is handed over tower-by-tower so early residents move into a
              finished, functioning community.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { k: "25", v: "Acres planned" },
                { k: "70%", v: "Open landscape" },
                { k: "RERA", v: "Registered project" },
              ].map((s) => (
                <div key={s.v} className="border-l border-gold/40 pl-3">
                  <p className="font-display text-xl text-gold">{s.k}</p>
                  <p className="mt-1 text-[11px] text-secondary/60">{s.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProjectVideo />



      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHead eyebrow="FAQ" title="Questions buyers ask us most" />
        <div className="mt-12 divide-y divide-border border-y border-border">
          {FAQS.map((f, i) => (
            <details
              key={f.q}
              className="reveal group py-5"
              data-reveal
              data-reveal-delay={i * 60}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-foreground">
                {f.q}
                <span className="shrink-0 text-gold transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border bg-secondary py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="reveal text-3xl leading-tight text-foreground sm:text-4xl" data-reveal>
            Book your site visit at Vyomora
          </h2>
          <p className="reveal mt-4 text-sm text-muted-foreground" data-reveal data-reveal-delay="80">
            Complimentary cab pickup anywhere in Pune. Slots fill fast on weekends.
          </p>
          <div className="reveal mx-auto mt-9 max-w-xl rounded-xl border border-border bg-card p-6 text-left shadow-soft sm:p-8" data-reveal data-reveal-delay="140">
            <LeadForm intent="footer" compact withCity cta="Book Site Visit" onSuccess={handleSuccess} />
          </div>
        </div>
      </section>

      <footer className="bg-ink px-4 py-10 text-center text-[11px] leading-relaxed text-secondary/50 sm:px-6">
        <div className="flex items-center justify-center gap-4">
          <img
            src={SP_LOGO_URL}
            alt="Shapoorji Pallonji Real Estate"
            className="h-14 w-auto rounded-md bg-secondary/95 p-1.5"
          />
          <span className="h-10 w-px bg-secondary/30" aria-hidden="true" />
          <img
            src={LOGO_URL}
            alt="Shapoorji Pallonji Vyomora, Hinjawadi"
            className="h-14 w-auto brightness-0 invert"
          />
        </div>
        <p className="mt-2">{PROJECT.location} · Sales desk {PROJECT.phoneDisplay}</p>
        <p className="mt-1">
          Marketed by {PROJECT.firm} ·{" "}
          <a href={`mailto:${PROJECT.email}`} className="text-gold hover:underline">
            {PROJECT.email}
          </a>
        </p>
        <p className="mx-auto mt-4 max-w-2xl">
          This is an information page for prospective buyers. Images are artistic impressions.
          Prices, areas and amenities are indicative and subject to change without notice.
        </p>
      </footer>

      {/* Floating "Enquire Now" button — visible anywhere on the page after scrolling */}
      <button
        onClick={() => openEnquiry("floating-enquire", "Enquire Now", "Enquire Now", "Share your details and our sales desk will send the cost sheet, floor plans and brochure within minutes.")}
        className={`fixed bottom-20 right-4 z-[45] rounded-full xl:hidden px-5 py-3 text-sm font-bold tracking-wide shadow-lift transition-all duration-300 hover:-translate-y-0.5 lg:bottom-4 ${
          scrolled ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
        } cta-blink`}
        aria-label="Enquire Now"
      >
        Enquire Now
      </button>

      {/* Floating CTAs (desktop) */}
      <div className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex xl:hidden">
        {[
          {
            key: "wa",
            icon: MessageCircle,
            label: "WhatsApp",
            href: `https://wa.me/${PROJECT.whatsapp}?text=${encodeURIComponent("Hi, I'd like details about Vyomora, Hinjawadi Phase 1.")}`,
          },
          { key: "call", icon: Phone, label: "Call", href: `tel:${PROJECT.phone}` },
        ].map(({ key, icon: Icon, label, href }) => (
          <a
            key={key}
            href={href}
            target={key === "wa" ? "_blank" : undefined}
            rel={key === "wa" ? "noreferrer" : undefined}
            aria-label={label}
            className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift transition hover:-translate-y-0.5 hover:bg-gold hover:text-gold-foreground"
          >
            <Icon className="h-4.5 w-4.5" />
          </a>
        ))}
        <button
          onClick={() =>
            openEnquiry("brochure", "Send Brochure", "Get the brochure", "The complete Vyomora brochure will be sent to your email and WhatsApp.")
          }
          aria-label="Brochure"
          className="grid h-11 w-11 place-items-center rounded-full bg-gold text-gold-foreground shadow-lift transition hover:-translate-y-0.5"
        >
          <Trees className="h-4.5 w-4.5" />
        </button>
      </div>

      {/* Sticky mobile bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-border bg-card/95 backdrop-blur lg:hidden">
        <a
          href={`tel:${PROJECT.phone}`}
          className="flex flex-col items-center gap-1 py-3 text-[11px] font-semibold text-foreground"
        >
          <Phone className="h-4 w-4 text-primary" /> Call
        </a>
        <a
          href={`https://wa.me/${PROJECT.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center gap-1 border-x border-border py-3 text-[11px] font-semibold text-foreground"
        >
          <MessageCircle className="h-4 w-4 text-primary" /> WhatsApp
        </a>
        <button
          onClick={() =>
            openEnquiry("mobile-brochure", "Send Brochure", "Download the brochure", "The complete Vyomora brochure will reach your email and WhatsApp instantly.")
          }
          className="cta-blink flex flex-col items-center gap-1 border-r border-border py-3 text-[11px] font-bold"
        >
          <Download className="icon-nudge h-4 w-4" /> Brochure
        </button>
        <button
          onClick={() => openEnquiry("mobile-bar")}
          className="flex flex-col items-center gap-1 bg-gold py-3 text-[11px] font-bold text-gold-foreground"
        >
          <Sparkles className="h-4 w-4" /> Enquire
        </button>
      </div>


      {/* Welcome popup (reference-style 3 column) */}
      {welcome ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Register for best offers"
          className="fixed inset-0 z-[75] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
          onClick={() => setWelcome(false)}
        >
          <div
            className="animate-scale-in relative w-full max-w-2xl overflow-hidden rounded-xl bg-card shadow-lift"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setWelcome(false)}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 rounded-full p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="grid md:grid-cols-[0.8fr_1.2fr]">
              <div className="hidden flex-col items-center gap-6 bg-muted/50 px-5 py-8 text-center md:flex">
                <p className="font-display text-xl text-primary">We Promise</p>
                {PROMISES.map(({ icon: Icon, label }) => (
                  <div key={label} className="space-y-2">
                    <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="text-xs font-semibold text-foreground">{label}</p>
                  </div>
                ))}
              </div>
              <div className="px-6 py-8">
                <p className="text-center font-display text-2xl leading-tight text-foreground">
                  Register here and avail the{" "}
                  <span className="text-gold">best offers!!</span>
                </p>
                <div className="mt-6">
                  <LeadForm intent="welcome" cta="Submit" withCity onSuccess={handleSuccess} />
                </div>
              </div>
            </div>
            <a
              href={`tel:${PROJECT.phone}`}
              className="flex items-center justify-center gap-2 bg-ink py-3 text-sm font-semibold text-secondary transition hover:text-gold"
            >
              <Phone className="h-4 w-4 text-gold" /> {PROJECT.phoneDisplay}
            </a>
          </div>
        </div>
      ) : null}


      {/* Enquiry modal */}
      <Modal open={Boolean(modal)} onClose={() => setModal(null)} label="Enquiry form">
        <p className="eyebrow text-gold">Vyomora</p>
        <h2 className="mt-2 text-2xl text-foreground">{modal?.title}</h2>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{modal?.copy}</p>
        <div className="mt-6">
          <LeadForm
            key={modal?.intent ?? "modal"}
            intent={modal?.intent ?? "modal"}
            cta={modal?.cta ?? "Submit Enquiry"}
            withCity
            onSuccess={handleSuccess}
          />
        </div>
      </Modal>

      {/* Thank you page is a dedicated route at /thankyou.html for conversion tracking */}

      {/* Lightbox */}
      {lightbox !== null ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/90 p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image"
        >
          <button
            aria-label="Close gallery"
            className="absolute right-5 top-5 text-secondary/80 transition hover:text-secondary"
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={GALLERY[lightbox]!.src}
            alt={GALLERY[lightbox]!.alt}
            className="animate-scale-in max-h-[85vh] w-auto max-w-full rounded-lg object-contain"
          />
        </div>
      ) : null}
    </div>
  );
}
