import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, Clock, ExternalLink, Mail } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../config/business';

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-cream-100 border-t border-cream-300/20 pt-12 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-10 border-b border-ink-800">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg crimson-gradient-bg border border-gold-400/40 flex items-center justify-center">
                <span className="font-display font-bold text-xl text-gold-300">K</span>
              </div>
              <span className="font-serif font-bold text-xl text-gold-300">
                {BUSINESS_CONFIG.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-cream-200/80 leading-relaxed">
              {BUSINESS_CONFIG.subTagline}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-serif font-semibold text-gold-200 text-sm tracking-wide uppercase">
              Showroom Catalog
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-cream-300/80">
              <li>
                <Link to="/catalog?category=shagun-lifafe" className="hover:text-gold-300 transition-colors">
                  Shagun ke Lifafe
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=designer-lifafe" className="hover:text-gold-300 transition-colors">
                  Designer Lifafe
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=wedding-cards" className="hover:text-gold-300 transition-colors">
                  Wedding Cards
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-gold-300 transition-colors">
                  All Showroom Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Store Hours & Policy */}
          <div className="space-y-3">
            <h3 className="font-serif font-semibold text-gold-200 text-sm tracking-wide uppercase">
              Showroom Hours
            </h3>
            <div className="space-y-2 text-xs sm:text-sm text-cream-300/80">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-cream-100">Monday – Saturday</p>
                  <p className="text-cream-400/80">{BUSINESS_CONFIG.hours.weekdays}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-crimson-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-cream-100">Sunday</p>
                  <p className="text-cream-400/80">{BUSINESS_CONFIG.hours.sunday}</p>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-cream-400/60 pt-2 border-t border-ink-800">
              * Custom foil name printing available on bulk orders.
            </p>
          </div>

          {/* Physical Address & Contact */}
          <div className="space-y-3">
            <h3 className="font-serif font-semibold text-gold-200 text-sm tracking-wide uppercase">
              Location & Enquiries
            </h3>
            <div className="space-y-2.5 text-xs sm:text-sm text-cream-300/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-crimson-400 shrink-0 mt-0.5" />
                <span>{BUSINESS_CONFIG.address.fullAddress}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="text-[11px] text-cream-400">For detail enquiry contact:</span>
                  <div className="flex items-center gap-2">
                    <a href={`tel:${BUSINESS_CONFIG.phoneRaw}`} className="hover:text-gold-300 font-bold text-white underline underline-offset-2">
                      {BUSINESS_CONFIG.primaryPhoneNum}
                    </a>
                    <span className="text-cream-500">,</span>
                    <a href={`tel:${BUSINESS_CONFIG.phoneSecondaryRaw}`} className="hover:text-gold-300 font-bold text-white underline underline-offset-2">
                      {BUSINESS_CONFIG.secondaryPhoneNum}
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-0.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a
                  href={`mailto:${BUSINESS_CONFIG.email}`}
                  className="hover:text-gold-300 font-medium text-cream-200 underline underline-offset-2 break-all text-xs sm:text-sm"
                  title="Send email inquiry"
                >
                  {BUSINESS_CONFIG.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={BUSINESS_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ink-800 hover:bg-ink-700 text-xs text-gold-300 border border-gold-500/30 transition-colors"
              >
                <span>Get Google Maps Directions</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Sub-Footer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-400/70">
          <p>© {new Date().getFullYear()} {BUSINESS_CONFIG.name}. All Rights Reserved.</p>
          <p className="text-[11px] text-cream-500/60">
            Digital Showroom & Catalog — Luxury Shagun Lifafe & Wedding Stationery
          </p>
        </div>

      </div>
    </footer>
  );
}
