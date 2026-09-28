'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';

import {
  IconBox,
  IconBuilding,
  IconClose,
  IconDashboard,
  IconExternal,
  IconInbox,
  IconLock,
  IconLogOut,
  IconMenu,
  IconSettings,
} from '@/components/ui/Icons';
import { LogoMark } from '@/components/layout/Navbar';
import { adminConfig, siteConfig } from '@/lib/config';
import { useDemoStore } from '@/lib/demo-store';
import { initials } from '@/lib/format';

interface AdminNavItem {
  label: string;
  href: string;
  icon: (props: { width?: number; height?: number; className?: string }) => ReactNode;
  exact?: boolean;
}

export const adminNav: AdminNavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: IconDashboard, exact: true },
  { label: 'Packages', href: '/admin/packages', icon: IconBox },
  { label: 'Enquiries', href: '/admin/enquiries', icon: IconInbox },
  { label: 'Hotels', href: '/admin/hotels', icon: IconBuilding },
  { label: 'Settings', href: '/admin/settings', icon: IconSettings },
];

const SESSION_KEY = adminConfig.storageKey;

function isActive(pathname: string, href: string, exact?: boolean): boolean {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

/* ========================================================================== */
/*  Lock screen — clearly a demo, no real authentication                     */
/* ========================================================================== */

function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [email, setEmail] = useState<string>(adminConfig.demoEmail);
  const [password, setPassword] = useState<string>(adminConfig.demoPassword);
  const [error, setError] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.trim().length < 4) {
      setError('Enter the demo password to continue.');
      return;
    }
    onUnlock();
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-espresso px-5 py-16">
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: 'url(/images/pattern-geometric.svg)',
          backgroundSize: '200px 200px',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 opacity-[0.14]"
        style={{
          backgroundImage: 'url(/images/pattern-arches.svg)',
          backgroundSize: '220px 132px',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'repeat-x',
        }}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-[440px]">
        <div className="text-center">
          <LogoMark className="mx-auto h-12 w-12 text-cream" />
          <p className="mt-5 font-display text-[1.15rem] font-semibold uppercase tracking-[0.2em] text-cream">
            {siteConfig.nameLine1}
          </p>
          <p className="mt-1.5 text-[0.6rem] font-medium uppercase tracking-[0.42em] text-gold-soft">
            {siteConfig.nameLine2}
          </p>
        </div>

        <div className="mt-9 rounded-xl border border-white/12 bg-white/[0.04] p-8 shadow-panel sm:p-10">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-md border border-gold-soft/30 bg-gold-soft/10 text-gold-soft">
              <IconLock width={19} height={19} />
            </span>
            <div>
              <h1 className="font-display text-[1.2rem] text-cream">Dashboard Access</h1>
              <p className="text-[0.76rem] text-cream-soft/55">Al-Tawakkal Tourism · Admin</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="admin-email"
                className="mb-1.5 block text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-cream-soft/60"
              >
                Email address
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-md border border-white/15 bg-white/[0.06] px-3.5 py-2.5 text-[0.92rem] text-cream placeholder:text-cream-soft/35 focus:border-gold-soft/60 focus:outline-none focus:ring-2 focus:ring-gold-soft/20"
              />
            </div>
            <div>
              <label
                htmlFor="admin-password"
                className="mb-1.5 block text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-cream-soft/60"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-md border border-white/15 bg-white/[0.06] px-3.5 py-2.5 text-[0.92rem] text-cream placeholder:text-cream-soft/35 focus:border-gold-soft/60 focus:outline-none focus:ring-2 focus:ring-gold-soft/20"
              />
            </div>

            {error ? <p className="text-[0.78rem] text-red-300">{error}</p> : null}

            <button type="submit" className="btn-gold w-full">
              Enter Dashboard
            </button>
          </form>

          <div className="mt-7 rounded-md border border-white/12 bg-black/20 p-4">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold-soft">
              Demo credentials
            </p>
            <dl className="mt-3 space-y-1.5 text-[0.82rem] text-cream-soft/70">
              <div className="flex items-center justify-between gap-4">
                <dt>Email</dt>
                <dd className="font-medium text-cream">{adminConfig.demoEmail}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt>Password</dt>
                <dd className="font-medium text-cream">{adminConfig.demoPassword}</dd>
              </div>
            </dl>
            <p className="mt-3.5 text-[0.74rem] leading-relaxed text-cream-soft/50">
              This is a front-end demonstration. No real authentication is performed and nothing is
              sent to a server. The credentials above are pre-filled — press{' '}
              <span className="text-cream-soft/75">Enter Dashboard</span> to continue.
            </p>
          </div>
        </div>

        <div className="mt-7 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[0.8rem] text-cream-soft/60 transition-colors hover:text-gold-soft"
          >
            Back to website
            <IconExternal width={14} height={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/*  Admin shell                                                              */
/* ========================================================================== */

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname() ?? '/admin';
  const { counts } = useDemoStore();

  const badgeFor = (href: string) => {
    if (href === '/admin/packages') return counts.totalPackages;
    if (href === '/admin/enquiries') return counts.newEnquiries;
    return null;
  };

  return (
    <nav aria-label="Dashboard" className="flex flex-col gap-1 p-4">
      {adminNav.map((item) => {
        const active = isActive(pathname, item.href, item.exact);
        const badge = badgeFor(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
            className={`group flex items-center gap-3 rounded-md px-3.5 py-2.5 text-[0.87rem] transition-all duration-300 ease-premium ${
              active
                ? 'bg-charcoal text-ivory'
                : 'text-ink-soft hover:bg-ivory-soft hover:text-charcoal'
            }`}
          >
            <Icon
              width={17}
              height={17}
              className={active ? 'text-gold-soft' : 'text-ink-mute group-hover:text-gold'}
            />
            <span className="flex-1">{item.label}</span>
            {badge !== null && badge > 0 ? (
              <span
                className={`rounded-sm px-1.5 py-0.5 text-[0.68rem] font-semibold ${
                  active ? 'bg-gold-soft text-espresso' : 'bg-gold/12 text-gold'
                }`}
              >
                {badge}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminShell({ title, description, actions, children }: {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { resetDemoData } = useDemoStore();

  useEffect(() => {
    setAuthed(window.localStorage.getItem(SESSION_KEY) === 'active');
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  if (authed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory-soft">
        <p className="text-[0.85rem] text-ink-mute">Loading dashboard…</p>
      </div>
    );
  }

  if (!authed) {
    return (
      <LockScreen
        onUnlock={() => {
          window.localStorage.setItem(SESSION_KEY, 'active');
          setAuthed(true);
        }}
      />
    );
  }

  function signOut() {
    window.localStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  }

  return (
    <div className="min-h-screen bg-ivory-soft">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-line-soft bg-white">
        <div className="flex h-16 items-center justify-between gap-4 px-5 sm:px-7">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label={menuOpen ? 'Close dashboard menu' : 'Open dashboard menu'}
              aria-expanded={menuOpen}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-charcoal lg:hidden"
            >
              {menuOpen ? <IconClose width={18} height={18} /> : <IconMenu width={18} height={18} />}
            </button>
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-8 w-8 text-charcoal" />
              <span className="hidden flex-col leading-none sm:flex">
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-charcoal">
                  {siteConfig.nameLine1}
                </span>
                <span className="mt-0.5 text-[0.56rem] uppercase tracking-[0.34em] text-gold">
                  Admin Dashboard
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="hidden rounded-sm border border-gold/30 bg-gold/[0.07] px-2.5 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-gold sm:inline">
              Demo Mode
            </span>
            <Link
              href="/"
              className="hidden rounded-md border border-line px-3.5 py-2 text-[0.78rem] text-ink-soft transition-colors hover:border-gold/50 hover:text-charcoal sm:inline-flex sm:items-center sm:gap-1.5"
            >
              View Website
              <IconExternal width={14} height={14} />
            </Link>
            <button
              type="button"
              onClick={() => {
                resetDemoData();
              }}
              className="hidden rounded-md px-3 py-2 text-[0.76rem] text-ink-mute transition-colors hover:text-charcoal md:inline"
              title="Restore the original sample packages, hotels and enquiries"
            >
              Reset data
            </button>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-charcoal text-[0.72rem] font-semibold text-ivory">
              {initials('Demo Admin')}
            </span>
            <button
              type="button"
              onClick={signOut}
              className="flex h-9 items-center gap-1.5 rounded-md border border-line px-2.5 text-[0.76rem] text-ink-soft transition-colors hover:border-red-200 hover:text-red-700"
              aria-label="Sign out of the demo dashboard"
              title="Sign out"
            >
              <IconLogOut width={15} height={15} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-[248px] shrink-0 overflow-y-auto border-r border-line-soft bg-white lg:block">
          <SidebarNav />
          <div className="mx-4 mb-6 rounded-md border border-line-soft bg-ivory-soft p-4">
            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-gold">
              Demo environment
            </p>
            <p className="mt-2 text-[0.74rem] leading-relaxed text-ink-mute">
              Changes are saved in this browser only. Use “Reset data” to restore the original
              sample records.
            </p>
          </div>
        </aside>

        {/* Mobile drawer */}
        <div
          className={`fixed inset-0 top-16 z-30 lg:hidden ${
            menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
          aria-hidden={!menuOpen}
        >
          <div
            className={`absolute inset-0 bg-espresso/35 transition-opacity duration-300 ${
              menuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setMenuOpen(false)}
          />
          <div
            className={`absolute inset-y-0 left-0 w-[270px] overflow-y-auto bg-white transition-transform duration-300 ease-premium ${
              menuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <SidebarNav onNavigate={() => setMenuOpen(false)} />
          </div>
        </div>

        {/* Content */}
        <main id="main-content" className="min-w-0 flex-1">
          <div className="border-b border-line-soft bg-white px-5 py-7 sm:px-7 lg:px-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-gold">
                  Al-Tawakkal Tourism · Admin
                </p>
                <h1 className="mt-2 font-display text-[1.65rem] leading-tight text-charcoal sm:text-[2rem]">
                  {title}
                </h1>
                {description ? (
                  <p className="mt-2.5 max-w-2xl text-[0.88rem] leading-relaxed text-ink-soft">
                    {description}
                  </p>
                ) : null}
              </div>
              {actions ? <div className="flex flex-wrap gap-2.5">{actions}</div> : null}
            </div>
          </div>

          <div className="px-5 py-8 sm:px-7 lg:px-10 lg:py-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
