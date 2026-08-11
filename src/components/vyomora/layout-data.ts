import {
  BadgeIndianRupee,
  CarFront,
  Headphones,
  Home,
  Images,
  LayoutGrid,
  MapPin,
  PlayCircle,
  Wifi,
} from "lucide-react";

export const NAV_ITEMS = [
  { label: "Home", href: "#top", icon: Home },
  { label: "Price", href: "#pricing", icon: BadgeIndianRupee },
  { label: "Site Plan", href: "#plans", icon: LayoutGrid },
  { label: "Amenities", href: "#amenities", icon: Wifi },
  { label: "Gallery", href: "#gallery", icon: Images },
  { label: "Location", href: "#location", icon: MapPin },
  { label: "Walkthrough", href: "#experience", icon: PlayCircle },
];

export const HERO_FACTS = [
  "25 Acres Integrated Community\u00a0",
  "85+ Luxury Amenities",
  "14 Acre Vehicle-free Podium",
  "5 of 14 Towers Released\u00a0",
  "G+ 23 Storied High-Rise Towers",
];

export const HERO_STRIPS = [
  "Exclusive Launch Offers",
  "Low Density Project\u00a0",
  "Attractive Payment Plans",
];

export const PROMISES = [
  { icon: Headphones, label: "Instant Call Back" },
  { icon: CarFront, label: "Free Site Visit" },
  { icon: BadgeIndianRupee, label: "Unmatched Price" },
];

export const AVAILABILITY = ["Available Units", "Payment Plan", "Floor Plans"];
