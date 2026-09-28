import type { Metadata } from 'next';

import { EnquiriesView } from '@/components/admin/views/EnquiriesView';

export const metadata: Metadata = {
  title: 'Enquiries | Al-Tawakkal Tourism Admin',
  robots: { index: false, follow: false },
};

export default function AdminEnquiriesPage() {
  return <EnquiriesView />;
}
