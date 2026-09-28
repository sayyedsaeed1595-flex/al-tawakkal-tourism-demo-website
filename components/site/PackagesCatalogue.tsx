'use client';

import { useMemo, useState } from 'react';

import { PackageCard } from '@/components/site/PackageCard';
import { Button, LinkButton } from '@/components/ui/Button';
import { IconArrowRight, IconCheck, IconInfo, IconPlus } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { useDemoStore } from '@/lib/demo-store';
import { formatPrice, totalNights } from '@/lib/format';
import type { UmrahPackage } from '@/lib/types';

/* ==========================================================================
   Package grid — reads from the demo store so packages added or edited in the
   admin dashboard appear on the website immediately.
   ========================================================================== */

interface PackageGridProps {
  /** Limit the list (used on the home page). */
  limit?: number;
  /** Only show packages flagged `featured` (used on the home page). */
  onlyFeatured?: boolean;
}

export function PackageGrid({ limit, onlyFeatured = false }: PackageGridProps) {
  const { packages, hydrated } = useDemoStore();

  const list = useMemo(() => {
    let result = packages.filter((item) => item.status === 'active');
    if (onlyFeatured) result = result.filter((item) => item.featured);
    if (limit) result = result.slice(0, limit);
    return result;
  }, [packages, onlyFeatured, limit]);

  if (list.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-line-strong bg-white px-6 py-16 text-center">
        <p className="font-display text-[1.15rem] text-charcoal">No packages are published yet</p>
        <p className="mx-auto mt-2.5 max-w-sm text-[0.85rem] leading-relaxed text-ink-soft">
          Packages marked as active in the dashboard will appear here.
        </p>
        <div className="mt-6 flex justify-center">
          <LinkButton href="/admin/packages" variant="outline" size="sm">
            <IconPlus width={15} height={15} />
            Add a package
          </LinkButton>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
        {list.map((item, index) => (
          <Reveal key={item.slug} delay={Math.min(index, 3) * 90}>
            <PackageCard item={item} />
          </Reveal>
        ))}
      </div>
      {!hydrated ? (
        <p className="mt-6 text-center text-[0.78rem] text-ink-mute">
          Loading saved package changes from this browser…
        </p>
      ) : null}
    </>
  );
}

/* ==========================================================================
   Full catalogue for /packages — filters, comparison table and quick notes.
   ========================================================================== */

const comparison: Array<{ label: string; key: keyof UmrahPackage }> = [
  { label: 'Nights in Makkah', key: 'makkahNights' },
  { label: 'Nights in Madinah', key: 'madinahNights' },
  { label: 'Hotel category', key: 'hotelRatingLabel' },
  { label: 'Flight option', key: 'flight' },
  { label: 'Transportation', key: 'transportation' },
  { label: 'Ziyarat', key: 'ziyarat' },
];

