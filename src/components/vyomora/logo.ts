import logoAsset from "@/assets/vyomora-logo.png.asset.json";

export const LOGO_URL: string = logoAsset.url;

import poolHeroAsset from "@/assets/vyomora-pool-hero.jpg.asset.json";

export const HERO_IMAGE_URL: string = poolHeroAsset.url;

import posterAsset from "@/assets/vyomora-rera-poster.jpg.asset.json";
import towerAsset from "@/assets/vyomora-tower-exterior.jpg.asset.json";
import livingAsset from "@/assets/vyomora-living-dining.jpg.asset.json";

import heroPool2Asset from "@/assets/hero-pool-2.jpg.asset.json";
import heroElevationAsset from "@/assets/hero-elevation.jpg.asset.json";
import heroWormEyeAsset from "@/assets/hero-worm-eye.jpg.asset.json";

export const HERO_SLIDES: { url: string; alt: string }[] = [
  {
    url: heroPool2Asset.url,
    alt: "Vyomora towers at dusk beside the landscaped swimming pool deck",
  },
  {
    url: heroElevationAsset.url,
    alt: "Vyomora tower elevations viewed across the landscaped community",
  },
  {
    url: heroWormEyeAsset.url,
    alt: "Vyomora high-rise tower seen from ground level amid flowering trees",
  },
];

import spLogoAsset from "@/assets/sp-logo-transparent.png.asset.json";

export const SP_LOGO_URL: string = spLogoAsset.url;

import mahareraAsset from "@/assets/maharera-qr.png.asset.json";

export const MAHARERA_QR_URL: string = mahareraAsset.url;

import spHeaderLogoAsset from "@/assets/sp-logo-header.png.asset.json";

export const SP_HEADER_LOGO_URL: string = spHeaderLogoAsset.url;
