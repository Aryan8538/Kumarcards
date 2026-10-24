import React from 'react';
import { Layers, Maximize, Palette, Sparkles, CheckCircle2, PackageCheck } from 'lucide-react';

export default function ProductSpecs({ product }) {
  const specs = [
    {
      label: 'Product Code (SKU)',
      value: product.id,
      icon: Sparkles,
      highlight: true
    },
    {
      label: 'Material & Paper Quality',
      value: product.material,
      icon: Layers
    },
    {
      label: 'Dimensions / Fit',
      value: product.size,
      icon: Maximize
    },
    {
      label: 'Style / Craftsmanship',
      value: product.style,
      icon: Sparkles
    },
    {
      label: 'Color Options',
      value: product.colors?.join(', ') || product.color,
      icon: Palette
    },
    {
      label: product.packageDetails ? 'Packaging & Pack Size' : 'Card Format & Suite',
      value: product.packageDetails || 'Invitation Suite (Card + Outer Cover + Matching Inserts)',
      icon: PackageCheck,
      highlight: true
    },
    {
      label: 'Minimum Order Quantity',
      value: product.packageDetails ? '1 Packet (10 pieces)' : `${product.minimumOrderQuantity || 50} pieces`,
      icon: PackageCheck
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-serif font-bold text-base text-ink-900 border-b border-cream-200 pb-2">
        Product Specifications
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {specs.map((spec) => {
          const Icon = spec.icon;
          return (
            <div
              key={spec.label}
              className={`p-3 rounded-xl border flex items-start gap-3 ${
                spec.highlight
                  ? 'bg-crimson-50/60 border-crimson-200/80'
                  : 'bg-white border-cream-200'
              }`}
            >
              <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                spec.highlight ? 'bg-crimson-800 text-gold-300' : 'bg-cream-100 text-ink-600'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-ink-400 uppercase tracking-wide">
                  {spec.label}
                </p>
                <p className={`text-xs sm:text-sm font-semibold truncate ${
                  spec.highlight ? 'text-crimson-900 font-mono' : 'text-ink-800'
                }`}>
                  {spec.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Customization Advisory Box */}
      {product.customizationAvailable && (
        <div className="p-3.5 rounded-xl bg-gold-50/70 border border-gold-300/80 flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-gold-700 shrink-0 mt-0.5" />
          <div className="text-xs text-gold-900">
            <span className="font-bold">Customization Available: </span>
            <span>{product.customizationNotes || "Gold foil bride & groom names, family Gotra, and custom monograms can be printed for wedding orders."}</span>
          </div>
        </div>
      )}
    </div>
  );
}
