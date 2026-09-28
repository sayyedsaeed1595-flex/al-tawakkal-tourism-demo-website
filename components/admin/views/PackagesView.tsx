'use client';

import Link from 'next/link';
import { useMemo, useState, type FormEvent } from 'react';

import { AdminShell } from '@/components/admin/AdminShell';
import {
  DataTable,
  EmptyState,
  IconButton,
  Modal,
  StatusPill,
  TableCell,
} from '@/components/admin/AdminUi';
import { Button, LinkButton } from '@/components/ui/Button';
import {
  IconAlert,
  IconBox,
  IconCheck,
  IconClose,
  IconEdit,
  IconExternal,
  IconPlus,
  IconTrash,
} from '@/components/ui/Icons';
import { packageStatusLabels, packageStatusOptions, useDemoStore } from '@/lib/demo-store';
import { allPackages } from '@/data/packages';
import { durationFromNights, formatPrice } from '@/lib/format';
import type { PackageStatus, UmrahPackage } from '@/lib/types';
import { packageWhatsAppLink } from '@/lib/whatsapp';

/** Slugs pre-rendered by the static export (`generateStaticParams`). */
const staticSlugs = allPackages.map((item) => item.slug);

/* -------------------------------------------------------------------------- */
/*  Form                                                                      */
/* -------------------------------------------------------------------------- */

interface FormState {
  name: string;
  tierLabel: string;
  pricePerPerson: string;
  makkahNights: string;
  madinahNights: string;
  makkahHotel: string;
  madinahHotel: string;
  flight: string;
  transportation: string;
  ziyarat: string;
  description: string;
  included: string;
  excluded: string;
  importantInfo: string;
  highlights: string;
  artwork: UmrahPackage['artwork'];
  status: PackageStatus;
  featured: boolean;
  hotelRatingLabel: string;
  priceNote: string;
}

const blankForm = (): FormState => ({
  name: '',
  tierLabel: '4 Star',
  pricePerPerson: '',
  makkahNights: '4',
  madinahNights: '4',
  makkahHotel: '',
  madinahHotel: '',
  flight: '',
  transportation: 'Included',
  ziyarat: 'Makkah + Madinah',
  description: '',
  included: '',
  excluded: '',
  importantInfo: '',
  highlights: '',
  artwork: 'makkah',
  status: 'active',
  featured: false,
  hotelRatingLabel: '4 Star Accommodation',
  priceNote: 'Per person, based on two sharing a room.',
});

const toForm = (item: UmrahPackage): FormState => ({
  name: item.name,
  tierLabel: item.tierLabel,
  pricePerPerson: String(item.pricePerPerson),
  makkahNights: String(item.makkahNights),
  madinahNights: String(item.madinahNights),
  makkahHotel: item.makkahHotel,
  madinahHotel: item.madinahHotel,
  flight: item.flight,
  transportation: item.transportation,
  ziyarat: item.ziyarat,
  description: item.description,
  included: item.included.join('\n'),
  excluded: item.excluded.join('\n'),
  importantInfo: item.importantInfo.join('\n'),
  highlights: item.highlights.join('\n'),
  artwork: item.artwork,
  status: item.status,
  featured: item.featured,
  hotelRatingLabel: item.hotelRatingLabel,
  priceNote: item.priceNote,
});

const toLines = (value: string) =>
  value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

/** Slugs that exist as pre-rendered static pages. */
function isStaticSlug(slug: string): boolean {
  return staticSlugs.includes(slug);
}

