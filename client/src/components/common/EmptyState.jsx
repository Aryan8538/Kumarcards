import React from 'react';
import { SearchX, RotateCcw, MessageCircle, Sparkles } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../config/business';
import { useCatalog } from '../../context/CatalogContext';

export default function EmptyState({ onReset, searchQuery }) {
  const { category, setCategory } = useCatalog();

  const isWeddingCards = category === 'wedding-cards';

  if (isWeddingCards) {
    return (
      <div className="text-center py-16 px-6 bg-white rounded-2xl border border-cream-200/80 shadow-sm max-w-xl mx-auto my-8">
        <div className="w-16 h-16 rounded-full crimson-gradient-bg flex items-center justify-center mx-auto mb-4 border border-gold-400/50 shadow-md">
          <Sparkles className="w-8 h-8 text-gold-300" />
        </div>

        <h3 className="font-serif font-bold text-xl text-ink-900 mb-2">
          Wedding Cards Coming Soon
        </h3>

        <p className="text-xs sm:text-sm text-ink-600 mb-6 leading-relaxed max-w-md mx-auto">
          We are currently curating our exclusive wedding cards and invitation collection for the online showroom. Inquire directly on WhatsApp to view 200+ samples or discuss custom printing!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={BUSINESS_CONFIG.createWhatsAppLink(null, "Hello, I am inquiring about your Wedding Cards collection.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-whatsapp hover:bg-whatsapp-hover transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Inquire on WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => setCategory('shagun-lifafe')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-crimson-800 bg-crimson-50 border border-crimson-200 hover:bg-crimson-100 transition-colors"
          >
            <span>Browse Shagun Lifafe</span>
          </button>
        </div>

        <p className="text-[11px] text-ink-400 mt-4">
          Visit our Hapur store at Gole Market to explore physical sample albums.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-16 px-4 bg-white rounded-2xl border border-cream-200/80 shadow-sm max-w-lg mx-auto my-8">
      <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center mx-auto mb-4 border border-cream-200">
        <SearchX className="w-8 h-8 text-crimson-700" />
      </div>

      <h3 className="font-serif font-bold text-lg text-ink-900 mb-2">
        No Matching Products Found
      </h3>

      <p className="text-xs sm:text-sm text-ink-600 mb-6 leading-relaxed">
        {searchQuery ? (
          <>
            We couldn't find any designs matching <span className="font-semibold text-crimson-800">"{searchQuery}"</span>. Try a different keyword, SKU, or clear your filters.
          </>
        ) : (
          "We couldn't find any items matching your current filter selection. Try adjusting your color, style, or price options."
        )}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-crimson-800 bg-crimson-50 border border-crimson-200 hover:bg-crimson-100 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Filters</span>
          </button>
        )}

        <a
          href={BUSINESS_CONFIG.createWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-whatsapp hover:bg-whatsapp-hover transition-colors shadow-sm"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Ask on WhatsApp</span>
        </a>
      </div>

      <p className="text-[11px] text-ink-400 mt-4">
        Our physical shop carries over 200+ unlisted designs. Inquire directly with our staff!
      </p>
    </div>
  );
}
