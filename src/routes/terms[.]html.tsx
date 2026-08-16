import { createFileRoute, Link } from "@tanstack/react-router";

import { PROJECT } from "@/components/vyomora/data";
import { LOGO_URL, SP_LOGO_URL } from "@/components/vyomora/logo";

export const Route = createFileRoute("/terms.html")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Vyomora Hinjawadi Phase 1" },
      {
        name: "description",
        content:
          "Terms and conditions governing your use of this Vyomora Hinjawadi Phase 1 information website and the enquiries you submit through it.",
      },
      { property: "og:title", content: "Terms & Conditions — Vyomora Hinjawadi Phase 1" },
      {
        property: "og:description",
        content:
          "Terms and conditions governing your use of this Vyomora Hinjawadi Phase 1 information website and the enquiries you submit through it.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://shapoorjipallonjivyomora.site/terms.html" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://shapoorjipallonjivyomora.site/terms.html" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border bg-card/95">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={SP_LOGO_URL} alt="Shapoorji Pallonji Real Estate" className="h-10 w-auto" />
            <span className="h-8 w-px bg-border" aria-hidden="true" />
            <img src={LOGO_URL} alt="Shapoorji Pallonji Vyomora, Hinjawadi" className="h-10 w-auto" />
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12 sm:px-6">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Terms &amp; Conditions</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: 9 August 2026</p>

        <div className="mt-8 space-y-7 text-sm leading-relaxed text-foreground/80">
          <section>
            <h2 className="text-lg font-semibold text-foreground">1. Acceptance</h2>
            <p className="mt-2">
              By accessing or using this website, you agree to these terms. This website is operated by
              HomeLogic Pvt Ltd, an authorised marketing partner for the project {PROJECT.name}. If you
              do not agree with these terms, please do not use this website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">2. Informational purpose only</h2>
            <p className="mt-2">
              All content on this website is for general information. Nothing here constitutes an offer,
              invitation to offer, or a contract of any kind. Any prospective sale will be governed
              solely by the terms of the Agreement for Sale executed between the parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">3. Prices, plans and images</h2>
            <p className="mt-2">
              Prices, carpet areas, layouts, specifications, amenities, payment plans and availability
              are indicative and subject to change without prior notice. Images, renders, walkthroughs
              and videos are artistic impressions and may not represent the actual property. Furniture,
              fittings and landscaping shown are not part of the standard offering unless expressly
              stated in the Agreement for Sale.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">4. Independent verification</h2>
            <p className="mt-2">
              Before taking any purchase decision, you are requested to independently verify all
              project details and documents, directly or through your legal and financial advisors,
              including the MahaRERA registration and approved plans. The project is registered with
              MahaRERA under No. PR1260002600999, available at maharera.maharashtra.gov.in.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">5. Enquiries and communication</h2>
            <p className="mt-2">
              By submitting your details through any form on this website, you authorise us and the
              developer's authorised sales team to contact you by call, SMS, WhatsApp or email regarding
              your enquiry and related project updates, including on numbers registered under DND/NDNC.
              You confirm the information you provide is accurate and belongs to you.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">6. Intellectual property</h2>
            <p className="mt-2">
              The content, design, layout, graphics, logos and data on this website are protected by
              copyright and other intellectual property rights. Unauthorised use, copying or
              reproduction may attract legal consequences. All trademarks and brand names belong to
              their respective owners.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">7. Limitation of liability</h2>
            <p className="mt-2">
              This website is provided on an "as is" basis without warranties of any kind. We are not
              liable for any direct or indirect loss arising from reliance on the content of this
              website, from errors or omissions, or from unavailability of the website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">8. Third-party links</h2>
            <p className="mt-2">
              Links to third-party websites are provided for convenience. We do not control and are not
              responsible for their content, availability or practices.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">9. Governing law and contact</h2>
            <p className="mt-2">
              These terms are governed by the laws of India, with courts at Pune having exclusive
              jurisdiction. For any queries, contact{" "}
              <a href={`mailto:${PROJECT.email}`} className="text-primary hover:underline">
                {PROJECT.email}
              </a>{" "}
              or {PROJECT.phoneDisplay}.
            </p>
          </section>
        </div>

        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            ← Go Back To Home
          </Link>
        </div>
      </main>
    </div>
  );
}
