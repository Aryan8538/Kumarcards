import { PRODUCTS } from '../data/seedData';

/**
 * FEATURED PRODUCTS INTRO CONFIGURATION
 * 
 * Controls which products appear in the opening cinematic animation,
 * their sequence, timings, and custom highlight badges.
 * 
 * Edit this list to easily change which products are spotlighted
 * without touching the animation engine.
 */

export const INTRO_CONFIG = {
  // Brand Identity
  brandName: "KUMAR CARDS",
  subheading: "Manufacturers of fancy wedding shagun ke lifafe",
  offeringsLine1: "Wedding Lifafe · Invitation Cards · Designer Cards",
  offeringsLine2: "All Types of Printing Jobs",
  tagline: "Beautiful Designs for Every Special Occasion.",
  secondaryCta: "Explore Our Collection",
  subtitle: "Premier Wedding Cards & Designer Shagun Lifafe",
  heritageBadge: "ESTD. 1998 • HAPUR",
  sessionStorageKey: "kumar_cards_intro_shown",

  // Timing settings (in milliseconds) - calibrated for Lifafa Opening + Card Reveal + 3-4s Appreciation Hold
  timings: {
    lifafaEnter: 800,        // 0.0s - 0.8s: Lifafa appears centered with soft ambient lighting
    flapOpen: 1200,          // 0.8s - 2.0s: Top flap folds open in 3D, golden light radiates
    cardRise: 1800,          // 2.0s - 3.8s: Branded card glides upward out of the lifafa
    textReveal: 1600,        // 3.8s - 5.4s: Brand typography, offerings, and tagline reveal
    holdAppreciation: 2600,  // 5.4s - 8.0s: Generous hold on final composition (+3-4s longer request)
    fadeExitDuration: 800,   // 8.0s - 8.8s: Seamless dissolve transition into homepage
    totalDuration: 8000,     // Total duration ~8.0s
  },

  // Handpicked list of 7 signature products in exact cinematic order
  featuredProductIds: [
    "SL-029", // Royal Jharokha Palace & Twin Peacocks
    "SL-028", // Ornate Golden Bansuri & Twin Mor Pankh
    "SL-034", // Imperial Procession Elephants & Rajput Haveli
    "SL-035", // Royal Shahi Chhatri & Pearl Tassel Umbrellas
    "SL-032", // Stained Glass Floral Garland & Golden Frame
    "SL-030", // Embossed Blush Peony & Ivory Bloom
    "SL-001", // Royal Crimson Mandap Elephant
  ],

  // Editorial subtitles / craftsmanship badges for each featured product in intro
  productHighlights: {
    "SL-029": {
      collection: "Heritage Palace Series",
      subtitle: "3D Embossed Gold Foil Arches & Royal Peacocks",
    },
    "SL-028": {
      collection: "Auspicious Devotional",
      subtitle: "Sacred Golden Bansuri & Iridescent Mor Pankh",
    },
    "SL-034": {
      collection: "Rajputana Collection",
      subtitle: "Imperial Procession & Intricate Haveli Gateway",
    },
    "SL-035": {
      collection: "Grand Ceremonial",
      subtitle: "Shahi Chhatri Filigree & Pearl Tassel Umbrellas",
    },
    "SL-032": {
      collection: "Jeweled Floral Luster",
      subtitle: "Stained-Glass Flowers & Polished Gold Border",
    },
    "SL-030": {
      collection: "Modern Luxury Romance",
      subtitle: "Multi-Level Embossed Blush Peony Blooms",
    },
    "SL-001": {
      collection: "Signature Wedding Sagan",
      subtitle: "Royal Caparisoned Elephants & Mandap Pillars",
    },
  }
};

/**
 * Resolves the full product objects in configured order from catalog products.
 * Gracefully falls back to seedData PRODUCTS if catalog is still loading.
 */
export function resolveIntroProducts(allProducts = []) {
  const listToUse = (allProducts && allProducts.length > 0) ? allProducts : PRODUCTS;
  if (!listToUse || listToUse.length === 0) return [];

  const productMap = new Map(listToUse.map((p) => [p.id, p]));
  const resolved = [];

  for (const id of INTRO_CONFIG.featuredProductIds) {
    const item = productMap.get(id);
    if (item && item.thumbnail) {
      const extra = INTRO_CONFIG.productHighlights[id] || {};
      resolved.push({
        ...item,
        introCollection: extra.collection || item.productType || "Signature Collection",
        introSubtitle: extra.subtitle || item.material || item.style,
      });
    }
  }

  // Fallback: If configured IDs not found, pick first available bestsellers
  if (resolved.length === 0) {
    return allProducts
      .filter((p) => p.isBestSeller || p.isFeatured)
      .slice(0, 7)
      .map((item) => ({
        ...item,
        introCollection: item.productType || "Signature Collection",
        introSubtitle: item.material || item.style,
      }));
  }

  return resolved;
}
