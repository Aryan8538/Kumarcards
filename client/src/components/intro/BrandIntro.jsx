import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';
import { INTRO_CONFIG, resolveIntroProducts } from '../../config/introProducts';

/**
 * BrandIntro - Mobile-First Sequential 3-Phase Lifafa Reveal for Kumar Cards.
 * 
 * Concept:
 * A sequential, cinematic opening of a royal Indian wedding shagun lifafa:
 * 
 * PHASE 1 — Envelope Opening & Brand Reveal (0.0s – 4.2s)
 * - Closed burgundy lifafa appears with royal gold seal.
 * - Top flap folds open in 3D, and golden inner light blossoms.
 * - The original ivory KUMAR CARDS invitation note rises completely out of the envelope.
 * - Entire note is 100% visible, centered, and readable (monogram, title, offerings, tagline).
 * - Flap is pushed into negative 3D depth and stays behind the envelope, never covering the note.
 * - Generous hold for brand appreciation.
 * 
 * PHASE 2 — Featured Product Cards Reveal (4.2s – 7.2s)
 * - ONLY AFTER the brand note is fully appreciated, Phase 2 begins.
 * - The 5 handpicked product cards emerge from inside the envelope ONE BY ONE (200ms stagger).
 * - Full-screen non-overlapping constellation (X / Quincunx pattern on mobile portrait).
 * - Every single card is 100% visible with genuine photographs, gold matting, and prices.
 * - Zero overlap, zero clipping, smooth zero-gravity floating sway.
 * 
 * PHASE 3 — Homepage Transition (7.2s – 8.0s)
 * - Cards smoothly converge and fade away into the interactive showroom homepage.
 */

// 5-card non-overlapping slots calibrated for full-screen display across mobile, tablet, and desktop
const FIVE_CARD_SLOTS = {
  desktop: [
    // 0: Far-Left
    { dir: 'far-left', x: -430, y: -50, rot: -8, scale: 1.0, delay: 0, zIndex: 22, floatClass: 'animate-float-card-a' },
    // 1: Mid-Left (lower)
    { dir: 'mid-left', x: -280, y: 90, rot: -4, scale: 1.04, delay: 200, zIndex: 25, floatClass: 'animate-float-card-b' },
    // 2: Center-Top
    { dir: 'center-top', x: 0, y: -160, rot: 0, scale: 1.02, delay: 400, zIndex: 24, floatClass: 'animate-float-card-c' },
    // 3: Mid-Right (lower)
    { dir: 'mid-right', x: 280, y: 90, rot: 4, scale: 1.04, delay: 600, zIndex: 25, floatClass: 'animate-float-card-b' },
    // 4: Far-Right
    { dir: 'far-right', x: 430, y: -50, rot: 8, scale: 1.0, delay: 800, zIndex: 22, floatClass: 'animate-float-card-a' },
  ],
  tablet: [
    // 0: Top-Left
    { dir: 'top-left', x: -270, y: -130, rot: -7, scale: 0.92, delay: 0, zIndex: 22, floatClass: 'animate-float-card-a' },
    // 1: Top-Right
    { dir: 'top-right', x: 270, y: -130, rot: 7, scale: 0.92, delay: 200, zIndex: 22, floatClass: 'animate-float-card-c' },
    // 2: Center
    { dir: 'center', x: 0, y: -20, rot: 0, scale: 0.98, delay: 400, zIndex: 26, floatClass: 'animate-float-card-b' },
    // 3: Bottom-Left
    { dir: 'bottom-left', x: -240, y: 100, rot: -4, scale: 0.95, delay: 600, zIndex: 24, floatClass: 'animate-float-card-a' },
    // 4: Bottom-Right
    { dir: 'bottom-right', x: 240, y: 100, rot: 4, scale: 0.95, delay: 800, zIndex: 24, floatClass: 'animate-float-card-b' },
  ],
  mobile: [
    // 0: Top-Left
    { dir: 'top-left', x: -108, y: -125, rot: -6, scale: 0.88, delay: 0, zIndex: 22, floatClass: 'animate-float-card-a' },
    // 1: Top-Right
    { dir: 'top-right', x: 108, y: -125, rot: 6, scale: 0.88, delay: 200, zIndex: 22, floatClass: 'animate-float-card-c' },
    // 2: Center (prominent 5th card in center arena)
    { dir: 'center', x: 0, y: -15, rot: 0, scale: 0.95, delay: 400, zIndex: 27, floatClass: 'animate-float-card-b' },
    // 3: Bottom-Left
    { dir: 'bottom-left', x: -108, y: 95, rot: -4, scale: 0.88, delay: 600, zIndex: 24, floatClass: 'animate-float-card-a' },
    // 4: Bottom-Right
    { dir: 'bottom-right', x: 108, y: 95, rot: 4, scale: 0.88, delay: 800, zIndex: 24, floatClass: 'animate-float-card-b' },
  ],
  smallMobile: [
    // 0: Top-Left
    { dir: 'top-left', x: -95, y: -115, rot: -5, scale: 0.82, delay: 0, zIndex: 22, floatClass: 'animate-float-card-a' },
    // 1: Top-Right
    { dir: 'top-right', x: 95, y: -115, rot: 5, scale: 0.82, delay: 200, zIndex: 22, floatClass: 'animate-float-card-c' },
    // 2: Center
    { dir: 'center', x: 0, y: -15, rot: 0, scale: 0.88, delay: 400, zIndex: 27, floatClass: 'animate-float-card-b' },
    // 3: Bottom-Left
    { dir: 'bottom-left', x: -95, y: 90, rot: -3, scale: 0.82, delay: 600, zIndex: 24, floatClass: 'animate-float-card-a' },
    // 4: Bottom-Right
    { dir: 'bottom-right', x: 95, y: 90, rot: 3, scale: 0.82, delay: 800, zIndex: 24, floatClass: 'animate-float-card-b' },
  ],
};

