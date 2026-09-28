'use client';

import { useCallback, useId, useState, type ReactNode } from 'react';

import { IconMinus, IconPlus } from '@/components/ui/Icons';

export interface AccordionItemData {
  question: string;
  answer: ReactNode;
}

interface AccordionProps {
  items: AccordionItemData[];
  /** Rendered as 1-based numbers. Set to false for a plain list. */
  numbered?: boolean;
  defaultOpenIndex?: number | null;
  className?: string;
  itemClassName?: string;
}

export function Accordion({
  items,
  numbered = false,
  defaultOpenIndex = 0,
  className = '',
  itemClassName = '',
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const baseId = useId();

  const toggle = useCallback((index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  }, []);

  return (
    <div className={`divide-y divide-line-soft border-y border-line-soft ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-btn-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.question} className={`py-1 ${itemClassName}`}>
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="group flex w-full items-start gap-4 py-5 text-left transition-colors duration-300 hover:text-gold"
              >
                {numbered ? (
                  <span className="mt-0.5 hidden w-7 shrink-0 font-display text-lg text-gold/70 sm:block">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                ) : null}
                <span
                  className={`flex-1 font-display text-[1.06rem] leading-snug transition-colors duration-300 sm:text-[1.16rem] ${
                    isOpen ? 'text-charcoal' : 'text-charcoal group-hover:text-gold'
                  }`}
                >
                  {item.question}
                </span>
                <span
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ease-premium ${
                    isOpen
                      ? 'border-gold/40 bg-gold/10 text-gold'
                      : 'border-line text-ink-mute group-hover:border-gold/40 group-hover:text-gold'
                  }`}
                  aria-hidden="true"
                >
                  {isOpen ? <IconMinus width={14} height={14} /> : <IconPlus width={14} height={14} />}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-6 pr-10 sm:pb-7 sm:pr-14"
            >
              <div className="max-w-3xl text-[0.93rem] leading-[1.78] text-ink-soft">{item.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