function Field({
  label,
  children,
  hint,
  required,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="field-label">
        {label} {required ? <span className="text-gold">*</span> : null}
      </label>
      {children}
      {hint ? <p className="mt-1.5 text-[0.72rem] text-ink-mute">{hint}</p> : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

export function PackagesView() {
  const { packages, addPackage, updatePackage, deletePackage } = useDemoStore();
  const [editing, setEditing] = useState<UmrahPackage | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<FormState>(blankForm);
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<UmrahPackage | null>(null);
  const [filter, setFilter] = useState<'all' | PackageStatus>('all');

  const visible = useMemo(
    () => (filter === 'all' ? packages : packages.filter((item) => item.status === filter)),
    [packages, filter],
  );

  const totals = useMemo(
    () => ({
      total: packages.length,
      active: packages.filter((item) => item.status === 'active').length,
      draft: packages.filter((item) => item.status === 'draft').length,
      average: packages.length
        ? Math.round(
            packages.reduce((sum, item) => sum + item.pricePerPerson, 0) / packages.length,
          )
        : 0,
    }),
    [packages],
  );

  function openCreate() {
    setForm(blankForm());
    setError('');
    setEditing(null);
    setCreating(true);
  }

  function openEdit(item: UmrahPackage) {
    setForm(toForm(item));
    setError('');
    setCreating(false);
    setEditing(item);
  }

  function closeModal() {
    setCreating(false);
    setEditing(null);
    setError('');
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = form.name.trim();
    const price = Number(form.pricePerPerson);
    const makkahNights = Number(form.makkahNights);
    const madinahNights = Number(form.madinahNights);

    if (name.length < 3) {
      setError('Enter a package name of at least 3 characters.');
      return;
    }
    if (!Number.isFinite(price) || price <= 0) {
      setError('Enter a valid price per person in rupees.');
      return;
    }
    if (!Number.isFinite(makkahNights) || makkahNights < 0) {
      setError('Enter a valid number of nights in Makkah.');
      return;
    }
    if (!Number.isFinite(madinahNights) || madinahNights < 0) {
      setError('Enter a valid number of nights in Madinah.');
      return;
    }
    if (!form.makkahHotel.trim() || !form.madinahHotel.trim()) {
      setError('Enter both the Makkah and Madinah hotel names.');
      return;
    }
    if (!form.flight.trim()) {
      setError('Enter the flight option included in this package.');
      return;
    }
    if (form.description.trim().length < 20) {
      setError('Write a short description of at least 20 characters.');
      return;
    }

    const payload = {
      name,
      tier: (editing?.tier ?? 'premium') as UmrahPackage['tier'],
      tierLabel: form.tierLabel.trim() || '4 Star',
      pricePerPerson: Math.round(price),
      makkahNights: Math.round(makkahNights),
      madinahNights: Math.round(madinahNights),
      durationLabel: durationFromNights(Math.round(makkahNights), Math.round(madinahNights)),
      hotelRatingLabel: form.hotelRatingLabel.trim() || '4 Star Accommodation',
      makkahHotel: form.makkahHotel.trim(),
      madinahHotel: form.madinahHotel.trim(),
      flight: form.flight.trim(),
      transportation: form.transportation.trim() || 'Included',
      ziyarat: form.ziyarat.trim() || 'Makkah + Madinah',
      description: form.description.trim(),
      highlights: toLines(form.highlights),
      included: toLines(form.included),
      excluded: toLines(form.excluded),
      importantInfo: toLines(form.importantInfo),
      artwork: form.artwork,
      status: form.status,
      featured: form.featured,
      priceNote: form.priceNote.trim() || 'Per person, based on two sharing a room.',
    };

    if (editing) {
      updatePackage(editing.slug, payload);
    } else {
      addPackage(payload);
    }
    closeModal();
  }

  return (
    <AdminShell
      title="Packages"
      description="Add, edit and remove Umrah packages. Changes appear on the public website immediately in this browser."
      actions={
        <>
          <LinkButton href="/packages" variant="outline" size="sm">
            View public page
            <IconExternal width={14} height={14} />
          </LinkButton>
          <Button size="sm" onClick={openCreate}>
            <IconPlus width={15} height={15} />
            Add Package
          </Button>
        </>
      }
    >
      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Total Packages', value: totals.total },
          { label: 'Active', value: totals.active },
          { label: 'Drafts', value: totals.draft },
          { label: 'Average Price', value: formatPrice(totals.average) },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-line-soft bg-white px-5 py-4"
          >
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-ink-mute">
              {item.label}
            </p>
            <p className="mt-2.5 font-display text-[1.5rem] leading-none text-charcoal">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {(['all', 'active', 'draft', 'archived'] as const).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            aria-pressed={filter === value}
            className={`rounded-md border px-3.5 py-2 text-[0.78rem] font-medium capitalize transition-all duration-300 ${
              filter === value
                ? 'border-charcoal bg-charcoal text-ivory'
                : 'border-line bg-white text-ink-soft hover:border-gold/50 hover:text-charcoal'
            }`}
          >
            {value}
          </button>
        ))}
        <span className="ml-auto text-[0.78rem] text-ink-mute">
          {visible.length} of {packages.length} shown
        </span>
      </div>

      {/* Table */}
      <div className="mt-5">
        {visible.length === 0 ? (
          <EmptyState
            title="No packages here"
            description="There are no packages matching this filter. Add a new package to get started."
            action={
              <Button size="sm" onClick={openCreate}>
                <IconPlus width={15} height={15} />
                Add Package
              </Button>
            }
          />
        ) : (
          <DataTable
            caption="Umrah packages with price, duration, status and actions"
            headers={['Package Name', 'Price', 'Duration', 'Hotels', 'Status', 'Actions']}
            minWidth={1000}
          >
            {visible.map((item) => (
              <tr key={item.slug} className="transition-colors hover:bg-ivory-soft/60">
                <TableCell>
                  <div className="min-w-0">
                    <p className="font-medium text-charcoal">{item.name}</p>
                    <p className="mt-0.5 text-[0.74rem] text-ink-mute">
                      {item.tierLabel} · /packages/{item.slug}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap font-medium text-charcoal">
                  {formatPrice(item.pricePerPerson)}
                  <span className="ml-1 text-[0.74rem] font-normal text-ink-mute">/ person</span>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {item.makkahNights + item.madinahNights} nights
                  <span className="mt-0.5 block text-[0.74rem] text-ink-mute">
                    {item.makkahNights} MK · {item.madinahNights} MD
                  </span>
                </TableCell>
                <TableCell className="min-w-[180px]">
                  <p className="truncate text-ink-soft">{item.makkahHotel}</p>
                  <p className="truncate text-[0.76rem] text-ink-mute">{item.madinahHotel}</p>
                </TableCell>
                <TableCell>
                  <StatusPill status={item.status} label={packageStatusLabels[item.status]} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <IconButton label={`Edit ${item.name}`} onClick={() => openEdit(item)}>
                      <IconEdit width={15} height={15} />
                    </IconButton>
                    <IconButton
                      label={`Delete ${item.name}`}
                      tone="danger"
                      onClick={() => setConfirmDelete(item)}
                    >
                      <IconTrash width={15} height={15} />
                    </IconButton>
                    <Link
                      href={`/packages/${item.slug}`}
                      prefetch={false}
                      className="inline-flex h-8 items-center gap-1.5 rounded-md border border-line px-2.5 text-[0.72rem] text-ink-mute transition-colors hover:border-gold/50 hover:text-gold"
                      aria-label={`Open ${item.name} on the website`}
                      title={
                        isStaticSlug(item.slug)
                          ? 'Open this package on the website'
                          : 'This package was added in the dashboard. Its page is generated on the next build or deployment.'
                      }
                    >
                      <IconExternal width={14} height={14} />
                    </Link>
                    <a
                      href={packageWhatsAppLink(item.name, item.slug)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-8 items-center rounded-md border border-line px-2.5 text-[0.72rem] text-ink-mute transition-colors hover:border-gold/50 hover:text-gold"
                      aria-label={`WhatsApp enquiry for ${item.name}`}
                    >
                      WA
                    </a>
                  </div>
                </TableCell>
              </tr>
            ))}
          </DataTable>
        )}
      </div>

      {/* ---------------- Add / Edit modal ---------------- */}
      <Modal
        open={creating || Boolean(editing)}
        title={editing ? `Edit: ${editing.name}` : 'Add a new package'}
        description={
          editing
            ? 'Update the details below. The website will use the new values straight away.'
            : 'Fill in the details below. It will be added to the packages list and can be published straight away.'
        }
        onClose={closeModal}
        size="xl"
        footer={
          <>
            <Button type="button" variant="ghost" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" form="package-form">
              <IconCheck width={16} height={16} />
              {editing ? 'Save changes' : 'Create package'}
            </Button>
          </>
        }
      >
        <form id="package-form" onSubmit={handleSubmit} noValidate className="space-y-7">
          {error ? (
            <p className="flex items-start gap-2.5 rounded-md border border-red-200 bg-red-50/60 p-3.5 text-[0.82rem] text-red-700">
              <IconAlert width={15} height={15} className="mt-0.5 shrink-0" />
              {error}
            </p>
          ) : null}

          <fieldset className="space-y-5">
            <legend className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold">
              Basics
            </legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Package name" required>
                <input
                  className="field"
                  value={form.name}
                  onChange={(event) => update('name', event.target.value)}
                  placeholder="e.g. 5 Star Luxury Umrah"
                />
              </Field>
              <Field label="Price per person (₹)" required hint="Displayed in Indian numbering format.">
                <input
                  className="field"
                  inputMode="numeric"
                  value={form.pricePerPerson}
                  onChange={(event) => update('pricePerPerson', event.target.value)}
                  placeholder="175000"
                />
              </Field>
              <Field label="Nights in Makkah" required>
                <input
                  className="field"
                  inputMode="numeric"
                  value={form.makkahNights}
                  onChange={(event) => update('makkahNights', event.target.value)}
                />
              </Field>
              <Field label="Nights in Madinah" required>
                <input
                  className="field"
                  inputMode="numeric"
                  value={form.madinahNights}
                  onChange={(event) => update('madinahNights', event.target.value)}
                />
              </Field>
              <Field label="Category label" hint="Shown on the package card, e.g. 5 Star.">
                <input
                  className="field"
                  value={form.tierLabel}
                  onChange={(event) => update('tierLabel', event.target.value)}
                />
              </Field>
              <Field label="Accommodation label">
                <input
                  className="field"
                  value={form.hotelRatingLabel}
                  onChange={(event) => update('hotelRatingLabel', event.target.value)}
                />
              </Field>
            </div>

            <Field label="Description" required hint="Two or three sentences for the package card and detail page.">
              <textarea
                className="field resize-y"
                rows={4}
                value={form.description}
                onChange={(event) => update('description', event.target.value)}
              />
            </Field>

            <Field label="Key highlights" hint="One per line — up to six are shown on the card.">
              <textarea
                className="field resize-y"
                rows={5}
                value={form.highlights}
                onChange={(event) => update('highlights', event.target.value)}
                placeholder={'Six nights in Makkah and six nights in Madinah\nFive-star hotels in both cities'}
              />
            </Field>
          </fieldset>

          <fieldset className="space-y-5 border-t border-line-soft pt-7">
            <legend className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold">
              Hotels, flight & transport
            </legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Makkah hotel" required>
                <input
                  className="field"
                  value={form.makkahHotel}
                  onChange={(event) => update('makkahHotel', event.target.value)}
                  placeholder="Swiss Makkah"
                />
              </Field>
              <Field label="Madinah hotel" required>
                <input
                  className="field"
                  value={form.madinahHotel}
                  onChange={(event) => update('madinahHotel', event.target.value)}
                  placeholder="Meden Hotel"
                />
              </Field>
              <Field label="Flight" required>
                <input
                  className="field"
                  value={form.flight}
                  onChange={(event) => update('flight', event.target.value)}
                  placeholder="Direct Saudi Airlines"
                />
              </Field>
              <Field label="Transportation">
                <input
                  className="field"
                  value={form.transportation}
                  onChange={(event) => update('transportation', event.target.value)}
                />
              </Field>
              <Field label="Ziyarat">
                <input
                  className="field"
                  value={form.ziyarat}
                  onChange={(event) => update('ziyarat', event.target.value)}
                />
              </Field>
              <Field label="Artwork" hint="Which illustration to show for this package.">
                <select
                  className="field"
                  value={form.artwork}
                  onChange={(event) => update('artwork', event.target.value as UmrahPackage['artwork'])}
                >
                  <option value="kaaba">Kaaba, Makkah</option>
                  <option value="makkah">Makkah mountains</option>
                  <option value="madinah">Madinah mosque</option>
                </select>
              </Field>
            </div>
          </fieldset>

          <fieldset className="space-y-5 border-t border-line-soft pt-7">
            <legend className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold">
              Inclusions & exclusions
            </legend>
            <Field label="What's included" hint="One item per line.">
              <textarea
                className="field resize-y"
                rows={6}
                value={form.included}
                onChange={(event) => update('included', event.target.value)}
              />
            </Field>
            <Field label="What's not included" hint="One item per line.">
              <textarea
                className="field resize-y"
                rows={6}
                value={form.excluded}
                onChange={(event) => update('excluded', event.target.value)}
              />
            </Field>
            <Field label="Important information" hint="One note per line — shown at the foot of the detail page.">
              <textarea
                className="field resize-y"
                rows={4}
                value={form.importantInfo}
                onChange={(event) => update('importantInfo', event.target.value)}
              />
            </Field>
            <Field label="Price note" hint="Small print shown under the price.">
              <input
                className="field"
                value={form.priceNote}
                onChange={(event) => update('priceNote', event.target.value)}
              />
            </Field>
          </fieldset>

          <fieldset className="space-y-5 border-t border-line-soft pt-7">
            <legend className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold">
              Visibility
            </legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Status" hint="Active packages appear on the public website. Drafts are hidden.">
                <select
                  className="field"
                  value={form.status}
                  onChange={(event) => update('status', event.target.value as PackageStatus)}
                >
                  {packageStatusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>
              <div className="flex items-end pb-1">
                <label className="flex cursor-pointer items-center gap-3 text-[0.86rem] text-ink-soft">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(event) => update('featured', event.target.checked)}
                    className="h-4 w-4 rounded-xs border-line-strong text-gold focus:ring-gold/30"
                  />
                  Show on the home page
                </label>
              </div>
            </div>
          </fieldset>
        </form>
      </Modal>

      {/* ---------------- Delete confirmation ---------------- */}
      <Modal
        open={Boolean(confirmDelete)}
        title="Delete this package?"
        description="This removes the package from the demo store in your browser."
        size="md"
        onClose={() => setConfirmDelete(null)}
        footer={
          <>
            <Button type="button" variant="ghost" onClick={() => setConfirmDelete(null)}>
              Keep package
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={() => {
                if (confirmDelete) deletePackage(confirmDelete.slug);
                setConfirmDelete(null);
              }}
            >
              <IconTrash width={15} height={15} />
              Delete package
            </Button>
          </>
        }
      >
        <div className="flex items-start gap-3.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-red-200 bg-red-50 text-red-700">
            <IconAlert width={18} height={18} />
          </span>
          <div>
            <p className="text-[0.92rem] font-medium text-charcoal">
              {confirmDelete?.name}
            </p>
            <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-soft">
              {confirmDelete
                ? `${formatPrice(confirmDelete.pricePerPerson)} per person · ${
                    confirmDelete.makkahNights + confirmDelete.madinahNights
                  } nights.`
                : ''}{' '}
              Its page will return a not-found message and it will no longer appear on the website.
              Use <strong className="font-medium text-charcoal">Reset data</strong> in the top bar to
              restore the sample packages.
            </p>
            <p className="mt-3 flex items-center gap-1.5 text-[0.78rem] text-ink-mute">
              <IconClose width={13} height={13} />
              In the live website this would be an archive rather than a permanent delete.
            </p>
          </div>
        </div>
      </Modal>

      <p className="mt-8 flex items-start gap-2.5 border-t border-line-soft pt-6 text-[0.78rem] leading-relaxed text-ink-mute">
        <IconBox width={15} height={15} className="mt-0.5 shrink-0" />
        <span>
          Packages created here are stored in this browser only. Prices, hotels and inclusions come
          straight from these fields, so the website owner can change them without touching any
          code. Because the site is a static export, a package added in this demo shows up on the
          website immediately while its own detail page is generated on the next build or
          deployment.
        </span>
      </p>
    </AdminShell>
  );
}
