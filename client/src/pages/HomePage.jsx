import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import HeroBanner from '../components/home/HeroBanner';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedShowcase from '../components/home/FeaturedShowcase';
import StoreUSPs from '../components/home/StoreUSPs';
import LocationSection from '../components/home/LocationSection';
import BrandIntro from '../components/intro/BrandIntro';
import { useCatalog } from '../context/CatalogContext';
import { INTRO_CONFIG } from '../config/introProducts';

export default function HomePage() {
  const { products } = useCatalog();
  const [searchParams, setSearchParams] = useSearchParams();
  const forceIntroParam = searchParams.get('intro');

  const [showIntro, setShowIntro] = useState(() => {
    // If URL contains ?intro=1 or ?intro=true, force play
    if (forceIntroParam === 'true' || forceIntroParam === '1') {
      return true;
    }
    // Check if session storage has already recorded the intro
    try {
      const alreadyShown = sessionStorage.getItem(INTRO_CONFIG.sessionStorageKey);
      return !alreadyShown;
    } catch {
      return false;
    }
  });

  // Watch for ?intro parameter changes
  useEffect(() => {
    if (forceIntroParam === 'true' || forceIntroParam === '1') {
      setShowIntro(true);
    }
  }, [forceIntroParam]);

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  const handleCompleteIntro = () => {
    setShowIntro(false);
    // If URL had ?intro, remove it cleanly from URL without page reload
    if (forceIntroParam) {
      searchParams.delete('intro');
      setSearchParams(searchParams, { replace: true });
    }
  };

  return (
    <div className="space-y-0 relative">
      {showIntro && (
        <BrandIntro
          onComplete={handleCompleteIntro}
          isForced={Boolean(forceIntroParam)}
        />
      )}
      <HeroBanner onReplayIntro={handleReplayIntro} />
      <CategoryGrid />
      <FeaturedShowcase />
      <StoreUSPs />
      <LocationSection />
    </div>
  );
}
