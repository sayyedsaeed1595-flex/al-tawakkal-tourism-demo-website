import type { ElementType, ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: 'left' | 'center';
  as?: ElementType;
  className?: string;
  /** Rendered opposite the heading — usually a link or a small note. */
  action?: ReactNode;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'left',
  as: Heading = 'h2',
  className = '',
  action,
  id,
}: SectionHeadingProps) {
  const centred = align === 'center';

  return (
    <div
      className={[
        'flex flex-col gap-5',
        centred ? 'items-center text-center' : 'items-start',
        action ? 'md:flex-row md:items-end md:justify-between md:gap-10' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={centred ? 'max-w-2xl' : 'max-w-2xl'}>
        {eyebrow ? (
          <p className="eyebrow mb-4">
            <span className="eyebrow-rule" aria-hidden="true" />
            {eyebrow}
          </p>
        ) : null}
        <Heading id={id} className="display-2 text-balance">
          {title}
        </Heading>
        {lede ? (
          <p className="lede mt-5 text-pretty max-w-xl mx-auto text-center md:text-left">
            {lede}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
