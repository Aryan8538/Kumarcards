import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';
import { INTRO_CONFIG, resolveIntroProducts } from '../../config/introProducts';

/**
 * BrandIntro - Strict Three-Stage Mobile-First Cinematic Reveal for Kumar Cards.
 * 
 * STAGE 1 — BRAND REVEAL (0.0s – 3.4s)
 * - Closed burgundy lifafa appears centered.
 * - Flap opens smoothly in 3D.
 * - Ivory Kumar Cards brand note rises COMPLETELY out of the envelope to center screen.
 * - Entire note is 100% visible: monogram crest, KUMAR CARDS, subtitle, offerings, tagline.
 * - Flap tucks behind and fades completely so it NEVER covers any text.
 * - ZERO product cards appear during Stage 1.
 * - Held for brand appreciation.
 * 
 * STAGE 2 — PRODUCT SHOWCASE (3.4s – 6.6s)
 * - Burgundy envelope smoothly slides DOWN and OUT of the main viewing area.
 * - Brand note smoothly dissolves UP and OUT of the viewing area.
 * - Center screen is 100% clear.
 * - The 5 handpicked product cards emerge from the center one by one.
 * - Mobile: Perfectly non-overlapping 2-column + bottom center anchor arrangement.
 * - Desktop: Wide panoramic arc.
 * - All 5 cards are 100% visible with genuine photographs, titles, and prices.
 * - Subtle organic floating sway once settled.
 * 
 * STAGE 3 — HOMEPAGE TRANSITION (6.6s – 7.4s)
 * - Cards smoothly converge and dissolve.
 * - Seamless transition into the homepage showroom.
 */

