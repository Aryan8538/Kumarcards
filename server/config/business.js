/**
 * CENTRALIZED BUSINESS CONFIGURATION
 * 
 * IMPORTANT: Items marked with [CLIENT INPUT REQUIRED] indicate placeholders that must be
 * updated with verified data from the business owners when provided.
 */

export const BUSINESS_CONFIG = {
  // Brand details
  name: "Kumar Printers and Cards", // Confirmed legal/display name
  shortName: "Kumar Printers and Cards",
  tagline: "Premier Wedding Stationery & Shagun Lifafe Showroom",
  subTagline: "Handcrafted Shagun Envelopes, Designer Lifafe & Bespoke Wedding Invitation Cards",
  
  // Contact details
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
  
  // Store physical location
  address: {
    shopNo: "Kumar Printer's and Designers",
    landmark: "Near Chodhary Namkeen, Opposite Gandhi Ganj",
    building: "Near Chodhary Namkeen",
    street: "Opposite Gandhi Ganj, Gole Market",
    area: "Gole Market",
    city: "Hapur",
    region: "Hapur NCR",
    state: "Uttar Pradesh",
    pincode: "245101",
    country: "India",
    formatted: "Kumar Printer's and Designers, Near Chodhary Namkeen, Opposite Gandhi Ganj, Gole Market, Hapur NCR, Uttar Pradesh - 245101"
  },
  
  // Operating hours
  hours: {
    weekdays: "10:30 AM – 8:30 PM",
    sunday: "Closed (By Appointment for Bulk Wedding Orders)",
    summary: "Mon – Sat: 10:30 AM – 8:30 PM"
  },
  
  // Navigation & Maps
  googleMapsUrl: "https://maps.app.goo.gl/Mv46NpJwZksGBLAP7",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.718421438163!2d77.7779902!3d28.7279599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c85aed3a0be05%3A0xd05e7190bdf77b75!2sKumar%20Printer's%20and%20Designers!5e0!3m2!1sen!2sin!4v1710000000000",
  
  // Social profiles
  social: {
    instagram: "https://instagram.com/kumarprintersandcards", // [CLIENT INPUT REQUIRED]
    facebook: "https://facebook.com/kumarprintersandcards" // [CLIENT INPUT REQUIRED]
  },
  
  // Helper for generating dynamic WhatsApp prefilled inquiry message
  createWhatsAppLink: (product) => {
    const text = product
      ? `Hello Kumar Printers and Cards, I found *${product.name}* (SKU: *${product.id}*) on your digital showroom. I would like to inquire about pricing, minimum quantity, and available color options.`
      : `Hello Kumar Printers and Cards, I am browsing your digital showroom and would like to inquire about your Shagun Lifafe and Wedding Card collections.`;
    return `https://wa.me/${BUSINESS_CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
  }
};

export default BUSINESS_CONFIG;
