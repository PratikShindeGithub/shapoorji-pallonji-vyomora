import elevation from "@/assets/g-elevation.jpg.asset.json";
import pool from "@/assets/g-pool.jpg.asset.json";
import wormEye from "@/assets/g-wormeye.jpg.asset.json";
import playArea from "@/assets/g-playarea.jpg.asset.json";
import living from "@/assets/g-living.jpg.asset.json";
import bedroom from "@/assets/g-bedroom.jpg.asset.json";
import kitchen from "@/assets/g-kitchen.jpg.asset.json";

export const GALLERY_ITEMS: { src: string; alt: string; tall?: boolean }[] = [
  { src: elevation.url, alt: "Vyomora tower elevation seen across landscaped greens" },
  { src: pool.url, alt: "Swimming pool with sun deck at dusk at Vyomora" },
  { src: wormEye.url, alt: "Worm's eye view of the Vyomora high-rise towers" },
  { src: playArea.url, alt: "Landscaped children's play area with flowering trees at Vyomora" },
  { src: living.url, alt: "Living room with designer lighting and balcony views at Vyomora" },
  { src: bedroom.url, alt: "Bedroom with fluted headboard wall and city views at Vyomora" },
  { src: kitchen.url, alt: "Modular kitchen with utility balcony at Vyomora" },
];
