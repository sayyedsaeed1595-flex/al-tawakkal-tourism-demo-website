'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';

import { Button, WhatsAppButton } from '@/components/ui/Button';
import {
  IconAlert,
  IconArrowRight,
  IconCalendar,
  IconCheck,
  IconCheckCircle,
  IconMail,
  IconPhone,
  IconUsers,
  IconWhatsApp,
} from '@/components/ui/Icons';
import { enquiryConfig } from '@/lib/config';
import { useDemoStore } from '@/lib/demo-store';
import { formatLongDate, todayIso } from '@/lib/format';
import type { Enquiry } from '@/lib/types';
import { enquiryWhatsAppLink, packageWhatsAppLink } from '@/lib/whatsapp';

interface EnquiryFormProps {
  /** Preselects a package (used on the package detail pages). */
  defaultPackageSlug?: string;
  /** `panel` = white card, `plain` = sits directly on the page background. */
  variant?: 'panel' | 'plain';
  /** Anchor id so `/contact#enquiry` can deep-link to the form. */
  anchorId?: string;
  title?: string;
  description?: string;
  /** Show the WhatsApp message preview box. */
  showWhatsAppPreview?: boolean;
}

interface FormValues {
  fullName: string;
  phone: string;
  email: string;
  travellers: string;
  preferredTravelDate: string;
  packageSlug: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const emptyValues = (defaultPackageSlug = ''): FormValues => ({
  fullName: '',
  phone: '',
  email: '',
  travellers: '2',
  preferredTravelDate: '',
  packageSlug: defaultPackageSlug,
  message: '',
});

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (values.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }

  const digits = values.phone.replace(/\D/g, '');
  if (digits.length < 8) {
    errors.phone = 'Enter a valid phone number we can reach you on.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  const travellers = Number(values.travellers);
  if (!Number.isFinite(travellers) || travellers < 1 || travellers > 20) {
    errors.travellers = 'Enter between 1 and 20 travellers.';
  }

  if (values.preferredTravelDate) {
    const chosen = new Date(`${values.preferredTravelDate}T00:00:00`);
    const today = new Date(`${todayIso()}T00:00:00`);
    if (Number.isNaN(chosen.getTime()) || chosen < today) {
      errors.preferredTravelDate = 'Please choose today or a future date.';
    }
  }

  return errors;
}

export function EnquiryForm({
  defaultPackageSlug = '',
  variant = 'panel',
  anchorId = 'enquiry',
  title = 'Send your enquiry',
  description = 'Share a few details and our team will come back to you with availability and a written quote.',
  showWhatsAppPreview = true,
}: EnquiryFormProps) {
  const { packages, addEnquiry } = useDemoStore();
  const [values, setValues] = useState<FormValues>(() => emptyValues(defaultPackageSlug));
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState<Enquiry | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);

  const bookable = packages.filter((item) => item.status === 'active');
  const selectedPackage = bookable.find((item) => item.slug === values.packageSlug);
  const packageName = selectedPackage?.name ?? 'Not decided yet';
  const travellers = Number(values.travellers) || 0;

