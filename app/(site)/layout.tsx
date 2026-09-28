import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';

/**
 * Public website chrome. The admin dashboard lives in a sibling route group
 * (`app/(admin)`) so it renders with its own layout instead of the site header
 * and footer.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
