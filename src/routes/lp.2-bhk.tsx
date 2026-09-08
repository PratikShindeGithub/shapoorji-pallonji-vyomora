import { createFileRoute } from "@tanstack/react-router";

import { VyomoraLanding } from "@/components/vyomora/VyomoraLanding";
import { CONFIGS } from "@/components/vyomora/data";
import { UNIT_PLANS_2BHK } from "@/components/vyomora/site-plans";
import { HERO_SLIDES } from "@/components/vyomora/logo";

const TWO_BHK_CONFIGS = CONFIGS.filter((c) => c.type.startsWith("2 BHK"));

const TITLE = "Shapoorji Pallonji Vyomora – Luxury 2 BHK Apartments in Hinjawadi Phase 1";
const DESCRIPTION =
  "Luxury 2 BHK apartments at Shapoorji Pallonji Vyomora, Hinjawadi Phase 1, Pune. 685 - 839 sq.ft. carpet, ₹88 L* onwards. Request your 2 BHK cost sheet.";

export const Route = createFileRoute("/lp/2-bhk")({
  component: TwoBhkLanding,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://shapoorjipallonjivyomora.site/lp/2-bhk" },
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

function TwoBhkLanding() {
  return (
    <VyomoraLanding
      showNav={true}
      hideHomeNav={true}
      configs={TWO_BHK_CONFIGS}
      plans={UNIT_PLANS_2BHK}
      formCta="Request 2 BHK Cost Sheet"
      interestedVariant="2 BHK"
      heading={TITLE}
      priceCtaFocusesForm
      staticHighlights
    />
  );
}
