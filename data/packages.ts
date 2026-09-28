import type { UmrahPackage } from '@/lib/types';

/* ==========================================================================
   DEMO PACKAGE DATA
   --------------------------------------------------------------------------
   ⚠  SAMPLE CONTENT FOR REVIEW — NOT A CONFIRMED OFFER.
   Prices, hotels, flight names and night counts are illustrative so the layout
   can be judged. In the live version these values are managed from the admin
   dashboard and shown per person in INR.
   ========================================================================== */

export const packages: UmrahPackage[] = [
  {
    slug: 'luxury-umrah',
    name: '5 Star Luxury Umrah',
    tier: 'luxury',
    tierLabel: '5 Star',
    pricePerPerson: 175000,
    makkahNights: 6,
    madinahNights: 6,
    durationLabel: '12 Nights / 13 Days',
    hotelRatingLabel: '5 Star Accommodation',
    makkahHotel: 'Swiss Makkah',
    madinahHotel: 'Meden Hotel',
    flight: 'Direct Saudi Airlines',
    transportation: 'Included',
    ziyarat: 'Makkah + Madinah',
    description:
      'Our most complete itinerary: a full six-night stay in each holy city, five-star accommodation, a direct flight option and guided ziyarat in both Makkah and Madinah. Designed for travellers who prefer a slower pace, more time at the Haram and assistance at every step.',
    highlights: [
      'Six nights in Makkah and six nights in Madinah',
      'Five-star hotels in both cities',
      'Direct flight option with Saudi Airlines',
      'Guided ziyarat in Makkah and Madinah',
      'Airport transfers and intercity transfer included',
      'Dedicated trip coordinator from enquiry to departure',
    ],
    included: [
      'Round-trip economy air travel as per the confirmed itinerary',
      'Six nights five-star accommodation in Makkah with breakfast',
      'Six nights five-star accommodation in Madinah with breakfast',
      'All ground transfers in an air-conditioned vehicle',
      'Intercity transfer between Makkah and Madinah',
      'Guided ziyarat tour in Makkah',
      'Guided ziyarat tour in Madinah',
      'Travel assistance and itinerary support from our team',
    ],
    excluded: [
      'Visa processing charges and any government fees',
      'Qurbani, Ihram and other personal expenses',
      'Lunch and dinner outside the included breakfast',
      'Optional excursion tickets and entry fees not listed in the itinerary',
      'Personal shopping, laundry and telephone charges',
      'Tips and gratuities for drivers and guides',
      'Travel insurance unless specifically added to the booking',
    ],
    importantInfo: [
      'Package pricing is quoted per person and depends on the number of travellers, room type and the travel date selected.',
      'Hotel names shown are indicative of the category and area of stay. The final property is confirmed closer to the travel date.',
      'Flight schedules are subject to change by the airline. Timings are re-confirmed before every departure.',
      'A minimum number of nights may apply during peak travel periods such as Ramadan and the Hajj season.',
      'This is sample content prepared for a website demonstration and is not a confirmed quotation.',
    ],
    artwork: 'kaaba',
    status: 'active',
    featured: true,
    priceNote: 'Per person, based on two sharing a room. Demo figure — not a live quote.',
  },
  {
    slug: 'premium-umrah',
    name: 'Premium Umrah',
    tier: 'premium',
    tierLabel: '4 Star',
    pricePerPerson: 118000,
    makkahNights: 5,
    madinahNights: 5,
    durationLabel: '10 Nights / 11 Days',
    hotelRatingLabel: '4 Star Accommodation',
    makkahHotel: 'Al Kiswah Towers',
    madinahHotel: 'Wafa Taibah Hotel',
    flight: 'Direct flight with connecting option',
    transportation: 'Included',
    ziyarat: 'Makkah + Madinah',
    description:
      'A balanced package for travellers who want a comfortable stay and good transport without the top tier budget. Five nights in each city, well-reviewed four-star hotels close to the Haram, transfers and guided ziyarat arranged as one complete plan.',
    highlights: [
      'Five nights in Makkah and five nights in Madinah',
      'Four-star hotels near the Haram in both cities',
      'Direct flight with a connecting alternative',
      'Shared transport and intercity transfer included',
      'Guided ziyarat in both cities',
      'Assistance with booking and documentation',
    ],
    included: [
      'Return air travel as per the confirmed itinerary',
      'Five nights four-star accommodation in Makkah with breakfast',
      'Five nights four-star accommodation in Madinah with breakfast',
      'All ground transfers in a shared air-conditioned vehicle',
      'Intercity transfer between Makkah and Madinah',
      'Guided ziyarat tour in Makkah and Madinah',
      'Travel assistance throughout the booking',
    ],
    excluded: [
      'Visa processing charges and government fees',
      'Qurbani, Ihram and personal expenses',
      'Meals other than the included breakfast',
      'Optional excursions and entries not listed above',
      'Personal shopping, laundry and telephone charges',
      'Tips and gratuities',
      'Travel insurance unless added to the booking',
    ],
    importantInfo: [
      'Price is per person and varies with the travel date and room type.',
      'The specific hotel property is confirmed closer to the travel date.',
      'Flight timings are subject to airline schedules and are re-confirmed before departure.',
      'This is sample content prepared for a website demonstration and is not a confirmed quotation.',
    ],
    artwork: 'makkah',
    status: 'active',
    featured: true,
    priceNote: 'Per person, based on two sharing a room. Demo figure — not a live quote.',
  },
  {
    slug: 'economy-umrah',
    name: 'Economy Umrah',
    tier: 'economy',
    tierLabel: '3 Star',
    pricePerPerson: 78000,
    makkahNights: 4,
    madinahNights: 4,
    durationLabel: '8 Nights / 9 Days',
    hotelRatingLabel: '3 Star Accommodation',
    makkahHotel: 'Elite Makkah Hotel',
    madinahHotel: 'Al Andalus Palace',
    flight: 'Direct flight with connecting option',
    transportation: 'Included',
    ziyarat: 'Makkah + Madinah',
    description:
      'A straightforward and well-planned Umrah at the most accessible price point. Four nights in each city, comfortable three-star accommodation, transfers and ziyarat assistance — everything needed for the essential journey, organised in advance.',
    highlights: [
      'Four nights in Makkah and four nights in Madinah',
      'Three-star hotels in both cities',
      'Return flight included',
      'Shared ground transport included',
      'Guided ziyarat in Makkah and Madinah',
      'Booking and travel assistance',
    ],
    included: [
      'Return air travel as per the confirmed itinerary',
      'Four nights three-star accommodation in Makkah with breakfast',
      'Four nights three-star accommodation in Madinah with breakfast',
      'Shared airport and intercity transfers',
      'Guided ziyarat tour in Makkah and Madinah',
      'Basic travel assistance',
    ],
    excluded: [
      'Visa processing charges and government fees',
      'Qurbani, Ihram and personal expenses',
      'Meals other than the included breakfast',
      'Optional excursions and entry fees',
      'Personal shopping, laundry and telephone charges',
      'Tips and gratuities',
      'Travel insurance',
    ],
    importantInfo: [
      'Price is per person and is subject to availability at the time of booking.',
      'Hotel category and property are confirmed closer to the travel date.',
      'Shared transport means the vehicle may be used by more than one group.',
      'This is sample content prepared for a website demonstration and is not a confirmed quotation.',
    ],
    artwork: 'madinah',
    status: 'active',
    featured: true,
    priceNote: 'Per person, based on two sharing a room. Demo figure — not a live quote.',
  },
];

/* -------------------------------------------------------------------------- */

/** All packages, including drafts — used by the admin dashboard. */
export const allPackages: UmrahPackage[] = packages;

/** Only packages a visitor should see on the public site. */
export const activePackages: UmrahPackage[] = allPackages.filter(
  (item) => item.status === 'active',
);

export const featuredPackages: UmrahPackage[] = activePackages.filter(
  (item) => item.featured,
);

export function getPackageBySlug(slug: string): UmrahPackage | undefined {
  return allPackages.find((item) => item.slug === slug);
}

export function getPackageNameBySlug(slug: string): string {
  return getPackageBySlug(slug)?.name ?? 'Not decided yet';
}