export function PackagesCatalogue() {
  const { packages } = useDemoStore();
  const [filter, setFilter] = useState<'published' | 'draft' | 'archived'>('published');

  const active = useMemo(() => packages.filter((item) => item.status === 'active'), [packages]);
  const list = useMemo(
    () => (filter === 'published' ? active : packages.filter((item) => item.status === filter)),
    [active, packages, filter],
  );

  const cheapest = active.length
    ? active.reduce((lowest, item) => (item.pricePerPerson < lowest.pricePerPerson ? item : lowest), active[0])
    : undefined;
  const longest = active.length
    ? active.reduce(
        (best, item) =>
          totalNights(item.makkahNights, item.madinahNights) >
          totalNights(best.makkahNights, best.madinahNights)
            ? item
            : best,
        active[0],
      )
    : undefined;

  return (
    <>
      {/* ---------------- Filter bar ---------------- */}
      <div className="mt-10 flex flex-wrap items-center gap-2">
        {([
          { value: 'published', label: 'Published' },
          { value: 'draft', label: 'Drafts (preview)' },
          { value: 'archived', label: 'Archived' },
        ] as const).map((option) => {
          const count =
            option.value === 'published'
              ? active.length
              : packages.filter((item) => item.status === option.value).length;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilter(option.value)}
              aria-pressed={filter === option.value}
              className={`rounded-md border px-3.5 py-2 text-[0.78rem] font-medium transition-all duration-300 ease-premium ${
                filter === option.value
                  ? 'border-charcoal bg-charcoal text-ivory'
                  : 'border-line bg-white text-ink-soft hover:border-gold/50 hover:text-charcoal'
              }`}
            >
              {option.label}
              <span
                className={`ml-1.5 text-[0.7rem] ${filter === option.value ? 'text-ivory/60' : 'text-ink-mute'}`}
              >
                {count}
              </span>
            </button>
          );
        })}
        <span className="ml-auto text-[0.78rem] text-ink-mute">
          {list.length} shown
        </span>
      </div>

      {/* ---------------- Cards ---------------- */}
      <div className="mt-7">
        {list.length === 0 ? (
          <div className="rounded-lg border border-dashed border-line-strong bg-white px-6 py-16 text-center">
            <p className="font-display text-[1.15rem] text-charcoal">Nothing to show</p>
            <p className="mx-auto mt-2.5 max-w-sm text-[0.85rem] leading-relaxed text-ink-soft">
              No packages match this filter right now.
            </p>
            <div className="mt-6 flex justify-center">
              <Button size="sm" variant="outline" onClick={() => setFilter('published')}>
                Show published packages
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {list.map((item, index) => (
              <Reveal key={item.slug} delay={Math.min(index, 3) * 80}>
                <PackageCard item={item} />
              </Reveal>
            ))}
          </div>
        )}
      </div>

      <p className="mt-9 flex items-start gap-2.5 rounded-lg border border-line-soft bg-ivory-soft p-5 text-[0.8rem] leading-relaxed text-ink-soft">
        <IconInfo width={16} height={16} className="mt-0.5 shrink-0 text-gold" />
        <span>
          <strong className="font-medium text-charcoal">Demonstration website.</strong> The prices,
          hotel names, flight options and night counts on this page are sample content prepared to
          show how the website will work. They are not live quotations and no booking is being
          taken.
        </span>
      </p>

      {/* ---------------- Comparison ---------------- */}
      {active.length > 0 ? (
        <>
          <div className="mt-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h3 className="display-3">The differences, clearly set out.</h3>
            <p className="max-w-xs text-[0.78rem] leading-relaxed text-ink-mute">
              Want something different? Most itineraries can be adjusted — tell us what you need.
            </p>
          </div>

          <div className="thin-scroll mt-8 overflow-x-auto rounded-lg border border-line-soft bg-white">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">
                Comparison of the Umrah packages offered by Al-Tawakkal Tourism
              </caption>
              <thead>
                <tr className="border-b border-line-soft">
                  <th
                    scope="col"
                    className="px-6 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink-mute"
                  >
                    Feature
                  </th>
                  {active.map((item) => (
                    <th key={item.slug} scope="col" className="px-6 py-4 align-bottom">
                      <a
                        href={`/packages/${item.slug}`}
                        className="font-display text-[1.02rem] font-medium text-charcoal transition-colors hover:text-gold"
                      >
                        {item.name}
                      </a>
                      <span className="mt-1.5 block text-[0.72rem] font-normal text-ink-mute">
                        {item.tierLabel}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft">
                {comparison.map((row) => (
                  <tr key={row.label}>
                    <th
                      scope="row"
                      className="px-6 py-4 text-[0.86rem] font-normal text-ink-soft"
                    >
                      {row.label}
                    </th>
                    {active.map((item) => {
                      const value = item[row.key];
                      return (
                        <td key={item.slug} className="px-6 py-4 text-[0.86rem] text-charcoal">
                          {typeof value === 'number' ? `${value} nights` : String(value)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="px-6 py-4 text-[0.86rem] font-normal text-ink-soft">
                    Price per person
                  </th>
                  {active.map((item) => (
                    <td
                      key={item.slug}
                      className="px-6 py-4 font-display text-[1.1rem] text-charcoal"
                    >
                      {formatPrice(item.pricePerPerson)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className="px-6 py-4 text-[0.86rem] font-normal text-ink-soft">
                    Action
                  </th>
                  {active.map((item) => (
                    <td key={item.slug} className="px-6 py-4">
                      <a
                        href={`/packages/${item.slug}`}
                        className="inline-flex items-center gap-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-charcoal transition-colors hover:text-gold"
                      >
                        View Package
                        <IconArrowRight width={14} height={14} />
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {cheapest ? (
              <div className="surface-soft p-6">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold">
                  Most accessible
                </p>
                <p className="mt-2.5 font-display text-[1.2rem] text-charcoal">{cheapest.name}</p>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-soft">
                  {totalNights(cheapest.makkahNights, cheapest.madinahNights)} nights split across
                  both cities, with flights, transfers and ziyarat included.
                </p>
              </div>
            ) : null}
            {longest ? (
              <div className="surface-soft p-6">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold">
                  Most complete
                </p>
                <p className="mt-2.5 font-display text-[1.2rem] text-charcoal">{longest.name}</p>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-soft">
                  {totalNights(longest.makkahNights, longest.madinahNights)} nights with{' '}
                  {longest.hotelRatingLabel.toLowerCase()} and {longest.flight.toLowerCase()}.
                </p>
              </div>
            ) : null}
          </div>

          <ul className="mt-9 grid gap-3 sm:grid-cols-2">
            {[
              'All packages are quoted per person and confirmed in writing',
              'Flights, accommodation, transfers and ziyarat are arranged together',
              'Nights can be rebalanced between Makkah and Madinah on request',
              'Hotel property is confirmed closer to your travel date',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[0.86rem] text-ink-soft">
                <IconCheck width={15} height={15} className="mt-0.5 shrink-0 text-gold" />
                {item}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <p className="mt-8 text-[0.78rem] text-ink-mute">
        {packages.length} package{packages.length === 1 ? '' : 's'} on record · {active.length}{' '}
        published to the website
      </p>
    </>
  );
}
