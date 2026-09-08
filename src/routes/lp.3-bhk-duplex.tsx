import { createFileRoute } from "@tanstack/react-router";

import { VyomoraLanding } from "@/components/vyomora/VyomoraLanding";
import { CONFIGS } from "@/components/vyomora/data";
import { UNIT_PLANS_DUPLEX } from "@/components/vyomora/site-plans";
import { HERO_SLIDES } from "@/components/vyomora/logo";

const DUPLEX_CONFIGS = CONFIGS.filter((c) => c.type === "3 BHK Duplex");

const TITLE = "Shapoorji Pallonji Vyomora – Exclusive 3 BHK Duplex in Hinjawadi Phase 1";
const DESCRIPTION =
  "Exclusive 3 BHK Duplex residences at Shapoorji Pallonji Vyomora, Hinjawadi Phase 1, Pune. 1,467 sq.ft. carpet, ₹1.96 Cr* onwards. Request exclusive duplex cost sheet.";

export const Route = createFileRoute("/lp/3-bhk-duplex")({
  component: DuplexLanding,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://shapoorjipallonjivyomora.site/lp/3-bhk-duplex" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [
      {
        rel: "preload",
        as: "image",
        type: "image/webp",
        href: HERO_SLIDES[0]!.url,
        imagesrcset: HERO_SLIDES[0]!.srcSet,
        imagesizes: "(max-width: 1023px) 100vw, 55vw",
        fetchpriority: "high",
      } as never,
    ],
  }),
});

const DUPLEX_HIGHLIGHTS = [
  { value: "160+", label: "Years of Excellence" },
  { value: "Duplex", label: "Double-Height Luxury Residences" },
  { value: "85+", label: "Curated amenities" },
  { value: "25", label: "Acre integrated community" },
];

function DuplexLanding() {
  return (
    <VyomoraLanding
      showNav={false}
      configs={DUPLEX_CONFIGS}
      plans={UNIT_PLANS_DUPLEX}
      highlights={DUPLEX_HIGHLIGHTS}
      formCta="Request Duplex All-Inclusive Cost Sheet"
      formTitle="Request 3 BHK Duplex Cost Sheet & Layouts"
      interestedVariant="3 BHK Duplex"
      heading={TITLE}
      heroBadge="Exclusive 3 BHK Duplex Penthouses"
      startingPrice="₹1.96 Cr*"
      carpetAreaCallout="1,467 Sq. Ft. Carpet Area"
      whatsappMessage="Hi, I'd like details about the 3 BHK Duplex at Vyomora, Hinjawadi Phase 1."
      priceCtaFocusesForm
      heroCtaLabel="Get Duplex Cost Sheet"
      heroCtaFocusesForm
      staticHighlights
      indianMobileOnly
    />
  );
}
