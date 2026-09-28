import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

/* Lucide-style 24×24 stroke icons, hand-trimmed for this project. */

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export function IconWhatsApp(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 21l1.65-4.6A8.4 8.4 0 1 1 8 19.4" />
      <path d="M8.6 8.4c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.5l.8 1.9c.1.3 0 .5-.1.7l-.4.5c-.1.2-.2.4 0 .7.5.9 1.2 1.6 2.1 2.1.3.1.5 0 .7-.1l.5-.5c.2-.2.4-.2.7-.1l1.9.9c.3.1.4.3.4.5v.5c0 .2 0 .5-.5.7-.7.3-1.6.4-2.5.1-1.2-.3-2.3-.9-3.2-1.8a8.7 8.7 0 0 1-2-3.4c-.2-.8-.1-1.6.2-2.3Z" />
    </svg>
  );
}

export function IconStar(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m12 3.6 2.5 5.1 5.6.8-4 3.9 1 5.6-5.1-2.7-5.1 2.7 1-5.6-4-3.9 5.6-.8Z" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m4.5 12.5 4.8 4.8L19.5 7" />
    </svg>
  );
}

export function IconCheckCircle(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.2 12.2 2.6 2.6 5-5.2" />
    </svg>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 4.5h3.2l1.6 4-2 1.3a11.5 11.5 0 0 0 5.4 5.4l1.3-2 4 1.6v3.2a1.6 1.6 0 0 1-1.7 1.6C10.2 19.2 4.8 13.8 4.5 7.2A1.6 1.6 0 0 1 4.5 4.5Z" />
    </svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m3.8 7 8.2 6 8.2-6" />
    </svg>
  );
}

export function IconMapPin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function IconClock(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.4V12l3 1.8" />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </svg>
  );
}

export function IconArrowUpRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7M8.6 7H17v8.4" />
    </svg>
  );
}

export function IconCalendar(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" />
    </svg>
  );
}

export function IconUsers(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9.5" cy="8.5" r="3.2" />
      <path d="M3.5 19.5c0-3 2.7-5 6-5s6 2 6 5" />
      <path d="M16 6.4a3.2 3.2 0 0 1 0 6.1M17.4 14.9c2 .6 3.6 2.2 3.6 4.6" />
    </svg>
  );
}

export function IconPlane(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M10.4 3.6a1.6 1.6 0 0 1 3.2 0v5l7 4v2.2l-7-2.2v4.3l2.4 1.9v1.6L12 19.5l-4 1.9v-1.6l2.4-1.9v-4.3l-7 2.2V13.6l7-4Z" />
    </svg>
  );
}

export function IconBed(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 18v-8m0 4h18m0 4v-6a3 3 0 0 0-3-3H9v5" />
      <circle cx="6.4" cy="11.4" r="1.9" />
    </svg>
  );
}

export function IconCar(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 16.5V12l2-5.2A2 2 0 0 1 7.4 5.5h9.2a2 2 0 0 1 1.9 1.3L20.5 12v4.5" />
      <path d="M3.5 12h17M6.5 16.5h2M15.5 16.5h2" />
      <circle cx="7" cy="16.6" r="1.4" />
      <circle cx="17" cy="16.6" r="1.4" />
    </svg>
  );
}

export function IconCompass(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="m15.2 8.8-1.9 4.5-4.5 1.9 1.9-4.5Z" />
    </svg>
  );
}

export function IconRoute(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="6" cy="18" r="2.4" />
      <circle cx="18" cy="6" r="2.4" />
      <path d="M8.4 18h5.1a3.5 3.5 0 0 0 0-7H10a3.5 3.5 0 0 1 0-7h5.4" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function IconPlus(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function IconMinus(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m6 9.5 6 6 6-6" />
    </svg>
  );
}

export function IconEdit(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 19.5h4l9.3-9.3a2.1 2.1 0 0 0-3-3L5.5 16.5Z" />
      <path d="m14.5 6.5 3 3" />
    </svg>
  );
}

export function IconTrash(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 7h15M9.5 7V5.2A1.2 1.2 0 0 1 10.7 4h2.6a1.2 1.2 0 0 1 1.2 1.2V7" />
      <path d="M6.5 7 7.4 19a1.6 1.6 0 0 0 1.6 1.5h6a1.6 1.6 0 0 0 1.6-1.5L17.5 7" />
      <path d="M10.5 11v5.5M13.5 11v5.5" />
    </svg>
  );
}

