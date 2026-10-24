import React from 'react';
import { MapPin, Phone, MessageCircle, Clock, ExternalLink, Mail } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-cream-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-crimson-800">
            Showroom Location & Contact
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-ink-900 mt-1">
            Visit Our Physical Store
          </h1>
          <p className="text-xs sm:text-sm text-ink-600 mt-2">
            Inspect physical wedding card samples, touch paper textures, or contact our team directly for bulk orders.
          </p>
        </div>

        {/* Contact & Location Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Address, Hours & Contact */}
          <div className="space-y-6">
            
            {/* Store Information Cards */}
            <div className="bg-white rounded-2xl p-6 border border-cream-200/90 shadow-card space-y-6">
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-crimson-50 text-crimson-800 flex items-center justify-center shrink-0 border border-crimson-100">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-ink-900">
                    Physical Store Address
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-600 mt-1 leading-relaxed">
                    {BUSINESS_CONFIG.address.fullAddress}
                  </p>
                  <a
                    href={BUSINESS_CONFIG.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-crimson-800 hover:text-gold-700 mt-3"
                  >
                    <span>Open in Google Maps Navigation</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-cream-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold-50 text-gold-700 flex items-center justify-center shrink-0 border border-gold-200">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-ink-900">
                    Showroom Hours
                  </h3>
                  <div className="mt-1 space-y-1 text-xs sm:text-sm text-ink-600">
                    <p><span className="font-semibold text-ink-800">Monday – Saturday:</span> {BUSINESS_CONFIG.hours.weekdays}</p>
                    <p><span className="font-semibold text-ink-800">Sunday:</span> {BUSINESS_CONFIG.hours.sunday}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-cream-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-whatsapp flex items-center justify-center shrink-0 border border-emerald-100">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="font-serif font-bold text-base text-ink-900">
                    For Detail Enquiry Contact
                  </h3>
                  <p className="text-xs text-ink-600">
                    For detailed enquiries, pricing, custom printing, or appointment bookings, contact us directly:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-ink-900 bg-cream-50 hover:bg-cream-100 border border-cream-200 transition-colors shadow-sm"
                      title="Call 9358206242"
                    >
                      <Phone className="w-3.5 h-3.5 text-crimson-800" />
                      <span>{BUSINESS_CONFIG.primaryPhoneNum}</span>
                    </a>

                    <a
                      href={`tel:${BUSINESS_CONFIG.phoneSecondaryRaw}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-ink-900 bg-cream-50 hover:bg-cream-100 border border-cream-200 transition-colors shadow-sm"
                      title="Call 9259441370"
                    >
                      <Phone className="w-3.5 h-3.5 text-crimson-800" />
                      <span>{BUSINESS_CONFIG.secondaryPhoneNum}</span>
                    </a>

                    <a
                      href={BUSINESS_CONFIG.createWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-whatsapp hover:bg-whatsapp-hover transition-colors shadow-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Email Enquiries */}
              <div className="pt-4 border-t border-cream-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold-50 text-gold-700 flex items-center justify-center shrink-0 border border-gold-200">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <h3 className="font-serif font-bold text-base text-ink-900">
                    Email for Queries & Custom Printing
                  </h3>
                  <p className="text-xs text-ink-600">
                    Send us your design files, bespoke wedding stationery requests, or corporate envelope enquiries:
                  </p>
                  <div>
                    <a
                      href={`mailto:${BUSINESS_CONFIG.email}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-crimson-800 bg-cream-50 hover:bg-cream-100 border border-cream-200 transition-colors shadow-sm"
                    >
                      <Mail className="w-3.5 h-3.5 text-crimson-800" />
                      <span>{BUSINESS_CONFIG.email}</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Google Maps Interactive View */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-cream-200/90 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-ink-900">
                    Find Us on Google Maps
                  </h3>
                  <p className="text-xs text-ink-500 mt-0.5">
                    Near Chodhary Namkeen, Opposite Gandhi Ganj, Gole Market, Hapur
                  </p>
                </div>
                <a
                  href={BUSINESS_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-crimson-800 bg-crimson-50 hover:bg-crimson-100 transition-colors"
                >
                  <span>Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-cream-100 border border-cream-200">
                <iframe
                  title="Kumar Printer's and Designers Showroom Map"
                  src={BUSINESS_CONFIG.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="flex items-center justify-between pt-1 text-xs text-ink-600">
                <span>Landmark: Near Chodhary Namkeen, Opp. Gandhi Ganj</span>
                <span className="font-medium text-ink-900">Hapur - 245101</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
