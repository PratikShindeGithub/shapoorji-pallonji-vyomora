import livingRoom1 from "@/assets/vyomora-living-room-1.jpg.asset.json";
import livingDining from "@/assets/vyomora-living-dining.jpg.asset.json";
import masterBedroom from "@/assets/vyomora-master-bedroom.jpg.asset.json";
import bedroom1 from "@/assets/vyomora-bedroom-1.jpg.asset.json";
import bedroom2 from "@/assets/vyomora-bedroom-2.jpg.asset.json";
import kitchen from "@/assets/vyomora-kitchen.jpg.asset.json";
import washroom from "@/assets/vyomora-washroom.jpg.asset.json";

export const GALLERY_ITEMS: { src: string; alt: string; tall?: boolean }[] = [
  { src: livingRoom1.url, alt: "Living room with designer lighting and balcony views at Vyomora" },
  { src: livingDining.url, alt: "Open living and dining layout in a Vyomora residence" },
  { src: masterBedroom.url, alt: "Master bedroom with walk-in wardrobe at Vyomora" },
  { src: bedroom1.url, alt: "Bedroom with fluted headboard wall and city views" },
  { src: bedroom2.url, alt: "Second bedroom with wood panelling and TV unit" },
  { src: kitchen.url, alt: "Modular kitchen with utility balcony at Vyomora" },
  { src: washroom.url, alt: "Master washroom with walk-in shower and stone finishes" },
];
