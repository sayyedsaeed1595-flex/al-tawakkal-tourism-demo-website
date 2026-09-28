'use client';

/* ==========================================================================
   DEMO DATA STORE
   --------------------------------------------------------------------------
   A single client-side store that powers the public enquiry flow and the whole
   admin dashboard. It is seeded from ./data and persisted to localStorage so
   the demo behaves like a real application across page navigations and
   refreshes.

   In production this is where a real API would be plugged in: replace the
   `readStorage` / `writeStorage` helpers with fetch calls and every screen
   keeps working unchanged.
   ========================================================================== */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { seedEnquiries } from '@/data/enquiries';
import { hotels as seedHotels } from '@/data/hotels';
import { allPackages as seedPackages } from '@/data/packages';
import { enquiryConfig } from '@/lib/config';
import { todayIso } from '@/lib/format';
import type { Enquiry, EnquiryStatus, Hotel, PackageStatus, UmrahPackage } from '@/lib/types';

const STORAGE_KEYS = {
  packages: 'att-packages-v1',
  hotels: 'att-hotels-v1',
  enquiries: enquiryConfig.storageKey,
} as const;

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode / quota) — the demo still works in memory */
  }
}

export type PackageInput = Omit<UmrahPackage, 'slug'> & { slug?: string };

export interface EnquiryInput {
  fullName: string;
  phone: string;
  email: string;
  travellers: number;
  preferredTravelDate: string;
  packageSlug: string;
  packageName: string;
  message: string;
  source: Enquiry['source'];
}

interface DemoStoreValue {
  hydrated: boolean;
  packages: UmrahPackage[];
  hotels: Hotel[];
  enquiries: Enquiry[];
  counts: {
    totalPackages: number;
    activePackages: number;
    totalEnquiries: number;
    newEnquiries: number;
    pendingEnquiries: number;
    confirmedEnquiries: number;
  };
  addPackage: (input: PackageInput) => UmrahPackage;
  updatePackage: (slug: string, patch: Partial<UmrahPackage>) => void;
  deletePackage: (slug: string) => void;
  updateHotel: (id: string, patch: Partial<Hotel>) => void;
  addEnquiry: (input: EnquiryInput) => Enquiry;
  updateEnquiryStatus: (id: string, status: EnquiryStatus) => void;
  deleteEnquiry: (id: string) => void;
  resetDemoData: () => void;
}

const DemoStoreContext = createContext<DemoStoreValue | null>(null);

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function makeId(prefix: string): string {
  const random = Math.random().toString(36).slice(2, 7);
  return `${prefix}-${Date.now().toString(36)}${random}`;
}

export function DemoStoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [packages, setPackages] = useState<UmrahPackage[]>(seedPackages);
  const [hotels, setHotels] = useState<Hotel[]>(seedHotels);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(seedEnquiries);

  // Load any previously saved demo state, then mark the store as ready.
  useEffect(() => {
    setPackages(readStorage(STORAGE_KEYS.packages, seedPackages));
    setHotels(readStorage(STORAGE_KEYS.hotels, seedHotels));
    setEnquiries(readStorage(STORAGE_KEYS.enquiries, seedEnquiries));
    setHydrated(true);
  }, []);

  // Persist changes.
  useEffect(() => {
    if (!hydrated) return;
    writeStorage(STORAGE_KEYS.packages, packages);
  }, [packages, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    writeStorage(STORAGE_KEYS.hotels, hotels);
  }, [hotels, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    writeStorage(STORAGE_KEYS.enquiries, enquiries);
  }, [enquiries, hydrated]);

  const addPackage = useCallback(
    (input: PackageInput): UmrahPackage => {
      const baseSlug = slugify(input.slug?.trim() || input.name) || 'package';
      let slug = baseSlug;
      let suffix = 2;
      while (packages.some((item) => item.slug === slug)) {
        slug = `${baseSlug}-${suffix}`;
        suffix += 1;
      }
      const created: UmrahPackage = { ...input, slug };
      setPackages((current) => [created, ...current]);
      return created;
    },
    [packages],
  );

  const updatePackage = useCallback((slug: string, patch: Partial<UmrahPackage>) => {
    setPackages((current) =>
      current.map((item) => (item.slug === slug ? { ...item, ...patch } : item)),
    );
  }, []);

  const deletePackage = useCallback((slug: string) => {
    setPackages((current) => current.filter((item) => item.slug !== slug));
  }, []);

  const updateHotel = useCallback((id: string, patch: Partial<Hotel>) => {
    setHotels((current) =>
      current.map((hotel) => (hotel.id === id ? { ...hotel, ...patch } : hotel)),
    );
  }, []);

  const addEnquiry = useCallback((input: EnquiryInput): Enquiry => {
    const created: Enquiry = {
      id: makeId('enq'),
      fullName: input.fullName.trim(),
      phone: input.phone.trim(),
      email: input.email.trim(),
      travellers: Number(input.travellers) || 1,
      preferredTravelDate: input.preferredTravelDate,
      packageSlug: input.packageSlug,
      packageName: input.packageName,
      message: input.message.trim(),
      status: 'new',
      createdAt: todayIso(),
      source: input.source,
    };
    setEnquiries((current) => [created, ...current]);
    return created;
  }, []);

  const updateEnquiryStatus = useCallback((id: string, status: EnquiryStatus) => {
    setEnquiries((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item)),
    );
  }, []);

  const deleteEnquiry = useCallback((id: string) => {
    setEnquiries((current) => current.filter((item) => item.id !== id));
  }, []);

  const resetDemoData = useCallback(() => {
    setPackages(seedPackages);
    setHotels(seedHotels);
    setEnquiries(seedEnquiries);
    if (typeof window !== 'undefined') {
      Object.values(STORAGE_KEYS).forEach((key) => window.localStorage.removeItem(key));
    }
  }, []);

  const counts = useMemo(
    () => ({
      totalPackages: packages.length,
      activePackages: packages.filter((item) => item.status === 'active').length,
      totalEnquiries: enquiries.length,
      newEnquiries: enquiries.filter((item) => item.status === 'new').length,
      pendingEnquiries: enquiries.filter((item) => item.status === 'contacted').length,
      confirmedEnquiries: enquiries.filter((item) => item.status === 'confirmed').length,
    }),
    [packages, enquiries],
  );

  const value = useMemo<DemoStoreValue>(
    () => ({
      hydrated,
      packages,
      hotels,
      enquiries,
      counts,
      addPackage,
      updatePackage,
      deletePackage,
      updateHotel,
      addEnquiry,
      updateEnquiryStatus,
      deleteEnquiry,
      resetDemoData,
    }),
    [
      hydrated,
      packages,
      hotels,
      enquiries,
      counts,
      addPackage,
      updatePackage,
      deletePackage,
      updateHotel,
      addEnquiry,
      updateEnquiryStatus,
      deleteEnquiry,
      resetDemoData,
    ],
  );

  return <DemoStoreContext.Provider value={value}>{children}</DemoStoreContext.Provider>;
}

export function useDemoStore(): DemoStoreValue {
  const context = useContext(DemoStoreContext);
  if (!context) {
    throw new Error('useDemoStore must be used inside <DemoStoreProvider>.');
  }
  return context;
}

export const packageStatusLabels: Record<PackageStatus, string> = {
  active: 'Active',
  draft: 'Draft',
  archived: 'Archived',
};

export const packageStatusOptions: Array<{ value: PackageStatus; label: string }> = [
  { value: 'active', label: 'Active' },
  { value: 'draft', label: 'Draft' },
  { value: 'archived', label: 'Archived' },
];
