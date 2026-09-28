/* ==========================================================================
   SINGLE SOURCE OF TRUTH FOR ALL BUSINESS DETAILS
   --------------------------------------------------------------------------
   Everything the business owner may want to change lives in this file.
   Replace the placeholder values below with the real ones before going live.
   No other file in the project hard-codes a phone number, email or address.
   ========================================================================== */

export const siteConfig = {
  name: 'Al-Tawakkal Tourism',
  nameLine1: 'AL-TAWAKKAL',
  nameLine2: 'TOURISM',
  tagline: 'Umrah & Islamic Tourism',
  shortDescription:
    'Premium Umrah packages, carefully arranged for a comfortable and peaceful journey.',
  /** Used for <title> suffixes and the browser tab. */
  titleTemplate: '%s | Al-Tawakkal Tourism',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://al-tawakkal-tourism.pages.dev',
  locale: 'en_IN',
} as const;

/* --------------------------------------------------------------------------
   CONTACT DETAILS  —  replace the placeholders
   -------------------------------------------------------------------------- */
export const contactConfig = {
  /**
   * WhatsApp number in international format, digits only, no "+" or spaces.
   * PLACEHOLDER — replace with the real business WhatsApp number.
   * Indian numbers: country code 91 + 10 digit mobile, e.g. 919876543210.
   */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '919876543210',

  /** PLACEHOLDER — replace with the real office number. */
  phone: process.env.NEXT_PUBLIC_PHONE ?? '+91 00000 00000',
  phoneHref: process.env.NEXT_PUBLIC_PHONE ?? '+910000000000',

  /** PLACEHOLDER — replace with the real business email. */
  email: process.env.NEXT_PUBLIC_EMAIL ?? 'info@altawakkaltourism.com',
  emailHref: 'mailto:info@altawakkaltourism.com',

  /** PLACEHOLDER — replace with the real office address. */
  addressLine1: 'Office Address Placeholder',
  addressLine2: 'Business Bay, Level 2',
  addressCity: 'City, State — PIN 000000',
  addressCountry: 'India',

  /**
   * Google Maps embed placeholder.
   * Replace the `src` with the "Embed a map" URL Google Maps provides for the
   * real office (Share → Embed a map → Copy HTML → paste the `src` value).
   */
  mapEmbedUrl:
    process.env.NEXT_PUBLIC_MAP_EMBED_URL ??
    'https://www.google.com/maps?q=Place+Holder+Address&output=embed',
  mapLinkUrl:
    process.env.NEXT_PUBLIC_MAP_LINK_URL ??
    'https://www.google.com/maps/search/?api=1&query=Place+Holder+Address',

  businessHours: [
    { days: 'Monday – Saturday', time: '10:00 AM – 7:30 PM' },
    { days: 'Sunday', time: '11:00 AM – 5:00 PM' },
    { days: 'Public holidays', time: 'By appointment' },
  ],
  /** Shown under the contact details. */
  hoursNote: 'Enquiries submitted outside business hours are usually answered the next working day.',
} as const;

/* --------------------------------------------------------------------------
   BRAND COPY
   -------------------------------------------------------------------------- */
export const heroContent = {
  eyebrow: 'Umrah & Islamic Tourism',
  title: 'Your Journey to Umrah Begins With Trust.',
  subtitle:
    'Premium Umrah packages, carefully arranged for a comfortable and peaceful journey.',
  primaryCta: { label: 'Explore Umrah Packages', href: '/packages' },
  secondaryCta: { label: 'WhatsApp Us', href: 'whatsapp' },
  note: 'Itineraries, hotels and travel dates arranged around your convenience.',
} as const;

/** Four short pillars directly beneath the hero. */
export const heroPillars = [
  {
    title: '5 Star Umrah Packages',
    description: 'Curated stays at selected five-star properties in Makkah and Madinah.',
  },
  {
    title: 'Trusted Travel Assistance',
    description: 'A single point of contact from your first enquiry to your return flight.',
  },
  {
    title: 'Makkah & Madinah Accommodation',
    description: 'Hotel options reviewed for location, comfort and access to the Haram.',
  },
  {
    title: 'Complete Ziyarat Assistance',
    description: 'Guided ziyarat routes planned in both Makkah and Madinah.',
  },
] as const;

/** Trust / statistics band. */
export const trustStats = [
  { value: '5★', label: 'Accommodation', detail: 'Selected hotel categories' },
  { value: 'Direct', label: 'Flight Options', detail: 'Direct routes where available' },
  { value: '2', label: 'Makkah & Madinah', detail: 'Full stay in both cities' },
  { value: 'Full', label: 'Complete Ziyarat', detail: 'Guided in both cities' },
] as const;

export const navigation = {
  links: [
    { label: 'Home', href: '/' },
    { label: 'Umrah Packages', href: '/packages' },
    { label: 'About', href: '/about' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ],
} as const;

export const footerConfig = {
  quickLinks: [
    { label: 'Umrah Packages', href: '/packages' },
    { label: 'About', href: '/about' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ],
  supportLinks: [
    { label: 'Enquire Now', href: '/contact#enquiry' },
    { label: 'WhatsApp', href: 'whatsapp' },
    { label: 'Dashboard Demo', href: '/admin' },
  ],
  copyright: 'Al-Tawakkal Tourism. All rights reserved.',
  disclaimer:
    'This website is a demonstration build. Package prices, hotel names, flight schedules and contact details shown are sample content for review and are not confirmed bookings.',
} as const;

/* --------------------------------------------------------------------------
   ADMIN DEMO
   -------------------------------------------------------------------------- */
export const adminConfig = {
  title: 'Dashboard',
  /** Clearly-labelled demo credentials shown on the lock screen. */
  demoEmail: 'demo@altawakkaltourism.com',
  demoPassword: 'demo1234',
  storageKey: 'att-admin-session',
} as const;

/* --------------------------------------------------------------------------
   ENQUIRY FORM
   -------------------------------------------------------------------------- */
export const enquiryConfig = {
  storageKey: 'att-enquiries-v1',
  successMessage:
    'Thank you. Your enquiry has been received. Our team will contact you shortly.',
  /** Max characters shown in the message textarea. */
  messageMaxLength: 900,
} as const;
