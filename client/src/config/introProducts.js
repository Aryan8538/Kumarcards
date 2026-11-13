import { PRODUCTS } from '../data/seedData.js';

/**
 * FEATURED PRODUCTS INTRO CONFIGURATION
 * 
 * Controls which products appear in the opening cinematic lifafa animation,
 * their sequence, timings, and custom highlight badges.
 * 
 * -------------------------------------------------------------
 * HOW TO CONFIGURE FEATURED PRODUCTS:
 * Simply edit the `featuredProductIds` array below with 4 to 6 product IDs
 * (e.g. ['SL-029', 'SL-028', 'WC-001', 'SL-034', 'SL-035']).
 * The animation automatically adjusts its fan layout and symmetry.
 * -------------------------------------------------------------
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

  // Timing settings (in milliseconds) - calibrated for ~6.2s total experience (within 5–7s target)
  timings: {
    lifafaEnter: 600,        // 0.0s - 0.6s: Sealed lifafa appears centered with soft ambient lighting
    flapOpen: 1000,          // 0.6s - 1.6s: Top flap folds open in 3D, golden light radiates from within
    cardRise: 1400,          // 1.6s - 3.0s: Branded card & selected product cards glide upward and fan out
    textReveal: 1200,        // 3.0s - 4.2s: Brand typography, offerings, and tagline reveal
    holdAppreciation: 2000,  // 4.2s - 6.2s: Hold on final composition for appreciation
    fadeExitDuration: 700,   // 6.2s - 6.9s: Seamless dissolve transition into homepage
    totalDuration: 6200,     // Total duration ~6.2s
  },

  // Handpicked list of 4–6 featured product IDs appearing in the opening animation.
  // Edit this list to change which products appear and their order without touching animation code!
  featuredProductIds: [
    "SL-001", // Royal Crimson Mandap Elephant Shagun Lifafa
    "SL-002", // Royal Twin Peacock Turquoise Shagun Lifafa
    "SL-006", // Graceful Ivory Peacock Feather Plume Shagun Lifafa
    "SL-018", // Grand Royal Mandap Elephant & Peacock Shagun Lifafa
    "GE-021", // Vibrant Kalpavriksha Tree of Life Shagun Lifafa
  ],

  // Editorial subtitles / craftsmanship badges for each featured product in intro
  productHighlights: {
    "SL-001": {
      collection: "Signature Wedding Sagan",
      subtitle: "Royal Caparisoned Elephants & Mandap Pillars",
    },
    "SL-002": {
      collection: "Royal Peacock Series",
      subtitle: "Turquoise & Gold Embossed Twin Peacocks",
    },
    "SL-006": {
      collection: "Graceful Plume Series",
      subtitle: "Graceful Ivory Peacock Feather Plume",
    },
    "SL-018": {
      collection: "Grand Ceremonial Sagan",
      subtitle: "Grand Royal Mandap Elephant & Peacock",
    },
    "GE-021": {
      collection: "Kalpavriksha Heritage",
      subtitle: "Vibrant Tree of Life & Auspicious Blessings",
    },
    "SL-029": {
      collection: "Heritage Palace Series",
      subtitle: "3D Embossed Gold Foil Arches & Royal Peacocks",
    },
    "SL-028": {
      collection: "Auspicious Devotional",
      subtitle: "Sacred Golden Bansuri & Iridescent Mor Pankh",
    },
    "WC-001": {
      collection: "Bespoke Wedding Cards",
      subtitle: "Royal Jharokha Palace & Twin Swans Suite",
    },
    "WC-002": {
      collection: "Modern Romance",
      subtitle: "Golden Love Tree & Silhouette Floral Suite",
    },
    "WC-003": {
      collection: "Rajwada Grandeur",
      subtitle: "Royal Rajwada Palace Jharokha & Grand Baraat",
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
  }
};

/**
 * Normalizes SKU IDs for resilient matching (e.g., 'SL 001', 'SL001', 'SL-001' all match)
 */
function normalizeId(id) {
  return String(id || '').toLowerCase().replace(/[\s-_]/g, '');
}

/**
 * Resolves the full product objects in configured order from catalog products.
 * Gracefully falls back to seedData PRODUCTS if catalog is still loading.
 */
export function resolveIntroProducts(allProducts = []) {
  const listToUse = (allProducts && allProducts.length > 0) ? allProducts : PRODUCTS;
  if (!listToUse || listToUse.length === 0) return [];

  const productMap = new Map();
  for (const p of listToUse) {
    productMap.set(p.id, p);
    productMap.set(normalizeId(p.id), p);
  }

  const resolved = [];

  for (const rawId of INTRO_CONFIG.featuredProductIds) {
    const item = productMap.get(rawId) || productMap.get(normalizeId(rawId));
    if (item && item.thumbnail) {
      const extra = INTRO_CONFIG.productHighlights?.[item.id] || INTRO_CONFIG.productHighlights?.[rawId] || {};
      resolved.push({
        ...item,
        introCollection: extra.collection || item.productType || "Signature Collection",
        introSubtitle: extra.subtitle || item.name || item.material || item.style,
      });
    }
  }

  // Fallback: If configured IDs not found, pick first available bestsellers
  if (resolved.length === 0) {
    return listToUse
      .filter((p) => p.isBestSeller || p.isFeatured)
      .slice(0, 5)
      .map((item) => ({
        ...item,
        introCollection: item.productType || "Signature Collection",
        introSubtitle: item.name || item.material || item.style,
      }));
  }

  return resolved;
}