function getSlotConfig(index, isSmallMobile, isMobile, isTablet) {
  const table = isSmallMobile
    ? FIVE_CARD_SLOTS.smallMobile
    : isMobile
    ? FIVE_CARD_SLOTS.mobile
    : isTablet
    ? FIVE_CARD_SLOTS.tablet
    : FIVE_CARD_SLOTS.desktop;

  return table[index % table.length];
}

export default function BrandIntro({ onComplete, isForced = false, products: propProducts = [] }) {
  const navigate = useNavigate();

  // Animation stages:
  // 1: Sealed lifafa entrance (0.0s - 0.6s)
  // 2: Flap folds open in 3D (0.6s - 1.6s)
  // 3: Brand note rises out of lifafa (1.6s - 2.8s)
  // 4: Phase 1: Brand appreciation hold (2.8s - 4.2s)
  // 5: Phase 2: 5 product cards emerge one by one (4.2s - 5.6s)
  // 6: Full showcase appreciation hold (5.6s - 7.2s)
  // 7: Phase 3: Transition & dissolve into homepage (7.2s - 8.0s)
  const [stage, setStage] = useState(1);
  const [isOverlayFading, setIsOverlayFading] = useState(false);
  const timeoutIdsRef = useRef([]);

  // Responsive window size detection
  const [windowWidth, setWindowWidth] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1024));

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSmallMobile = windowWidth < 380;
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 768;

  // Resolve 5 featured products from config
  const featuredCards = useMemo(() => resolveIntroProducts(propProducts).slice(0, 5), [propProducts]);

  const clearAllTimeouts = useCallback(() => {
    timeoutIdsRef.current.forEach((id) => clearTimeout(id));
    timeoutIdsRef.current = [];
  }, []);

  const addTimeout = useCallback((fn, delay) => {
    const id = setTimeout(fn, delay);
    timeoutIdsRef.current.push(id);
    return id;
  }, []);

  // Complete and transition smoothly into homepage
  const handleFinish = useCallback(() => {
    clearAllTimeouts();
    setIsOverlayFading(true);
    try {
      sessionStorage.setItem(INTRO_CONFIG.sessionStorageKey, 'true');
    } catch {
      // Ignore if sessionStorage is restricted
    }

    addTimeout(() => {
      if (onComplete) onComplete();
    }, INTRO_CONFIG.timings.fadeExitDuration);
  }, [clearAllTimeouts, addTimeout, onComplete]);

  // Handle immediate Skip Intro
  const handleSkip = useCallback(() => {
    handleFinish();
  }, [handleFinish]);

  // Handle optional direct click on any product card during showcase
  const handleCardClick = useCallback((product) => {
    if (!product?.slug) return;
    clearAllTimeouts();
    setIsOverlayFading(true);
    try {
      sessionStorage.setItem(INTRO_CONFIG.sessionStorageKey, 'true');
    } catch {}

    addTimeout(() => {
      if (onComplete) onComplete();
      navigate(`/product/${product.slug}`);
    }, 350);
  }, [clearAllTimeouts, addTimeout, onComplete, navigate]);

  // Keyboard shortcut: Escape to skip
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkip]);

  // Respect prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches && !isForced) {
        handleSkip();
      }
    }
  }, [handleSkip, isForced]);

  // Orchestrate the sequential 3-phase timeline
  useEffect(() => {
    clearAllTimeouts();

    const t = INTRO_CONFIG.timings;

    // Phase 1b: Flap starts opening (t = 600ms)
    addTimeout(() => setStage(2), t.lifafaEnter);

    // Phase 1c: Brand note rises out of lifafa (t = 1600ms)
    addTimeout(() => setStage(3), t.lifafaEnter + t.flapOpen);

    // Phase 1d: Brand note is fully visible & held for appreciation (t = 2800ms)
    addTimeout(() => setStage(4), t.lifafaEnter + t.flapOpen + t.brandNoteRise);

    // Phase 2a: Only AFTER brand note is appreciated, product cards emerge one by one (t = 4200ms)
    addTimeout(() => setStage(5), t.lifafaEnter + t.flapOpen + t.brandNoteRise + t.brandHold);

    // Phase 2b: All 5 cards floating in full showcase appreciation (t = 5600ms)
    addTimeout(() => setStage(6), t.lifafaEnter + t.flapOpen + t.brandNoteRise + t.brandHold + t.cardsEmerge);

    // Phase 3: Transition & dissolve into homepage (t = 7200ms)
    addTimeout(() => {
      setStage(7);
      handleFinish();
    }, t.totalDuration);

    return () => clearAllTimeouts();
  }, [addTimeout, clearAllTimeouts, handleFinish]);

  const isFlapOpen = stage >= 2;
  const isBrandNoteRisen = stage >= 3;
  const isBrandHold = stage >= 4;
  const isProductsActive = stage >= 5;
  const isShowcaseHold = stage >= 6;

  /**
   * Brand Note Transform across stages:
   * - Stage 1 & 2: Inside envelope pocket
   * - Stage 3 & 4 (Phase 1): Center stage, tall, proud, 100% visible
   * - Stage 5 & 6 (Phase 2): Smoothly scales up to top crown header over the 5-card showcase
   * - Stage 7 (Phase 3): Dissolves with overlay
   */
  const getBrandNoteStyle = () => {
    if (!isBrandNoteRisen) {
      return {
        transform: 'translate3d(-50%, 15px, 0px)',
        opacity: 0,
        zIndex: 15,
      };
    }

    if (isOverlayFading) {
      return {
        transform: isMobile
          ? 'translate3d(-50%, -240px, 10px) scale(0.68)'
          : 'translate3d(-50%, -210px, 10px) scale(0.78)',
        opacity: 0,
        zIndex: 15,
      };
    }

    if (isProductsActive) {
      // In Phase 2: Ascends gently to crown the 5-card showcase as the royal brand header
      return {
        transform: isMobile
          ? 'translate3d(-50%, -240px, 20px) scale(0.74)'
          : 'translate3d(-50%, -205px, 20px) scale(0.85)',
        opacity: 0.9,
        zIndex: 20,
      };
    }

    // In Phase 1: Full-size centered brand spotlight, 100% visible and unencumbered
    return {
      transform: isSmallMobile
        ? 'translate3d(-50%, -190px, 35px) scale(1)'
        : isMobile
        ? 'translate3d(-50%, -205px, 35px) scale(1)'
        : 'translate3d(-50%, -180px, 35px) scale(1)',
      opacity: 1,
      zIndex: 35,
    };
  };

  /**
   * Product Card Transform across stages:
   * - Stage 1 to 4: Hidden inside envelope pocket
   * - Stage 5 & 6 (Phase 2): Emerge ONE BY ONE into non-overlapping full-screen showcase
   * - Stage 7 (Phase 3): Smooth convergence toward center
   */
  const getCardTransform = (slot, index) => {
    if (!isProductsActive) {
      return {
        transform: 'translate3d(-50%, 25px, 0px) scale(0.35) rotate(0deg)',
        opacity: 0,
        pointerEvents: 'none',
      };
    }

    if (isOverlayFading) {
      return {
        transform: `translate3d(calc(-50% + ${Math.round(slot.x * 0.45)}px), ${Math.round(slot.y * 0.45)}px, 0) scale(${+(slot.scale * 0.7).toFixed(2)}) rotate(${+(slot.rot * 0.4).toFixed(1)}deg)`,
        opacity: 0,
        pointerEvents: 'none',
      };
    }

    return {
      transform: `translate3d(calc(-50% + ${slot.x}px), ${slot.y}px, 0) scale(${slot.scale}) rotate(${slot.rot}deg)`,
      opacity: 1,
      pointerEvents: 'auto',
    };
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Kumar Cards Brand Reveal"
      className={`fixed inset-0 z-50 flex flex-col justify-between overflow-hidden text-cream-50 select-none transition-all duration-700 ease-out ${
        isOverlayFading ? 'opacity-0 scale-[1.02] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, #350810 0%, #1A0307 55%, #080103 100%)',
      }}
    >
      {/* Subtle royal ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle at 50% 45%, rgba(212, 175, 55, 0.22) 0%, transparent 65%)',
        }}
      />

      {/* Traditional Indian Wedding Floral Watermark Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05] flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 600 600"
          className="w-[110vw] max-w-[850px] h-auto text-gold-300 stroke-current animate-spin-slow"
          style={{ animationDuration: '75s' }}
          fill="none"
        >
          <circle cx="300" cy="300" r="240" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="300" cy="300" r="180" strokeWidth="1" />
          <circle cx="300" cy="300" r="120" strokeWidth="1" strokeDasharray="2 4" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <path
              key={deg}
              d="M300,120 Q340,210 300,300 Q260,210 300,120 Z"
              strokeWidth="0.8"
              transform={`rotate(${deg} 300 300)`}
            />
          ))}
        </svg>
      </div>

      {/* TOP BAR: Heritage Tag & Skip Intro Button */}
      <header className="relative z-50 flex items-center justify-between px-4 sm:px-10 pt-4 sm:pt-7">
        <div
          className={`flex items-center gap-2 transition-opacity duration-700 ${
            stage >= 2 ? 'opacity-90' : 'opacity-0'
          }`}
        >
          <span className="font-display tracking-[0.22em] sm:tracking-[0.25em] text-[10px] sm:text-xs font-semibold text-gold-300/80 uppercase">
            {INTRO_CONFIG.heritageBadge}
          </span>
        </div>

        {/* Skip Intro Button */}
        <button
          type="button"
          onClick={handleSkip}
          className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-gold-500/20 border border-gold-400/30 hover:border-gold-400/70 text-xs font-medium text-cream-100 hover:text-white transition-all duration-200 active:scale-95 shadow-[0_2px_12px_rgba(0,0,0,0.4)] backdrop-blur-md cursor-pointer ml-auto"
          aria-label="Skip intro and view website"
        >
          <span>Skip Intro</span>
          <ChevronRight className="w-3.5 h-3.5 text-gold-400 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </header>

      {/* MAIN CENTER STAGE: The Animated Lifafa, Brand Note & Product Cards */}
      <main className="relative z-30 flex-1 flex flex-col items-center justify-center px-3 pt-8 pb-4 sm:pt-20 sm:pb-12">
        
        {/* Lifafa Stage Wrapper with 3D Perspective */}
        <div
          className={`relative perspective-1200 w-[275px] xs:w-[300px] sm:w-[400px] md:w-[430px] flex items-center justify-center transition-transform duration-1000 ease-out ${
            isProductsActive
              ? 'translate-y-[110px] xs:translate-y-[120px] sm:translate-y-[85px]'
              : isBrandNoteRisen
              ? 'translate-y-[85px] xs:translate-y-[95px] sm:translate-y-[65px]'
              : 'translate-y-0'
          }`}
        >
          {/* Ambient Lighting Cast Beneath the Lifafa */}
          <div className="absolute -bottom-6 w-[88%] h-8 bg-black/70 rounded-full blur-xl pointer-events-none" />

          {/* ======================================================= */}
          {/* 1. THE LIFAFA ENVELOPE BASE (Pocket & Layers)           */}
          {/* ======================================================= */}
          <div
            className="relative w-full h-[175px] xs:h-[190px] sm:h-[235px] md:h-[255px] rounded-2xl border border-gold-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(197,154,69,0.15)] flex flex-col justify-end"
            style={{
              background: 'linear-gradient(155deg, #4A0812 0%, #30040A 60%, #1A0205 100%)',
            }}
          >
            {/* Inner Back Wall Lining (Delicate Gold Lattice Motif) */}
            <div className="absolute inset-2 rounded-xl overflow-hidden opacity-20 pointer-events-none">
              <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="innerLattice" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M12 0 L24 12 L12 24 L0 12 Z" stroke="#D4AF37" strokeWidth="0.6" fill="none" />
                    <circle cx="12" cy="12" r="1.5" fill="#D4AF37" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#innerLattice)" />
              </svg>
            </div>

            {/* Subtle Inner Gold Foil Border along interior */}
            <div className="absolute inset-3 rounded-lg border border-gold-400/25 pointer-events-none" />

            {/* Interior Radiant Golden Light (blossoms when flap opens) */}
            <div
              className={`absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-20 sm:h-24 rounded-full pointer-events-none transition-opacity duration-1000 ease-out ${
                isFlapOpen ? 'opacity-85 scale-105' : 'opacity-0 scale-90'
              }`}
              style={{
                background: 'radial-gradient(ellipse at 50% 20%, rgba(255, 223, 138, 0.65) 0%, rgba(212, 175, 55, 0.35) 45%, transparent 75%)',
                filter: 'blur(8px)',
              }}
            />

            {/* ===================================================== */}
            {/* 2. THE 5 FEATURED PRODUCT CARDS (PHASE 2)             */}
            {/*    Emerge ONE BY ONE into non-overlapping showcase    */}
            {/* ===================================================== */}
            {featuredCards.map((product, index) => {
              const slot = getSlotConfig(index, isSmallMobile, isMobile, isTablet);
              const cardTransformStyle = getCardTransform(slot, index);

              return (
                <div
                  key={product.id || index}
                  onClick={() => handleCardClick(product)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${product.name}`}
                  className="absolute top-3 left-1/2 w-[76px] h-[108px] xs:w-[84px] xs:h-[118px] sm:w-[145px] sm:h-[205px] md:w-[165px] md:h-[235px] cursor-pointer group select-none outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                  style={{
                    ...cardTransformStyle,
                    zIndex: slot.zIndex,
                    transition: isOverlayFading
                      ? 'transform 650ms cubic-bezier(0.4, 0, 0.2, 1), opacity 550ms ease-out'
                      : isProductsActive
                      ? `transform 1100ms cubic-bezier(0.16, 1, 0.3, 1) ${slot.delay}ms, opacity 800ms ease-out ${slot.delay}ms`
                      : 'none',
                  }}
                  title={product.name}
                >
                  {/* Inner floating container for organic multi-directional sway */}
                  <div
                    className={`w-full h-full rounded-lg sm:rounded-2xl p-1 sm:p-1.5 transition-transform duration-300 group-hover:scale-105 ${
                      isShowcaseHold && !isOverlayFading ? slot.floatClass : ''
                    }`}
                    style={{
                      background: 'linear-gradient(145deg, #FAF7EE 0%, #F5EDE1 50%, #ECE2D2 100%)',
                      border: '1.5px solid rgba(212, 175, 55, 0.55)',
                      boxShadow: isProductsActive
                        ? slot.scale > 0.95
                          ? '0 20px 42px -6px rgba(0,0,0,0.7), 0 0 20px rgba(212, 175, 55, 0.28)'
                          : '0 16px 34px -6px rgba(0,0,0,0.65), 0 0 16px rgba(212, 175, 55, 0.22)'
                        : 'none',
                    }}
                  >
                    {/* Inner Photo Container */}
                    <div className="relative w-full h-full rounded-md sm:rounded-xl overflow-hidden bg-crimson-950/20">
                      {/* Actual Product Photograph */}
                      <img
                        src={product.thumbnail || product.images?.[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="eager"
                      />

                      {/* Subtle Inner Gold Foil Border on Card */}
                      <div className="absolute inset-0 rounded-md sm:rounded-xl border border-gold-400/35 pointer-events-none" />

                      {/* Corner Gold Foil Accents */}
                      <div className="absolute top-0.5 left-0.5 sm:top-1 sm:left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 border-t border-l border-gold-400/80 pointer-events-none" />
                      <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 border-t border-r border-gold-400/80 pointer-events-none" />

                      {/* Elegant Bottom Label Plaque */}
                      <div className="absolute inset-x-0 bottom-0 pt-2.5 pb-0.5 sm:pb-1.5 px-1 sm:px-1.5 bg-gradient-to-t from-black/85 via-black/55 to-transparent flex flex-col items-center text-center pointer-events-none">
                        <span className="font-serif text-[7.5px] xs:text-[8.5px] sm:text-[11px] font-semibold text-gold-200 truncate w-full tracking-wide drop-shadow-sm">
                          {product.introSubtitle || product.name}
                        </span>
                        {product.priceMin && (
                          <span className="text-[6.5px] xs:text-[7.5px] sm:text-[9px] font-medium text-cream-200/90 tracking-wider">
                            ₹{product.priceMin}{product.priceMax && product.priceMax !== product.priceMin ? ` - ₹${product.priceMax}` : ''}
                          </span>
                        )}
                      </div>

                      {/* Subtle Royal Gold Sheen on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gold-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* ===================================================== */}
            {/* 3. THE RISING ORIGINAL KUMAR CARDS BRAND NOTE         */}
            {/*    PHASE 1: Rises completely out & holds unobstructed */}
            {/*    PHASE 2: Ascends as regal header over the cards    */}
            {/* ===================================================== */}
            <div
              className="absolute left-1/2 -translate-x-1/2 transition-all duration-[1100ms] cubic-bezier(0.22, 1, 0.36, 1) flex flex-col items-center justify-between text-center w-[250px] xs:w-[270px] sm:w-[350px] md:w-[375px]"
              style={{
                top: '12px',
                height: isMobile ? '260px' : '270px',
                ...getBrandNoteStyle(),
                background: 'linear-gradient(145deg, #FAF7EE 0%, #F4ECE0 50%, #ECE1D0 100%)',
                borderRadius: '16px',
                padding: isMobile ? '11px 12px' : '13px 15px',
                boxShadow: isBrandNoteRisen
                  ? '0 -15px 35px rgba(0,0,0,0.5), 0 0 25px rgba(212, 175, 55, 0.25)'
                  : 'none',
                border: '1.5px solid rgba(197, 154, 69, 0.65)',
              }}
            >
              {/* Inner Double Gold Foil Line on Card */}
              <div className="absolute inset-1.5 sm:inset-2 rounded-xl border border-gold-500/35 pointer-events-none" />

              {/* Corner Ornamental Accents on Card */}
              <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-l-2 border-gold-600/70 pointer-events-none" />
              <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-r-2 border-gold-600/70 pointer-events-none" />
              <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-l-2 border-gold-600/70 pointer-events-none" />
              <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-r-2 border-gold-600/70 pointer-events-none" />

              {/* Top Section: Royal Crest Monogram & Brand Name */}
              <div className="relative z-10 flex flex-col items-center w-full">
                
                {/* Scalable Monogram Logo Emblem */}
                <div className="relative mb-0.5 sm:mb-1">
                  <svg
                    viewBox="0 0 60 60"
                    className="w-9 h-9 xs:w-10 xs:h-10 sm:w-11 sm:h-11 drop-shadow-sm"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="cardGold" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#D4AF37" />
                        <stop offset="50%" stopColor="#AA7C11" />
                        <stop offset="100%" stopColor="#D4AF37" />
                      </linearGradient>
                      <linearGradient id="cardCrimson" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8E1D2D" />
                        <stop offset="50%" stopColor="#7A1B28" />
                        <stop offset="100%" stopColor="#550E18" />
                      </linearGradient>
                    </defs>
                    <rect x="6" y="6" width="48" height="48" rx="10" fill="url(#cardCrimson)" stroke="url(#cardGold)" strokeWidth="1.2" />
                    <rect x="10" y="10" width="40" height="40" rx="7" fill="none" stroke="url(#cardGold)" strokeWidth="0.6" strokeDasharray="2 1.5" />
                    {/* Lotus Finial Apex */}
                    <path d="M30 4 L32 7.5 C34 7 35.5 8.5 35 10 C33 10 31.5 9 30 7.5 C28.5 9 27 10 25 10 C24.5 8.5 26 7 28 7.5 Z" fill="url(#cardGold)" />
                    <circle cx="30" cy="3" r="1" fill="url(#cardGold)" />
                    {/* The Regal 'K' */}
                    <text
                      x="30"
                      y="38"
                      fontFamily="'Cinzel', Georgia, serif"
                      fontSize="24"
                      fontWeight="700"
                      fill="url(#cardGold)"
                      textAnchor="middle"
                    >
                      K
                    </text>
                  </svg>
                </div>

                {/* Brand Name Title */}
                <h1 className="font-display text-lg xs:text-xl sm:text-2xl md:text-3xl font-extrabold tracking-[0.2em] sm:tracking-[0.24em] uppercase text-crimson-900 drop-shadow-sm">
                  {INTRO_CONFIG.brandName}
                </h1>

                {/* Subheading under KUMAR CARDS */}
                <p className="font-serif italic text-[9px] xs:text-[10px] sm:text-xs font-semibold text-crimson-800 tracking-wide mt-0.5 leading-snug">
                  {INTRO_CONFIG.subheading}
                </p>

                {/* Golden Center Flourish Divider */}
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 w-28 xs:w-32 sm:w-44 my-0.5 sm:my-1">
                  <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold-600/60 to-transparent" />
                  <span className="w-1.5 h-1.5 rotate-45 bg-gold-600" />
                  <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold-600/60 to-transparent" />
                </div>
              </div>

              {/* Lower Section: Offerings & Tagline (100% visible & readable) */}
              <div
                className={`relative z-10 flex flex-col items-center w-full transition-opacity duration-700 ease-out ${
                  isBrandNoteRisen ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {/* Primary Offering Line */}
                <div className="text-[10px] xs:text-[11px] sm:text-xs font-bold text-gold-700 tracking-wide text-center leading-tight">
                  {INTRO_CONFIG.offeringsLine1}
                </div>

                {/* Secondary Offering Line */}
                <div className="text-[9px] xs:text-[10px] sm:text-[11px] font-bold text-gold-800 tracking-wider uppercase mt-0.5 sm:mt-1">
                  {INTRO_CONFIG.offeringsLine2}
                </div>

                {/* Supporting Tagline */}
                <p className="font-serif italic text-[9px] xs:text-[10px] sm:text-xs text-ink-600 tracking-normal mt-1 leading-snug">
                  "{INTRO_CONFIG.tagline}"
                </p>

                {/* Subtle Auspicious Ribbon / Card Base Accent */}
                <div className="mt-1 sm:mt-2 flex items-center gap-1 text-[8.5px] xs:text-[9.5px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-gold-700/80 font-semibold">
                  <Sparkles className="w-2.5 h-2.5 text-gold-600" />
                  <span>{INTRO_CONFIG.secondaryCta}</span>
                  <span className="text-gold-600">→</span>
                </div>
              </div>
            </div>

            {/* ===================================================== */}
            {/* 4. ENVELOPE FRONT POCKET (Overlaps Base of Risen Card) */}
            {/* ===================================================== */}
            <div
              className="relative z-30 w-full h-[115px] xs:h-[125px] sm:h-[150px] md:h-[160px] rounded-b-2xl overflow-hidden shadow-[0_-4px_16px_rgba(0,0,0,0.4)]"
              style={{
                background: 'linear-gradient(160deg, #620D1A 0%, #46060F 55%, #240206 100%)',
              }}
            >
              {/* Outer Golden Border on Pocket Edge */}
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-gold-500/30 via-gold-300 to-gold-500/30 shadow-[0_0_6px_rgba(212,175,55,0.7)]" />

              {/* Front Triangular V-Dip Lip SVG */}
              <svg
                viewBox="0 0 400 60"
                className="absolute -top-[1px] inset-x-0 w-full h-auto text-crimson-900 pointer-events-none drop-shadow-sm"
                fill="none"
              >
                <path
                  d="M0,0 L200,42 L400,0 L400,8 L200,50 L0,8 Z"
                  fill="url(#pocketGoldBorder)"
                />
                <defs>
                  <linearGradient id="pocketGoldBorder" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#AA7C11" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#DFB76C" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#AA7C11" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Authentic Embossed Indian Wedding Motifs on Pocket Face */}
              <div className="absolute inset-x-3 sm:inset-x-4 bottom-2.5 sm:bottom-3 flex items-center justify-between text-gold-400/50 pointer-events-none">
                {/* Left Floral Arch Flourish */}
                <svg width="32" height="32" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.2" className="sm:w-[38px] sm:h-[38px]">
                  <path d="M10 40 Q25 40 25 20 Q25 40 40 40" />
                  <path d="M18 40 Q25 32 32 40" />
                  <circle cx="25" cy="15" r="2" fill="currentColor" />
                </svg>

                {/* Center Royal Shagun Stamp */}
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-gold-400/40 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 bg-gold-400/60" />
                  </div>
                  <span className="text-[7.5px] sm:text-[9px] uppercase tracking-[0.22em] sm:tracking-[0.25em] text-gold-300/60 font-semibold mt-0.5 sm:mt-1">
                    ROYAL LIFAFE
                  </span>
                </div>

                {/* Right Floral Arch Flourish */}
                <svg width="32" height="32" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.2" className="sm:w-[38px] sm:h-[38px]">
                  <path d="M10 40 Q25 40 25 20 Q25 40 40 40" />
                  <path d="M18 40 Q25 32 32 40" />
                  <circle cx="25" cy="15" r="2" fill="currentColor" />
                </svg>
              </div>

              {/* Subtle Gold Foil Dashed Border at base of pocket */}
              <div className="absolute inset-x-3 bottom-2 h-[1px] border-b border-dashed border-gold-400/30" />
            </div>

            {/* ===================================================== */}
            {/* 5. THE 3D ROTATING TOP FLAP (Tucked behind at z-5)    */}
            {/*    Pushed back into negative depth, never blocks text */}
            {/* ===================================================== */}
            <div
              className="absolute top-0 inset-x-0 origin-top preserve-3d transition-all duration-[1000ms] ease-in-out"
              style={{
                height: isMobile ? '75px' : '95px',
                transform: isFlapOpen
                  ? 'rotateX(180deg) translate3d(0, 0, -45px)'
                  : 'rotateX(0deg) translate3d(0, 0, 0px)',
                zIndex: isFlapOpen ? 5 : 40,
                opacity: isBrandNoteRisen ? 0.25 : 1,
              }}
            >
              {/* Front Side of Flap (Visible when Closed) */}
              <div
                className="absolute inset-0 backface-hidden rounded-t-2xl flex flex-col items-center justify-end overflow-visible"
                style={{
                  background: 'linear-gradient(180deg, #5A0B16 0%, #46060F 60%, #300309 100%)',
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
                }}
              >
                {/* Gold Foil Border Along Flap Edges */}
                <svg viewBox="0 0 200 100" className="w-full h-full pointer-events-none" preserveAspectRatio="none">
                  <path
                    d="M0,0 L100,98 L200,0"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="2.5"
                    strokeOpacity="0.85"
                  />
                  <path
                    d="M8,0 L100,90 L192,0"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="1"
                    strokeDasharray="4 2"
                    strokeOpacity="0.6"
                  />
                </svg>

                {/* Auspicious Royal Gold Seal at the Flap Tip */}
                <div
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 sm:w-11 sm:h-11 rounded-full border-2 border-gold-300 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.6),0_0_12px_rgba(212,175,55,0.7)]"
                  style={{
                    background: 'radial-gradient(circle, #DFB76C 0%, #AA7C11 75%, #6A4B06 100%)',
                  }}
                >
                  <span className="font-serif font-bold text-xs sm:text-sm text-crimson-950">
                    K
                  </span>
                </div>
              </div>

              {/* Back Side of Flap (Visible when Rotated Open 180deg) */}
              <div
                className="absolute inset-0 backface-hidden rounded-t-2xl flex flex-col items-center justify-center"
                style={{
                  background: 'linear-gradient(180deg, #35050C 0%, #250308 100%)',
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  transform: 'rotateY(180deg)',
                  borderTop: '1px solid rgba(212, 175, 55, 0.4)',
                }}
              >
                <div className="w-10 sm:w-12 h-5 sm:h-6 border-b border-gold-400/30 rounded-b-full opacity-60" />
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* BOTTOM BAR: Progress Bar & Brand Footnote */}
      <footer className="relative z-40 px-4 sm:px-8 pb-4 sm:pb-7 flex flex-col items-center">
        {/* Subtle Timeline Progress Bar for the Experience */}
        <div className="w-32 sm:w-52 h-0.5 rounded-full bg-white/10 overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-gold-500 via-amber-300 to-gold-400 shadow-[0_0_8px_rgba(212,175,55,0.8)] transition-all ease-linear"
            style={{
              width:
                stage === 1
                  ? '10%'
                  : stage === 2
                  ? '25%'
                  : stage === 3
                  ? '40%'
                  : stage === 4
                  ? '55%'
                  : stage === 5
                  ? '75%'
                  : stage === 6
                  ? '92%'
                  : '100%',
              transitionDuration:
                stage === 1
                  ? '600ms'
                  : stage === 2
                  ? '1000ms'
                  : stage === 3
                  ? '1200ms'
                  : stage === 4
                  ? '1400ms'
                  : stage === 5
                  ? '1400ms'
                  : stage === 6
                  ? '1600ms'
                  : '800ms',
            }}
          />
        </div>

        {/* Micro Footer Craftsmanship Note */}
        <p className="text-[9px] sm:text-[11px] text-cream-300/60 tracking-[0.2em] uppercase font-medium">
          Premier Wedding Cards & Shagun Lifafe • Hapur
        </p>
      </footer>
    </div>
  );
}
