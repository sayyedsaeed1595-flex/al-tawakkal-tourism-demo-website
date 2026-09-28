'use client';

import Link from 'next/link';

import { CtaBand } from '@/components/site/CtaBand';
import { EnquiryForm } from '@/components/site/EnquiryForm';
import { artworkFor } from '@/components/site/PackageCard';
import { FaqSection } from '@/components/site/FaqSection';
import { LinkButton, WhatsAppButton } from '@/components/ui/Button';
import {
  IconArrowRight,
  IconBed,
  IconCar,
  IconCheck,
  IconCheckCircle,
  IconClock,
  IconClose,
  IconCompass,
  IconInfo,
  IconPlane,
  IconUsers,
  IconWhatsApp,
} from '@/components/ui/Icons';
import { Media } from '@/components/ui/Media';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getPackageBySlug } from '@/data/packages';
import { useDemoStore } from '@/lib/demo-store';
import { formatInr, formatPrice } from '@/lib/format';
import type { UmrahPackage } from '@/lib/types';
import { packageWhatsAppLink, packageWhatsAppMessage } from '@/lib/whatsapp';

export interface PackageDetailViewProps {
  slug: string;
}

/**
 * Resolves the package from the demo store so edits made in the admin dashboard
 * are reflected on the public detail page, falling back to the static dataset
 * for the first render.
 */
export function PackageDetailView({ slug }: PackageDetailViewProps) {
  const { packages } = useDemoStore();
  const item: UmrahPackage | undefined =
    packages.find((entry) => entry.slug === slug) ?? getPackageBySlug(slug);

  const related = packages
    .filter((entry) => entry.slug !== slug && entry.status !== 'archived')
    .slice(0, 2);

  if (!item || item.status === 'archived') {
    return (
      <section className="section">
        <div className="container-page">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="display-2 text-balance">This package is no longer available.</h1>
            <p className="lede mt-5 text-pretty">
              It may have been archived or renamed. Please have a look at the packages that are
              currently published.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <LinkButton href="/packages" variant="primary" size="lg">
                Browse Umrah Packages
                <IconArrowRight width={17} height={17} />
              </LinkButton>
              <LinkButton href="/contact#enquiry" variant="outline" size="lg">
                Contact Us
              </LinkButton>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <PackageDetailViewBody slug={slug} item={item} related={related} />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Small building blocks                                                     */
/* -------------------------------------------------------------------------- */

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4 border-b border-line-soft py-4 last:border-b-0">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-gold/25 bg-gold/[0.06] text-gold">
        {icon}
      </span>
      <div className="min-w-0">
        <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-mute">
          {label}
        </dt>
        <dd className="mt-1 text-[0.95rem] text-charcoal">{value}</dd>
      </div>
    </div>
  );
}

function ListBlock({
  title,
  items,
  tone,
  note,
}: {
  title: string;
  items: string[];
  tone: 'included' | 'excluded';
  note?: string;
}) {
  const included = tone === 'included';
  return (
    <div className="surface-card p-7 sm:p-8">
      <div className="flex items-center gap-3">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-md border ${
            included ? 'border-gold/30 bg-gold/[0.07] text-gold' : 'border-line bg-ivory-soft text-ink-mute'
          }`}
        >
          {included ? (
            <IconCheckCircle width={18} height={18} />
          ) : (
            <IconClose width={18} height={18} />
          )}
        </span>
        <h3 className="font-display text-[1.25rem] text-charcoal">{title}</h3>
      </div>

      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[0.88rem] leading-[1.7] text-ink-soft">
            <span
              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${included ? 'bg-gold' : 'bg-line-strong'}`}
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>

      {note ? <p className="mt-6 border-t border-line-soft pt-4 text-[0.78rem] text-ink-mute">{note}</p> : null}
    </div>
  );
}
/* -------------------------------------------------------------------------- */

