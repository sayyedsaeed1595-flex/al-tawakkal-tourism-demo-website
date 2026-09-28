import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

import { generalWhatsAppLink, whatsappNumber } from '@/lib/whatsapp';

export type ButtonVariant =
  | 'primary'
  | 'gold'
  | 'outline'
  | 'outline-light'
  | 'ghost'
  | 'whatsapp'
  | 'whatsapp-light'
  | 'danger';

export type ButtonSize = 'sm' | 'md' | 'lg';

const variantClass: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  gold: 'btn-gold',
  outline: 'btn-outline',
  'outline-light': 'btn-outline-light',
  ghost: 'btn-ghost',
  whatsapp: 'btn-whatsapp',
  'whatsapp-light': 'btn-whatsapp-light',
  danger: 'btn-danger',
};

const sizeClass: Record<ButtonSize, string> = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
};

function classes(variant: ButtonVariant, size: ButtonSize, className?: string) {
  return [variantClass[variant], sizeClass[size], className].filter(Boolean).join(' ');
}

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  /** Renders the WhatsApp glyph before the label. */
  withWhatsAppIcon?: boolean;
}

function WhatsAppGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.9.53 3.68 1.46 5.2L2 22l5.08-1.6a9.8 9.8 0 0 0 4.96 1.32h.01c5.43 0 9.84-4.4 9.84-9.84S17.47 2 12.04 2Zm0 17.98h-.01a8.2 8.2 0 0 1-4.15-1.13l-.3-.18-3.08.97.99-3-.2-.31a8.13 8.13 0 0 1-1.25-4.33c0-4.5 3.66-8.16 8.17-8.16a8.16 8.16 0 0 1 8.16 8.17c0 4.5-3.66 8.17-8.17 8.17Zm4.49-6.11c-.25-.13-1.46-.72-1.68-.8-.23-.08-.4-.13-.56.12-.16.25-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.04-.39-1.98-1.23-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.22.25-.85.84-.85 2.04 0 1.2.87 2.36.99 2.52.12.17 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    href?: undefined;
  };

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  withWhatsAppIcon,
  ...rest
}: ButtonProps) {
  return (
    <button className={classes(variant, size, className)} {...rest}>
      {withWhatsAppIcon ? <WhatsAppGlyph /> : null}
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------- */

type LinkButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children' | 'href'> & {
    href: string;
  };

export function LinkButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  withWhatsAppIcon,
  href,
  ...rest
}: LinkButtonProps) {
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);
  const resolvedClasses = classes(variant, size, className);

  if (isExternal) {
    return (
      <a
        href={href}
        className={resolvedClasses}
        {...(href.startsWith('http')
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        {...rest}
      >
        {withWhatsAppIcon ? <WhatsAppGlyph /> : null}
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={resolvedClasses} {...rest}>
      {withWhatsAppIcon ? <WhatsAppGlyph /> : null}
      {children}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */

interface WhatsAppButtonProps {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Overrides the default "hello" message. */
  message?: string;
  title?: string;
}

/**
 * Every WhatsApp CTA in the project funnels through this component, so the
 * number and message format only ever come from `lib/config.ts`.
 */
export function WhatsAppButton({
  label = 'WhatsApp Us',
  variant = 'whatsapp',
  size = 'md',
  className,
  message,
  title = 'Chat with Al-Tawakkal Tourism on WhatsApp',
}: WhatsAppButtonProps) {
  const href = message
    ? `https://wa.me/${whatsappNumber()}?text=${encodeURIComponent(message)}`
    : generalWhatsAppLink();

  return (
    <a
      href={href}
      className={classes(variant, size, className)}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
    >
      <WhatsAppGlyph />
      {label}
    </a>
  );
}
