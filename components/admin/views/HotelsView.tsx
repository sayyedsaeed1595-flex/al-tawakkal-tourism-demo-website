'use client';

import { useState, type FormEvent } from 'react';

import { AdminShell } from '@/components/admin/AdminShell';
import {
  DataTable,
  EmptyState,
  IconButton,
  Modal,
  StatCard,
  StatusPill,
  TableCell,
} from '@/components/admin/AdminUi';
import { Button, LinkButton } from '@/components/ui/Button';
import { IconAlert, IconBuilding, IconCheck, IconEdit, IconStar } from '@/components/ui/Icons';
import { Media } from '@/components/ui/Media';
import { useDemoStore } from '@/lib/demo-store';
import type { Hotel } from '@/lib/types';

const cityOptions: Array<Hotel['city']> = ['Makkah', 'Madinah'];
const statusOptions: Array<Hotel['status']> = ['active', 'draft'];

export function HotelsView() {
  const { hotels, updateHotel } = useDemoStore();
  const [editing, setEditing] = useState<Hotel | null>(null);
  const [form, setForm] = useState<Hotel | null>(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | Hotel['city']>('all');

  const visible = filter === 'all' ? hotels : hotels.filter((hotel) => hotel.city === filter);
  const counts = {
    makkah: hotels.filter((hotel) => hotel.city === 'Makkah').length,
    madinah: hotels.filter((hotel) => hotel.city === 'Madinah').length,
    fiveStar: hotels.filter((hotel) => hotel.stars === 5).length,
  };

  function openEdit(hotel: Hotel) {
    setForm(hotel);
    setError('');
    setEditing(hotel);
  }

  function closeModal() {
    setEditing(null);
    setForm(null);
    setError('');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form || !editing) return;

    if (form.name.trim().length < 2) {
      setError('Enter the hotel name.');
      return;
    }
    if (form.stars < 1 || form.stars > 5) {
      setError('Star rating must be between 1 and 5.');
      return;
    }
    if (!form.distanceFromHaram.trim()) {
      setError('Enter the distance from the Haram.');
      return;
    }

    updateHotel(editing.id, {
      ...form,
      name: form.name.trim(),
      distanceFromHaram: form.distanceFromHaram.trim(),
      description: form.description.trim(),
      image: form.image.trim() || '/images/hotel-facade.svg',
    });
    closeModal();
  }

  return (
    <AdminShell
      title="Hotels"
      description="Hotel properties available in Makkah and Madinah, with star rating, distance from the Haram and a short description."
      actions={
        <LinkButton href="/packages" variant="outline" size="sm">
          View on website
        </LinkButton>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Hotels Listed" value={hotels.length} icon={<IconBuilding width={18} height={18} />} tone="gold" />
        <StatCard label="Makkah Properties" value={counts.makkah} />
        <StatCard label="Madinah Properties" value={counts.madinah} />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {(['all', 'Makkah', 'Madinah'] as const).map((value) => (
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
            {value === 'all' ? 'All cities' : value}
          </button>
        ))}
        <span className="ml-auto text-[0.78rem] text-ink-mute">
          {visible.length} of {hotels.length} hotels
        </span>
      </div>

      <div className="mt-5">
        {visible.length === 0 ? (
          <EmptyState
            title="No hotels here"
            description="There are no properties in this city yet."
          />
        ) : (
          <DataTable
            caption="Hotels with city, star rating, distance from the Haram, status and edit action"
            headers={['Hotel', 'City', 'Stars', 'Distance from Haram', 'Status', 'Actions']}
            minWidth={960}
          >
            {visible.map((hotel) => (
              <tr key={hotel.id} className="transition-colors hover:bg-ivory-soft/60">
                <TableCell>
                  <div className="flex items-center gap-3.5">
                    <span className="h-12 w-16 shrink-0 overflow-hidden rounded border border-line-soft bg-cream-soft">
                      <Media
                        src={hotel.image}
                        alt={`${hotel.name} exterior`}
                        width={160}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-charcoal">{hotel.name}</p>
                      <p className="mt-0.5 line-clamp-1 max-w-[280px] text-[0.75rem] text-ink-mute">
                        {hotel.description}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap">{hotel.city}</TableCell>
                <TableCell>
                  <span className="flex items-center gap-1" aria-label={`${hotel.stars} star`}>
                    {Array.from({ length: hotel.stars }).map((_, index) => (
                      <IconStar key={index} width={13} height={13} className="text-gold" />
                    ))}
                    <span className="sr-only">{hotel.stars} stars</span>
                  </span>
                </TableCell>
                <TableCell className="whitespace-nowrap">{hotel.distanceFromHaram}</TableCell>
                <TableCell>
                  <StatusPill
                    status={hotel.status}
                    label={hotel.status === 'active' ? 'Active' : 'Draft'}
                  />
                </TableCell>
                <TableCell>
                  <IconButton label={`Edit ${hotel.name}`} onClick={() => openEdit(hotel)}>
                    <IconEdit width={15} height={15} />
                  </IconButton>
                </TableCell>
              </tr>
            ))}
          </DataTable>
        )}
      </div>

      {/* ---------------- Edit modal ---------------- */}
      <Modal
        open={Boolean(editing && form)}
        title={editing ? `Edit: ${editing.name}` : 'Edit hotel'}
        description="Update the property details used across the website."
        onClose={closeModal}
        footer={
          <>
            <Button type="button" variant="ghost" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" form="hotel-form">
              <IconCheck width={16} height={16} />
              Save changes
            </Button>
          </>
        }
      >
        {form ? (
          <form id="hotel-form" onSubmit={handleSubmit} noValidate className="space-y-5">
            {error ? (
              <p className="flex items-start gap-2.5 rounded-md border border-red-200 bg-red-50/60 p-3.5 text-[0.82rem] text-red-700">
                <IconAlert width={15} height={15} className="mt-0.5 shrink-0" />
                {error}
              </p>
            ) : null}

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="field-label" htmlFor="hotel-name">
                  Hotel name <span className="text-gold">*</span>
                </label>
                <input
                  id="hotel-name"
                  className="field"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                />
              </div>

              <div>
                <label className="field-label" htmlFor="hotel-city">
                  City
                </label>
                <select
                  id="hotel-city"
                  className="field"
                  value={form.city}
                  onChange={(event) =>
                    setForm({ ...form, city: event.target.value as Hotel['city'] })
                  }
                >
                  {cityOptions.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="field-label" htmlFor="hotel-stars">
                  Star rating
                </label>
                <select
                  id="hotel-stars"
                  className="field"
                  value={form.stars}
                  onChange={(event) => setForm({ ...form, stars: Number(event.target.value) })}
                >
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <option key={stars} value={stars}>
                      {stars} {stars === 1 ? 'star' : 'stars'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="field-label" htmlFor="hotel-distance">
                  Distance from the Haram <span className="text-gold">*</span>
                </label>
                <input
                  id="hotel-distance"
                  className="field"
                  value={form.distanceFromHaram}
                  onChange={(event) => setForm({ ...form, distanceFromHaram: event.target.value })}
                  placeholder="Approx. 150 m walking distance"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="field-label" htmlFor="hotel-description">
                  Description
                </label>
                <textarea
                  id="hotel-description"
                  className="field resize-y"
                  rows={4}
                  value={form.description}
                  onChange={(event) => setForm({ ...form, description: event.target.value })}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="field-label" htmlFor="hotel-image">
                  Image path
                </label>
                <input
                  id="hotel-image"
                  className="field"
                  value={form.image}
                  onChange={(event) => setForm({ ...form, image: event.target.value })}
                />
                <p className="mt-1.5 text-[0.72rem] text-ink-mute">
                  Local asset path from the project&apos;s public folder.
                </p>
              </div>

              <div className="sm:col-span-2">
                <label className="field-label" htmlFor="hotel-status">
                  Status
                </label>
                <select
                  id="hotel-status"
                  className="field"
                  value={form.status}
                  onChange={(event) =>
                    setForm({ ...form, status: event.target.value as Hotel['status'] })
                  }
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status === 'active' ? 'Active' : 'Draft'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        ) : null}
      </Modal>

      <p className="mt-8 border-t border-line-soft pt-6 text-[0.78rem] leading-relaxed text-ink-mute">
        Hotels are stored in this browser as editable mock data. In the live website this screen
        would write to the same database the package pages read from, so a hotel changed here
        appears on the public site straight away.
      </p>
    </AdminShell>
  );
}
