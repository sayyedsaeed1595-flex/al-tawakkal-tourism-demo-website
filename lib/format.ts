/* ==========================================================================
   Formatting helpers — Indian numbering, dates, labels
   ========================================================================== */

const inrFormatter = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 0,
});

/** `175000` → `1,75,000` (Indian grouping) */
export function formatInr(amount: number): string {
  return inrFormatter.format(Math.round(amount));
}

/** `175000` → `₹1,75,000` */
export function formatPrice(amount: number): string {
  return `₹${formatInr(amount)}`;
}

const isoDateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const longDateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

/** `2026-03-18` → `18 Mar 2026` */
export function formatIsoDate(iso: string): string {
  if (!iso) return '—';
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return isoDateFormatter.format(date);
}

/** `2026-03-18` → `18 March 2026` */
export function formatLongDate(iso: string): string {
  if (!iso) return '—';
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return longDateFormatter.format(date);
}

/** ISO timestamp for "now" — used when a demo enquiry is created. */
export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Days from today to the given ISO date; `null` when in the past. */
export function daysUntil(iso: string): number | null {
  if (!iso) return null;
  const target = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(target.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((target.getTime() - today.getTime()) / 86_400_000);
  return diff >= 0 ? diff : null;
}

export function totalNights(makkahNights: number, madinahNights: number): number {
  return makkahNights + madinahNights;
}

/** `12 nights / 13 days` computed from the night counts. */
export function durationFromNights(makkahNights: number, madinahNights: number): string {
  return `${totalNights(makkahNights, madinahNights)} Nights / ${totalNights(
    makkahNights,
    madinahNights,
  ) + 1} Days`;
}

/** `Ayesha` → `AY` — used for avatar-style initials in the admin tables. */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function pluralise(count: number, singular: string, plural = `${singular}s`): string {
  return `${count} ${count === 1 ? singular : plural}`;
}
