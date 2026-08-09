import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { Phone, Sparkles } from "lucide-react";

import { PROJECT } from "@/components/vyomora/data";
import { LOGO_URL } from "@/components/vyomora/logo";

export const Route = createFileRoute("/thankyou/html")({
  head: () => ({
    meta: [
      { title: "Thank you — Vyomora Hinjawadi Phase 1" },
      {
        name: "description",
        content:
          "Thank you for enquiring about Vyomora, Hinjawadi Phase 1. Our sales desk will contact you shortly.",
      },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "Thank you — Vyomora Hinjawadi Phase 1" },
      {
        property: "og:description",
        content:
          "Thank you for enquiring about Vyomora, Hinjawadi Phase 1. Our sales desk will contact you shortly.",
      },
    ],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {


  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border bg-card/95">
        <div className="mx-auto flex max-w-6xl items-center px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center">
            <img src={LOGO_URL} alt="Shapoorji Pallonji Vyomora, Hinjawadi" className="h-11 w-auto" />
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h1 className="mt-6 text-3xl text-foreground sm:text-4xl">You're All Set!</h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Thanks you for expressing interest on our website. Our expert will get in touch with you
            shortly.
          </p>
          <p className="mt-6 text-sm font-semibold text-gold">Get pick and drop service</p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 sm:w-auto"
            >
              ← Go Back To Home
            </Link>
            <a
              href={`tel:${PROJECT.phone}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-accent sm:w-auto"
            >
              <Phone className="h-4 w-4" /> {PROJECT.phoneDisplay}
            </a>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        {PROJECT.firm} · {PROJECT.location}
      </footer>
    </div>
  );
}
