import { createFileRoute } from "@tanstack/react-router";

import { VyomoraLanding } from "@/components/vyomora/VyomoraLanding";
import { HERO_SLIDES } from "@/components/vyomora/logo";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        title: "Shapoorji Pallonji Vyomora | 2 & 3 BHK Flats in Hinjewadi Phase 1",
      },
      {
        name: "description",
        content:
          "Explore Shapoorji Pallonji Vyomora at Hinjawadi Phase 1, Pune. Premium 2 & 3 BHK apartments starting ₹88 L*. Minutes from Hinjewadi IT Park.",
      },
      {
        property: "og:title",
        content: "Shapoorji Pallonji Vyomora | 2 & 3 BHK Flats in Hinjewadi Phase 1",
      },
      {
        property: "og:description",
        content:
          "Explore Shapoorji Pallonji Vyomora at Hinjawadi Phase 1, Pune. Premium 2 & 3 BHK apartments starting ₹88 L*. Minutes from Hinjewadi IT Park.",
      },
      { property: "og:url", content: "https://shapoorjipallonjivyomora.site/" },
    ],
    links: [
      { rel: "canonical", href: "https://shapoorjipallonjivyomora.site/" },
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

function Index() {
  return <VyomoraLanding />;
}
