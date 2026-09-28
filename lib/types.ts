/* ==========================================================================
   AL-TAWAKKAL TOURISM — Global types
   ========================================================================== */

export type PackageTier = 'economy' | 'premium' | 'luxury';

export type PackageStatus = 'active' | 'draft' | 'archived';

export interface UmrahPackage {
  /** URL segment, also used as the React key. Edit freely. */
  slug: string;
  name: string;
  tier: PackageTier;
  /** Short label shown on the card badge. */
  tierLabel: string;
  /** All figures below are DEMO values and are meant to be edited. */
  /** Amount in INR, per person (integer rupees, not paise). */
  pricePerPerson: number;
  makkahNights: number;
  madinahNights: number;
  /** Computed copy for display — kept in data so the owner can adjust wording. */
  durationLabel: string;
  hotelRatingLabel: string;
  makkahHotel: string;
  madinahHotel: string;
  flight: string;
  transportation: string;
  ziyarat: string;
  /** One-paragraph summary used on cards and at the top of the detail page. */
  description: string;
  /** 4–6 short selling points. */
  highlights: string[];
  included: string[];
  excluded: string[];
  importantInfo: string[];
  /** Which illustration to use for this package. */
  artwork: 'makkah' | 'madinah' | 'kaaba';
  status: PackageStatus;
  featured: boolean;
  /** Shown on the card so visitors know pricing is indicative for the demo. */
  priceNote: string;
}

export type EnquiryStatus = 'new' | 'contacted' | 'confirmed' | 'closed';

export interface Enquiry {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  travellers: number;
  preferredTravelDate: string;
  packageSlug: string;
  packageName: string;
  message: string;
  status: EnquiryStatus;
  /** ISO date string (yyyy-mm-dd) — set by the demo data or on submit. */
  createdAt: string;
  source: 'website' | 'whatsapp' | 'demo';
}

export interface Hotel {
  id: string;
  name: string;
  city: 'Makkah' | 'Madinah';
  /** 3, 4 or 5. */
  stars: number;
  distanceFromHaram: string;
  description: string;
  image: string;
  status: 'active' | 'draft';
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'package' | 'booking' | 'travel' | 'general';
}

export interface NavLink {
  label: string;
  href: string;
}
