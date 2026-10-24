import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Sparkles, Flame } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../config/business';
import { PRODUCTS } from '../../data/seedData';

export default function HeroBanner({ onReplayIntro }) {
  const bestSellersCount = PRODUCTS.filter((p) => p.isBestSeller).length;

  return (
    <section className="relative overflow-hidden bg-cream-100/70 border-b border-cream-200">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-crimson-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            
            {/* Top Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gold-300 shadow-sm text-xs font-semibold text-crimson-900">
                <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                <span>Handcrafted Shagun Lifafe & Stationery</span>
              </div>
              <a
                href="#bestsellers"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('bestsellers')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white shadow-sm text-xs font-bold transition-all cursor-pointer"
              >
                <Flame className="w-3.5 h-3.5 fill-current text-white" />
                <span>{bestSellersCount} Best Sellers Available</span>
              </a>
              {onReplayIntro && (
                <button
                  type="button"
                  onClick={onReplayIntro}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-crimson-900/90 hover:bg-crimson-800 text-gold-200 border border-gold-400/50 shadow-sm text-xs font-semibold transition-all cursor-pointer hover:shadow-gold-glow"
                  title="Watch Brand Intro"
                >
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                  <span>Watch Brand Intro</span>
                </button>
              )}
            </div>

            {/* Main Headline */}
            <h1 className="font-serif font-extrabold text-2xl sm:text-4xl lg:text-5xl text-ink-900 tracking-tight leading-[1.15]">
              Discover Beautiful <br className="hidden sm:inline" />
              <span className="gold-gradient-text">Shagun Lifafe</span> & Wedding Cards
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-base text-ink-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Explore our curated showroom collection of handcrafted envelopes, velvet foil lifafe, and royal wedding invitation cards. Find your favorite design and inquire instantly.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <Link
                to="/catalog"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-crimson-800 hover:bg-crimson-900 shadow-lg shadow-crimson-800/20 transition-all active:scale-95 border border-crimson-700"
              >
                <span>Explore Full Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={BUSINESS_CONFIG.createWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-ink-800 bg-white hover:bg-cream-50 border border-cream-300 shadow-sm transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-whatsapp fill-whatsapp" />
                <span>WhatsApp Inquiry</span>
              </a>
            </div>

            {/* Quick Contact & Detail Enquiry Note */}
            <div className="pt-1 flex items-center justify-center lg:justify-start flex-wrap gap-2 text-xs text-ink-600">
              <span className="font-semibold text-ink-800">For detail enquiry contact:</span>
              <a href={`tel:${BUSINESS_CONFIG.phoneRaw}`} className="font-bold text-crimson-800 hover:underline">
                {BUSINESS_CONFIG.primaryPhoneNum}
              </a>
              <span className="text-cream-400">,</span>
              <a href={`tel:${BUSINESS_CONFIG.phoneSecondaryRaw}`} className="font-bold text-crimson-800 hover:underline">
                {BUSINESS_CONFIG.secondaryPhoneNum}
              </a>
            </div>

            {/* In-Store Assurance Features */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-ink-500 font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Real Showroom Pricing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                <span>Custom Name Foil Printing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson-500" />
                <span>Wholesale & Retail</span>
              </div>
            </div>

          </div>

          {/* Right Visual Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              
              {/* Main Visual Display */}
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 relative bg-cream-100/90 flex items-center justify-center p-3">
                <img
                  src="/images/lifafe/royal-elephant-crimson-mandap-lifafa.jpg"
                  alt="Kumar Printers and Cards Showroom Showcase - Royal Shagun Lifafa"
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent flex items-end p-5 pointer-events-none">
                  <div className="text-white">
                    <p className="text-xs uppercase tracking-wider text-gold-300 font-semibold">
                      Featured Collection
                    </p>
                    <p className="font-serif font-bold text-base sm:text-lg">
                      Handcrafted Royal Shagun Lifafe
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Showroom Quality Badge */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-white p-3 sm:p-4 rounded-2xl shadow-xl border border-cream-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-700">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-crimson-900 uppercase">
                    Showroom Collection
                  </p>
                  <p className="text-xs text-ink-600 font-medium">
                    200+ Handcrafted Designs
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