  // Keep the selected package valid if the store changes underneath us.
  useEffect(() => {
    if (values.packageSlug && !bookable.some((item) => item.slug === values.packageSlug)) {
      setValues((current) => ({ ...current, packageSlug: '' }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookable.length]);

  useEffect(() => {
    if (submitted && successRef.current) {
      successRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [submitted]);

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstKey = Object.keys(nextErrors)[0] as keyof FormValues;
      document.getElementById(`${anchorId}-${firstKey}`)?.focus();
      return;
    }

    const created = addEnquiry({
      fullName: values.fullName,
      phone: values.phone,
      email: values.email,
      travellers: Number(values.travellers),
      preferredTravelDate: values.preferredTravelDate,
      packageSlug: values.packageSlug,
      packageName,
      message: values.message,
      source: 'website',
    });

    setSubmitted(created);
  }

  const whatsappHref = submitted
    ? enquiryWhatsAppLink({
        fullName: submitted.fullName,
        packageName: submitted.packageName,
        travellers: submitted.travellers,
        preferredTravelDate: submitted.preferredTravelDate,
        phone: submitted.phone,
        email: submitted.email,
        message: submitted.message,
      })
    : enquiryWhatsAppLink({
        fullName: values.fullName,
        packageName,
        travellers: values.travellers,
        preferredTravelDate: values.preferredTravelDate,
        phone: values.phone,
        email: values.email,
        message: values.message,
      });

  const shellClass =
    variant === 'panel'
      ? 'surface-card p-7 sm:p-9 lg:p-11'
      : 'border-y border-line-soft py-2';

  /* ---------------------------------------------------------------------- */
  /* SUCCESS STATE                                                           */
  /* ---------------------------------------------------------------------- */
  if (submitted) {
    return (
      <div id={anchorId} ref={successRef} className={shellClass}>
        <div className="animate-fade-up">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-gold/[0.08] text-gold">
            <IconCheckCircle width={28} height={28} />
          </span>

          <h3 className="display-3 mt-7 text-balance">{title}</h3>
          <p className="lede mt-4 text-balance">{enquiryConfig.successMessage}</p>

          <div className="mt-8 rounded-lg border border-line-soft bg-ivory-soft p-6">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold">
              Enquiry summary
            </p>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                { label: 'Name', value: submitted.fullName },
                { label: 'Phone', value: submitted.phone },
                { label: 'Email', value: submitted.email },
                { label: 'Package', value: submitted.packageName },
                { label: 'Travellers', value: String(submitted.travellers) },
                {
                  label: 'Preferred travel date',
                  value: submitted.preferredTravelDate
                    ? formatLongDate(submitted.preferredTravelDate)
                    : 'Flexible',
                },
              ].map((row) => (
                <div key={row.label}>
                  <dt className="text-[0.7rem] uppercase tracking-[0.13em] text-ink-mute">
                    {row.label}
                  </dt>
                  <dd className="mt-1 text-[0.9rem] font-medium break-words text-charcoal">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
            {submitted.message ? (
              <div className="mt-5 border-t border-line-soft pt-4">
                <p className="text-[0.7rem] uppercase tracking-[0.13em] text-ink-mute">Message</p>
                <p className="mt-1.5 whitespace-pre-line text-[0.86rem] leading-relaxed text-ink-soft">
                  {submitted.message}
                </p>
              </div>
            ) : null}
            <p className="mt-5 border-t border-line-soft pt-4 text-[0.75rem] text-ink-mute">
              Reference: <span className="font-medium text-ink-soft">{submitted.id}</span>
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <WhatsAppButton
              label="Send on WhatsApp"
              size="lg"
              message={decodeURIComponent(whatsappHref.split('?text=')[1] ?? '')}
            />
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => {
                setSubmitted(null);
                setValues(emptyValues(defaultPackageSlug));
                setErrors({});
              }}
            >
              Send another enquiry
            </Button>
          </div>

          <p className="mt-6 flex items-start gap-2 text-[0.78rem] leading-relaxed text-ink-mute">
            <IconAlert width={14} height={14} className="mt-0.5 shrink-0" />
            This is a demonstration website. Your enquiry has been saved in this browser only and
            has not been sent to a live system.
          </p>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------------- */
  /* FORM                                                                    */
  /* ---------------------------------------------------------------------- */
  return (
    <div id={anchorId} className={shellClass}>
      <div className="mb-9">
        <h3 className="display-3 text-balance">{title}</h3>
        <p className="lede mt-3.5 max-w-xl text-pretty">{description}</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Full name */}
          <div>
            <label htmlFor={`${anchorId}-fullName`} className="field-label">
              Full Name <span className="text-gold">*</span>
            </label>
            <input
              id={`${anchorId}-fullName`}
              name="fullName"
              type="text"
              autoComplete="name"
              placeholder="e.g. Ayesha Siddiqui"
              value={values.fullName}
              onChange={(event) => update('fullName', event.target.value)}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? `${anchorId}-fullName-error` : undefined}
              className={`field ${errors.fullName ? 'field-error' : ''}`}
            />
            {errors.fullName ? (
              <p id={`${anchorId}-fullName-error`} className="mt-1.5 text-[0.75rem] text-red-600">
                {errors.fullName}
              </p>
            ) : null}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor={`${anchorId}-phone`} className="field-label">
              Phone Number <span className="text-gold">*</span>
            </label>
            <div className="relative">
              <IconPhone
                width={15}
                height={15}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-mute"
              />
              <input
                id={`${anchorId}-phone`}
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+91 98765 43210"
                value={values.phone}
                onChange={(event) => update('phone', event.target.value)}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? `${anchorId}-phone-error` : undefined}
                className={`field pl-10 ${errors.phone ? 'field-error' : ''}`}
              />
            </div>
            {errors.phone ? (
              <p id={`${anchorId}-phone-error`} className="mt-1.5 text-[0.75rem] text-red-600">
                {errors.phone}
              </p>
            ) : null}
          </div>

          {/* Email */}
          <div>
            <label htmlFor={`${anchorId}-email`} className="field-label">
              Email <span className="text-gold">*</span>
            </label>
            <div className="relative">
              <IconMail
                width={15}
                height={15}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-mute"
              />
              <input
                id={`${anchorId}-email`}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={values.email}
                onChange={(event) => update('email', event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? `${anchorId}-email-error` : undefined}
                className={`field pl-10 ${errors.email ? 'field-error' : ''}`}
              />
            </div>
            {errors.email ? (
              <p id={`${anchorId}-email-error`} className="mt-1.5 text-[0.75rem] text-red-600">
                {errors.email}
              </p>
            ) : null}
          </div>

          {/* Travellers */}
          <div>
            <label htmlFor={`${anchorId}-travellers`} className="field-label">
              Number of Travellers <span className="text-gold">*</span>
            </label>
            <div className="relative">
              <IconUsers
                width={15}
                height={15}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-mute"
              />
              <input
                id={`${anchorId}-travellers`}
                name="travellers"
                type="number"
                inputMode="numeric"
                min={1}
                max={20}
                step={1}
                value={values.travellers}
                onChange={(event) => update('travellers', event.target.value)}
                aria-invalid={Boolean(errors.travellers)}
                aria-describedby={errors.travellers ? `${anchorId}-travellers-error` : undefined}
                className={`field pl-10 ${errors.travellers ? 'field-error' : ''}`}
              />
            </div>
            {errors.travellers ? (
              <p id={`${anchorId}-travellers-error`} className="mt-1.5 text-[0.75rem] text-red-600">
                {errors.travellers}
              </p>
            ) : null}
          </div>

          {/* Travel date */}
          <div>
            <label htmlFor={`${anchorId}-preferredTravelDate`} className="field-label">
              Preferred Travel Date
            </label>
            <div className="relative">
              <IconCalendar
                width={15}
                height={15}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-mute"
              />
              <input
                id={`${anchorId}-preferredTravelDate`}
                name="preferredTravelDate"
                type="date"
                min={todayIso()}
                value={values.preferredTravelDate}
                onChange={(event) => update('preferredTravelDate', event.target.value)}
                aria-invalid={Boolean(errors.preferredTravelDate)}
                aria-describedby={`${anchorId}-date-hint${
                  errors.preferredTravelDate ? ` ${anchorId}-preferredTravelDate-error` : ''
                }`}
                className={`field pl-10 ${errors.preferredTravelDate ? 'field-error' : ''}`}
              />
            </div>
            {errors.preferredTravelDate ? (
              <p
                id={`${anchorId}-preferredTravelDate-error`}
                className="mt-1.5 text-[0.75rem] text-red-600"
              >
                {errors.preferredTravelDate}
              </p>
            ) : (
              <p id={`${anchorId}-date-hint`} className="mt-1.5 text-[0.75rem] text-ink-mute">
                Optional — leave blank if your dates are flexible.
              </p>
            )}
          </div>

          {/* Package */}
          <div>
            <label htmlFor={`${anchorId}-packageSlug`} className="field-label">
              Selected Package <span className="text-gold">*</span>
            </label>
            <select
              id={`${anchorId}-packageSlug`}
              name="packageSlug"
              value={values.packageSlug}
              onChange={(event) => update('packageSlug', event.target.value)}
              className="field"
            >
              <option value="">Not decided yet — please advise</option>
              {bookable.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name} · {item.durationLabel}
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-[0.75rem] text-ink-mute">
              Prices shown on the website are demo figures — we confirm the final price in writing.
            </p>
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor={`${anchorId}-message`} className="field-label">
            Message
          </label>
          <textarea
            id={`${anchorId}-message`}
            name="message"
            rows={5}
            maxLength={enquiryConfig.messageMaxLength}
            placeholder="Tell us about room preferences, group size, medical needs, or anything else we should know."
            value={values.message}
            onChange={(event) => update('message', event.target.value)}
            className="field resize-y"
          />
          <div className="mt-1.5 flex items-center justify-between gap-4">
            <p className="text-[0.75rem] text-ink-mute">Optional</p>
            <p className="text-[0.72rem] text-ink-mute">
              {values.message.length} / {enquiryConfig.messageMaxLength}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 border-t border-line-soft pt-7 sm:flex-row sm:items-center">
          <Button type="submit" variant="primary" size="lg">
            Submit Enquiry
            <IconArrowRight width={17} height={17} />
          </Button>
          <WhatsAppButton
            label="Send on WhatsApp"
            size="lg"
            message={decodeURIComponent(whatsappHref.split('?text=')[1] ?? '')}
          />
        </div>

        <ul className="flex flex-col gap-2.5 pt-1 text-[0.8rem] text-ink-mute sm:flex-row sm:gap-6">
          {[
            'No advance payment to enquire',
            'Reply within one working day',
            'Your details are not shared',
          ].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <IconCheck width={14} height={14} className="shrink-0 text-gold" />
              {item}
            </li>
          ))}
        </ul>

        {showWhatsAppPreview && values.fullName.trim().length > 0 ? (
          <div className="animate-fade-in rounded-lg border border-line-soft bg-ivory-soft p-5">
            <p className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold">
              <IconWhatsApp width={14} height={14} />
              WhatsApp message preview
            </p>
            <p className="mt-3 whitespace-pre-line text-[0.82rem] leading-[1.75] text-ink-soft">
              {decodeURIComponent(whatsappHref.split('?text=')[1] ?? '')}
            </p>
            <p className="mt-3 text-[0.72rem] text-ink-mute">
              {packageName}
              {travellers > 0 ? ` · ${travellers} traveller${travellers === 1 ? '' : 's'}` : ''}
              {values.preferredTravelDate
                ? ` · ${formatLongDate(values.preferredTravelDate)}`
                : ' · Flexible dates'}
            </p>
          </div>
        ) : null}
      </form>

      {selectedPackage ? (
        <p className="mt-7 border-t border-line-soft pt-5 text-[0.78rem] text-ink-mute">
          Prefer to skip the form?{' '}
          <a
            href={packageWhatsAppLink(selectedPackage.name, selectedPackage.slug)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-charcoal underline decoration-gold/50 underline-offset-4 transition-colors hover:text-gold"
          >
            Ask about {selectedPackage.name} directly on WhatsApp
          </a>
          .
        </p>
      ) : null}
    </div>
  );
}
