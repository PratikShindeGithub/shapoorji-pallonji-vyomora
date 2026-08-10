import masterPlan from "@/assets/vyomora-master-plan-v2.png.asset.json";
import duplex from "@/assets/vyomora-plan-duplex-v2.png.asset.json";
import imperial from "@/assets/vyomora-plan-imperial-v2.png.asset.json";
import grande from "@/assets/vyomora-plan-grande-v2.png.asset.json";
import jodi from "@/assets/jodi-flat-plan.jpg.asset.json";


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
    title: "Jodi Flat - 1580 sq.ft",
    label: "Jodi Flat",
    src: jodi.url as string,
    alt: "Jodi flat combined unit plan (1580 sq.ft) at Vyomora Hinjawadi Tower 5",
  },
];
