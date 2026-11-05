import { createFileRoute } from "@tanstack/react-router";

import { VyomoraLanding } from "@/components/vyomora/VyomoraLanding";
import { CONFIGS } from "@/components/vyomora/data";
import { UNIT_PLANS_2BHK } from "@/components/vyomora/site-plans";
import { HERO_SLIDES } from "@/components/vyomora/logo";

const TWO_BHK_CONFIGS = CONFIGS.filter((c) => c.type.startsWith("2 BHK"));

const HEADING = "Shapoorji Pallonji Vyomora – Luxury 2 BHK Apartments in Hinjawadi Phase 1";
const TITLE = "Shapoorji Pallonji Vyomora | 2 BHK, 749–839 sq.ft. | ₹97 L Onwards";
const DESCRIPTION =
  "Shapoorji Pallonji Vyomora, Hinjawadi Phase 1, Pune: 2 BHK Luxury, 749 sq.ft., ₹97 L onwards; Grand, 779–839 sq.ft., ₹1 Cr onwards. Carpet areas. Enquire now.";

export const Route = createFileRoute("/lp/2-bhk")({
  component: TwoBhkLanding,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://shapoorjipallonjivyomora.site/lp/2-bhk" },
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

const TWO_BHK_HIGHLIGHTS = [
  { value: "160+", label: "Years of Excellence" },
  { value: "2", label: "BHK Luxury & Grand Residences" },
  { value: "85+", label: "Curated amenities" },
  { value: "25", label: "Acre integrated community" },
];

function TwoBhkLanding() {
  return (
    <VyomoraLanding
      showNav={false}
      configs={TWO_BHK_CONFIGS}
      plans={UNIT_PLANS_2BHK}
      highlights={TWO_BHK_HIGHLIGHTS}
      formCta="Request 2 BHK All-Inclusive Cost Sheet"
      interestedVariant="2 BHK"
      heading={HEADING}
      priceCtaFocusesForm
      heroCtaLabel="Get 2 BHK Cost Sheet"
      heroCtaFocusesForm
      staticHighlights
      indianMobileOnly
    />
  );
}
