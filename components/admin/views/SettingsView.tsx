'use client';

import { useState, type FormEvent } from 'react';

import { AdminShell } from '@/components/admin/AdminShell';
import { Button, LinkButton, WhatsAppButton } from '@/components/ui/Button';
import {
  IconAlert,
  IconCheck,
  IconClock,
  IconMail,
  IconMapPin,
  IconPhone,
  IconSettings,
  IconShield,
  IconWhatsApp,
} from '@/components/ui/Icons';
import { contactConfig, enquiryConfig, heroContent } from '@/lib/config';
import { useDemoStore } from '@/lib/demo-store';
import { whatsappNumber } from '@/lib/whatsapp';

export function SettingsView() {
  const { counts, resetDemoData } = useDemoStore();
  const [saved, setSaved] = useState(false);
  const [email, setEmail] = useState<string>(contactConfig.email);
  const [phone, setPhone] = useState<string>(contactConfig.phone);
  const [whatsapp, setWhatsapp] = useState<string>(whatsappNumber());

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3200);
  }

  return (
    <AdminShell
      title="Settings"
      description="Business contact details, WhatsApp number and demonstration data controls."
    >
      <div className="grid gap-6 xl:grid-cols-12">
        {/* Business details */}
        <section className="xl:col-span-7" aria-labelledby="business-heading">
          <div className="rounded-lg border border-line-soft bg-white p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-md border border-gold/25 bg-gold/[0.07] text-gold">
                <IconSettings width={18} height={18} />
              </span>
              <div>
                <h2 id="business-heading" className="font-display text-[1.16rem] text-charcoal">
                  Business details
                </h2>
                <p className="text-[0.78rem] text-ink-mute">Shown across the website and WhatsApp links</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-5">
              <div>
                <label className="field-label" htmlFor="settings-phone">
                  Office phone
                </label>
                <div className="relative">
                  <IconPhone
                    width={15}
                    height={15}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-mute"
                  />
                  <input
                    id="settings-phone"
                    className="field pl-10"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="field-label" htmlFor="settings-email">
                  Business email
                </label>
                <div className="relative">
                  <IconMail
                    width={15}
                    height={15}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-mute"
                  />
                  <input
                    id="settings-email"
                    type="email"
                    className="field pl-10"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="field-label" htmlFor="settings-whatsapp">
                  WhatsApp number
                </label>
                <div className="relative">
                  <IconWhatsApp
                    width={15}
                    height={15}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-mute"
                  />
                  <input
                    id="settings-whatsapp"
                    className="field pl-10"
                    value={whatsapp}
                    onChange={(event) => setWhatsapp(event.target.value.replace(/\D/g, ''))}
                  />
                </div>
                <p className="mt-1.5 text-[0.72rem] text-ink-mute">
                  International format, digits only — for example 919876543210.
                </p>
              </div>

              <div>
                <label className="field-label" htmlFor="settings-address">
                  Office address
                </label>
                <div className="relative">
                  <IconMapPin
                    width={15}
                    height={15}
                    className="pointer-events-none absolute left-3.5 top-1.5 text-ink-mute"
                  />
                  <textarea
                    id="settings-address"
                    className="field resize-y pl-10"
                    rows={3}
                    defaultValue={`${contactConfig.addressLine1}\n${contactConfig.addressLine2}\n${contactConfig.addressCity}`}
                  />
                </div>
              </div>

              <div className="border-t border-line-soft pt-5">
                <p className="field-label">Business hours</p>
                <ul className="mt-2 divide-y divide-line-soft">
                  {contactConfig.businessHours.map((row) => (
                    <li
                      key={row.days}
                      className="flex items-center justify-between gap-4 py-2.5 text-[0.85rem]"
                    >
                      <span className="flex items-center gap-2 text-ink-soft">
                        <IconClock width={14} height={14} className="text-ink-mute" />
                        {row.days}
                      </span>
                      <span className="font-medium text-charcoal">{row.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center gap-3 border-t border-line-soft pt-5">
                <Button type="submit" size="sm">
                  <IconCheck width={15} height={15} />
                  Save changes
                </Button>
                {saved ? (
                  <span className="flex items-center gap-1.5 text-[0.8rem] text-emerald-700">
                    <IconCheck width={14} height={14} />
                    Saved for this demo session
                  </span>
                ) : (
                  <span className="text-[0.76rem] text-ink-mute">
                    Saved values are held in this demo only. Update{' '}
                    <code className="rounded-xs bg-ivory-soft px-1.5 py-0.5 text-[0.72rem]">lib/config.ts</code>{' '}
                    to make them permanent.
                  </span>
                )}
              </div>
            </form>
          </div>
        </section>

        {/* Side panels */}
        <div className="space-y-6 xl:col-span-5">
          <div className="rounded-lg border border-line-soft bg-white p-7">
            <h2 className="font-display text-[1.1rem] text-charcoal">WhatsApp link preview</h2>
            <p className="mt-2 text-[0.8rem] leading-relaxed text-ink-soft">
              Every WhatsApp button on the website uses this number. Test the generated message
              before going live.
            </p>
            <div className="mt-5 rounded-md border border-line-soft bg-ivory-soft p-4">
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-gold">
                Number
              </p>
              <p className="mt-1.5 font-mono text-[0.85rem] text-charcoal">+{whatsappNumber()}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <WhatsAppButton label="Open WhatsApp" size="sm" />
              <LinkButton href="/packages" variant="outline" size="sm">
                Test from a package
              </LinkButton>
            </div>
          </div>

          <div className="rounded-lg border border-line-soft bg-white p-7">
            <h2 className="font-display text-[1.1rem] text-charcoal">Demo data</h2>
            <p className="mt-2 text-[0.8rem] leading-relaxed text-ink-soft">
              Everything in this dashboard is stored in your browser. Restoring the sample data
              brings back the original packages, hotels and enquiries.
            </p>
            <dl className="mt-5 space-y-2.5 text-[0.84rem]">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-ink-mute">Packages</dt>
                <dd className="font-medium text-charcoal">{counts.totalPackages}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-ink-mute">Enquiries</dt>
                <dd className="font-medium text-charcoal">{counts.totalEnquiries}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-ink-mute">Enquiry storage key</dt>
                <dd className="font-mono text-[0.76rem] text-ink-soft">{enquiryConfig.storageKey}</dd>
              </div>
            </dl>
            <Button
              type="button"
              variant="danger"
              size="sm"
              className="mt-5"
              onClick={resetDemoData}
            >
              Restore sample data
            </Button>
          </div>

          <div className="rounded-lg border border-line-soft bg-ivory-soft p-7">
            <p className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold">
              <IconShield width={14} height={14} />
              Demo notice
            </p>
            <p className="mt-3 text-[0.82rem] leading-relaxed text-ink-soft">
              This dashboard demonstrates the control panel included in the website package. It has
              no real authentication and no server database. Before launch it would be connected to
              a secure backend with proper sign-in and role-based access.
            </p>
            <p className="mt-4 border-t border-line-soft pt-4 text-[0.8rem] leading-relaxed text-ink-soft">
              <strong className="font-medium text-charcoal">Hero headline:</strong>{' '}
              “{heroContent.title}”
            </p>
          </div>
        </div>
      </div>

      <p className="mt-8 flex items-start gap-2.5 border-t border-line-soft pt-6 text-[0.78rem] leading-relaxed text-ink-mute">
        <IconAlert width={15} height={15} className="mt-0.5 shrink-0" />
        <span>
          Fields showing placeholder values (office address, phone, email and the WhatsApp number)
          must be replaced with the real business details before the website is published.
        </span>
      </p>
    </AdminShell>
  );
}