export function IconExternal(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14 4.5h5.5V10" />
      <path d="M19 5 11.5 12.5" />
      <path d="M18 14.5v4A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6h4" />
    </svg>
  );
}

export function IconLock(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4.5" y="10.5" width="15" height="9.5" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </svg>
  );
}

export function IconDashboard(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="3.5" width="7.5" height="7" rx="1.6" />
      <rect x="13" y="3.5" width="7.5" height="4.5" rx="1.6" />
      <rect x="13" y="10.5" width="7.5" height="10" rx="1.6" />
      <rect x="3.5" y="13" width="7.5" height="7.5" rx="1.6" />
    </svg>
  );
}

export function IconBox(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m12 3.5 8 4.2v8.6l-8 4.2-8-4.2V7.7Z" />
      <path d="m4 7.7 8 4.3 8-4.3M12 12v8.5" />
    </svg>
  );
}

export function IconInbox(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 13.5h4l1.4 2.6h6.2l1.4-2.6h4" />
      <path d="M5.6 5.2h12.8l2.1 8.3V18a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 18v-4.5Z" />
    </svg>
  );
}

export function IconBuilding(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 20.5V5.8a1.3 1.3 0 0 1 1-1.3l7-1.7a1.3 1.3 0 0 1 1.6 1.3v16.4" />
      <path d="M14 9.8h4.3a1.2 1.2 0 0 1 1.2 1.2v9.5M2.8 20.5h18.4" />
      <path d="M7.5 8.5h2.4M7.5 12h2.4M7.5 15.5h2.4" />
    </svg>
  );
}

export function IconSettings(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="2.8" />
      <path d="M12 3.5v2M12 18.5v2M4.9 7.8l1.7 1M17.4 15.2l1.7 1M4.9 16.2l1.7-1M17.4 8.8l1.7-1" />
    </svg>
  );
}

export function IconShield(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5 19 6v6c0 4.2-2.9 7.4-7 8.5-4.1-1.1-7-4.3-7-8.5V6Z" />
      <path d="m9 12 2.2 2.2L15.2 10" />
    </svg>
  );
}

export function IconSparkle(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4.5c.6 3.3 2.4 5.1 5.5 5.6-3.1.5-4.9 2.3-5.5 5.6-.6-3.3-2.4-5.1-5.5-5.6 3.1-.5 4.9-2.3 5.5-5.6Z" />
      <path d="M18.5 15.5c.3 1.6 1.1 2.4 2.5 2.7-1.4.3-2.2 1.1-2.5 2.6-.3-1.5-1.1-2.3-2.5-2.6 1.4-.3 2.2-1.1 2.5-2.7Z" />
    </svg>
  );
}

export function IconInfo(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 11v5.2M12 7.9h.01" />
    </svg>
  );
}

export function IconAlert(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.6v4.8M12 16.2h.01" />
    </svg>
  );
}

export function IconSearch(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="6.4" />
      <path d="m15.8 15.8 4 4" />
    </svg>
  );
}

export function IconLogOut(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14 5.5H6.5A1.5 1.5 0 0 0 5 7v10a1.5 1.5 0 0 0 1.5 1.5H14" />
      <path d="M17 8.5 20.5 12 17 15.5M20 12h-9" />
    </svg>
  );
}

export function IconDocument(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 3.5h7l5 5v12H6Z" />
      <path d="M13 3.5v5h5M9 13h6M9 16.5h4" />
    </svg>
  );
}

export function IconWallet(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 8.5A2 2 0 0 1 5.5 6.5h11a2 2 0 0 1 2 2v1.2" />
      <rect x="3.5" y="8.5" width="17" height="10.5" rx="2" />
      <path d="M20.5 12.5h-3.2a1.6 1.6 0 0 0 0 3.2h3.2" />
    </svg>
  );
}

export function IconBedDouble(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 18.5V7M3 12.5h18v6M3 18.5h18" />
      <path d="M7 12.5V10a1.5 1.5 0 0 1 1.5-1.5H16A1.5 1.5 0 0 1 17.5 10v2.5" />
      <circle cx="6" cy="9.6" r="1.6" />
    </svg>
  );
}

export function IconStarOutline(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m12 4.2 2.4 4.8 5.3.8-3.8 3.7.9 5.3-4.8-2.5-4.8 2.5.9-5.3-3.8-3.7 5.3-.8Z" />
    </svg>
  );
}
