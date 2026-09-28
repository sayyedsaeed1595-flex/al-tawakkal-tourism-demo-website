import Link from 'next/link';

import { LinkButton } from '@/components/ui/Button';
import { Media } from '@/components/ui/Media';
import {
  IconArrowRight,
  IconBed,
  IconCheck,
  IconCompass,
  IconPlane,
  IconStar,
  IconUsers,
  IconWhatsApp,
} from '@/components/ui/Icons';
import { formatPrice } from '@/lib/format';
import type { UmrahPackage } from '@/lib/types';
import { packageWhatsAppLink } from '@/lib/whatsapp';

const artworkFor = {
  kaaba: { src: '/images/kaaba-makkah.svg', alt: 'Kaaba within a cream coloured arcaded courtyard' },
  makkah: { src: '/images/makkah-mountains.svg', alt: 'Layered mountains and arcades of Makkah' },
  madinah: { src: '/images/madinah-masjid.svg', alt: 'Arcaded courtyard with a green dome in Madinah' },
} as const;

interface PackageCardProps {
  item: UmrahPackage;
  /** `featured` shows the larger artwork treatment used on the home page. */
  variant?: 'featured' | 'standard';
}

export function PackageCard({ item, variant = 'standard' }: PackageCardProps) {
  const artwork = artworkFor[item.artwork];
  const isFeatured = variant === 'featured';

  return (
    <article className="group surface-card surface-card-hover flex h-full flex-col overflow-hidden">
      {/* Artwork */}
      <div className="relative overflow-hidden border-b border-line-soft bg-[#FBF6EC]">
        <Media
          src={artwork.src}
          alt={artwork.alt}
          width={1200}
          height={item.artwork === 'kaaba' ? 1000 : 420}
          loading="lazy"
          decoding="async"
          className={`block h-auto w-full transition-transform duration-700 ease-premium ${
            isFeatured ? 'aspect-[16/11] object-cover' : 'aspect-[16/9] object-cover'
          } group-hover:scale-[1.025]`}
         />
        <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-sm bg-white/95 px-2.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-charcoal">
          <IconStar width={12} height={12} className="text-gold"  />
          {item.tierLabel}
        </div>
        <div className="absolute bottom-4 left-4 rounded-sm bg-charcoal/92 px-3 py-2 text-cream">
          <span className="block text-[0.62rem] font-medium uppercase tracking-[0.16em] text-cream-soft/65">
            Duration
          </span>
          <span className="mt-0.5 block text-[0.82rem] font-medium">{item.durationLabel}</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-display text-[1.35rem] leading-snug text-charcoal sm:text-[1.5rem]">
          <Link href={`/packages/${item.slug}`} className="transition-colors hover:text-gold">
            {item.name}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-3 text-[0.88rem] leading-[1.72] text-ink-soft">
          {item.description}
        </p>

        {/* Key facts */}
        <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3.5 border-y border-line-soft py-5 text-[0.8rem]">
          <div className="flex items-start gap-2">
            <IconBed width={15} height={15} className="mt-0.5 shrink-0 text-gold"  />
            <div>
              <dt className="text-ink-mute">Makkah</dt>
              <dd className="mt-0.5 font-medium text-charcoal">{item.makkahNights} Nights</dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <IconBed width={15} height={15} className="mt-0.5 shrink-0 text-gold"  />
            <div>
              <dt className="text-ink-mute">Madinah</dt>
              <dd className="mt-0.5 font-medium text-charcoal">{item.madinahNights} Nights</dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <IconPlane width={15} height={15} className="mt-0.5 shrink-0 text-gold"  />
            <div>
              <dt className="text-ink-mute">Flight</dt>
              <dd className="mt-0.5 font-medium text-charcoal">{item.flight}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <IconCompass width={15} height={15} className="mt-0.5 shrink-0 text-gold"  />
            <div>
              <dt className="text-ink-mute">Ziyarat</dt>
              <dd className="mt-0.5 font-medium text-charcoal">{item.ziyarat}</dd>
            </div>
          </div>
        </dl>

        {/* Top highlights */}
        <ul className="mt-5 space-y-2">
          {item.highlights.slice(0, 3).map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-[0.85rem] text-ink-soft">
              <IconCheck width={15} height={15} className="mt-0.5 shrink-0 text-gold"  />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        {/* Price + actions */}
        <div className="mt-auto pt-7">
          <div className="flex flex-wrap items-end justify-between gap-3 border-t border-line-soft pt-5">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink-mute">
                Package Price
              </p>
              <p className="mt-1.5 font-display text-[1.7rem] leading-none text-charcoal">
                {formatPrice(item.pricePerPerson)}
                <span className="ml-1.5 text-[0.8rem] font-sans font-normal text-ink-mute">
                  / person
                </span>
              </p>
            </div>
            <p className="flex items-center gap-1.5 text-[0.72rem] text-ink-mute">
              <IconUsers width={13} height={13}  />
              Two sharing
            </p>
          </div>

          <p className="mt-2.5 text-[0.7rem] leading-relaxed text-ink-mute">{item.priceNote}</p>

          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <LinkButton
              href={`/packages/${item.slug}`}
              variant="primary"
              className="flex-1"
            >
              View Package
              <IconArrowRight width={16} height={16}  />
            </LinkButton>
            <a
              href={packageWhatsAppLink(item.name, item.slug)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp btn-sm sm:px-3.5 sm:py-2.5 sm:text-[0.7rem]"
              aria-label={`Enquire about ${item.name} on WhatsApp`}
              title={`Enquire about ${item.name} on WhatsApp`}
            >
              <IconWhatsApp width={16} height={16}  />
              <span className="sm:hidden xl:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export { artworkFor };
