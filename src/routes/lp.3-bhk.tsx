import { createFileRoute } from "@tanstack/react-router";

import { VyomoraLanding } from "@/components/vyomora/VyomoraLanding";
import { CONFIGS } from "@/components/vyomora/data";
import { UNIT_PLANS_3BHK } from "@/components/vyomora/site-plans";
import { HERO_SLIDES } from "@/components/vyomora/logo";

const THREE_BHK_CONFIGS = CONFIGS.filter(
  (c) => c.type === "3 BHK Premium" || c.type === "3 BHK Imperial",
);

const TITLE = "Shapoorji Pallonji Vyomora \n Luxury 3 BHK Apartments in Hinjawadi Phase 1";
const DESCRIPTION =
  "Luxury 3 BHK residences at Shapoorji Pallonji Vyomora, Hinjawadi Phase 1, Pune. 1,050 - 1,186 sq.ft. carpet, ₹1.36 Cr* onwards. Request 3 BHK cost sheet.";

export const Route = createFileRoute("/lp/3-bhk")({
  component: ThreeBhkLanding,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://shapoorjipallonjivyomora.site/lp/3-bhk" },
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

const THREE_BHK_HIGHLIGHTS = [
  { value: "160+", label: "Years of Excellence" },
  { value: "3", label: "BHK Premium & Imperial Residences" },
  { value: "85+", label: "Curated amenities" },
  { value: "25", label: "Acre integrated community" },
];

function ThreeBhkLanding() {
  return (
    <VyomoraLanding
      showNav={false}
      configs={THREE_BHK_CONFIGS}
      plans={UNIT_PLANS_3BHK}
      highlights={THREE_BHK_HIGHLIGHTS}
      formCta="Request 3 BHK All-Inclusive Cost Sheet"
      interestedVariant="3 BHK"
      heading={TITLE}
      heroBadge="Exclusive 3 BHK Apartments"
      startingPrice="₹1.36 Cr*"
      whatsappMessage="Hi, I'd like details about 3 BHK at Vyomora, Hinjawadi Phase 1."
      priceCtaFocusesForm
      heroCtaLabel="Get 3 BHK Cost Sheet"
      heroCtaFocusesForm
      staticHighlights
      indianMobileOnly
    />
  );
}
