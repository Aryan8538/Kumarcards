import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, Clock, ExternalLink, Mail } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../config/business';

export default function LocationSection() {
  return (
    <section className="py-12 sm:py-16 bg-cream-100/60 border-t border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Details Column */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-crimson-800">
                Visit Physical Showroom
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-ink-900 mt-1">
                Experience The Craft In Person
              </h2>
              <p className="text-xs sm:text-sm text-ink-600 mt-2">
                Visit our physical store to feel paper weights, touch rich velvets, and inspect custom laser-cut samples first-hand.
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-ink-700">
              
              {/* Address */}
              <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-cream-200">
                <MapPin className="w-5 h-5 text-crimson-800 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-ink-900">Showroom Address</p>
                  <p className="text-ink-600 mt-0.5">{BUSINESS_CONFIG.address.fullAddress}</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-cream-200">
                <Clock className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-ink-900">Store Hours</p>
                  <p className="text-ink-600 mt-0.5">Mon – Sat: {BUSINESS_CONFIG.hours.weekdays}</p>
                  <p className="text-[11px] text-ink-400">Sunday: {BUSINESS_CONFIG.hours.sunday}</p>
                </div>
              </div>

              {/* Contact Options */}
              <div className="space-y-1.5 pt-1">
                <p className="text-xs font-semibold text-ink-700">For detail enquiry contact:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                    className="p-3 bg-white rounded-xl border border-cream-200 hover:border-crimson-700 flex items-center gap-2.5 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-crimson-800 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[11px] text-ink-400 uppercase font-semibold">Primary Contact</p>
                      <p className="font-bold text-ink-900 text-xs truncate">{BUSINESS_CONFIG.primaryPhoneNum}</p>
                    </div>
                  </a>

                  <a
                    href={`tel:${BUSINESS_CONFIG.phoneSecondaryRaw}`}
                    className="p-3 bg-white rounded-xl border border-cream-200 hover:border-crimson-700 flex items-center gap-2.5 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-crimson-800 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[11px] text-ink-400 uppercase font-semibold">Alternate Contact</p>
                      <p className="font-bold text-ink-900 text-xs truncate">{BUSINESS_CONFIG.secondaryPhoneNum}</p>
                    </div>
                  </a>

                  <a
                    href={BUSINESS_CONFIG.createWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white rounded-xl border border-cream-200 hover:border-whatsapp flex items-center gap-2.5 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-whatsapp fill-whatsapp shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[11px] text-ink-400 uppercase font-semibold">WhatsApp</p>
                      <p className="font-bold text-ink-900 text-xs">Chat with Staff</p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${BUSINESS_CONFIG.email}`}
                    className="p-3 bg-white rounded-xl border border-cream-200 hover:border-crimson-700 flex items-center gap-2.5 transition-colors"
                    title="Send Email"
                  >
                    <Mail className="w-4 h-4 text-gold-600 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[11px] text-ink-400 uppercase font-semibold">Email Enquiries</p>
                      <p className="font-bold text-ink-900 text-xs truncate">{BUSINESS_CONFIG.email}</p>
                    </div>
                  </a>
                </div>
              </div>

            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={BUSINESS_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-crimson-800 hover:bg-crimson-900 transition-colors shadow-sm"
              >
                <span>Navigate via Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-ink-800 bg-white hover:bg-cream-50 border border-cream-300 transition-colors"
              >
                <span>Store & Contact Info</span>
              </Link>
            </div>

          </div>

          {/* Right Column: Google Maps Embed Card */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden border border-cream-300/80 shadow-card bg-white p-2">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-cream-200">
                <iframe
                  title="Kumar Printer's and Designers Showroom Location"
                  src={BUSINESS_CONFIG.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
              <div className="p-3 flex items-center justify-between text-xs text-ink-500">
                <span>Gole Market Showroom, Hapur</span>
                <a
                  href={BUSINESS_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-crimson-800 hover:underline flex items-center gap-1"
                >
                  <span>Open Full Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
