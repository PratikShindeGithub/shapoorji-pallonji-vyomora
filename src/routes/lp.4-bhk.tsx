import { createFileRoute } from "@tanstack/react-router";

import { VyomoraLanding } from "@/components/vyomora/VyomoraLanding";
import { CONFIGS } from "@/components/vyomora/data";
import { UNIT_PLANS_4BHK } from "@/components/vyomora/site-plans";
import { HERO_SLIDES } from "@/components/vyomora/logo";

const FOUR_BHK_CONFIGS = CONFIGS.filter((c) => c.type.startsWith("4 BHK"));

const TITLE = "Shapoorji Pallonji Vyomora – Palatial 4 BHK Residences in Hinjawadi Phase 1";
const DESCRIPTION =
  "Palatial 4 BHK luxury residences at Shapoorji Pallonji Vyomora, Hinjawadi Phase 1, Pune. 1,382 - 2,356 sq.ft. carpet, ₹1.84 Cr* onwards. Request exclusive 4 BHK cost sheet.";

export const Route = createFileRoute("/lp/4-bhk")({
  component: FourBhkLanding,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://shapoorjipallonjivyomora.site/lp/4-bhk" },
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

const FOUR_BHK_HIGHLIGHTS = [
  { value: "160+", label: "Years of Excellence" },
  { value: "4", label: "BHK Luxury & Grand Residences" },
  { value: "85+", label: "Curated amenities" },
  { value: "25", label: "Acre integrated community" },
];

function FourBhkLanding() {
  return (
    <VyomoraLanding
      showNav={false}
      configs={FOUR_BHK_CONFIGS}
      plans={UNIT_PLANS_4BHK}
      highlights={FOUR_BHK_HIGHLIGHTS}
      formCta="Request 4 BHK All-Inclusive Cost Sheet"
      formTitle="Request 4 BHK Cost Sheet & Floor Plans"
      interestedVariant="4 BHK"
      heading={TITLE}
      heroBadge="Exclusive 4 BHK Luxury & Grand Residences"
      startingPrice="₹1.84 Cr*"
      carpetAreaCallout="1,382 – 2,356 Sq. Ft. Carpet Area"
      whatsappMessage="Hi, I'd like details about the 4 BHK at Vyomora, Hinjawadi Phase 1."
      priceCtaFocusesForm
      heroCtaLabel="Get 4 BHK Cost Sheet"
      heroCtaFocusesForm
      staticHighlights
      indianMobileOnly
    />
  );
}
