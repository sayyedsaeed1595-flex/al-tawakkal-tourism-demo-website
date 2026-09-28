import type { Metadata } from 'next';

import { CtaBand } from '@/components/site/CtaBand';
import { EnquiryForm } from '@/components/site/EnquiryForm';
import { PageHero } from '@/components/site/PageHero';
import { LinkButton, WhatsAppButton } from '@/components/ui/Button';
import {
  IconArrowUpRight,
  IconClock,
  IconMail,
  IconMapPin,
  IconPhone,
  IconWhatsApp,
} from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { contactConfig, siteConfig } from '@/lib/config';
import { generalWhatsAppLink } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact Al-Tawakkal Tourism — phone, WhatsApp, email, office address, business hours and an online enquiry form for your Umrah package.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description: 'Phone, WhatsApp, email, office address and business hours.',
  },
};

const contactCards = [
  {
    icon: <IconPhone width={19} height={19} />,
    label: 'Phone',
    value: contactConfig.phone,
    href: `tel:${contactConfig.phoneHref}`,
    note: 'Call during business hours for the quickest reply.',
  },
  {
    icon: <IconWhatsApp width={19} height={19} />,
    label: 'WhatsApp',
    value: contactConfig.whatsappNumber,
    href: generalWhatsAppLink(),
    note: 'Send your dates and group size and we will reply there.',
    external: true,
  },
  {
    icon: <IconMail width={19} height={19} />,
    label: 'Email',
    value: contactConfig.email,
    href: contactConfig.emailHref,
    note: 'Useful for detailed questions and group enquiries.',
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch. We reply quickly."
        lede="Call, WhatsApp or use the enquiry form — whichever is easiest. Share your travel date and number of travellers and we will come back with availability and a written quote."
        trail={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        artwork={{
          src: '/images/makkah-mountains.svg',
          alt: 'Layered mountains and arcades of Makkah in warm sand tones',
        }}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <LinkButton href="#enquiry" variant="primary" size="lg">
            Go to enquiry form
            <IconArrowUpRight width={17} height={17} />
          </LinkButton>
          <WhatsAppButton label="WhatsApp Us" size="lg" />
        </div>
      </PageHero>

      {/* ---------------- Contact details ---------------- */}
      <section className="section-tight" aria-labelledby="details-heading">
        <div className="container-page">
          <h2 id="details-heading" className="sr-only">
            Contact details
          </h2>

          <ul className="grid gap-px overflow-hidden rounded-lg border border-line-soft bg-line-soft md:grid-cols-3">
            {contactCards.map((card, index) => (
              <li key={card.label} className="bg-white p-7 sm:p-8">
                <Reveal delay={index * 80}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-md border border-gold/25 bg-gold/[0.07] text-gold">
                    {card.icon}
                  </span>
                  <p className="mt-5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold">
                    {card.label}
                  </p>
                  <a
                    href={card.href}
                    {...(card.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="mt-2 block break-all font-display text-[1.14rem] text-charcoal transition-colors hover:text-gold"
                  >
                    {card.value}
                  </a>
                  <p className="mt-3 text-[0.82rem] leading-relaxed text-ink-mute">{card.note}</p>
                </Reveal>
              </li>
            ))}
          </ul>

          {/* Address + hours */}
          <div className="mt-7 grid gap-7 lg:grid-cols-2">
            <Reveal>
              <div className="surface-card h-full p-7 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md border border-gold/25 bg-gold/[0.07] text-gold">
                    <IconMapPin width={18} height={18} />
                  </span>
                  <h3 className="font-display text-[1.16rem] text-charcoal">Office Address</h3>
                </div>
                <address className="mt-6 text-[0.9rem] not-italic leading-[1.85] text-ink-soft">
                  {contactConfig.addressLine1}
                  <br />
                  {contactConfig.addressLine2}
                  <br />
                  {contactConfig.addressCity}
                  <br />
                  {contactConfig.addressCountry}
                </address>
                <a
                  href={contactConfig.mapLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-charcoal transition-colors hover:text-gold"
                >
                  Open in Google Maps
                  <IconArrowUpRight width={15} height={15} />
                </a>
                <p className="mt-5 border-t border-line-soft pt-4 text-[0.76rem] text-ink-mute">
                  Placeholder address — replace with the real office location before launch.
                </p>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="surface-card h-full p-7 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md border border-gold/25 bg-gold/[0.07] text-gold">
                    <IconClock width={18} height={18} />
                  </span>
                  <h3 className="font-display text-[1.16rem] text-charcoal">Business Hours</h3>
                </div>
                <dl className="mt-6 divide-y divide-line-soft">
                  {contactConfig.businessHours.map((row) => (
                    <div
                      key={row.days}
                      className="flex items-center justify-between gap-4 py-3.5 text-[0.88rem]"
                    >
                      <dt className="text-ink-soft">{row.days}</dt>
                      <dd className="text-right font-medium text-charcoal">{row.time}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 border-t border-line-soft pt-4 text-[0.82rem] leading-relaxed text-ink-mute">
                  {contactConfig.hoursNote}
                </p>
                <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                  <WhatsAppButton
                    label="WhatsApp Us"
                    size="sm"
                    className="flex-1"
                    message={`Assalamu Alaikum, I would like to enquire about an Umrah package. Please share availability.`}
                  />
                  <a
                    href={`tel:${contactConfig.phoneHref}`}
                    className="btn-outline btn-sm flex-1"
                  >
                    Call the office
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Map placeholder ---------------- */}
      <section className="section-tight" aria-labelledby="map-heading">
        <div className="container-page">
          <div className="overflow-hidden rounded-lg border border-line-soft">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line-soft bg-ivory-soft px-6 py-4">
              <h2 id="map-heading" className="font-display text-[1.1rem] text-charcoal">
                Find our office
              </h2>
              <a
                href={contactConfig.mapLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[0.76rem] font-semibold uppercase tracking-[0.12em] text-charcoal transition-colors hover:text-gold"
              >
                Open in Google Maps
                <IconArrowUpRight width={14} height={14} />
              </a>
            </div>
            <div className="relative aspect-[16/7] w-full bg-cream-soft">
              <iframe
                title="Map showing the Al-Tawakkal Tourism office location (placeholder)"
                src={contactConfig.mapEmbedUrl}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
          <p className="mt-4 text-[0.78rem] text-ink-mute">
            Google Maps placeholder. Replace the embed URL in{' '}
            <code className="rounded-xs bg-ivory-soft px-1.5 py-0.5 text-[0.74rem] text-ink-soft">
              lib/config.ts
            </code>{' '}
            with the real location before launch.
          </p>
        </div>
      </section>

      {/* ---------------- Enquiry form ---------------- */}
      <section className="section border-t border-line-soft bg-ivory-soft" id="enquiry" aria-labelledby="enquiry-heading">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">
              <span className="eyebrow-rule" aria-hidden="true" />
              Enquiry form
            </p>
            <h2 id="enquiry-heading" className="display-2 text-balance">
              Send us your details.
            </h2>
            <p className="lede mt-5 text-pretty">
              Fill in the form and we will reply with current availability, the inclusions and a
              written quote. Prefer to talk? Use WhatsApp instead — the details you type here can be
              sent straight across.
            </p>

            <ul className="mt-9 space-y-4 border-t border-line-soft pt-8 text-[0.87rem] text-ink-soft">
              {[
                'Reply within one working day',
                'No advance payment to enquire',
                'Written quote with everything itemised',
                'Adjustments to dates and nights available',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <div className="surface-card mt-9 p-6">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold">
                Prefer WhatsApp?
              </p>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-ink-soft">
                Send us your travel date, number of travellers and preferred package. We will reply
                there.
              </p>
              <div className="mt-5">
                <WhatsAppButton
                  label="Enquire on WhatsApp"
                  size="sm"
                  message={`Assalamu Alaikum, I would like to enquire about an Umrah package with ${siteConfig.name}.`}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <EnquiryForm
              variant="panel"
              anchorId="contact-enquiry"
              title="Send your enquiry"
              description="All fields marked with an asterisk are required. You can also continue the conversation on WhatsApp with the same details."
            />
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Not sure which package?"
        title="Let us suggest the right one."
        description="Tell us your dates, group size and budget range. We will recommend an option and explain what is included before you commit."
        showContactDetails={false}
      />
    </>
  );
}
