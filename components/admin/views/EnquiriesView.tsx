'use client';

import { useMemo, useState } from 'react';

import { AdminShell } from '@/components/admin/AdminShell';
import {
  CustomerCell,
  DataTable,
  EmptyState,
  IconButton,
  Modal,
  StatCard,
  StatusPill,
  TableCell,
} from '@/components/admin/AdminUi';
import { Button, LinkButton } from '@/components/ui/Button';
import {
  IconAlert,
  IconCheck,
  IconInbox,
  IconSearch,
  IconTrash,
  IconUsers,
  IconWhatsApp,
} from '@/components/ui/Icons';
import { enquiryStatuses, enquiryStatusLabels } from '@/data/enquiries';
import { useDemoStore } from '@/lib/demo-store';
import { formatIsoDate, formatLongDate, initials } from '@/lib/format';
import type { Enquiry, EnquiryStatus } from '@/lib/types';
import { savedEnquiryWhatsAppLink } from '@/lib/whatsapp';

const sourceLabel: Record<Enquiry['source'], string> = {
  website: 'Website form',
  whatsapp: 'WhatsApp',
  demo: 'Sample data',
};

export function EnquiriesView() {
  const { enquiries, counts, updateEnquiryStatus, deleteEnquiry, resetDemoData } = useDemoStore();
  const [filter, setFilter] = useState<'all' | EnquiryStatus>('all');
  const [query, setQuery] = useState('');
  const [viewing, setViewing] = useState<Enquiry | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Enquiry | null>(null);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return enquiries.filter((item) => {
      const matchesStatus = filter === 'all' || item.status === filter;
      const matchesQuery =
        needle.length === 0 ||
        item.fullName.toLowerCase().includes(needle) ||
        item.phone.toLowerCase().includes(needle) ||
        item.email.toLowerCase().includes(needle) ||
        item.packageName.toLowerCase().includes(needle);
      return matchesStatus && matchesQuery;
    });
  }, [enquiries, filter, query]);

  return (
    <AdminShell
      title="Enquiries"
      description="Every enquiry received through the website form or WhatsApp, with status tracking from New to Closed."
      actions={
        <>
          <LinkButton href="/contact#enquiry" variant="outline" size="sm">
            Open enquiry form
          </LinkButton>
          <Button size="sm" variant="outline" onClick={resetDemoData}>
            Reset demo data
          </Button>
        </>
      }
    >
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Enquiries"
          value={counts.totalEnquiries}
          icon={<IconInbox width={18} height={18} />}
        />
        <StatCard
          label="New"
          value={counts.newEnquiries}
          hint="Not yet contacted"
          icon={<IconAlert width={18} height={18} />}
          tone="gold"
        />
        <StatCard
          label="Pending"
          value={counts.pendingEnquiries}
          hint="Contacted, awaiting customer"
          icon={<IconUsers width={18} height={18} />}
        />
        <StatCard
          label="Confirmed"
          value={counts.confirmedEnquiries}
          hint="Travellers booked in"
        />
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {(['all', ...enquiryStatuses] as const).map((value) => {
            const label = value === 'all' ? 'All' : enquiryStatusLabels[value];
            const total =
              value === 'all'
                ? enquiries.length
                : enquiries.filter((item) => item.status === value).length;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                aria-pressed={filter === value}
                className={`rounded-md border px-3.5 py-2 text-[0.78rem] font-medium transition-all duration-300 ${
                  filter === value
                    ? 'border-charcoal bg-charcoal text-ivory'
                    : 'border-line bg-white text-ink-soft hover:border-gold/50 hover:text-charcoal'
                }`}
              >
                {label}
                <span className={`ml-1.5 text-[0.7rem] ${filter === value ? 'text-ivory/60' : 'text-ink-mute'}`}>
                  {total}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:w-72">
          <IconSearch
            width={15}
            height={15}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-mute"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, phone or package"
            aria-label="Search enquiries"
            className="field pl-10"
          />
        </div>
      </div>

      {/* Table */}
      <div className="mt-5">
        {visible.length === 0 ? (
          <EmptyState
            title="Nothing to show"
            description="No enquiries match this filter. Try a different status, clear the search, or submit the website form to see a new record appear here."
            action={
              <Button size="sm" variant="outline" onClick={() => { setFilter('all'); setQuery(''); }}>
                Clear filters
              </Button>
            }
          />
        ) : (
          <DataTable
            caption="Enquiries with customer, package, travellers, travel date, status and date"
            headers={[
              'Customer',
              'Phone',
              'Package',
              'Travellers',
              'Travel Date',
              'Status',
              'Date',
              'Actions',
            ]}
            minWidth={1080}
          >
            {visible.map((item) => (
              <tr key={item.id} className="transition-colors hover:bg-ivory-soft/60">
                <TableCell>
                  <CustomerCell name={item.fullName} email={item.email} />
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <a
                    href={`tel:${item.phone.replace(/\s/g, '')}`}
                    className="text-charcoal transition-colors hover:text-gold"
                  >
                    {item.phone}
                  </a>
                </TableCell>
                <TableCell className="min-w-[150px]">
                  <p className="truncate">{item.packageName}</p>
                  <p className="mt-0.5 text-[0.72rem] text-ink-mute">{sourceLabel[item.source]}</p>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {item.travellers} {item.travellers === 1 ? 'person' : 'people'}
                </TableCell>
                <TableCell className="whitespace-nowrap text-ink-mute">
                  {item.preferredTravelDate
                    ? formatIsoDate(item.preferredTravelDate)
                    : 'Flexible'}
                </TableCell>
                <TableCell>
                  <label className="sr-only" htmlFor={`status-${item.id}`}>
                    Status for {item.fullName}
                  </label>
                  <select
                    id={`status-${item.id}`}
                    value={item.status}
                    onChange={(event) =>
                      updateEnquiryStatus(item.id, event.target.value as EnquiryStatus)
                    }
                    className="rounded-sm border border-line bg-white px-2.5 py-1.5 text-[0.76rem] text-charcoal focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
                  >
                    {enquiryStatuses.map((status) => (
                      <option key={status} value={status}>
                        {enquiryStatusLabels[status]}
                      </option>
                    ))}
                  </select>
                </TableCell>
                <TableCell className="whitespace-nowrap text-ink-mute">
                  {formatIsoDate(item.createdAt)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <IconButton label={`View enquiry from ${item.fullName}`} onClick={() => setViewing(item)}>
                      <IconSearch width={14} height={14} />
                    </IconButton>
                    <a
                      href={savedEnquiryWhatsAppLink(item)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-line text-ink-mute transition-colors hover:border-gold/50 hover:text-gold"
                      aria-label={`Message ${item.fullName} on WhatsApp`}
                      title="Message on WhatsApp"
                    >
                      <IconWhatsApp width={14} height={14} />
                    </a>
                    <IconButton
                      label={`Delete enquiry from ${item.fullName}`}
                      tone="danger"
                      onClick={() => setConfirmDelete(item)}
                    >
                      <IconTrash width={14} height={14} />
                    </IconButton>
                  </div>
                </TableCell>
              </tr>
            ))}
          </DataTable>
        )}
      </div>

      <p className="mt-5 text-[0.78rem] text-ink-mute">
        Showing {visible.length} of {enquiries.length} enquiries. Changing a status updates it
        immediately and is saved in this browser.
      </p>

      {/* ---------------- Detail modal ---------------- */}
      <Modal
        open={Boolean(viewing)}
        title={viewing ? `Enquiry from ${viewing.fullName}` : 'Enquiry'}
        description={viewing ? `Reference ${viewing.id} · received ${formatIsoDate(viewing.createdAt)}` : undefined}
        onClose={() => setViewing(null)}
        footer={
          viewing ? (
            <>
              <Button type="button" variant="ghost" onClick={() => setViewing(null)}>
                Close
              </Button>
              <a
                href={savedEnquiryWhatsAppLink(viewing)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp btn-sm"
              >
                <IconWhatsApp width={15} height={15} />
                Reply on WhatsApp
              </a>
            </>
          ) : null
        }
      >
        {viewing ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4 rounded-lg border border-line-soft bg-ivory-soft p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-charcoal text-[0.9rem] font-semibold text-ivory">
                {initials(viewing.fullName)}
              </span>
              <div className="min-w-0">
                <p className="font-display text-[1.12rem] text-charcoal">{viewing.fullName}</p>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[0.8rem] text-ink-soft">
                  <a href={`tel:${viewing.phone.replace(/\s/g, '')}`} className="hover:text-gold">
                    {viewing.phone}
                  </a>
                  <a href={`mailto:${viewing.email}`} className="break-all hover:text-gold">
                    {viewing.email}
                  </a>
                </div>
              </div>
            </div>

            <dl className="grid gap-5 sm:grid-cols-2">
              {[
                { label: 'Package', value: viewing.packageName },
                { label: 'Number of travellers', value: String(viewing.travellers) },
                {
                  label: 'Preferred travel date',
                  value: viewing.preferredTravelDate
                    ? formatLongDate(viewing.preferredTravelDate)
                    : 'Flexible',
                },
                { label: 'Source', value: sourceLabel[viewing.source] },
              ].map((row) => (
                <div key={row.label}>
                  <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink-mute">
                    {row.label}
                  </dt>
                  <dd className="mt-1.5 text-[0.9rem] text-charcoal">{row.value}</dd>
                </div>
              ))}
            </dl>

            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink-mute">
                Message
              </p>
              {viewing.message ? (
                <p className="mt-2 whitespace-pre-line rounded-md border border-line-soft bg-ivory-soft p-4 text-[0.87rem] leading-[1.75] text-ink-soft">
                  {viewing.message}
                </p>
              ) : (
                <p className="mt-2 text-[0.87rem] text-ink-mute">No message was left with this enquiry.</p>
              )}
            </div>

            <div className="border-t border-line-soft pt-6">
              <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink-mute">
                Update status
              </p>
              <div className="flex flex-wrap gap-2">
                {enquiryStatuses.map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => {
                      updateEnquiryStatus(viewing.id, status);
                      setViewing({ ...viewing, status });
                    }}
                    aria-pressed={viewing.status === status}
                    className={`rounded-md border px-3.5 py-2 text-[0.78rem] font-medium transition-all duration-300 ${
                      viewing.status === status
                        ? 'border-charcoal bg-charcoal text-ivory'
                        : 'border-line bg-white text-ink-soft hover:border-gold/50 hover:text-charcoal'
                    }`}
                  >
                    {viewing.status === status ? (
                      <IconCheck width={13} height={13} className="mr-1.5 inline" />
                    ) : null}
                    {enquiryStatusLabels[status]}
                  </button>
                ))}
              </div>
              <p className="mt-4">
                <StatusPill status={viewing.status} label={enquiryStatusLabels[viewing.status]} />
              </p>
            </div>
          </div>
        ) : null}
      </Modal>

      {/* ---------------- Delete confirmation ---------------- */}
      <Modal
        open={Boolean(confirmDelete)}
        title="Delete this enquiry?"
        size="md"
        onClose={() => setConfirmDelete(null)}
        footer={
          <>
            <Button type="button" variant="ghost" onClick={() => setConfirmDelete(null)}>
              Keep enquiry
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={() => {
                if (confirmDelete) deleteEnquiry(confirmDelete.id);
                setConfirmDelete(null);
              }}
            >
              <IconTrash width={15} height={15} />
              Delete enquiry
            </Button>
          </>
        }
      >
        <p className="text-[0.88rem] leading-relaxed text-ink-soft">
          The enquiry from{' '}
          <span className="font-medium text-charcoal">{confirmDelete?.fullName}</span> will be
          removed from this browser. Use <strong className="font-medium text-charcoal">Reset demo data</strong>{' '}
          to bring back the sample records.
        </p>
      </Modal>
    </AdminShell>
  );
}
