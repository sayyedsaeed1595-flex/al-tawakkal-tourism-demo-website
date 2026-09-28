import { contactConfig, enquiryConfig, siteConfig } from '@/lib/config';
import type { Enquiry } from '@/lib/types';

/* ==========================================================================
   WHATSAPP INTEGRATION
   --------------------------------------------------------------------------
   Every CTA that should open WhatsApp routes through these helpers so the
   message format stays consistent and the number lives in exactly one place.
   ========================================================================== */

/** Normalised digits-only number, e.g. `919876543210`. */
export function whatsappNumber(): string {
  return contactConfig.whatsappNumber.replace(/\D/g, '');
}

function buildMessage(lines: Array<string | undefined | null>): string {
  return lines
    .filter((line): line is string => typeof line === 'string' && line.trim().length > 0)
    .join('\n')
    .trim();
}

/** Generic "hello" link used by nav / footer / hero buttons. */
export function generalWhatsAppLink(): string {
  const message = buildMessage([
    `Hello ${siteConfig.name},`,
    'I would like to know more about your Umrah packages.',
  ]);
  return `https://wa.me/${whatsappNumber()}?text=${encodeURIComponent(message)}`;
}

/** Link for a specific package, e.g. from a package card. */
export function packageWhatsAppLink(
  packageName: string,
  packageSlug: string,
): string {
  return `https://wa.me/${whatsappNumber()}?text=${encodeURIComponent(
    packageWhatsAppMessage(packageName, packageSlug),
  )}`;
}

/** Raw (un-encoded) message text for a specific package. */
export function packageWhatsAppMessage(
  packageName: string,
  packageSlug: string,
): string {
  return buildMessage([
    `Hello ${siteConfig.name},`,
    `I am interested in the "${packageName}" package.`,
    `Package reference: ${packageSlug}`,
    'Please share availability and pricing.',
  ]);
}

/** Link built from a submitted / partially filled enquiry form. */
export interface EnquiryWhatsAppPayload {
  fullName?: string;
  packageName?: string;
  travellers?: number | string;
  preferredTravelDate?: string;
  phone?: string;
  email?: string;
  message?: string;
}

/**
 * Builds a pre-filled WhatsApp message containing the customer name, selected
 * package, number of travellers and preferred travel date.
 */
export function enquiryWhatsAppLink(payload: EnquiryWhatsAppPayload): string {
  const travellers =
    payload.travellers === undefined || payload.travellers === ''
      ? undefined
      : String(payload.travellers);

  const message = buildMessage([
    `Assalamu Alaikum, I would like to enquire about an Umrah package.`,
    '',
    `Name: ${payload.fullName?.trim() || '—'}`,
    `Package: ${payload.packageName?.trim() || 'Not decided yet'}`,
    `Number of travellers: ${travellers || '—'}`,
    `Preferred travel date: ${payload.preferredTravelDate?.trim() || 'Flexible'}`,
    payload.phone?.trim() ? `Phone: ${payload.phone.trim()}` : undefined,
    payload.email?.trim() ? `Email: ${payload.email.trim()}` : undefined,
    payload.message?.trim() ? `\nAdditional details:\n${payload.message.trim()}` : undefined,
  ]);

  return `https://wa.me/${whatsappNumber()}?text=${encodeURIComponent(message)}`;
}

/** Link for a saved enquiry row in the admin dashboard. */
export function savedEnquiryWhatsAppLink(enquiry: Pick<
  Enquiry,
  'fullName' | 'packageName' | 'travellers' | 'preferredTravelDate' | 'phone'
>): string {
  return enquiryWhatsAppLink({
    fullName: enquiry.fullName,
    packageName: enquiry.packageName,
    travellers: enquiry.travellers,
    preferredTravelDate: enquiry.preferredTravelDate,
    phone: enquiry.phone,
  });
}

/** Plain-text preview of the WhatsApp message — used in the enquiry summary. */
export function enquiryWhatsAppPreview(payload: EnquiryWhatsAppPayload): string {
  return decodeURIComponent(
    enquiryWhatsAppLink(payload).split('?text=')[1] ?? '',
  );
}

export { enquiryConfig };
