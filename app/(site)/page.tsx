import type { Metadata } from 'next';

import { CtaBand } from '@/components/site/CtaBand';
import { FaqSection } from '@/components/site/FaqSection';
import { HeroSection } from '@/components/site/Hero';
import { HeroPillars, TrustStats } from '@/components/site/HeroPillars';
import {
  FeaturedPackages,
  JourneySteps,
  WhyChooseUs,
} from '@/components/site/HomeSections';
import { EnquiryForm } from '@/components/site/EnquiryForm';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} — ${siteConfig.tagline}` },
  description: siteConfig.shortDescription,
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HeroPillars />
      <TrustStats />
      <FeaturedPackages />
      <JourneySteps />
      <WhyChooseUs />
      <FaqSection limit={6} />
      <CtaBand />

      {/* Inline enquiry so the home page is a complete conversion path. */}
      <section className="section" id="enquiry" aria-labelledby="home-enquiry-heading">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">
              <span className="eyebrow-rule" aria-hidden="true" />
              Start here
            </p>
            <h2 id="home-enquiry-heading" className="display-2 text-balance">
              Ready when you are.
            </h2>
            <p className="lede mt-5 text-pretty">
              Tell us your dates and how many people are travelling. We will reply with the
              available options and a written quote.
            </p>
            <ul className="mt-9 space-y-4 border-t border-line-soft pt-8 text-[0.88rem] text-ink-soft">
              {[
                'No advance payment needed to enquire',
                'Hotel options shared before you decide',
                'Written quote with everything itemised',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-8">
            <EnquiryForm variant="panel" anchorId="home-enquiry" />
          </div>
        </div>
      </section>
    </>
  );
}
