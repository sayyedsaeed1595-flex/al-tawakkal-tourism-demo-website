import type { Hotel } from '@/lib/types';

/* ==========================================================================
   DEMO HOTEL DATA — editable mock records used by the admin dashboard and
   shown on the public site as examples of available categories.
   ========================================================================== */

export const hotels: Hotel[] = [
  {
    id: 'htl-swiss-makkah',
    name: 'Swiss Makkah',
    city: 'Makkah',
    stars: 5,
    distanceFromHaram: 'Approx. 150 m walking distance',
    description:
      'Five-star property in central Makkah, within easy walking distance of the Haram. Rooms are spacious and the hotel offers a range of restaurants, business services and family rooms.',
    image: '/images/hotel-facade.svg',
    status: 'active',
  },
  {
    id: 'htl-elite-makkah',
    name: 'Elite Makkah Hotel',
    city: 'Makkah',
    stars: 3,
    distanceFromHaram: 'Approx. 1.2 km',
    description:
      'Comfortable three-star accommodation on the Makkah approach road. Suited to travellers prioritising value, with breakfast, transport assistance and 24-hour reception.',
    image: '/images/hotel-facade.svg',
    status: 'active',
  },
  {
    id: 'htl-al-kiswah',
    name: 'Al Kiswah Towers',
    city: 'Makkah',
    stars: 4,
    distanceFromHaram: 'Approx. 450 m walking distance',
    description:
      'Four-star tower hotel in the central Makkah area with a range of room types, family accommodation and direct access to the main pilgrim routes.',
    image: '/images/hotel-facade.svg',
    status: 'active',
  },
  {
    id: 'htl-meden',
    name: 'Meden Hotel',
    city: 'Madinah',
    stars: 4,
    distanceFromHaram: 'Approx. 350 m walking distance',
    description:
      'Well-located hotel close to the Haram in Madinah with a range of guest rooms, in-room dining and a covered walk to the mosque area.',
    image: '/images/hotel-facade.svg',
    status: 'active',
  },
  {
    id: 'htl-wafa',
    name: 'Wafa Taibah Hotel',
    city: 'Madinah',
    stars: 4,
    distanceFromHaram: 'Approx. 700 m',
    description:
      'Four-star accommodation within the central Madinah district, offering standard and family rooms with breakfast included.',
    image: '/images/hotel-facade.svg',
    status: 'active',
  },
  {
    id: 'htl-al-andalus',
    name: 'Al Andalus Palace',
    city: 'Madinah',
    stars: 3,
    distanceFromHaram: 'Approx. 1 km',
    description:
      'Three-star hotel within walking reach of the Haram area, offering simple, well-maintained rooms and useful transport links.',
    image: '/images/hotel-facade.svg',
    status: 'draft',
  },
];

export function getHotelById(id: string): Hotel | undefined {
  return hotels.find((hotel) => hotel.id === id);
}
