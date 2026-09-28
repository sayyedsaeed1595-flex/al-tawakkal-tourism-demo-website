'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { IconClose, IconMenu, IconPhone } from '@/components/ui/Icons';
import { WhatsAppButton } from '@/components/ui/Button';
import { contactConfig, footerConfig, navigation, siteConfig } from '@/lib/config';

function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="31" stroke="currentColor" strokeWidth="1.4" opacity="0.35" />
      <g stroke="currentColor" strokeWidth="1.7" fill="none">
        <path d="M32 11 35.2 20.4 44.6 23.6 35.2 26.8 32 36.2 28.8 26.8 19.4 23.6 28.8 20.4Z" />
        <circle cx="32" cy="23.6" r="6.2" />
      </g>
      <path d="M15 46h34" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M21 52h22" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname() ?? '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent background scrolling while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      {/* Utility strip */}
      <div className="hidden border-b border-line-soft bg-ivory-soft lg:block">
        <div className="container-page flex h-10 items-center justify-between text-[0.74rem] text-ink-mute">
          <p className="tracking-[0.06em]">{siteConfig.tagline}</p>
          <div className="flex items-center gap-6">
            <a
              href={`tel:${contactConfig.phoneHref}`}
              className="flex items-center gap-1.5 transition-colors hover:text-gold"
            >
              <IconPhone width={13} height={13} />
              {contactConfig.phone}
            </a>
            <a
              href={contactConfig.emailHref}
              className="transition-colors hover:text-gold"
            >
              {contactConfig.email}
            </a>
            <span className="h-3 w-px bg-line" aria-hidden="true" />
            <Link href="/admin" className="transition-colors hover:text-gold">
              Dashboard Demo
            </Link>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ease-premium ${
          scrolled || open
            ? 'border-line-soft bg-ivory/95 shadow-[0_1px_24px_-18px_rgba(27,26,23,0.5)] backdrop-blur-[6px]'
            : 'border-transparent bg-ivory'
        }`}
      >
        <div className="container-page flex h-[68px] items-center justify-between gap-4 sm:h-[76px]">
          <Link href="/" className="flex items-center gap-3" aria-label={`${siteConfig.name} — home`}>
            <LogoMark className="h-9 w-9 text-charcoal sm:h-10 sm:w-10" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[1.06rem] font-semibold uppercase tracking-[0.2em] text-charcoal sm:text-[1.16rem]">
                {siteConfig.nameLine1}
              </span>
              <span className="mt-[3px] text-[0.6rem] font-medium uppercase tracking-[0.42em] text-gold sm:text-[0.65rem]">
                {siteConfig.nameLine2}
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {navigation.links.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative rounded px-3.5 py-2 text-[0.84rem] tracking-[0.02em] transition-colors duration-300 ${
                    active ? 'text-gold' : 'text-ink-soft hover:text-charcoal'
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-300 ease-premium ${
                      active ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2.5 lg:flex">
            <WhatsAppButton size="sm" label="WhatsApp" />
            <Link href="/contact#enquiry" className="btn-primary btn-sm">
              Enquire Now
            </Link>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-line text-charcoal transition-colors hover:border-gold/50 hover:text-gold lg:hidden"
          >
            {open ? <IconClose width={20} height={20} /> : <IconMenu width={20} height={20} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-navigation"
        className={`fixed inset-x-0 bottom-0 top-[68px] z-40 overflow-y-auto border-t border-line-soft bg-ivory transition-all duration-300 ease-premium sm:top-[76px] lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile" className="container-page flex flex-col gap-1 py-8">
          {navigation.links.map((link, index) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                tabIndex={open ? 0 : -1}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center justify-between border-b border-line-soft py-4 font-display text-[1.28rem] transition-colors ${
                  active ? 'text-gold' : 'text-charcoal hover:text-gold'
                }`}
                style={{
                  transitionDelay: open ? `${index * 45}ms` : '0ms',
                  opacity: open ? 1 : 0,
                  transform: open ? 'none' : 'translateY(6px)',
                  transition: 'opacity 320ms ease, transform 320ms ease, color 200ms ease',
                }}
              >
                {link.label}
                <span className="text-[0.7rem] tracking-[0.2em] text-ink-mute">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </Link>
            );
          })}

          <div className="mt-9 flex flex-col gap-3">
            <Link
              href="/contact#enquiry"
              tabIndex={open ? 0 : -1}
              className="btn-primary w-full"
            >
              Enquire Now
            </Link>
            <div className={open ? '' : 'pointer-events-none'}>
              <WhatsAppButton label="WhatsApp Us" className="w-full" />
            </div>
          </div>

          <div className="mt-10 space-y-2 border-t border-line-soft pt-7 text-[0.84rem] text-ink-soft">
            <a href={`tel:${contactConfig.phoneHref}`} className="block hover:text-gold">
              {contactConfig.phone}
            </a>
            <a href={contactConfig.emailHref} className="block hover:text-gold">
              {contactConfig.email}
            </a>
            <Link href="/admin" className="block hover:text-gold">
              Dashboard Demo
            </Link>
            <p className="pt-2 text-[0.76rem] leading-relaxed text-ink-mute">
              {footerConfig.disclaimer}
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}

export { LogoMark };
