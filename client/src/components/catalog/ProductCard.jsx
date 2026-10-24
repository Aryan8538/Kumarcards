import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight, Sparkles, Flame } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../config/business';
import Badge from '../common/Badge';

export default function ProductCard({ product }) {
  const whatsappUrl = BUSINESS_CONFIG.createWhatsAppLink(product);

  return (
    <div className="group bg-white rounded-xl sm:rounded-2xl border border-cream-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden relative">
      
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] sm:aspect-[4/3] overflow-hidden bg-cream-100/80 p-2.5 flex items-center justify-center">
        <Link
          to={`/product/${product.slug}`}
          className="w-full h-full flex items-center justify-center"
        >
          <img
            src={product.thumbnail || product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Ribbon Badge: Best Seller takes priority with Flame icon, or Featured */}
        {product.isBestSeller ? (
          <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md border border-amber-300/50">
              <Flame className="w-2.5 h-2.5 fill-current text-amber-100" />
              <span>Best Seller</span>
            </span>
          </div>
        ) : product.isFeatured ? (
          <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-crimson-800 text-gold-300 shadow-sm border border-gold-400/30">
              <Sparkles className="w-2.5 h-2.5" />
              <span>Featured</span>
            </span>
          </div>
        ) : null}

        {/* SKU Badge */}
        <div className="absolute bottom-2.5 left-2.5 z-10 pointer-events-none">
          <Badge variant="sku">
            {product.id}
          </Badge>
        </div>

        {/* Quick WhatsApp Action (Desktop Hover / Mobile Friendly) */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-whatsapp/90 hover:bg-whatsapp text-white flex items-center justify-center shadow-md transition-transform active:scale-90"
          title={`Inquire about ${product.id} on WhatsApp`}
          aria-label={`Inquire about ${product.name} on WhatsApp`}
        >
          <MessageCircle className="w-4 h-4 fill-current" />
        </a>
      </div>

      {/* Card Body */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Attributes */}
          <div className="flex items-center gap-1.5 text-[11px] text-ink-500 mb-1.5 font-medium">
            <span>{product.color}</span>
            <span>•</span>
            <span>{product.style}</span>
          </div>

          {/* Product Title */}
          <Link
            to={`/product/${product.slug}`}
            className="block group-hover:text-crimson-800 transition-colors"
          >
            <h3 className="font-serif font-bold text-sm sm:text-base text-ink-900 leading-snug line-clamp-2">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price & CTA Section */}
        <div className="mt-3 pt-2.5 border-t border-cream-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-xs sm:text-sm font-bold text-crimson-800">
              ₹{product.priceMin} – ₹{product.priceMax}
            </div>
            <span className="text-[10px] text-ink-400 font-medium block">
              / {product.priceUnit}
            </span>
          </div>

          <Link
            to={`/product/${product.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-crimson-800 hover:text-gold-700 bg-cream-50 hover:bg-cream-100 px-2.5 py-1.5 rounded-lg border border-cream-200 transition-colors"
          >
            <span>Details</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

      </div>

    </div>
  );
}
