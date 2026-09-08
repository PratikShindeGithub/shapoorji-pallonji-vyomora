import masterPlan from "@/assets/vyomora-master-plan-v2.png.asset.json";
import duplex from "@/assets/vyomora-plan-duplex-v2.png.asset.json";
import imperial from "@/assets/vyomora-plan-imperial-v2.png.asset.json";
import grande from "@/assets/vyomora-plan-grande-v2.png.asset.json";
import jodi from "@/assets/jodi-flat-plan.jpg.asset.json";
import threeBhkPremium from "@/assets/vyomora-plan-3bhk-imperial.jpg.asset.json";
import twoBhkLuxury from "@/assets/vyomora-plan-2bhk-grande.jpg.asset.json";


export const MASTER_PLAN = {
  title: "Master Plan",
  src: masterPlan.url as string,
  alt: "Vyomora Hinjawadi master layout plan with towers, podium and landscape legend",
};

export type UnitPlan = { title: string; label: string; src: string; alt: string };

export const UNIT_PLANS: UnitPlan[] = [
  {
    title: "2 BHK - Grande",
    label: "2 BHK",
    src: grande.url as string,
    alt: "2 BHK Grande unit plan at Vyomora Hinjawadi",
  },
  {
    title: "3 BHK - Imperial",
    label: "3 BHK",
    src: imperial.url as string,
    alt: "3 BHK Imperial unit plan at Vyomora Hinjawadi",
  },
  {
    title: "3 BHK - Signature Duplex",
    label: "Duplex",
    src: duplex.url as string,
    alt: "3 BHK Signature Duplex unit plan at Vyomora Hinjawadi",
  },
  {
    title: "4 BHK",
    label: "4 BHK",
    src: jodi.url as string,
    alt: "Jodi flat combined unit plan (1580 sq.ft) at Vyomora Hinjawadi Tower 5",
  },
];

/** 2 BHK dedicated landing page: only the two 2 BHK layouts. */
export const UNIT_PLANS_2BHK: UnitPlan[] = [
  {
    title: "2 BHK - Luxury",
    label: "2 BHK Luxury",
    src: twoBhkLuxury.url as string,
    alt: "2 BHK Luxury unit plan at Vyomora Hinjawadi Phase 1",
  },
  {
    title: "2 BHK - Grande",
    label: "2 BHK Grand",
    src: grande.url as string,
    alt: "2 BHK Grand unit plan at Vyomora Hinjawadi Phase 1",
  },
];

/** 3 BHK Duplex dedicated landing page: lower level, upper level and master layout. */
export const UNIT_PLANS_DUPLEX: UnitPlan[] = [
  {
    title: "3 BHK Duplex (Lower Level)",
    label: "Duplex Lower",
    src: duplex.url as string,
    alt: "3 BHK Duplex lower level unit plan at Vyomora Hinjawadi Phase 1",
  },
  {
    title: "3 BHK Duplex (Upper Level)",
    label: "Duplex Upper",
    src: duplex.url as string,
    alt: "3 BHK Duplex upper level unit plan at Vyomora Hinjawadi Phase 1",
  },
  {
    title: "Master Layout Plan",
    label: "Master Plan",
    src: masterPlan.url as string,
    alt: "Vyomora Hinjawadi master layout plan with towers, podium and landscape legend",
  },
];

/** 3 BHK dedicated landing page: only the two 3 BHK layouts. */
export const UNIT_PLANS_3BHK: UnitPlan[] = [
  {
    title: "3 BHK - Premium",
    label: "3 BHK Premium",
    src: threeBhkPremium.url as string,
    alt: "3 BHK Premium unit plan (1050 - 1091 sq.ft.) at Vyomora Hinjawadi Phase 1",
  },
  {
    title: "3 BHK - Imperial",
    label: "3 BHK Imperial",
    src: imperial.url as string,
    alt: "3 BHK Imperial unit plan (1186 sq.ft.) at Vyomora Hinjawadi Phase 1",
  },
];
