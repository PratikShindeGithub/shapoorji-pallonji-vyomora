import { createFileRoute, Link } from "@tanstack/react-router";

import { PROJECT } from "@/components/vyomora/data";
import { LOGO_URL, SP_LOGO_URL } from "@/components/vyomora/logo";

export const Route = createFileRoute("/privacy-policy.html")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Vyomora Hinjawadi Phase 1" },
      {
        name: "description",
        content:
          "How we collect, use, store and protect the personal information you share while enquiring about Vyomora, Hinjawadi Phase 1.",
      },
      { property: "og:title", content: "Privacy Policy — Vyomora Hinjawadi Phase 1" },
      {
        property: "og:description",
        content:
          "How we collect, use, store and protect the personal information you share while enquiring about Vyomora, Hinjawadi Phase 1.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://shapoorjipallonjivyomora.site/privacy-policy.html" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "canonical", href: "https://shapoorjipallonjivyomora.site/privacy-policy.html" },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return <LegalPage />;
}

function LegalPage() {
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
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: 9 August 2026
        </p>

        <div className="mt-8 space-y-7 text-sm leading-relaxed text-foreground/80">
          <section>
            <h2 className="text-lg font-semibold text-foreground">1. About this policy</h2>
            <p className="mt-2">
              This website is operated by HomeLogic Pvt Ltd, an authorised marketing partner for the
              project {PROJECT.name}. This policy explains what personal information we collect through
              this website, why we collect it, how we use it, and the choices available to you.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">2. Information we collect</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Details you submit in our enquiry forms: name, mobile number, email address and current city.</li>
              <li>The unit configuration or content you expressed interest in.</li>
              <li>
                Technical and usage data collected automatically, such as IP address, browser type,
                device type, pages viewed, referring URL and time spent on pages.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">3. How we use your information</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>To contact you by phone, SMS, WhatsApp or email about your enquiry.</li>
              <li>To share pricing, cost sheets, floor plans, brochures and site-visit arrangements.</li>
              <li>To send you updates about the project, offers and related developments.</li>
              <li>To improve the website, measure advertising performance and prevent misuse.</li>
            </ul>
            <p className="mt-2">
              By submitting an enquiry you consent to being contacted on the mobile number and email ID
              you provide, including where that number is registered on DND/NDNC.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">4. Cookies and advertising</h2>
            <p className="mt-2">
              We use cookies and similar technologies, including services such as Google Analytics and
              Google Ads, to understand traffic and measure conversions. These partners may set cookies
              to attribute enquiries to advertisements and to show you relevant ads on other websites.
              You can disable cookies in your browser settings, though some features may then not work
              as intended.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">5. Sharing your information</h2>
            <p className="mt-2">
              We share your details with the project developer and their authorised sales team, and with
              service providers who help us operate this website, host data, send emails or run
              advertising. We do not sell your personal information. We may disclose information where
              required by law or to protect our legal rights.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">6. Data retention and security</h2>
            <p className="mt-2">
              We retain enquiry data for as long as needed to serve your request and to meet legal or
              record-keeping requirements. We apply reasonable technical and organisational safeguards,
              but no method of transmission or storage over the internet is completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">7. Your choices</h2>
            <p className="mt-2">
              You may ask us to access, correct or delete your personal information, or to stop
              contacting you, by writing to{" "}
              <a href={`mailto:${PROJECT.email}`} className="text-primary hover:underline">
                {PROJECT.email}
              </a>
              . We will act on valid requests within a reasonable period.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">8. Third-party links</h2>
            <p className="mt-2">
              This website may link to third-party sites, including the MahaRERA portal and the
              developer's website. We are not responsible for the privacy practices or content of those
              sites.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">9. Changes and contact</h2>
            <p className="mt-2">
              We may update this policy from time to time; the revised version will be posted on this
              page. For any privacy questions, contact us at{" "}
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
