/**
 * CLIENT BUSINESS CONFIGURATION
 * 
 * Central source of truth for all business details.
 * Placeholders marked [CLIENT INPUT REQUIRED] will be replaced by client when confirmed.
 */

export const BUSINESS_CONFIG = {
  // Business branding
  name: "Kumar Printers and Cards", // [CLIENT INPUT REQUIRED: Legal/Display Name]
  shortName: "Kumar Printers and Cards",
  tagline: "Premier Wedding Stationery & Shagun Lifafe Showroom",
  subTagline: "Handcrafted Shagun Envelopes, Designer Lifafe & Bespoke Wedding Invitation Cards",
  foundedYear: "1998",
  
  // Contact numbers
  phone: "+91 93582 06242",
  phoneRaw: "+919358206242",
  phoneSecondary: "+91 92594 41370",
  phoneSecondaryRaw: "+919259441370",
  primaryPhoneNum: "9358206242",
  secondaryPhoneNum: "9259441370",
  enquiryNotice: "For detail enquiry contact: 9358206242, 9259441370",
  phones: [
    { display: "+91 93582 06242", raw: "+919358206242", simple: "9358206242" },
    { display: "+91 92594 41370", raw: "+919259441370", simple: "9259441370" }
  ],
  whatsapp: "919358206242",
  email: "kumarprintershpr@gmail.com",
  
  // Physical store location
  address: {
    shopNo: "Kumar Printer's and Designers",
    landmark: "Near Chodhary Namkeen, Opposite Gandhi Ganj",
    market: "Gole Market",
    area: "Gole Market",
    city: "Hapur",
    region: "Hapur NCR",
    state: "Uttar Pradesh",
    pincode: "245101",
    country: "India",
    fullAddress: "Kumar Printer's and Designers, Near Chodhary Namkeen, Opposite Gandhi Ganj, Gole Market, Hapur NCR, Uttar Pradesh - 245101"
  },
  
  // Working hours
  hours: {
    weekdays: "10:30 AM – 8:30 PM",
    sunday: "Closed (Special Wedding Order Appointments Available)",
    summary: "Mon – Sat: 10:30 AM – 8:30 PM"
  },
  
  // Navigation & Maps
  googleMapsUrl: "https://maps.app.goo.gl/Mv46NpJwZksGBLAP7",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.718421438163!2d77.7779902!3d28.7279599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c85aed3a0be05%3A0xd05e7190bdf77b75!2sKumar%20Printer's%20and%20Designers!5e0!3m2!1sen!2sin!4v1710000000000",
  
  // Social links
  social: {
    instagram: "https://instagram.com/kumarprintersandcards", // [CLIENT INPUT REQUIRED]
    facebook: "https://facebook.com/kumarprintersandcards" // [CLIENT INPUT REQUIRED]
  },
  
  // WhatsApp generator
  createWhatsAppLink: (product) => {
    const text = product
      ? `Hello Kumar Printers and Cards, I found *${product.name}* (Code: *${product.id}*) on your digital catalog.\n\nPlease share price, minimum order quantity, and color availability.\nCatalog link: ${window.location.origin}/product/${product.slug}`
      : `Hello Kumar Printers and Cards, I am browsing your digital showroom and would like to inquire about your Shagun Lifafe and Wedding Card collections.`;
    return `https://wa.me/${BUSINESS_CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
  }
};

export default BUSINESS_CONFIG;
