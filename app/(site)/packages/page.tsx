import type { Metadata } from 'next';

import { CtaBand } from '@/components/site/CtaBand';
import { FaqSection } from '@/components/site/FaqSection';
import { PageHero } from '@/components/site/PageHero';
import { PackagesCatalogue } from '@/components/site/PackagesCatalogue';
import { LinkButton, WhatsAppButton } from '@/components/ui/Button';
import { IconArrowRight } from '@/components/ui/Icons';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Umrah Packages',
  description:
    'Browse Umrah packages from Al-Tawakkal Tourism — economy, premium and five-star options covering Makkah and Madinah with flights, accommodation, transfers and ziyarat.',
  alternates: { canonical: '/packages' },
  openGraph: {
    title: `Umrah Packages | ${siteConfig.name}`,
    description:
      'Three clearly structured Umrah options, each listing exactly what is and is not included.',
  },
};

export default function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Umrah Packages"
        title="Umrah packages with nothing hidden."
        lede="Three options, from a straightforward eight-night stay to a full twelve-night itinerary. Each page lists the hotels, flight, transport, ziyarat, inclusions and exclusions in full — so you can compare before you enquire."
        trail={[{ label: 'Home', href: '/' }, { label: 'Umrah Packages' }]}
        artwork={{
          src: '/images/makkah-mountains.svg',
          alt: 'Layered mountains and arcades of Makkah in warm sand tones',
        }}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <LinkButton href="#all-packages" variant="primary" size="lg">
            See all packages
            <IconArrowRight width={17} height={17} />
          </LinkButton>
          <WhatsAppButton
            label="Ask on WhatsApp"
            size="lg"
            message={`Assalamu Alaikum, I would like help choosing between the Umrah packages listed on ${siteConfig.name}.`}
          />
        </div>
      </PageHero>

      <section className="section" id="all-packages" aria-labelledby="all-packages-heading">
        <div className="container-page">
          <SectionHeading
            as="h2"
            eyebrow="Compare"
            title={<span id="all-packages-heading">Every option, side by side.</span>}
            lede="Nights, hotel category, flights, transport and ziyarat for each package. Prices are per person and are confirmed in writing before you book."
          />
          <PackagesCatalogue />
        </div>
      </section>

      <FaqSection showFilters={false} limit={6} />
      <CtaBand
        eyebrow="Need help choosing?"
        title="Tell us your dates and budget."
        description="We will suggest the package that fits your situation — including adjustments to the number of nights in each city."
      />
    </>
  );
}
