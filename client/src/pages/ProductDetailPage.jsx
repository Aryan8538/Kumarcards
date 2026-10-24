import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Phone, Sparkles, MapPin, Share2, Check, Flame } from 'lucide-react';
import api from '../services/api';
import { BUSINESS_CONFIG } from '../config/business';
import ProductGallery from '../components/product/ProductGallery';
import ProductSpecs from '../components/product/ProductSpecs';
import StickyMobileActionBar from '../components/product/StickyMobileActionBar';
import SimilarProducts from '../components/product/SimilarProducts';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Badge from '../components/common/Badge';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      setIsLoading(true);
      window.scrollTo(0, 0);
      try {
        const prod = await api.getProductBySlug(slug);
        setProduct(prod);

        const allRes = await api.getProducts();
        setAllProducts(allRes.products || []);
      } catch (err) {
        console.error("Error loading product detail:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${product.name} - Kumar Printers and Cards Showroom`,
        text: `Check out ${product.name} (Code: ${product.id}) on Kumar Printers and Cards digital catalog`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <LoadingSpinner message="Opening design specifications..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-cream-200 flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 text-crimson-800" />
        </div>
        <h2 className="font-serif font-bold text-xl text-ink-900 mb-2">
          Design Not Found
        </h2>
        <p className="text-xs sm:text-sm text-ink-600 mb-6 max-w-sm">
          The requested product code or design may have been updated or moved.
        </p>
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-crimson-800 hover:bg-crimson-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Catalog</span>
        </Link>
      </div>
    );
  }

  const whatsappUrl = BUSINESS_CONFIG.createWhatsAppLink(product);

  return (
    <div className="min-h-screen bg-cream-50 py-6 sm:py-10 pb-28 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb & Back Link */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-ink-700 hover:text-crimson-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Catalog</span>
          </Link>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-cream-200 text-xs font-medium text-ink-700 hover:text-crimson-800 transition-colors shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-gold-600" />
                <span>Share Design</span>
              </>
            )}
          </button>
        </div>

        {/* Main Product Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6">
            <ProductGallery
              images={product.images}
              productName={product.name}
              productId={product.id}
            />
          </div>

          {/* Right Column: Details, Pricing & Conversion CTAs */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Top Product Meta */}
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge variant="sku">
                  {product.id}
                </Badge>
                <Badge variant="crimson">
                  {product.productType}
                </Badge>
                {product.isBestSeller && (
                  <Badge variant="bestseller" className="inline-flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-current text-amber-700" />
                    <span>Best Seller</span>
                  </Badge>
                )}
                {product.isFeatured && !product.isBestSeller && (
                  <Badge variant="gold">
                    Featured
                  </Badge>
                )}
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1 ml-auto">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available in Showroom
                </span>
              </div>

              <h1 className="font-serif font-extrabold text-xl sm:text-2xl lg:text-3xl text-ink-900 leading-snug">
                {product.name}
              </h1>

              {/* Price Display */}
              <div className="mt-4 p-4 rounded-2xl bg-white border border-cream-200/90 shadow-sm flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-[11px] font-semibold text-ink-400 uppercase tracking-wider">
                    Showroom Price
                  </p>
                  <div className="text-2xl sm:text-3xl font-extrabold text-crimson-800 mt-0.5 flex items-baseline gap-2">
                    ₹{product.priceMin === product.priceMax ? product.priceMin : `${product.priceMin} – ₹${product.priceMax}`}
                    <span className="text-xs sm:text-sm font-medium text-ink-600">
                      / {product.priceUnit === 'pack of 10' ? '1 packet' : (product.priceUnit || 'piece')}
                    </span>
                  </div>
                  {product.packageDetails ? (
                    <p className="text-xs text-ink-500 mt-1 font-medium">
                      📦 1 Packet contains <strong className="text-ink-800 font-semibold">10 pieces</strong> (₹{(product.priceMin / 10).toFixed(0)} / piece)
                    </p>
                  ) : (
                    <p className="text-xs text-ink-500 mt-1 font-medium">
                      ✨ Variable price based on quantity, paper thickness, gold foil & printing options
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-gold-800 bg-gold-50 border border-gold-300 px-3 py-1.5 rounded-full inline-flex items-center gap-1">
                    {product.packageDetails ? 'Pack of 10 Pieces' : 'Custom Printing Available'}
                  </span>
                </div>
              </div>
            </div>

            {/* Product Craftsmanship Description */}
            <div className="prose prose-sm text-ink-700 leading-relaxed text-xs sm:text-sm">
              <p>{product.description}</p>
            </div>

            {/* Desktop & Tablet In-Store Conversion Buttons */}
            <div className="hidden md:flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3.5 px-5 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Enquire on WhatsApp</span>
              </a>

              <a
                href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                className="w-full sm:w-auto py-3.5 px-4 rounded-xl border border-cream-300 bg-white hover:bg-cream-50 text-ink-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                title={`Call ${BUSINESS_CONFIG.primaryPhoneNum}`}
              >
                <Phone className="w-4 h-4 text-crimson-800" />
                <span>Call {BUSINESS_CONFIG.primaryPhoneNum}</span>
              </a>

              <a
                href={`tel:${BUSINESS_CONFIG.phoneSecondaryRaw}`}
                className="w-full sm:w-auto py-3.5 px-4 rounded-xl border border-cream-300 bg-white hover:bg-cream-50 text-ink-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                title={`Call ${BUSINESS_CONFIG.secondaryPhoneNum}`}
              >
                <Phone className="w-4 h-4 text-crimson-800" />
                <span>Call {BUSINESS_CONFIG.secondaryPhoneNum}</span>
              </a>
            </div>

            {/* Detail Enquiry Card */}
            <div className="p-3.5 rounded-xl bg-crimson-50/70 border border-crimson-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-crimson-800 shrink-0" />
                <span className="text-xs font-semibold text-ink-900">
                  For detail enquiry contact:
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold">
                <a
                  href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                  className="px-2.5 py-1 rounded-lg bg-white border border-crimson-200 text-crimson-900 hover:bg-crimson-100 transition-colors"
                >
                  {BUSINESS_CONFIG.primaryPhoneNum}
                </a>
                <span className="text-crimson-300">,</span>
                <a
                  href={`tel:${BUSINESS_CONFIG.phoneSecondaryRaw}`}
                  className="px-2.5 py-1 rounded-lg bg-white border border-crimson-200 text-crimson-900 hover:bg-crimson-100 transition-colors"
                >
                  {BUSINESS_CONFIG.secondaryPhoneNum}
                </a>
              </div>
            </div>

            {/* In-Store Counter Advice Box */}
            <div className="p-3.5 rounded-xl bg-cream-100/70 border border-cream-300/80 text-xs text-ink-600 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-ink-900">Visiting our physical counter? </span>
                <span>Simply show this screen or quote SKU code <strong className="text-crimson-900 font-mono">{product.id}</strong> to our store representative for physical sample inspection.</span>
              </div>
            </div>

            {/* Technical Specifications Matrix */}
            <ProductSpecs product={product} />

          </div>

        </div>

        {/* Similar Recommended Products Section */}
        <SimilarProducts
          currentProduct={product}
          allProducts={allProducts}
        />

      </div>

      {/* Sticky Bottom Action Bar for Mobile Phones */}
      <StickyMobileActionBar product={product} />
    </div>
  );
}
