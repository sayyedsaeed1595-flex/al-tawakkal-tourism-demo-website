import Link from 'next/link';

import { LinkButton, WhatsAppButton } from '@/components/ui/Button';
import { Media } from '@/components/ui/Media';
import { IconArrowRight, IconStar } from '@/components/ui/Icons';
import { heroContent } from '@/lib/config';

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden pt-12 sm:pt-16 lg:pb-24 lg:pt-20">
      {/* Background: warm ivory with a faint geometric wash on the right */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ivory via-ivory to-ivory-soft"
        aria-hidden="true"
       />
      <div
        className="absolute -right-32 top-0 -z-10 h-[720px] w-[720px] opacity-40 mask-fade-radial"
        style={{
          backgroundImage: 'url(/images/pattern-geometric.svg)',
          backgroundSize: '200px 200px',
        }}
        aria-hidden="true"
       />

      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* ---------------- Copy ---------------- */}
          <div className="lg:col-span-6">
            <p className="eyebrow animate-fade-in">
              <span className="eyebrow-rule" aria-hidden="true"  />
              {heroContent.eyebrow}
            </p>

            <h1 className="display-1 mt-6 text-balance">{heroContent.title}</h1>

            <div className="rule-gold my-8 max-w-[220px]" aria-hidden="true"  />

            <p className="lede max-w-xl animate-fade-up" style={{ animationDelay: '80ms' }}>
              {heroContent.subtitle}
            </p>

            <div
              className="mt-9 flex flex-col gap-3 animate-fade-up sm:flex-row sm:items-center"
              style={{ animationDelay: '160ms' }}
            >
              <LinkButton href={heroContent.primaryCta.href} variant="primary" size="lg">
                {heroContent.primaryCta.label}
                <IconArrowRight width={17} height={17}  />
              </LinkButton>
              <WhatsAppButton label={heroContent.secondaryCta.label} size="lg"  />
            </div>

            <p
              className="mt-7 max-w-md animate-fade-up text-[0.82rem] leading-relaxed text-ink-mute"
              style={{ animationDelay: '220ms' }}
            >
              {heroContent.note}
            </p>
          </div>

          {/* ---------------- Visual ---------------- */}
          <div className="lg:col-span-6 lg:col-start-7">
            <figure className="relative animate-fade-in" style={{ animationDelay: '120ms' }}>
              <div
                className="absolute -inset-4 -z-10 rounded-[28px] bg-ivory-soft"
                aria-hidden="true"
               />
              <div className="overflow-hidden rounded-[22px] border border-line-soft bg-[#FBF6EC] shadow-panel">
                <Media
                  src="/images/kaaba-makkah.svg"
                  width={900}
                  height={1000}
                  alt="Illustration of the Kaaba within a cream coloured arcaded courtyard in Makkah"
                  className="block h-auto w-full"
                  loading="eager"
                  decoding="async"
                 />
              </div>

              <figcaption className="mt-5 flex items-center justify-between gap-4 px-1 text-[0.78rem] text-ink-mute">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true"  />
                  Makkah · Masjid al-Haram
                </span>
                <span className="hidden items-center gap-1.5 sm:flex">
                  <IconStar width={13} height={13} className="text-gold"  />
                  5 Star packages available
                </span>
              </figcaption>

              {/* Overlapping detail card */}
              <div className="absolute -bottom-6 left-4 hidden w-[248px] rounded-lg border border-line-soft bg-white p-5 shadow-card sm:block lg:-left-8">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold">
                  At a glance
                </p>
                <dl className="mt-3.5 space-y-2.5 text-[0.82rem]">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-ink-mute">Cities</dt>
                    <dd className="font-medium text-charcoal">Makkah & Madinah</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-ink-mute">Stay</dt>
                    <dd className="font-medium text-charcoal">Up to 12 nights</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-ink-mute">Support</dt>
                    <dd className="font-medium text-charcoal">Before & during</dd>
                  </div>
                </dl>
                <div className="mt-4 border-t border-line-soft pt-3.5">
                  <Link
                    href="/packages/luxury-umrah"
                    className="inline-flex items-center gap-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-charcoal transition-colors hover:text-gold"
                  >
                    View flagship package
                    <IconArrowRight width={15} height={15}  />
                  </Link>
                </div>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
