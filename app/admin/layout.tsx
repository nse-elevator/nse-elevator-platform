import React from 'react';
import type { Metadata } from 'next';
import AdminLayoutClient from './AdminLayoutClient';

export const metadata: Metadata = {
  title: {
    template: '%s | NSE SMART Admin Console',
    default: 'Admin Control Center | NSE – New Sahyadri Elevator',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
