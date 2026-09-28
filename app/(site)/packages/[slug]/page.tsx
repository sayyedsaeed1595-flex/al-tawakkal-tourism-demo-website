import type { Metadata } from 'next';

import { PackageDetailView } from '@/components/site/PackageDetailView';
import { allPackages, getPackageBySlug } from '@/data/packages';

/* Static export requires every dynamic route to be pre-rendered up front. */
export const dynamicParams = false;

export function generateStaticParams() {
  return allPackages.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getPackageBySlug(slug);

  if (!item) {
    return { title: 'Package not found', robots: { index: false, follow: false } };
  }

  return {
    title: item.name,
    description: `${item.name} — ${item.durationLabel} in Makkah and Madinah with ${item.hotelRatingLabel.toLowerCase()}, ${item.flight.toLowerCase()} and guided ziyarat.`,
    alternates: { canonical: `/packages/${item.slug}` },
    openGraph: {
      title: `${item.name} | Al-Tawakkal Tourism`,
      description: item.description.slice(0, 180),
    },
  };
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PackageDetailView slug={slug} />;
}
