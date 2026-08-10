import clubhouse from "@/assets/am-clubhouse.webp.asset.json";
import pool from "@/assets/am-pool.webp.asset.json";
import gym from "@/assets/am-gym.webp.asset.json";
import kids from "@/assets/am-kids.webp.asset.json";
import gardens from "@/assets/am-gardens.webp.asset.json";
import cowork from "@/assets/am-cowork.webp.asset.json";
import amphitheatre from "@/assets/am-amphitheatre.webp.asset.json";

export const AMENITY_SLIDES: { src: string; alt: string; label: string }[] = [
  { src: clubhouse.url, alt: "Grand clubhouse entrance lit at dusk at Vyomora", label: "Grand Clubhouse" },
  { src: pool.url, alt: "Landscaped swimming pool with sun deck at Vyomora", label: "Swimming Pool" },
  { src: gym.url, alt: "Fitness studio with treadmills and yoga deck at Vyomora", label: "Fitness Studio" },
  { src: kids.url, alt: "Indoor kids' play zone with soft play and sandpit at Vyomora", label: "Kids' Play Zone" },
  { src: gardens.url, alt: "Landscaped gardens with walkways at sunset at Vyomora", label: "Landscaped Gardens" },
  { src: cowork.url, alt: "Co-work lounge with focus cabins at Vyomora", label: "Co-work Lounge" },
  { src: amphitheatre.url, alt: "Open-air amphitheatre with community screening at Vyomora", label: "Amphitheatre" },
];
