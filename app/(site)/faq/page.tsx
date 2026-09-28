import type { Metadata } from 'next';

import { CtaBand } from '@/components/site/CtaBand';
import { FaqSection } from '@/components/site/FaqSection';
import { PageHero } from '@/components/site/PageHero';
import { LinkButton, WhatsAppButton } from '@/components/ui/Button';
import { IconArrowRight } from '@/components/ui/Icons';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { faqs } from '@/data/faqs';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Answers to common questions about Umrah packages from Al-Tawakkal Tourism — what is included, how many nights, flights, transport, documents and booking changes.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: `FAQ | ${siteConfig.name}`,
    description: 'Answers to the questions we are asked most often about Umrah travel.',
  },
};

const topics = [
  {
    title: 'What is included',
    points: [
      'Return air travel as per the confirmed itinerary',
      'Hotel accommodation in both cities with breakfast',
      'Airport and intercity ground transfers',
      'Guided ziyarat in Makkah and Madinah',
    ],
  },
  {
    title: 'What is not included',
    points: [
      'Visa and permit charges and government fees',
      'Meals other than the included breakfast',
      'Optional excursions and entry tickets',
      'Personal expenses, insurance and gratuities',
    ],
  },
  {
    title: 'Before you travel',
    points: [
      'A valid passport with sufficient validity',
      'Passport-size photographs',
      'A document checklist shared before payment',
      'Clearance to travel, if applicable to your circumstances',
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Help Centre"
        title="Frequently asked questions."
        lede="The questions we are asked most often about Umrah travel — what is included, how the itinerary works, which documents are needed and how bookings are handled."
        trail={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]}
        artwork={{
          src: '/images/pattern-arches.svg',
          alt: '',
        }}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <LinkButton href="#all-questions" variant="primary" size="lg">
            View all questions
            <IconArrowRight width={17} height={17} />
          </LinkButton>
          <WhatsAppButton
            label="Ask on WhatsApp"
            size="lg"
            message={`Assalamu Alaikum, I have a question about your Umrah packages that I could not find on the FAQ page.`}
          />
        </div>
      </PageHero>

      {/* ---------------- Quick reference ---------------- */}
      <section className="section-tight" aria-labelledby="quick-heading">
        <div className="container-page">
          <h2 id="quick-heading" className="sr-only">
            Quick reference
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {topics.map((topic, index) => (
              <Reveal key={topic.title} delay={index * 80}>
                <div className="surface-card h-full p-7">
                  <h3 className="font-display text-[1.12rem] text-charcoal">{topic.title}</h3>
                  <ul className="mt-5 space-y-3">
                    {topic.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-[0.85rem] leading-[1.7] text-ink-soft"
                      >
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold"
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 border-t border-line-soft pt-4 text-[0.74rem] text-ink-mute">
                    Subject to the inclusions listed on each package page.
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Filterable FAQ ---------------- */}
      <section className="section-tight" id="all-questions">
        <FaqSection />
      </section>

      {/* ---------------- Static copy of every question (also good for SEO) ---------------- */}
      <section className="section border-t border-line-soft bg-ivory-soft" aria-labelledby="everything-heading">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              as="h2"
              eyebrow="Everything at once"
              title={<span id="everything-heading">All {faqs.length} questions, in order.</span>}
              lede="A complete list for reference — useful if you want to read through everything before getting in touch."
            />
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <Accordion
                numbered
                items={faqs.map((item) => ({ question: item.question, answer: item.answer }))}
              />
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Question not answered?"
        title="Just ask us directly."
        description="Send a message with your question and we will reply with a clear answer. There is no obligation and no minimum booking."
      />
    </>
  );
}
