import React from 'react';
import BrandIntro from './BrandIntro';

/**
 * FeaturedProductIntro - Replaced with the short, elegant 3–5s BrandIntro animation.
 * Re-exported to preserve backward compatibility across the codebase.
 */
export default function FeaturedProductIntro(props) {
  return <BrandIntro {...props} />;
}

export { BrandIntro };
