import type { ReactNode } from 'react';

import { IconChevronDown } from '@/components/ui/Icons';
import { Media } from '@/components/ui/Media';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  lede?: ReactNode;
  /** Small breadcrumb-style trail above the title. */
  trail?: Array<{ label: string; href?: string }>;
  /** Decorative artwork shown on large screens. */
  artwork?: { src: string; alt: string };
  children?: ReactNode;
}

export function PageHero({ eyebrow, title, lede, trail, artwork, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line-soft bg-ivory-soft">
      <div
        className="absolute -left-20 -top-24 -z-10 h-[460px] w-[460px] opacity-40 mask-fade-radial"
        style={{
          backgroundImage: 'url(/images/pattern-geometric.svg)',
          backgroundSize: '150px 150px',
        }}
        aria-hidden="true"
       />

      <div className="container-page">
        <div className="grid gap-10 py-14 lg:grid-cols-12 lg:items-center lg:gap-14 lg:py-20">
          <div className={artwork ? 'lg:col-span-7' : 'lg:col-span-9'}>
            {trail && trail.length > 0 ? (
              <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex flex-wrap items-center gap-1.5 text-[0.76rem] text-ink-mute">
                  {trail.map((crumb, index) => (
                    <li key={crumb.label} className="flex items-center gap-1.5">
                      {index > 0 ? (
                        <IconChevronDown
                          width={12}
                          height={12}
                          className="-rotate-90 text-ink-mute/60"
                         />
                      ) : null}
                      {crumb.href && index < trail.length - 1 ? (
                        <a href={crumb.href} className="transition-colors hover:text-gold">
                          {crumb.label}
                        </a>
                      ) : (
                        <span className="text-ink-soft">{crumb.label}</span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}

            {eyebrow ? (
              <p className="eyebrow mb-4">
                <span className="eyebrow-rule" aria-hidden="true"  />
                {eyebrow}
              </p>
            ) : null}

            <h1 className="display-2 max-w-3xl text-balance">{title}</h1>

            {lede ? <p className="lede mt-6 max-w-2xl text-pretty">{lede}</p> : null}

            {children ? <div className="mt-9">{children}</div> : null}
          </div>

          {artwork ? (
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-[18px] border border-line-soft bg-[#FBF6EC] shadow-card">
                <Media
                  src={artwork.src}
                  width={1200}
                  height={420}
                  alt={artwork.alt}
                  className="block h-auto w-full"
                  priority
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
