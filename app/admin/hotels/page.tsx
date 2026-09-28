import type { Metadata } from 'next';

import { HotelsView } from '@/components/admin/views/HotelsView';

export const metadata: Metadata = {
  title: 'Hotels | Al-Tawakkal Tourism Admin',
  robots: { index: false, follow: false },
};

export default function AdminHotelsPage() {
  return <HotelsView />;
}