// 5-card non-overlapping slots calibrated for full-screen display across all screen sizes
const FIVE_CARD_SLOTS = {
  desktop: [
    { dir: 'far-left', x: -440, y: -30, rot: -7, scale: 1.05, delay: 0, zIndex: 22, floatClass: 'animate-float-card-a' },
    { dir: 'mid-left', x: -220, y: 45, rot: -3, scale: 1.08, delay: 140, zIndex: 25, floatClass: 'animate-float-card-b' },
    { dir: 'center', x: 0, y: -60, rot: 0, scale: 1.15, delay: 280, zIndex: 28, floatClass: 'animate-float-card-c' },
    { dir: 'mid-right', x: 220, y: 45, rot: 3, scale: 1.08, delay: 420, zIndex: 25, floatClass: 'animate-float-card-b' },
    { dir: 'far-right', x: 440, y: -30, rot: 7, scale: 1.05, delay: 560, zIndex: 22, floatClass: 'animate-float-card-a' },
  ],
  tablet: [
    { dir: 'top-left', x: -240, y: -100, rot: -5, scale: 0.95, delay: 0, zIndex: 22, floatClass: 'animate-float-card-a' },
    { dir: 'top-right', x: 240, y: -100, rot: 5, scale: 0.95, delay: 140, zIndex: 22, floatClass: 'animate-float-card-c' },
    { dir: 'center', x: 0, y: -40, rot: 0, scale: 1.05, delay: 280, zIndex: 28, floatClass: 'animate-float-card-b' },
    { dir: 'bottom-left', x: -160, y: 125, rot: -3, scale: 0.98, delay: 420, zIndex: 24, floatClass: 'animate-float-card-a' },
    { dir: 'bottom-right', x: 160, y: 125, rot: 3, scale: 0.98, delay: 560, zIndex: 24, floatClass: 'animate-float-card-b' },
  ],
  mobile: [
    // Staggered 2-column + bottom center anchor: 100% non-overlapping, zero clipping
    // Row 1 (Top pair)
    { dir: 'top-left', x: -78, y: -170, rot: -4, scale: 1.0, delay: 0, zIndex: 22, floatClass: 'animate-float-card-a' },
    { dir: 'top-right', x: 78, y: -145, rot: 4, scale: 1.0, delay: 140, zIndex: 22, floatClass: 'animate-float-card-c' },
    // Row 2 (Middle pair)
    { dir: 'mid-left', x: -78, y: -5, rot: 3, scale: 1.0, delay: 280, zIndex: 24, floatClass: 'animate-float-card-b' },
    { dir: 'mid-right', x: 78, y: 15, rot: -3, scale: 1.0, delay: 420, zIndex: 24, floatClass: 'animate-float-card-a' },
    // Row 3 (Bottom center hero anchor)
    { dir: 'bottom-center', x: 0, y: 185, rot: 0, scale: 1.05, delay: 560, zIndex: 27, floatClass: 'animate-float-card-b' },
  ],
  smallMobile: [
    // Calibrated for compact screens (< 375px width, < 700px height)
    { dir: 'top-left', x: -70, y: -150, rot: -3, scale: 0.95, delay: 0, zIndex: 22, floatClass: 'animate-float-card-a' },
    { dir: 'top-right', x: 70, y: -125, rot: 3, scale: 0.95, delay: 140, zIndex: 22, floatClass: 'animate-float-card-c' },
    { dir: 'mid-left', x: -70, y: -5, rot: 2.5, scale: 0.95, delay: 280, zIndex: 24, floatClass: 'animate-float-card-b' },
    { dir: 'mid-right', x: 70, y: 15, rot: -2.5, scale: 0.95, delay: 420, zIndex: 24, floatClass: 'animate-float-card-a' },
    { dir: 'bottom-center', x: 0, y: 165, rot: 0, scale: 1.0, delay: 560, zIndex: 27, floatClass: 'animate-float-card-b' },
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

  // Animation Stage Machine:
  // 1: STAGE 1a - Sealed envelope enters (0.0s - 0.5s)
  // 2: STAGE 1b - Flap folds open in 3D (0.5s - 1.2s)
  // 3: STAGE 1c - Brand note rises completely out of envelope (1.2s - 2.2s)
  // 4: STAGE 1d - Brand hold (unobstructed, full reading) (2.2s - 3.4s)
  // 5: STAGE 2a - Envelope & note exit, 5 product cards emerge from center (3.4s - 5.0s)
  // 6: STAGE 2b - Full 5-card showcase appreciation hold (5.0s - 6.6s)
  // 7: STAGE 3  - Cards dissolve & transition into homepage (6.6s - 7.4s)
  const [stage, setStage] = useState(1);
  const [cardsEmerged, setCardsEmerged] = useState(false);
  const [isOverlayFading, setIsOverlayFading] = useState(false);
  const timeoutIdsRef = useRef([]);

  // Responsive viewport dimensions
  const [windowWidth, setWindowWidth] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1024));

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSmallMobile = windowWidth < 375;
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  // Resolve 5 featured products from config (SL-001, SL-002, SL-006, SL-018, GE-021)
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
      // Ignore if storage restricted
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

  // Orchestrate the strict 3-stage timeline
  useEffect(() => {
    clearAllTimeouts();

    const t = INTRO_CONFIG.timings;

    // Stage 1b: Flap starts opening (t = 500ms)
    addTimeout(() => setStage(2), t.lifafaEnter);

    // Stage 1c: Brand note rises completely out of envelope (t = 1200ms)
    addTimeout(() => setStage(3), t.lifafaEnter + t.flapOpen);

    // Stage 1d: Brand note is fully centered, visible & held for reading (t = 2200ms)
    addTimeout(() => setStage(4), t.lifafaEnter + t.flapOpen + t.brandNoteRise);

    // Stage 2a: Move envelope & brand note completely out of viewing area (t = 3400ms)
    addTimeout(() => {
      setStage(5);
      // Stagger card emergence right after envelope clears center
      addTimeout(() => setCardsEmerged(true), 100);
    }, t.lifafaEnter + t.flapOpen + t.brandNoteRise + t.brandHold);

    // Stage 2b: All 5 cards settled in full showcase appreciation (t = 5000ms)
    addTimeout(() => {
      setStage(6);
    }, t.lifafaEnter + t.flapOpen + t.brandNoteRise + t.brandHold + t.cardsEmerge);

    // Stage 3: Smooth dissolve transition into homepage (t = 6600ms)
    addTimeout(() => {
      setStage(7);
      handleFinish();
    }, t.lifafaEnter + t.flapOpen + t.brandNoteRise + t.brandHold + t.cardsEmerge + t.showcaseHold);

    return () => clearAllTimeouts();
  }, [addTimeout, clearAllTimeouts, handleFinish]);

  const isFlapOpen = stage >= 2;
  const isBrandNoteRising = stage >= 3;
  const isBrandNoteHeld = stage >= 4;
  const isStageTwo = stage >= 5; // Envelope & note move out, cards emerge
  const isShowcaseHeld = stage >= 6; // All cards settled and floating

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
            {isStageTwo ? 'FEATURED WEDDING COLLECTION' : INTRO_CONFIG.heritageBadge}
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

      {/* ========================================================================= */}
      {/* MAIN VIEWPORT ARENA: Strict Separation Between Stage 1 and Stage 2         */}
      {/* ========================================================================= */}
      <main className="relative z-30 flex-1 w-full h-full flex items-center justify-center overflow-hidden px-2">

        {/* ----------------------------------------------------------------------- */}
        {/* STAGE 1: ENVELOPE & BRAND REVEAL                                        */}
        {/* Flap opens -> Brand note rises COMPLETELY out -> held unobstructed      */}
        {/* At Stage 2: Envelope slides completely DOWN off-screen (100vh)          */}
        {/* Note dissolves gently UP and OUT. Center screen is 100% CLEAR.          */}
        {/* ----------------------------------------------------------------------- */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1)"
          style={{
            transform: isStageTwo
              ? 'translate3d(0, 120vh, 0)'
              : 'translate3d(0, 0, 0)',
            opacity: isStageTwo ? 0 : 1,
            pointerEvents: isStageTwo ? 'none' : 'auto',
          }}
        >
          {/* Envelope & Note Staging Vessel */}
          <div className="relative flex flex-col items-center justify-center w-[275px] xs:w-[295px] sm:w-[390px] md:w-[420px]">

            {/* 1. THE RISING ORIGINAL KUMAR CARDS BRAND NOTE */}
            {/* Rises COMPLETELY out of the envelope and floats prominently in the center */}
            <div
              className="absolute left-1/2 -translate-x-1/2 transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) flex flex-col items-center justify-between text-center w-[260px] xs:w-[275px] sm:w-[360px] md:w-[380px]"
              style={{
                top: isStageTwo
                  ? '-220px'
                  : isBrandNoteRising
                  ? (isMobile ? '-140px' : '-170px')
                  : '10px',
                height: isMobile ? '255px' : '270px',
                opacity: isStageTwo ? 0 : isBrandNoteRising ? 1 : 0,
                transform: `translateX(-50%) scale(${isStageTwo ? 0.85 : isBrandNoteHeld ? 1.0 : 0.96})`,
                zIndex: 35,
                background: 'linear-gradient(145deg, #FAF7EE 0%, #F4ECE0 50%, #ECE1D0 100%)',
                borderRadius: '16px',
                padding: isMobile ? '12px 14px' : '14px 16px',
                boxShadow: isBrandNoteRising && !isStageTwo
                  ? '0 20px 45px rgba(0,0,0,0.65), 0 0 30px rgba(212, 175, 55, 0.3)'
                  : 'none',
                border: '1.5px solid rgba(197, 154, 69, 0.7)',
                pointerEvents: isStageTwo ? 'none' : 'auto',
              }}
            >
              {/* Inner Double Gold Foil Line on Note */}
              <div className="absolute inset-1.5 sm:inset-2 rounded-xl border border-gold-500/35 pointer-events-none" />

              {/* Corner Ornamental Accents on Note */}
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
                <p className="font-serif italic text-[9px] xs:text-[9.5px] sm:text-xs font-semibold text-crimson-800 tracking-wide mt-0.5 leading-snug">
                  {INTRO_CONFIG.subheading}
                </p>

                {/* Golden Center Flourish Divider */}
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 w-28 xs:w-32 sm:w-44 my-1 sm:my-1.5">
                  <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold-600/60 to-transparent" />
                  <span className="w-1.5 h-1.5 rotate-45 bg-gold-600" />
                  <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold-600/60 to-transparent" />
                </div>
              </div>

              {/* Lower Section: Offerings & Tagline (100% visible & readable) */}
              <div
                className={`relative z-10 flex flex-col items-center w-full transition-opacity duration-700 ease-out ${
                  isBrandNoteRising ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {/* Primary Offering Line */}
                <div className="text-[10px] xs:text-[10.5px] sm:text-xs font-bold text-gold-700 tracking-wide text-center leading-tight">
                  {INTRO_CONFIG.offeringsLine1}
                </div>

                {/* Secondary Offering Line */}
                <div className="text-[9px] xs:text-[9.5px] sm:text-[11px] font-bold text-gold-800 tracking-wider uppercase mt-0.5 sm:mt-1">
                  {INTRO_CONFIG.offeringsLine2}
                </div>

                {/* Supporting Tagline */}
                <p className="font-serif italic text-[9px] xs:text-[9.5px] sm:text-xs text-ink-600 tracking-normal mt-1 leading-snug">
                  "{INTRO_CONFIG.tagline}"
                </p>

                {/* Auspicious Ribbon / Card Base Accent */}
                <div className="mt-1.5 sm:mt-2 flex items-center gap-1 text-[8.5px] xs:text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-gold-700/90 font-semibold">
                  <Sparkles className="w-2.5 h-2.5 text-gold-600" />
                  <span>{INTRO_CONFIG.secondaryCta}</span>
                  <span className="text-gold-600">→</span>
                </div>
              </div>
            </div>

            {/* 2. THE BURGUNDY ENVELOPE BASE (Pocket & Flap) */}
            <div
              className={`relative perspective-1200 w-full h-[155px] xs:h-[165px] sm:h-[220px] md:h-[235px] rounded-2xl border border-gold-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(197,154,69,0.15)] flex flex-col justify-end transition-transform duration-1000 ease-out ${
                isBrandNoteRising ? 'translate-y-[85px] xs:translate-y-[95px] sm:translate-y-[110px]' : 'translate-y-0'
              }`}
              style={{
                background: 'linear-gradient(155deg, #4A0812 0%, #30040A 60%, #1A0205 100%)',
                zIndex: 20,
              }}
            >
              {/* Inner Back Wall Lining (Gold Lattice Motif) */}
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

              {/* Interior Golden Light Glow (blossoms when flap opens) */}
              <div
                className={`absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-20 sm:h-24 rounded-full pointer-events-none transition-opacity duration-700 ease-out ${
                  isFlapOpen && !isBrandNoteRising ? 'opacity-85 scale-105' : 'opacity-0 scale-90'
                }`}
                style={{
                  background: 'radial-gradient(ellipse at 50% 20%, rgba(255, 223, 138, 0.65) 0%, rgba(212, 175, 55, 0.35) 45%, transparent 75%)',
                  filter: 'blur(8px)',
                }}
              />

              {/* 3. ENVELOPE FRONT POCKET */}
              <div
                className="relative z-30 w-full h-[100px] xs:h-[110px] sm:h-[140px] md:h-[150px] rounded-b-2xl overflow-hidden shadow-[0_-4px_16px_rgba(0,0,0,0.4)]"
                style={{
                  background: 'linear-gradient(160deg, #620D1A 0%, #46060F 55%, #240206 100%)',
                }}
              >
                {/* Outer Golden Border on Pocket Lip */}
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-gold-500/30 via-gold-300 to-gold-500/30 shadow-[0_0_6px_rgba(212,175,55,0.7)]" />

                {/* Front Triangular V-Dip Lip SVG */}
                <svg
                  viewBox="0 0 400 60"
                  className="absolute -top-[1px] inset-x-0 w-full h-auto text-crimson-900 pointer-events-none drop-shadow-sm"
                  fill="none"
                >
                  <path
                    d="M0,0 L200,38 L400,0 L400,7 L200,45 L0,7 Z"
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

                {/* Embossed Motifs on Pocket Face */}
                <div className="absolute inset-x-3 sm:inset-x-4 bottom-2 sm:bottom-3 flex items-center justify-between text-gold-400/50 pointer-events-none">
                  <svg width="28" height="28" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.2" className="sm:w-[34px] sm:h-[34px]">
                    <path d="M10 40 Q25 40 25 20 Q25 40 40 40" />
                    <path d="M18 40 Q25 32 32 40" />
                    <circle cx="25" cy="15" r="2" fill="currentColor" />
                  </svg>

                  {/* Center Royal Shagun Stamp */}
                  <div className="flex flex-col items-center">
                    <div className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 rounded-full border border-gold-400/40 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rotate-45 bg-gold-400/60" />
                    </div>
                    <span className="text-[7px] sm:text-[8.5px] uppercase tracking-[0.22em] sm:tracking-[0.25em] text-gold-300/60 font-semibold mt-0.5">
                      ROYAL LIFAFE
                    </span>
                  </div>

                  <svg width="28" height="28" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.2" className="sm:w-[34px] sm:h-[34px]">
                    <path d="M10 40 Q25 40 25 20 Q25 40 40 40" />
                    <path d="M18 40 Q25 32 32 40" />
                    <circle cx="25" cy="15" r="2" fill="currentColor" />
                  </svg>
                </div>
              </div>

              {/* 4. THE 3D ROTATING TOP FLAP */}
              {/* As soon as the brand note starts rising, the flap tucks behind and fades to opacity 0 */}
              {/* This GUARANTEES the flap NEVER covers or shadows the brand note */}
              <div
                className="absolute top-0 inset-x-0 origin-top preserve-3d transition-all duration-700 ease-in-out pointer-events-none"
                style={{
                  height: isMobile ? '70px' : '90px',
                  transform: isFlapOpen
                    ? 'rotateX(180deg) translate3d(0, 0, -30px)'
                    : 'rotateX(0deg) translate3d(0, 0, 0px)',
                  zIndex: isFlapOpen ? 0 : 40,
                  opacity: isBrandNoteRising ? 0 : 1, // Completely invisible when note rises
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
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gold-300 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.6),0_0_12px_rgba(212,175,55,0.7)]"
                    style={{
                      background: 'radial-gradient(circle, #DFB76C 0%, #AA7C11 75%, #6A4B06 100%)',
                    }}
                  >
                    <span className="font-serif font-bold text-xs sm:text-sm text-crimson-950">
                      K
                    </span>
                  </div>
                </div>

                {/* Back Side of Flap */}
                <div
                  className="absolute inset-0 backface-hidden rounded-t-2xl flex flex-col items-center justify-center"
                  style={{
                    background: 'linear-gradient(180deg, #35050C 0%, #250308 100%)',
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    transform: 'rotateY(180deg)',
                    borderTop: '1px solid rgba(212, 175, 55, 0.4)',
                  }}
                />
              </div>

            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* STAGE 2: 5 FEATURED PRODUCT CARDS SHOWCASE                              */}
        {/* Rendered ONLY during Stage 2 & 3. Center arena is 100% clear.           */}
        {/* Emerge from center with sequential stagger -> settle in dedicated slots */}
        {/* ----------------------------------------------------------------------- */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            visibility: isStageTwo ? 'visible' : 'hidden',
          }}
        >
          {featuredCards.map((product, index) => {
            const slot = getSlotConfig(index, isSmallMobile, isMobile, isTablet);

            // Calculate transform based on emergence state
            let transformStyle = '';
            let opacityStyle = 0;

            if (isOverlayFading) {
              // Stage 3 exit: converge & dissolve
              transformStyle = `translate3d(calc(-50% + ${Math.round(slot.x * 0.4)}px), calc(-50% + ${Math.round(slot.y * 0.4)}px), 0) scale(${+(slot.scale * 0.7).toFixed(2)}) rotate(${+(slot.rot * 0.3).toFixed(1)}deg)`;
              opacityStyle = 0;
            } else if (cardsEmerged && isStageTwo) {
              // Stage 2 target settled coordinates
              transformStyle = `translate3d(calc(-50% + ${slot.x}px), calc(-50% + ${slot.y}px), 0) scale(${slot.scale}) rotate(${slot.rot}deg)`;
              opacityStyle = 1;
            } else {
              // Stage 2 initial emergence from screen center
              transformStyle = 'translate3d(-50%, -50%, 0) scale(0.2) rotate(0deg)';
              opacityStyle = 0;
            }

            return (
              <div
                key={product.id || index}
                onClick={() => handleCardClick(product)}
                role="button"
                tabIndex={0}
                aria-label={`View ${product.name}`}
                className="absolute top-1/2 left-1/2 cursor-pointer group select-none outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                style={{
                  width: isSmallMobile
                    ? '88px'
                    : isMobile
                    ? '98px'
                    : isTablet
                    ? '140px'
                    : '168px',
                  height: isSmallMobile
                    ? '126px'
                    : isMobile
                    ? '140px'
                    : isTablet
                    ? '198px'
                    : '238px',
                  transform: transformStyle,
                  opacity: opacityStyle,
                  zIndex: slot.zIndex,
                  pointerEvents: isStageTwo && !isOverlayFading ? 'auto' : 'none',
                  transition: isOverlayFading
                    ? 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1), opacity 500ms ease-out'
                    : cardsEmerged
                    ? `transform 1050ms cubic-bezier(0.16, 1, 0.3, 1) ${slot.delay}ms, opacity 750ms ease-out ${slot.delay}ms`
                    : 'none',
                }}
                title={product.name}
              >
                {/* Inner container with subtle organic floating sway once settled */}
                <div
                  className={`w-full h-full rounded-xl sm:rounded-2xl p-1 sm:p-1.5 transition-transform duration-300 group-hover:scale-105 ${
                    isShowcaseHeld && !isOverlayFading ? slot.floatClass : ''
                  }`}
                  style={{
                    background: 'linear-gradient(145deg, #FAF7EE 0%, #F5EDE1 50%, #ECE2D2 100%)',
                    border: '1.5px solid rgba(212, 175, 55, 0.6)',
                    boxShadow: slot.scale > 1.02
                      ? '0 20px 42px -6px rgba(0,0,0,0.7), 0 0 22px rgba(212, 175, 55, 0.3)'
                      : '0 16px 34px -6px rgba(0,0,0,0.65), 0 0 16px rgba(212, 175, 55, 0.22)',
                  }}
                >
                  {/* Inner Photo Container */}
                  <div className="relative w-full h-full rounded-lg sm:rounded-xl overflow-hidden bg-crimson-950/20">
                    {/* Actual Product Photograph */}
                    <img
                      src={product.thumbnail || product.images?.[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="eager"
                    />

                    {/* Subtle Inner Gold Foil Border on Card */}
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl border border-gold-400/35 pointer-events-none" />

                    {/* Corner Gold Foil Accents */}
                    <div className="absolute top-0.5 left-0.5 sm:top-1 sm:left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 border-t border-l border-gold-400/80 pointer-events-none" />
                    <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 border-t border-r border-gold-400/80 pointer-events-none" />

                    {/* Elegant Bottom Label Plaque */}
                    <div className="absolute inset-x-0 bottom-0 pt-3 pb-1 px-1 sm:px-1.5 bg-gradient-to-t from-black/85 via-black/55 to-transparent flex flex-col items-center text-center pointer-events-none">
                      <span className="font-serif text-[8px] xs:text-[9px] sm:text-[11px] font-semibold text-gold-200 truncate w-full tracking-wide drop-shadow-sm">
                        {product.introSubtitle || product.name}
                      </span>
                      {product.priceMin && (
                        <span className="text-[7px] xs:text-[8px] sm:text-[9.5px] font-medium text-cream-200/95 tracking-wider">
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
        </div>

      </main>

      {/* BOTTOM BAR: Progress Bar & Brand Footnote */}
      <footer className="relative z-40 px-4 sm:px-8 pb-4 sm:pb-7 flex flex-col items-center">
        {/* Subtle Timeline Progress Bar */}
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
                  ? '500ms'
                  : stage === 2
                  ? '700ms'
                  : stage === 3
                  ? '1000ms'
                  : stage === 4
                  ? '1200ms'
                  : stage === 5
                  ? '1200ms'
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
