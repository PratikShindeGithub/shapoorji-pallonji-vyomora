import logoAsset from "@/assets/vyomora-logo.png.asset.json";

export const LOGO_URL: string = logoAsset.url;

import poolHeroAsset from "@/assets/vyomora-pool-hero.jpg.asset.json";

export const HERO_IMAGE_URL: string = poolHeroAsset.url;


import heroPool2Asset from "@/assets/hero-pool-2-opt.webp.asset.json";
import heroElevationAsset from "@/assets/hero-elevation-opt.webp.asset.json";
import heroWormEyeAsset from "@/assets/hero-worm-eye-opt.webp.asset.json";
import heroPool2_800 from "@/assets/hero-pool-2-800c.webp.asset.json";
import heroPool2_1200 from "@/assets/hero-pool-2-1200.webp.asset.json";
import heroElevation800 from "@/assets/hero-elevation-800c.webp.asset.json";
import heroElevation1200 from "@/assets/hero-elevation-1200.webp.asset.json";
import heroWormEye800 from "@/assets/hero-worm-eye-800c.webp.asset.json";
import heroWormEye1200 from "@/assets/hero-worm-eye-1200.webp.asset.json";

export const HERO_SLIDES: { url: string; srcSet: string; alt: string }[] = [
  {
    url: heroPool2Asset.url,
    srcSet: `${heroPool2_800.url} 800w, ${heroPool2_1200.url} 1200w, ${heroPool2Asset.url} 1600w`,
    alt: "Vyomora towers at dusk beside the landscaped swimming pool deck",
  },
  {
    url: heroElevationAsset.url,
    srcSet: `${heroElevation800.url} 800w, ${heroElevation1200.url} 1200w, ${heroElevationAsset.url} 1600w`,
    alt: "Vyomora tower elevations viewed across the landscaped community",
  },
  {
    url: heroWormEyeAsset.url,
    srcSet: `${heroWormEye800.url} 800w, ${heroWormEye1200.url} 1200w, ${heroWormEyeAsset.url} 1600w`,
    alt: "Vyomora high-rise tower seen from ground level amid flowering trees",
  },
];

import spLogoAsset from "@/assets/sp-logo-v3-sm.webp.asset.json";

export const SP_LOGO_URL: string = spLogoAsset.url;

import mahareraAsset from "@/assets/maharera-qr.png.asset.json";

export const MAHARERA_QR_URL: string = mahareraAsset.url;

import spHeaderLogoAsset from "@/assets/sp-logo-header-sm.webp.asset.json";

export const SP_HEADER_LOGO_URL: string = spHeaderLogoAsset.url;

import spVyomoraLockupAsset from "@/assets/vyomora-sp-lockup-sm.webp.asset.json";

export const SP_VYOMORA_LOCKUP_URL: string = spVyomoraLockupAsset.url;
