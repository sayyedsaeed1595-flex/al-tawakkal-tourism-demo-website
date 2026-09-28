'use client';

import { useMemo, useState } from 'react';

import { Accordion } from '@/components/ui/Accordion';
import { LinkButton } from '@/components/ui/Button';
import { IconArrowRight, IconWhatsApp } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { faqCategories, faqs, type FaqCategoryId } from '@/data/faqs';
import { packageWhatsAppLink } from '@/lib/whatsapp';

interface FaqSectionProps {
  /** Show the category filter tabs — used on the full FAQ page. */
  showFilters?: boolean;
  limit?: number;
  showCta?: boolean;
}

export function FaqSection({ showFilters = true, limit, showCta = true }: FaqSectionProps) {
  const [category, setCategory] = useState<FaqCategoryId>('all');

  const items = useMemo(() => {
    const filtered =
      category === 'all' ? faqs : faqs.filter((item) => item.category === category);
    return limit ? filtered.slice(0, limit) : filtered;
  }, [category, limit]);

  return (
    <section className="section" id="faq" aria-labelledby="faq-heading">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Left column */}
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Frequently asked"
              title={<span id="faq-heading">Questions people ask us most.</span>}
              lede="If your question is not answered here, send us a message and we will reply directly."
            />

            {showFilters ? (
              <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter questions by topic">
                {faqCategories.map((item) => {
                  const active = category === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCategory(item.id)}
                      aria-pressed={active}
                      className={`rounded-md border px-3.5 py-2 text-[0.78rem] font-medium transition-all duration-300 ease-premium ${
                        active
                          ? 'border-charcoal bg-charcoal text-ivory'
                          : 'border-line bg-white text-ink-soft hover:border-gold/50 hover:text-charcoal'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            ) : null}

            {showCta ? (
              <div className="mt-9 hidden rounded-lg border border-line-soft bg-ivory-soft p-6 lg:block">
                <p className="font-display text-[1.1rem] leading-snug text-charcoal">
                  Still deciding?
                </p>
                <p className="mt-2.5 text-[0.86rem] leading-[1.7] text-ink-soft">
                  Ask us directly and we will suggest the option that fits your dates and budget.
                </p>
                <div className="mt-5 flex flex-col gap-2.5">
                  <LinkButton href="/contact#enquiry" variant="primary" size="sm">
                    Send an Enquiry
                    <IconArrowRight width={15} height={15} />
                  </LinkButton>
                  <a
                    href={packageWhatsAppLink('5 Star Luxury Umrah', 'luxury-umrah')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp btn-sm"
                  >
                    <IconWhatsApp width={15} height={15} />
                    Ask on WhatsApp
                  </a>
                </div>
              </div>
            ) : null}
          </div>

          {/* Right column: accordion */}
          <div className="lg:col-span-8">
            <Reveal>
              <Accordion
                key={category}
                items={items.map((item) => ({ question: item.question, answer: item.answer }))}
                defaultOpenIndex={0}
              />
            </Reveal>

            <p className="mt-7 text-[0.82rem] text-ink-mute">
              Showing {items.length} of {faqs.length} questions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
