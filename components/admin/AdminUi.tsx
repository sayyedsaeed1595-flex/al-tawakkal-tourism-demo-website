'use client';

import { useEffect, useRef, type ReactNode } from 'react';

import { IconClose } from '@/components/ui/Icons';
import { initials } from '@/lib/format';

/* -------------------------------------------------------------------------- */
/*  Stat card                                                                 */
/* -------------------------------------------------------------------------- */

export function StatCard({
  label,
  value,
  hint,
  icon,
  tone = 'default',
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: ReactNode;
  tone?: 'default' | 'gold' | 'alert';
}) {
  const tones = {
    default: 'border-line-soft bg-white',
    gold: 'border-gold/25 bg-gold/[0.05]',
    alert: 'border-[#B08A4A]/30 bg-white',
  } as const;

  return (
    <div className={`rounded-lg border p-6 ${tones[tone]}`}>
      <div className="flex items-start justify-between gap-4">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink-mute">
          {label}
        </p>
        {icon ? <span className="text-gold">{icon}</span> : null}
      </div>
      <p className="mt-4 font-display text-[2.1rem] leading-none text-charcoal">{value}</p>
      {hint ? <p className="mt-2.5 text-[0.76rem] leading-relaxed text-ink-mute">{hint}</p> : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Status pill                                                               */
/* -------------------------------------------------------------------------- */

const statusStyles: Record<string, string> = {
  active: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  draft: 'border-amber-200 bg-amber-50 text-amber-700',
  archived: 'border-line-strong bg-cream-deep text-ink-soft',
  new: 'border-gold/30 bg-gold/[0.08] text-gold',
  contacted: 'border-sky-200 bg-sky-50 text-sky-700',
  confirmed: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  closed: 'border-line-strong bg-ivory-soft text-ink-mute',
};

export function StatusPill({ status, label }: { status: string; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 text-[0.7rem] font-medium capitalize ${
        statusStyles[status] ?? 'border-line bg-ivory-soft text-ink-soft'
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {label}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Table shell                                                               */
/* -------------------------------------------------------------------------- */

export function DataTable({
  headers,
  children,
  caption,
  minWidth = 900,
}: {
  headers: string[];
  children: ReactNode;
  caption: string;
  minWidth?: number;
}) {
  return (
    <div className="thin-scroll overflow-x-auto rounded-lg border border-line-soft bg-white">
      <table className="w-full border-collapse text-left" style={{ minWidth }}>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-line-soft bg-ivory-soft">
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="whitespace-nowrap px-5 py-3.5 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-ink-mute"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line-soft">{children}</tbody>
      </table>
    </div>
  );
}

export function TableCell({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <td className={`px-5 py-4 align-middle text-[0.85rem] text-ink-soft ${className}`}>{children}</td>;
}

export function CustomerCell({ name, email }: { name: string; email?: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ivory-soft text-[0.72rem] font-semibold text-ink-soft">
        {initials(name)}
      </span>
      <div className="min-w-0">
        <p className="truncate font-medium text-charcoal">{name}</p>
        {email ? <p className="truncate text-[0.76rem] text-ink-mute">{email}</p> : null}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Icon button                                                               */
/* -------------------------------------------------------------------------- */

export function IconButton({
  label,
  onClick,
  children,
  tone = 'neutral',
  type = 'button',
  disabled,
}: {
  label: string;
  onClick?: () => void;
  children: ReactNode;
  tone?: 'neutral' | 'danger';
  type?: 'button' | 'submit';
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-md border transition-colors duration-200 disabled:opacity-45 ${
        tone === 'danger'
          ? 'border-line text-ink-mute hover:border-red-200 hover:bg-red-50 hover:text-red-700'
          : 'border-line text-ink-mute hover:border-gold/50 hover:text-gold'
      }`}
    >
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Modal                                                                     */
/* -------------------------------------------------------------------------- */

export function Modal({
  open,
  title,
  description,
  onClose,
  children,
  footer,
  size = 'lg',
}: {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'md' | 'lg' | 'xl';
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Body scroll lock + initial focus. Depends only on `open` so that typing in a
  // form field never moves focus back to the panel.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Escape-to-close. `onClose` is usually a fresh closure each render, which is
  // fine here because this effect only touches the document listener.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const widths = { md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' } as const;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto p-4 sm:p-6">
      <div
        className="fixed inset-0 bg-espresso/45 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={`relative my-4 w-full ${widths[size]} animate-fade-up rounded-xl border border-line-soft bg-white shadow-panel focus:outline-none sm:my-8`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-line-soft px-6 py-5">
          <div>
            <h2 className="font-display text-[1.28rem] leading-tight text-charcoal">{title}</h2>
            {description ? (
              <p className="mt-1.5 text-[0.82rem] text-ink-soft">{description}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-line text-ink-mute transition-colors hover:border-gold/50 hover:text-gold"
          >
            <IconClose width={16} height={16} />
          </button>
        </div>

        <div className="max-h-[68vh] overflow-y-auto px-6 py-6 thin-scroll">{children}</div>

        {footer ? (
          <div className="flex flex-col-reverse gap-3 border-t border-line-soft bg-ivory-soft px-6 py-4 sm:flex-row sm:items-center sm:justify-end">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Empty state                                                               */
/* -------------------------------------------------------------------------- */

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-dashed border-line-strong bg-white px-6 py-16 text-center">
      <p className="font-display text-[1.15rem] text-charcoal">{title}</p>
      <p className="mx-auto mt-2.5 max-w-sm text-[0.85rem] leading-relaxed text-ink-soft">
        {description}
      </p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}
