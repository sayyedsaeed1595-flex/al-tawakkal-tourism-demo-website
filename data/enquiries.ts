import type { Enquiry } from '@/lib/types';

/* ==========================================================================
   DEMO ENQUIRY SEED DATA
   --------------------------------------------------------------------------
   Sample records so the admin dashboard and the enquiry table are not empty on
   first load. Anything a visitor submits in the demo is added to the same
   list in the browser (see lib/enquiry-store.ts).
   ========================================================================== */

export const seedEnquiries: Enquiry[] = [
  {
    id: 'enq-1001',
    fullName: 'Ayesha Siddiqui',
    phone: '+91 98110 22441',
    email: 'ayesha.s@example.com',
    travellers: 4,
    preferredTravelDate: '2026-11-12',
    packageSlug: 'luxury-umrah',
    packageName: '5 Star Luxury Umrah',
    message:
      'Planning to travel with my parents and husband. Please share room options and whether early check-in is possible in Makkah.',
    status: 'new',
    createdAt: '2026-09-21',
    source: 'website',
  },
  {
    id: 'enq-1002',
    fullName: 'Mohammed Irfan',
    phone: '+91 99450 77310',
    email: 'irfan.m@example.com',
    travellers: 2,
    preferredTravelDate: '2026-12-02',
    packageSlug: 'premium-umrah',
    packageName: 'Premium Umrah',
    message: 'Interested in a December departure. Is the 5 nights in Madinah enough for the ziyarat?',
    status: 'contacted',
    createdAt: '2026-09-18',
    source: 'whatsapp',
  },
  {
    id: 'enq-1003',
    fullName: 'Fatima Rahman',
    phone: '+91 90030 55128',
    email: 'fatima.r@example.com',
    travellers: 6,
    preferredTravelDate: '2026-10-20',
    packageSlug: 'luxury-umrah',
    packageName: '5 Star Luxury Umrah',
    message:
      'Group of six for a family trip during October. Please advise on the best flight option and total cost.',
    status: 'confirmed',
    createdAt: '2026-09-14',
    source: 'website',
  },
  {
    id: 'enq-1004',
    fullName: 'Usman Qureshi',
    phone: '+91 88790 31002',
    email: 'usman.q@example.com',
    travellers: 2,
    preferredTravelDate: '2026-11-25',
    packageSlug: 'economy-umrah',
    packageName: 'Economy Umrah',
    message: 'Please share the cheapest option with the shortest total travel time.',
    status: 'closed',
    createdAt: '2026-09-09',
    source: 'demo',
  },
  {
    id: 'enq-1005',
    fullName: 'Hafsa Begum',
    phone: '+91 90876 45219',
    email: 'hafsa.b@example.com',
    travellers: 3,
    preferredTravelDate: '2027-01-15',
    packageSlug: 'premium-umrah',
    packageName: 'Premium Umrah',
    message: 'Travelling with two sisters. Is a triple room available and what is the per-person cost?',
    status: 'new',
    createdAt: '2026-09-24',
    source: 'website',
  },
  {
    id: 'enq-1006',
    fullName: 'Bilal Hussain',
    phone: '+91 97410 66803',
    email: 'bilal.h@example.com',
    travellers: 5,
    preferredTravelDate: '2026-10-05',
    packageSlug: 'luxury-umrah',
    packageName: '5 Star Luxury Umrah',
    message: 'Requesting a detailed day-by-day itinerary for Makkah and Madinah.',
    status: 'contacted',
    createdAt: '2026-09-26',
    source: 'whatsapp',
  },
];

export const enquiryStatuses = ['new', 'contacted', 'confirmed', 'closed'] as const;

export const enquiryStatusLabels: Record<Enquiry['status'], string> = {
  new: 'New',
  contacted: 'Contacted',
  confirmed: 'Confirmed',
  closed: 'Closed',
};
