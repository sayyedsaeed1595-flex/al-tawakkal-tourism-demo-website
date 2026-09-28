import type { FaqItem } from '@/lib/types';

/* ==========================================================================
   FAQ CONTENT — grouped for the accordion filter tabs.
   Answers are written to be useful without over-promising.
   ========================================================================== */

export const faqs: FaqItem[] = [
  {
    question: 'What is included in the Umrah package?',
    category: 'package',
    answer:
      'Each package bundles return air travel, accommodation in Makkah and Madinah with breakfast, airport and intercity ground transfers, and guided ziyarat tours in both cities. The exact inclusions for each package are listed on that package’s page, and anything not included is listed separately so there are no surprises at the time of booking.',
  },
  {
    question: 'How many nights are included?',
    category: 'package',
    answer:
      'Nights are split between the two cities. The Economy Umrah is 4 nights in Makkah and 4 nights in Madinah, Premium Umrah is 5 nights in each city, and the 5 Star Luxury Umrah is 6 nights in each city — a total of 12 nights across 13 days. Night counts can be adjusted when you enquire, subject to availability and pricing.',
  },
  {
    question: 'Are flights included?',
    category: 'travel',
    answer:
      'Yes. Flight travel is part of every package and is quoted as part of the per-person price. Where a direct service is available it is offered first, with a connecting alternative as a fallback. Exact routes, timings and carriers are confirmed once your travel date is fixed, since airline schedules change.',
  },
  {
    question: 'Is transportation included?',
    category: 'travel',
    answer:
      'Yes. Airport transfers in Makkah and Madinah and the intercity transfer between the two cities are included. Ziyarat tours are conducted in a shared air-conditioned vehicle in line with the package tier. Any private vehicle upgrade can be discussed separately.',
  },
  {
    question: 'What documents are required?',
    category: 'booking',
    answer:
      'For the air travel you will need a valid passport with sufficient validity, a passport-size photograph, and your date of birth as per the passport. Some travellers may be asked for additional details during the visa process. We will share a clear document checklist with you before you pay anything, and we will also guide you through the visa filing steps.',
  },
  {
    question: 'How can I enquire about a package?',
    category: 'general',
    answer:
      'Use the enquiry form on any package page or the Contact page, or send us a WhatsApp message. The form captures your name, contact details, number of travellers and preferred travel date. You will receive a confirmation on screen straight away, and our team will follow up with availability and a detailed quote.',
  },
  {
    question: 'Can package dates and hotels change?',
    category: 'booking',
    answer:
      'Yes. Travel dates, room types and hotel properties can be adjusted, and we will always confirm the final arrangement in writing before you pay. Hotel names shown on this site are indicative of the category and area of the property, and the specific hotel is confirmed closer to your travel date. Peak periods such as Ramadan and Hajj are booked earlier, so earlier enquiry gives you more choice.',
  },
  {
    question: 'How is the price calculated?',
    category: 'package',
    answer:
      'The price shown is per person and typically assumes two people sharing a room. The final amount depends on the number of travellers, the room type, the travel date, the flight availability at that date and any changes you request. We share a written, itemised quote before payment so the total is clear.',
  },
  {
    question: 'What payment options are available?',
    category: 'booking',
    answer:
      'Payment is normally split into an initial booking amount followed by the balance before departure. Accepted methods and the exact schedule are shared with your quotation. Booking dates and hotel rooms are only held once the initial payment is received.',
  },
  {
    question: 'Do you arrange groups and family packages?',
    category: 'general',
    answer:
      'Yes. Family groups, small groups and individual travellers can all be arranged. For larger groups we can plan additional room allocations and adjust the itinerary. Mention the approximate number of travellers in your enquiry and we will suggest the most practical option.',
  },
  {
    question: 'What if I need to change or cancel my plan?',
    category: 'booking',
    answer:
      'Travel plans can change, and cancellations are handled according to the terms set out in your booking confirmation. Those terms are shared with you in writing before any payment is made, so the applicable charges and timelines are clear from the start. Contact us as early as possible if your plans change.',
  },
  {
    question: 'How do I get a visa for Umrah?',
    category: 'booking',
    answer:
      'Umrah permits are arranged through the standard application process. We explain the required documents, help you complete the application correctly and share updates on the timeline. The permit and any government charges are not included in the package price, and we will confirm those amounts separately.',
  },
];

export const faqCategories = [
  { id: 'all', label: 'All Questions' },
  { id: 'package', label: 'Packages' },
  { id: 'booking', label: 'Booking' },
  { id: 'travel', label: 'Flights & Stay' },
  { id: 'general', label: 'General' },
] as const;

export type FaqCategoryId = (typeof faqCategories)[number]['id'];
