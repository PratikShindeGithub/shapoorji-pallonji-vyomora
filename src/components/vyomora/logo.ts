import logoAsset from "@/assets/vyomora-logo.png.asset.json";

export const LOGO_URL: string = logoAsset.url;

import poolHeroAsset from "@/assets/vyomora-pool-hero.jpg.asset.json";

export const HERO_IMAGE_URL: string = poolHeroAsset.url;

import posterAsset from "@/assets/vyomora-rera-poster.jpg.asset.json";
import towerAsset from "@/assets/vyomora-tower-exterior.jpg.asset.json";
import livingAsset from "@/assets/vyomora-living-dining.jpg.asset.json";

export const HERO_SLIDES: { url: string; alt: string }[] = [
  {
    url: poolHeroAsset.url,
    alt: "Vyomora township towers illuminated at dusk beside the landscaped swimming pool deck",
  },
  {
    url: posterAsset.url,
    alt: "Shapoorji Pallonji Vyomora Hinjawadi is now RERA registered",
  },
  { url: towerAsset.url, alt: "Vyomora high-rise towers viewed from the podium level" },
  { url: livingAsset.url, alt: "Vyomora sample apartment living and dining area" },
];

import spLogoAsset from "@/assets/sp-logo-transparent.png.asset.json";

export const SP_LOGO_URL: string = spLogoAsset.url;

import mahareraAsset from "@/assets/maharera-qr.png.asset.json";

export const MAHARERA_QR_URL: string = mahareraAsset.url;
