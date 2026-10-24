import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { INTRO_CONFIG } from '../../config/introProducts';

/**
 * BrandIntro - Animated Designer Lifafa Reveal for Kumar Cards.
 * 
 * Concept:
 * A premium Indian wedding shagun lifafa (envelope) appears, opens gracefully
 * with realistic 3D paper folding and a golden inner glow, from which the
 * regal Kumar Cards invitation card elegantly rises out, revealing the brand mark,
 * brand name, and core offerings.
 * 
 * Timeline (~8.0s total):
 * - Scene 1 (0.0s - 0.8s): Sealed burgundy lifafa appears with gold accents
 * - Scene 2 (0.8s - 2.0s): Top flap folds open in 3D, golden light radiates from within
 * - Scene 3 (2.0s - 3.8s): Inner card glides upward revealing 'K' monogram & 'KUMAR CARDS'
 * - Scene 4 (3.8s - 5.4s): Offerings and tagline fade in with elegant typography
 * - Scene 5 (5.4s - 8.0s): Appreciation hold (+3-4s longer as requested)
 * - Scene 6 (8.0s - 8.8s): Smooth dissolve transition into interactive homepage
 */
export default function BrandIntro({ onComplete, isForced = false }) {
  // Animation stage: 1 (Sealed) | 2 (Flap Opening) | 3 (Card Rising) | 4 (Text Reveal) | 5 (Appreciation Hold) | 6 (Dissolve)
  const [stage, setStage] = useState(1);
  const [isOverlayFading, setIsOverlayFading] = useState(false);
  const timeoutIdsRef = useRef([]);

  const clearAllTimeouts = useCallback(() => {
    timeoutIdsRef.current.forEach((id) => clearTimeout(id));
    timeoutIdsRef.current = [];
  }, []);

  const addTimeout = useCallback((fn, delay) => {
    const id = setTimeout(fn, delay);
    timeoutIdsRef.current.push(id);
    return id;
  }, []);

  // Complete and transition into homepage
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

  // Orchestrate the animated lifafa reveal
  useEffect(() => {
    clearAllTimeouts();

    // Stage 1 -> 2: Flap starts opening (t = 800ms)
    addTimeout(() => {
      setStage(2);
    }, INTRO_CONFIG.timings.lifafaEnter);

    // Stage 2 -> 3: Card begins rising (t = 2000ms)
    addTimeout(() => {
      setStage(3);
    }, INTRO_CONFIG.timings.lifafaEnter + INTRO_CONFIG.timings.flapOpen);

    // Stage 3 -> 4: Text reveals (t = 3800ms)
    addTimeout(() => {
      setStage(4);
    }, INTRO_CONFIG.timings.lifafaEnter + INTRO_CONFIG.timings.flapOpen + INTRO_CONFIG.timings.cardRise);

    // Stage 4 -> 5: Appreciation hold (t = 5400ms)
    addTimeout(() => {
      setStage(5);
    }, INTRO_CONFIG.timings.lifafaEnter + INTRO_CONFIG.timings.flapOpen + INTRO_CONFIG.timings.cardRise + INTRO_CONFIG.timings.textReveal);

    // Stage 5 -> 6: Dissolve transition into homepage (t = 8000ms)
    addTimeout(() => {
      setStage(6);
      handleFinish();
    }, INTRO_CONFIG.timings.totalDuration);

    return () => clearAllTimeouts();
  }, [addTimeout, clearAllTimeouts, handleFinish]);

  const isFlapOpen = stage >= 2;
  const isCardRisen = stage >= 3;
  const isTextVisible = stage >= 4;

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
      <header className="relative z-50 flex items-center justify-between px-5 sm:px-10 pt-5 sm:pt-7">
        <div
          className={`flex items-center gap-2 transition-opacity duration-700 ${
            stage >= 2 ? 'opacity-90' : 'opacity-0'
          }`}
        >
          <span className="font-display tracking-[0.25em] text-[10px] sm:text-xs font-semibold text-gold-300/80 uppercase">
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

      {/* MAIN CENTER STAGE: The Animated Lifafa & Rising Branded Card */}
      <main className="relative z-30 flex-1 flex flex-col items-center justify-center px-4 pt-16 pb-8 sm:pt-20 sm:pb-12">
        
        {/* Lifafa Stage Wrapper with 3D Perspective */}
        <div
          className="relative perspective-1200 w-[310px] xs:w-[345px] sm:w-[410px] md:w-[440px] flex items-center justify-center transition-transform duration-1000 ease-out"
          style={{
            transform: isCardRisen ? 'translateY(55px) sm:translateY(65px)' : 'translateY(0)',
          }}
        >
          {/* Ambient Lighting Cast Beneath the Lifafa */}
          <div className="absolute -bottom-6 w-[88%] h-8 bg-black/70 rounded-full blur-xl pointer-events-none" />

          {/* ======================================================= */}
          {/* 1. THE LIFAFA ENVELOPE BASE (Pocket & Layers)           */}
          {/* ======================================================= */}
          <div
            className="relative w-full h-[200px] xs:h-[220px] sm:h-[250px] md:h-[265px] rounded-2xl border border-gold-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(197,154,69,0.15)] flex flex-col justify-end"
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
              className={`absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-24 rounded-full pointer-events-none transition-opacity duration-1000 ease-out ${
                isFlapOpen ? 'opacity-80 scale-105' : 'opacity-0 scale-90'
              }`}
              style={{
                background: 'radial-gradient(ellipse at 50% 20%, rgba(255, 223, 138, 0.6) 0%, rgba(212, 175, 55, 0.3) 45%, transparent 75%)',
                filter: 'blur(8px)',
              }}
            />

            {/* ===================================================== */}
            {/* 2. THE RISING BRANDED INVITATION CARD                 */}
            {/* ===================================================== */}
            <div
              className="absolute left-[4%] right-[4%] z-20 transition-all duration-[1400ms] cubic-bezier(0.22, 1, 0.36, 1) flex flex-col items-center justify-between text-center"
              style={{
                top: '12px',
                height: '265px',
                transform: isCardRisen
                  ? 'translateY(-170px)'
                  : 'translateY(15px)',
                background: 'linear-gradient(145deg, #FAF7EE 0%, #F4ECE0 50%, #ECE1D0 100%)',
                borderRadius: '16px',
                padding: '12px 14px',
                boxShadow: isCardRisen
                  ? '0 -15px 35px rgba(0,0,0,0.5), 0 0 25px rgba(212, 175, 55, 0.25)'
                  : 'none',
                border: '1.5px solid rgba(197, 154, 69, 0.6)',
              }}
            >
              {/* Inner Double Gold Foil Line on Card */}
              <div className="absolute inset-2 rounded-xl border border-gold-500/35 pointer-events-none" />

              {/* Corner Ornamental Accents on Card */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-gold-600/70 pointer-events-none" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-gold-600/70 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-gold-600/70 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-gold-600/70 pointer-events-none" />

              {/* Top Section: Royal Crest Monogram & Brand Name */}
              <div className="relative z-10 flex flex-col items-center w-full">
                
                {/* Scalable Monogram Logo Emblem */}
                <div className="relative mb-1">
                  <svg
                    viewBox="0 0 60 60"
                    className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-sm"
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
                <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold tracking-[0.24em] uppercase text-crimson-900 drop-shadow-sm">
                  {INTRO_CONFIG.brandName}
                </h1>

                {/* Subheading under KUMAR CARDS */}
                <p className="font-serif italic text-[10px] sm:text-[11px] md:text-xs font-semibold text-crimson-800 tracking-wide mt-0.5 leading-snug">
                  {INTRO_CONFIG.subheading}
                </p>

                {/* Golden Center Flourish Divider */}
                <div className="flex items-center justify-center gap-2 w-32 sm:w-44 my-1">
                  <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold-600/60 to-transparent" />
                  <span className="w-1.5 h-1.5 rotate-45 bg-gold-600" />
                  <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold-600/60 to-transparent" />
                </div>
              </div>

              {/* Lower Section: Offerings & Tagline (Smooth Fade-in as Card Rises) */}
              <div
                className={`relative z-10 flex flex-col items-center w-full transition-opacity duration-700 ease-out ${
                  isTextVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {/* Primary Offering Line */}
                <div className="text-[11px] sm:text-xs font-semibold text-crimson-950 tracking-wide text-center leading-tight">
                  {INTRO_CONFIG.offeringsLine1}
                </div>

                {/* Secondary Offering Line */}
                <div className="text-[10px] sm:text-[11px] font-bold text-gold-800 tracking-wider uppercase mt-1">
                  {INTRO_CONFIG.offeringsLine2}
                </div>

                {/* Supporting Tagline */}
                <p className="font-serif italic text-[11px] sm:text-xs text-ink-600 tracking-normal mt-1.5 leading-snug">
                  "{INTRO_CONFIG.tagline}"
                </p>

                {/* Subtle Auspicious Ribbon / Card Base Accent */}
                <div className="mt-2 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-gold-700/80 font-semibold">
                  <Sparkles className="w-2.5 h-2.5 text-gold-600" />
                  <span>{INTRO_CONFIG.secondaryCta}</span>
                  <span className="text-gold-600">→</span>
                </div>
              </div>
            </div>

            {/* ===================================================== */}
            {/* 3. ENVELOPE FRONT POCKET (Overlaps the Rising Card)   */}
            {/* ===================================================== */}
            <div
              className="relative z-30 w-full h-[125px] xs:h-[135px] sm:h-[155px] md:h-[165px] rounded-b-2xl overflow-hidden shadow-[0_-4px_16px_rgba(0,0,0,0.4)]"
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
              <div className="absolute inset-x-4 bottom-3 flex items-center justify-between text-gold-400/50 pointer-events-none">
                {/* Left Floral Arch Flourish */}
                <svg width="38" height="38" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M10 40 Q25 40 25 20 Q25 40 40 40" />
                  <path d="M18 40 Q25 32 32 40" />
                  <circle cx="25" cy="15" r="2" fill="currentColor" />
                </svg>

                {/* Center Royal Shagun Stamp */}
                <div className="flex flex-col items-center">
                  <div className="w-5 h-5 rounded-full border border-gold-400/40 flex items-center justify-center">
                    <div className="w-2 h-2 rotate-45 bg-gold-400/60" />
                  </div>
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-gold-300/60 font-semibold mt-1">
                    ROYAL LIFAFE
                  </span>
                </div>

                {/* Right Floral Arch Flourish */}
                <svg width="38" height="38" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M10 40 Q25 40 25 20 Q25 40 40 40" />
                  <path d="M18 40 Q25 32 32 40" />
                  <circle cx="25" cy="15" r="2" fill="currentColor" />
                </svg>
              </div>

              {/* Subtle Gold Foil Dashed Border at base of pocket */}
              <div className="absolute inset-x-3 bottom-2 h-[1px] border-b border-dashed border-gold-400/30" />
            </div>

            {/* ===================================================== */}
            {/* 4. THE 3D ROTATING TOP FLAP (Realistic Paper Fold)    */}
            {/* ===================================================== */}
            <div
              className="absolute top-0 inset-x-0 origin-top preserve-3d transition-transform duration-[1200ms] ease-in-out"
              style={{
                height: '110px',
                transform: isFlapOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
                zIndex: isFlapOpen ? 12 : 40,
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
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-gold-300 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.6),0_0_12px_rgba(212,175,55,0.7)]"
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
                <div className="w-12 h-6 border-b border-gold-400/30 rounded-b-full opacity-60" />
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* BOTTOM BAR: Progress Bar & Brand Footnote */}
      <footer className="relative z-40 px-4 sm:px-8 pb-5 sm:pb-7 flex flex-col items-center">
        {/* Subtle Timeline Progress Bar for the 8s Experience */}
        <div className="w-36 sm:w-52 h-0.5 rounded-full bg-white/10 overflow-hidden mb-2.5">
          <div
            className="h-full bg-gradient-to-r from-gold-500 via-amber-300 to-gold-400 shadow-[0_0_8px_rgba(212,175,55,0.8)] transition-all ease-linear"
            style={{
              width:
                stage === 1
                  ? '15%'
                  : stage === 2
                  ? '30%'
                  : stage === 3
                  ? '55%'
                  : stage === 4
                  ? '75%'
                  : stage === 5
                  ? '95%'
                  : '100%',
              transitionDuration:
                stage === 1
                  ? '800ms'
                  : stage === 2
                  ? '1200ms'
                  : stage === 3
                  ? '1800ms'
                  : stage === 4
                  ? '1600ms'
                  : '2600ms',
            }}
          />
        </div>

        {/* Micro Footer Craftsmanship Note */}
        <p className="text-[10px] sm:text-[11px] text-cream-300/60 tracking-[0.2em] uppercase font-medium">
          Premier Wedding Cards & Shagun Lifafe • Hapur
        </p>
      </footer>
    </div>
  );
}