export function PackageDetailViewBody({ slug, item, related }: { slug: string; item: UmrahPackage; related: UmrahPackage[] }) {
  const artwork = artworkFor[item.artwork];
  void slug;

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative isolate overflow-hidden border-b border-line-soft bg-ivory-soft">
        <div
          className="absolute -left-24 -top-28 -z-10 h-[480px] w-[480px] opacity-40 mask-fade-radial"
          style={{
            backgroundImage: 'url(/images/pattern-geometric.svg)',
            backgroundSize: '150px 150px',
          }}
          aria-hidden="true"
        />

        <div className="container-page py-12 lg:py-16">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-[0.78rem] text-ink-mute">
              {[
                { label: 'Home', href: '/' },
                { label: 'Umrah Packages', href: '/packages' },
                { label: item.name },
              ].map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {index > 0 ? (
                    <span className="text-line-strong" aria-hidden="true">
                      /
                    </span>
                  ) : null}
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-gold">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-ink-soft">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-4">
                <span className="eyebrow-rule" aria-hidden="true" />
                {item.tierLabel} Umrah Package
              </p>
              <h1 className="display-2 text-balance">{item.name}</h1>
              <p className="lede mt-6 max-w-2xl text-pretty">{item.description}</p>

              <ul className="mt-8 flex flex-wrap gap-2.5">
                {[
                  { icon: <IconClock width={14} height={14} />, label: item.durationLabel },
                  { icon: <IconBed width={14} height={14} />, label: item.hotelRatingLabel },
                  { icon: <IconPlane width={14} height={14} />, label: item.flight },
                  { icon: <IconCompass width={14} height={14} />, label: `Ziyarat: ${item.ziyarat}` },
                ].map((chip) => (
                  <li
                    key={chip.label}
                    className="flex items-center gap-2 rounded-md border border-line-soft bg-white px-3.5 py-2 text-[0.78rem] text-ink-soft"
                  >
                    <span className="text-gold">{chip.icon}</span>
                    {chip.label}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <LinkButton href="#package-enquiry" variant="primary" size="lg">
                  Send Enquiry
                  <IconArrowRight width={17} height={17} />
                </LinkButton>
                <WhatsAppButton
                  label="Enquire on WhatsApp"
                  size="lg"
                  message={packageWhatsAppMessage(item.name, item.slug)}
                />
              </div>
            </div>

            {/* Price panel */}
            <aside className="lg:col-span-5">
              <div className="surface-card overflow-hidden">
                <div className="overflow-hidden border-b border-line-soft bg-[#FBF6EC]">
                  <Media
                    src={artwork.src}
                    alt={artwork.alt}
                    width={1200}
                    height={item.artwork === 'kaaba' ? 1000 : 420}
                    className="block aspect-[16/9] h-auto w-full object-cover"
                    priority
                  />
                </div>
                <div className="p-7">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold">
                    Package Price
                  </p>
                  <p className="mt-2.5 font-display text-[2.4rem] leading-none text-charcoal">
                    {formatPrice(item.pricePerPerson)}
                  </p>
                  <p className="mt-2 text-[0.84rem] text-ink-mute">
                    Per person · two sharing a room
                  </p>
                  <div className="rule-gold my-6" aria-hidden="true" />
                  <dl className="space-y-3.5 text-[0.88rem]">
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-ink-mute">Duration</dt>
                      <dd className="text-right font-medium text-charcoal">{item.durationLabel}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-ink-mute">Makkah Hotel</dt>
                      <dd className="text-right font-medium text-charcoal">{item.makkahHotel}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-ink-mute">Madinah Hotel</dt>
                      <dd className="text-right font-medium text-charcoal">{item.madinahHotel}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-ink-mute">Flight</dt>
                      <dd className="text-right font-medium text-charcoal">{item.flight}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-ink-mute">Transportation</dt>
                      <dd className="text-right font-medium text-charcoal">{item.transportation}</dd>
                    </div>
                  </dl>
                  <p className="mt-6 rounded-md border border-line-soft bg-ivory-soft p-4 text-[0.74rem] leading-relaxed text-ink-mute">
                    {item.priceNote}
                  </p>
                  <a
                    href={packageWhatsAppLink(item.name, item.slug)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp mt-5 w-full"
                  >
                    <IconWhatsApp width={17} height={17} />
                    Enquire on WhatsApp
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ---------------- Overview ---------------- */}
      <section className="section" id="overview" aria-labelledby="overview-heading">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              as="h2"
              eyebrow="Package overview"
              title={<span id="overview-heading">What this itinerary looks like.</span>}
              lede="A summary of the stay, the travel arrangements and the ziyarat included in this package."
            />

            <ul className="mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {item.highlights.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[0.9rem] leading-[1.7] text-ink-soft">
                  <IconCheck width={16} height={16} className="mt-1 shrink-0 text-gold" />
                  {point}
                </li>
              ))}
            </ul>

            {/* Night distribution */}
            <div className="surface-card mt-10 p-7 sm:p-8">
              <h3 className="font-display text-[1.2rem] text-charcoal">Nights in each city</h3>
              <p className="mt-2 text-[0.85rem] text-ink-soft">
                {item.durationLabel} in total, split between the two cities.
              </p>
              <div className="mt-7 space-y-5">
                {[
                  { city: 'Makkah', nights: item.makkahNights, total: item.makkahNights + item.madinahNights },
                  { city: 'Madinah', nights: item.madinahNights, total: item.makkahNights + item.madinahNights },
                ].map((row) => (
                  <div key={row.city}>
                    <div className="flex items-center justify-between text-[0.82rem]">
                      <span className="font-medium text-charcoal">{row.city}</span>
                      <span className="text-ink-mute">
                        {row.nights} {row.nights === 1 ? 'night' : 'nights'}
                      </span>
                    </div>
                    <div
                      className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-cream-deep"
                      role="img"
                      aria-label={`${row.nights} nights in ${row.city}`}
                    >
                      <div
                        className="h-full rounded-full bg-gold/70"
                        style={{ width: `${Math.round((row.nights / row.total) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Full detail list */}
          <div className="lg:col-span-5">
            <div className="surface-card p-7 sm:p-8">
              <h3 className="font-display text-[1.2rem] text-charcoal">Trip details</h3>
              <dl className="mt-5">
                <DetailRow
                  icon={<IconClock width={17} height={17} />}
                  label="Duration"
                  value={item.durationLabel}
                />
                <DetailRow
                  icon={<IconBed width={17} height={17} />}
                  label={`Makkah Hotel (${item.makkahNights} nights)`}
                  value={item.makkahHotel}
                />
                <DetailRow
                  icon={<IconBed width={17} height={17} />}
                  label={`Madinah Hotel (${item.madinahNights} nights)`}
                  value={item.madinahHotel}
                />
                <DetailRow
                  icon={<IconPlane width={17} height={17} />}
                  label="Flight Details"
                  value={item.flight}
                />
                <DetailRow
                  icon={<IconCar width={17} height={17} />}
                  label="Transportation"
                  value={item.transportation}
                />
                <DetailRow
                  icon={<IconCompass width={17} height={17} />}
                  label="Ziyarat"
                  value={item.ziyarat}
                />
                <DetailRow
                  icon={<IconUsers width={17} height={17} />}
                  label="Based On"
                  value="Two travellers sharing a room"
                />
              </dl>
              <div className="mt-6 rounded-md border border-line-soft bg-ivory-soft p-4">
                <p className="text-[0.74rem] leading-relaxed text-ink-mute">
                  Indicative package value{' '}
                  <span className="font-medium text-ink-soft">
                    ‘{formatInr(item.pricePerPerson)} per person
                  </span>
                  . Final pricing depends on travel date, room type and availability.
                </p>
              </div>
            </div>

            <div className="surface-card mt-7 p-7 sm:p-8">
              <h3 className="font-display text-[1.2rem] text-charcoal">Ziyarat in this package</h3>
              <p className="mt-3 text-[0.88rem] leading-[1.75] text-ink-soft">
                Guided ziyarat is arranged in {item.ziyarat}. Routes are planned with your guide on
                the ground and can be adjusted for your pace and the time available.
              </p>
              <ul className="mt-5 space-y-2.5 text-[0.85rem] text-ink-soft">
                {[
                  'Makkah ziyarat tour with an experienced guide',
                  'Madinah ziyarat tour with an experienced guide',
                  'Intercity transfer between the two cities',
                  'Flexible timing based on your schedule',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <IconCheck width={15} height={15} className="mt-0.5 shrink-0 text-gold" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Included / not included ---------------- */}
      <section className="section border-y border-line-soft bg-ivory-soft" id="inclusions" aria-labelledby="inclusions-heading">
        <div className="container-page">
          <SectionHeading
            as="h2"
            eyebrow="Inclusions"
            title={<span id="inclusions-heading">Included and not included.</span>}
            lede="We list both sides so the total cost is clear before you make a decision."
          />
          <div className="mt-11 grid gap-7 lg:grid-cols-2">
            <Reveal>
              <ListBlock title="What is included" items={item.included} tone="included" />
            </Reveal>
            <Reveal delay={90}>
              <ListBlock
                title="What is not included"
                items={item.excluded}
                tone="excluded"
                note="Anything not listed as included is payable separately. We will confirm these amounts in your written quote."
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Important information ---------------- */}
      <section className="section" id="important-information" aria-labelledby="important-heading">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              as="h2"
              eyebrow="Please note"
              title={<span id="important-heading">Important information.</span>}
              lede="Please read these points before you enquire. They apply to every enquiry and are confirmed again in writing at the time of booking."
            />
          </div>
          <div className="lg:col-span-8">
            <ol className="divide-y divide-line-soft border-y border-line-soft">
              {item.importantInfo.map((note, index) => (
                <li key={note} className="flex gap-5 py-6">
                  <span className="font-display text-[1.05rem] text-gold/70">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[0.9rem] leading-[1.78] text-ink-soft">{note}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 flex items-start gap-2.5 rounded-lg border border-line-soft bg-ivory-soft p-5 text-[0.82rem] leading-relaxed text-ink-soft">
              <IconInfo width={16} height={16} className="mt-0.5 shrink-0 text-gold" />
              <span>
                This package page is prepared for a website demonstration. Hotel names, flight
                carriers, prices and night counts are sample content and are not a confirmed offer.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- Enquiry ---------------- */}
      <section className="section border-y border-line-soft bg-ivory-soft" id="package-enquiry" aria-labelledby="package-enquiry-heading">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">
              <span className="eyebrow-rule" aria-hidden="true" />
              Enquire now
            </p>
            <h2 id="package-enquiry-heading" className="display-2 text-balance">
              Request {item.name}.
            </h2>
            <p className="lede mt-5 text-pretty">
              Share your preferred travel date and group size. We will reply with current
              availability for {item.makkahHotel} and {item.madinahHotel}, plus a written quote.
            </p>
            <div className="surface-card mt-9 p-6">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold">
                At a glance
              </p>
              <dl className="mt-4 space-y-3 text-[0.85rem]">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-ink-mute">Package</dt>
                  <dd className="text-right font-medium text-charcoal">{item.name}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-ink-mute">Duration</dt>
                  <dd className="text-right font-medium text-charcoal">{item.durationLabel}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-ink-mute">Indicative price</dt>
                  <dd className="text-right font-medium text-charcoal">
                    {formatPrice(item.pricePerPerson)}
                  </dd>
                </div>
              </dl>
              <a
                href={packageWhatsAppLink(item.name, item.slug)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp btn-sm mt-5 w-full"
              >
                <IconWhatsApp width={15} height={15} />
                Quick question on WhatsApp
              </a>
            </div>
          </div>
          <div className="lg:col-span-8">
            <EnquiryForm
              variant="panel"
              anchorId="detail-enquiry"
              defaultPackageSlug={item.slug}
              title={`Enquire about ${item.name}`}
              description="The form below is pre-filled with this package. You can send it here or continue the conversation on WhatsApp."
            />
          </div>
        </div>
      </section>

      {/* ---------------- Related packages ---------------- */}
      {related.length > 0 ? (
        <section className="section-tight" aria-labelledby="related-heading">
          <div className="container-page">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 id="related-heading" className="display-3">
                Other options
              </h2>
              <Link
                href="/packages"
                className="inline-flex items-center gap-1.5 text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-charcoal transition-colors hover:text-gold"
              >
                All Umrah packages
                <IconArrowRight width={15} height={15} />
              </Link>
            </div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {related.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/packages/${other.slug}`}
                    className="group flex h-full flex-col rounded-lg border border-line-soft bg-white p-6 transition-all duration-500 ease-premium hover:border-line-strong hover:shadow-card"
                  >
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold">
                      {other.tierLabel}
                    </span>
                    <span className="mt-2.5 font-display text-[1.2rem] text-charcoal transition-colors group-hover:text-gold">
                      {other.name}
                    </span>
                    <span className="mt-2 text-[0.84rem] leading-relaxed text-ink-soft">
                      {other.durationLabel} · {other.hotelRatingLabel} · Ziyarat in{' '}
                      {other.ziyarat}
                    </span>
                    <span className="mt-4 text-[0.86rem] font-medium text-charcoal">
                      {formatPrice(other.pricePerPerson)}{' '}
                      <span className="font-normal text-ink-mute">/ person</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <FaqSection showFilters={false} limit={5} />
      <CtaBand
        eyebrow="Compare before you decide"
        title="Need a different arrangement?"
        description="Most itineraries can be adjusted — nights, room type, travel date or group size. Tell us what you have in mind."
      />
    </>
  );
}
