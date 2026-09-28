import Link from 'next/link';

import { WhatsAppButton } from '@/components/ui/Button';
import { IconClock, IconMail, IconMapPin, IconPhone } from '@/components/ui/Icons';
import { LogoMark } from '@/components/layout/Navbar';
import { contactConfig, footerConfig, siteConfig } from '@/lib/config';

export function Footer() {
  const year = 2026;

  return (
    <footer className="relative overflow-hidden bg-espresso text-cream-soft">
      {/* Subtle geometric texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'url(/images/pattern-geometric.svg)',
          backgroundSize: '190px 190px',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/25 to-transparent"
        aria-hidden="true"
      />

      <div className="relative">
        {/* Call to action strip */}
        <div className="border-b border-white/10">
          <div className="container-page flex flex-col items-center gap-6 py-12 text-center md:flex-row md:justify-between md:text-left lg:py-14">
            <div className="max-w-xl">
              <p className="eyebrow mb-3 text-gold-soft/80">Ready when you are</p>
              <h2 className="font-display text-[1.6rem] leading-snug text-cream sm:text-[2rem]">
                Let us plan your Umrah journey with you.
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/contact#enquiry" className="btn-gold">
                Enquire Now
              </Link>
              <WhatsAppButton variant="outline-light" label="WhatsApp Us" />
            </div>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="container-page grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-16">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <LogoMark className="h-11 w-11 text-cream" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-[1.1rem] font-semibold uppercase tracking-[0.2em] text-cream">
                  {siteConfig.nameLine1}
                </span>
                <span className="mt-[3px] text-[0.62rem] font-medium uppercase tracking-[0.42em] text-gold-soft">
                  {siteConfig.nameLine2}
                </span>
              </span>
            </div>
            <p className="mt-6 max-w-sm text-[0.9rem] leading-[1.8] text-cream-soft/70">
              {siteConfig.shortDescription} Travel dates, hotels and ziyarat planned around
              what matters to you.
            </p>
            <div className="mt-7">
              <WhatsAppButton label="Chat on WhatsApp" variant="whatsapp-light" />
            </div>
          </div>

          <nav aria-label="Quick links" className="lg:col-span-2">
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold-soft">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3 text-[0.9rem]">
              {footerConfig.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream-soft/75 transition-colors duration-200 hover:text-gold-soft"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Support" className="lg:col-span-2">
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold-soft">
              Enquiries
            </h3>
            <ul className="mt-5 space-y-3 text-[0.9rem]">
              {footerConfig.supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-cream-soft/75 transition-colors duration-200 hover:text-gold-soft"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold-soft">
              Contact
            </h3>
            <ul className="mt-5 space-y-4 text-[0.9rem] text-cream-soft/75">
              <li className="flex gap-3">
                <IconPhone width={16} height={16} className="mt-0.5 shrink-0 text-gold-soft/70" />
                <a
                  href={`tel:${contactConfig.phoneHref}`}
                  className="transition-colors hover:text-gold-soft"
                >
                  {contactConfig.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <IconMail width={16} height={16} className="mt-0.5 shrink-0 text-gold-soft/70" />
                <a
                  href={contactConfig.emailHref}
                  className="break-all transition-colors hover:text-gold-soft"
                >
                  {contactConfig.email}
                </a>
              </li>
              <li className="flex gap-3">
                <IconMapPin width={16} height={16} className="mt-0.5 shrink-0 text-gold-soft/70" />
                <span className="leading-relaxed">
                  {contactConfig.addressLine1}
                  <br />
                  {contactConfig.addressLine2}
                  <br />
                  {contactConfig.addressCity}
                </span>
              </li>
              <li className="flex gap-3">
                <IconClock width={16} height={16} className="mt-0.5 shrink-0 text-gold-soft/70" />
                <span className="leading-relaxed">
                  Mon – Sat: 10:00 AM – 7:30 PM
                  <br />
                  Sunday: 11:00 AM – 5:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="container-page flex flex-col gap-4 py-7 text-[0.78rem] text-cream-soft/55 md:flex-row md:items-center md:justify-between md:gap-8">
            <p>
              © {year} {footerConfig.copyright}
            </p>
            <p className="max-w-xl leading-relaxed md:text-right">
              {footerConfig.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
