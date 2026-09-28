import type { Metadata } from 'next';

import { DashboardView } from '@/components/admin/views/DashboardView';

export const metadata: Metadata = {
  title: 'Dashboard | Al-Tawakkal Tourism Admin',
  description:
    'Demo administration dashboard for Al-Tawakkal Tourism — packages, enquiries, hotels and settings.',
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  return <DashboardView />;
}
