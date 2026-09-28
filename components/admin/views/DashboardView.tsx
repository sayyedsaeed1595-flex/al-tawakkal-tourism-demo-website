'use client';

import Link from 'next/link';
import { useMemo } from 'react';

import { AdminShell } from '@/components/admin/AdminShell';
import {
  CustomerCell,
  DataTable,
  StatCard,
  StatusPill,
  TableCell,
} from '@/components/admin/AdminUi';
import { WhatsAppButton } from '@/components/ui/Button';
import {
  IconArrowRight,
  IconBox,
  IconBuilding,
  IconInbox,
  IconSparkle,
  IconUsers,
  IconWhatsApp,
} from '@/components/ui/Icons';
import { enquiryStatusLabels } from '@/data/enquiries';
import { packageStatusLabels, useDemoStore } from '@/lib/demo-store';
import { formatIsoDate, formatPrice } from '@/lib/format';
import { savedEnquiryWhatsAppLink } from '@/lib/whatsapp';

export function DashboardView() {
  const { packages, hotels, enquiries, counts, hydrated } = useDemoStore();

  const recent = useMemo(() => enquiries.slice(0, 5), [enquiries]);
  const topPackages = useMemo(
    () =>
      [...packages]
        .sort((a, b) => b.pricePerPerson - a.pricePerPerson)
        .slice(0, 3),
    [packages],
  );

  const enquiryCountByPackage = useMemo(() => {
    const map = new Map<string, number>();
    enquiries.forEach((item) => {
      map.set(item.packageName, (map.get(item.packageName) ?? 0) + 1);
    });
    return map;
  }, [enquiries]);

  return (
    <AdminShell
      title="Dashboard"
      description="A live view of packages, hotels and enquiries. Everything on this screen is sample data stored in your browser."
      actions={
        <>
          <Link href="/admin/packages" className="btn-primary btn-sm">
            Manage Packages
            <IconArrowRight width={15} height={15} />
          </Link>
          <WhatsAppButton label="Test WhatsApp Link" size="sm" variant="outline" />
        </>
      }
    >
      {/* ---------------- Overview stats ---------------- */}
      <section aria-labelledby="overview-heading">
        <h2 id="overview-heading" className="sr-only">
          Overview
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total Packages"
            value={counts.totalPackages}
            hint={`${counts.activePackages} currently active on the website`}
            icon={<IconBox width={18} height={18} />}
            tone="gold"
          />
          <StatCard
            label="Total Enquiries"
            value={counts.totalEnquiries}
            hint="All enquiries received, including closed ones"
            icon={<IconInbox width={18} height={18} />}
          />
          <StatCard
            label="New Enquiries"
            value={counts.newEnquiries}
            hint="Not yet contacted — the priority list"
            icon={<IconSparkle width={18} height={18} />}
            tone="alert"
          />
          <StatCard
            label="Pending Enquiries"
            value={counts.pendingEnquiries}
            hint="Contacted and awaiting a reply from the customer"
            icon={<IconUsers width={18} height={18} />}
          />
        </div>

        {!hydrated ? (
          <p className="mt-4 text-[0.78rem] text-ink-mute">
            Loading saved demo data from this browser…
          </p>
        ) : null}
      </section>

      {/* ---------------- Secondary figures ---------------- */}
      <section className="mt-4 grid gap-4 sm:grid-cols-3" aria-label="Additional figures">
        {[
          { label: 'Confirmed Enquiries', value: counts.confirmedEnquiries },
          { label: 'Hotels Listed', value: hotels.length },
          {
            label: 'Average Package Price',
            value: packages.length
              ? formatPrice(
                  Math.round(
                    packages.reduce((total, item) => total + item.pricePerPerson, 0) /
                      packages.length,
                  ),
                )
              : '—',
          },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-lg border border-line-soft bg-white px-5 py-4"
          >
            <span className="text-[0.8rem] text-ink-soft">{item.label}</span>
            <span className="font-display text-[1.25rem] text-charcoal">{item.value}</span>
          </div>
        ))}
      </section>

      <div className="mt-8 grid gap-6 xl:grid-cols-12">
        {/* ---------------- Recent enquiries ---------------- */}
        <section className="xl:col-span-7" aria-labelledby="recent-heading">
          <div className="flex items-center justify-between gap-4">
            <h2 id="recent-heading" className="font-display text-[1.2rem] text-charcoal">
              Recent enquiries
            </h2>
            <Link
              href="/admin/enquiries"
              className="inline-flex items-center gap-1.5 text-[0.76rem] font-semibold uppercase tracking-[0.12em] text-charcoal transition-colors hover:text-gold"
            >
              View all
              <IconArrowRight width={14} height={14} />
            </Link>
          </div>

          <div className="mt-4">
              <DataTable
                caption="Five most recent enquiries"
                headers={['Customer', 'Package', 'Status', 'Date', 'Reply']}
                minWidth={700}
              >
                {recent.map((item) => (
                  <tr key={item.id} className="transition-colors hover:bg-ivory-soft/60">
                    <TableCell>
                      <CustomerCell name={item.fullName} email={item.email} />
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{item.packageName}</TableCell>
                    <TableCell>
                      <StatusPill status={item.status} label={enquiryStatusLabels[item.status]} />
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-ink-mute">
                      {formatIsoDate(item.createdAt)}
                    </TableCell>
                    <TableCell>
                      <a
                        href={savedEnquiryWhatsAppLink(item)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-line text-ink-mute transition-colors hover:border-gold/50 hover:text-gold"
                        aria-label={`Reply to ${item.fullName} on WhatsApp`}
                        title="Reply on WhatsApp"
                      >
                        <IconWhatsApp width={14} height={14} />
                      </a>
                    </TableCell>
                  </tr>
                ))}
              </DataTable>
          </div>
        </section>

        {/* ---------------- Top packages ---------------- */}
        <section className="xl:col-span-5" aria-labelledby="packages-heading">
          <div className="flex items-center justify-between gap-4">
            <h2 id="packages-heading" className="font-display text-[1.2rem] text-charcoal">
              Packages by value
            </h2>
            <Link
              href="/admin/packages"
              className="inline-flex items-center gap-1.5 text-[0.76rem] font-semibold uppercase tracking-[0.12em] text-charcoal transition-colors hover:text-gold"
            >
              Manage
              <IconArrowRight width={14} height={14} />
            </Link>
          </div>

          <ul className="mt-4 space-y-3">
            {topPackages.map((item) => (
              <li key={item.slug} className="rounded-lg border border-line-soft bg-white p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-charcoal">{item.name}</p>
                    <p className="mt-1 text-[0.78rem] text-ink-mute">
                      {item.durationLabel} · {item.tierLabel}
                    </p>
                  </div>
                  <StatusPill
                    status={item.status}
                    label={packageStatusLabels[item.status]}
                  />
                </div>
                <div className="mt-4 flex items-center justify-between gap-4 border-t border-line-soft pt-3.5">
                  <span className="text-[0.8rem] text-ink-mute">
                    {enquiryCountByPackage.get(item.name) ?? 0} enquiries
                  </span>
                  <span className="font-display text-[1.05rem] text-charcoal">
                    {formatPrice(item.pricePerPerson)}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 rounded-lg border border-line-soft bg-ivory-soft p-5">
            <p className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold">
              <IconBuilding width={14} height={14} />
              Hotels
            </p>
            <p className="mt-2.5 text-[0.84rem] leading-relaxed text-ink-soft">
              {hotels.length} properties across Makkah and Madinah.{' '}
              <Link href="/admin/hotels" className="font-medium text-charcoal underline underline-offset-4 hover:text-gold">
                Review the list
              </Link>
              .
            </p>
          </div>
        </section>
      </div>

      {/* ---------------- Quick links ---------------- */}
      <section className="mt-8" aria-labelledby="quick-links-heading">
        <h2 id="quick-links-heading" className="font-display text-[1.2rem] text-charcoal">
          Quick actions
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Add a new package', href: '/admin/packages', hint: 'Create a package record' },
            { label: 'Review new enquiries', href: '/admin/enquiries', hint: `${counts.newEnquiries} waiting` },
            { label: 'Update hotels', href: '/admin/hotels', hint: 'Names, ratings, distances' },
            { label: 'Business settings', href: '/admin/settings', hint: 'Contact details and hours' },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-lg border border-line-soft bg-white p-5 transition-all duration-300 ease-premium hover:border-gold/40 hover:shadow-card"
              >
                <span className="text-[0.88rem] font-medium text-charcoal transition-colors group-hover:text-gold">
                  {item.label}
                </span>
                <span className="mt-1.5 text-[0.78rem] text-ink-mute">{item.hint}</span>
                <IconArrowRight
                  width={15}
                  height={15}
                  className="mt-4 text-gold opacity-0 transition-opacity group-hover:opacity-100"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10 border-t border-line-soft pt-6 text-[0.78rem] leading-relaxed text-ink-mute">
        Note for the website owner: this dashboard is the control panel that comes with the
        development package. In a live build these screens would read and write from a database
        instead of the browser, and sign-in would use real authentication. The layout, fields and
        workflows are the same.
      </p>
    </AdminShell>
  );
}
