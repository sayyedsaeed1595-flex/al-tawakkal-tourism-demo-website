import type { Metadata } from 'next';

import { PackagesView } from '@/components/admin/views/PackagesView';

export const metadata: Metadata = {
  title: 'Packages | Al-Tawakkal Tourism Admin',
  robots: { index: false, follow: false },
};

export default function AdminPackagesPage() {
  return <PackagesView />;
}
