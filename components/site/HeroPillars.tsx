import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { heroPillars, trustStats } from '@/lib/config';

const pillarIcons = [
  // 5 Star
  <svg key="star" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m12 3.6 2.5 5.1 5.6.8-4 3.9 1 5.6-5.1-2.7-5.1 2.7 1-5.6-4-3.9 5.6-.8Z" />
  </svg>,
  // Trust
  <svg key="shield" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3.5 19 6v6c0 4.2-2.9 7.4-7 8.5-4.1-1.1-7-4.3-7-8.5V6Z" />
    <path d="m9 12 2.2 2.2L15.2 10" />
  </svg>,
  // Accommodation
  <svg key="bed" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 18.5V7M3 12.5h18v6M3 18.5h18" />
    <path d="M7 12.5V10a1.5 1.5 0 0 1 1.5-1.5H16A1.5 1.5 0 0 1 17.5 10v2.5" />
    <circle cx="6" cy="9.6" r="1.6" />
  </svg>,
  // Ziyarat
  <svg key="compass" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="8.6" />
    <path d="m15.2 8.8-1.9 4.5-4.5 1.9 1.9-4.5Z" />
  </svg>,
];

/* ---------------------------------------------------------------------------
   The four pillars that sit directly beneath the hero.
   --------------------------------------------------------------------------- */
export function HeroPillars() {
  return (
    <section className="section-tight border-y border-line-soft bg-white" aria-label="What we arrange">
      <div className="container-page">
        <ul className="grid gap-px overflow-hidden rounded-lg border border-line-soft bg-line-soft sm:grid-cols-2 lg:grid-cols-4">
          {heroPillars.map((pillar, index) => (
            <li key={pillar.title} className="bg-white p-6 sm:p-7">
              <Reveal delay={index * 70}>
                <span className="flex h-11 w-11 items-center justify-center rounded-md border border-gold/25 bg-gold/[0.07] text-gold">
                  {pillarIcons[index]}
                </span>
                <h3 className="mt-5 font-display text-[1.08rem] leading-snug text-charcoal">
                  {pillar.title}
                </h3>
                <p className="mt-2.5 text-[0.86rem] leading-[1.7] text-ink-soft">
                  {pillar.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Trust / statistics band.
   --------------------------------------------------------------------------- */
export function TrustStats() {
  return (
    <section className="section-tight relative overflow-hidden bg-ivory-soft" aria-label="Service summary">
      <div
        className="absolute inset-0 opacity-[0.45] mask-fade-y"
        style={{
          backgroundImage: 'url(/images/pattern-geometric.svg)',
          backgroundSize: '150px 150px',
        }}
        aria-hidden="true"
      />
      <div className="container-page relative">
        <SectionHeading
          eyebrow="At a glance"
          title="Everything arranged around your comfort."
          lede="A quick summary of what a standard Al-Tawakkal Umrah booking covers."
          align="center"
          className="mx-auto max-w-2xl"
        />
        <dl className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {trustStats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 80}>
              <div className="group relative border-t border-line pt-6 text-center sm:text-left">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-[2.2rem] font-medium leading-none text-charcoal transition-colors duration-300 group-hover:text-gold sm:text-[2.5rem]">
                    {stat.value}
                  </span>
                  <span className="mt-3 block text-[0.92rem] font-medium text-charcoal">
                    {stat.label}
                  </span>
                  <span className="mt-1.5 block text-[0.8rem] leading-relaxed text-ink-mute">
                    {stat.detail}
                  </span>
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
