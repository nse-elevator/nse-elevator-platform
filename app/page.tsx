import React from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ElevatorCabLayout } from '../components/ElevatorCabLayout';
import { HeroFloor } from '../components/home/HeroFloor';
import { ServicesFloor } from '../components/home/ServicesFloor';
import { GlobalFooter } from '../components/GlobalFooter';

const IndustriesFloor = dynamic(
  () => import('../components/home/IndustriesFloor').then((mod) => mod.IndustriesFloor),
  { ssr: true }
);
const ServiceAreasFloor = dynamic(
  () => import('../components/home/ServiceAreasFloor').then((mod) => mod.ServiceAreasFloor),
  { ssr: true }
);
const CaseStudiesFloor = dynamic(
  () => import('../components/home/CaseStudiesFloor').then((mod) => mod.CaseStudiesFloor),
  { ssr: true }
);
const AboutFloor = dynamic(
  () => import('../components/home/AboutFloor').then((mod) => mod.AboutFloor),
  { ssr: true }
);
const ContactFloor = dynamic(
  () => import('../components/home/ContactFloor').then((mod) => mod.ContactFloor),
  { ssr: true }
);

const ScrollDepthTracker = dynamic(
  () => import('../components/ScrollDepthTracker').then((mod) => mod.ScrollDepthTracker),
  { ssr: false }
);

export const metadata: Metadata = {
  title: 'NSE – New Sahyadri Elevator | Lift Maintenance, AMC & Repair in Navi Mumbai & Pune',
  description:
    'Trusted partner for high-rise elevator operations — maintenance, repairs, modernization for residential societies and commercial complexes at ~30% lower cost than OEM direct. Call/WhatsApp +91 90110 96990.',
  keywords: [
    'elevator AMC Navi Mumbai',
    'lift repair Pune',
    'emergency elevator breakdown',
    'Schindler lift repair',
    'KONE elevator AMC',
    'elevator safety audit Pune',
  ],
};

export default function HomePage() {
  return (
    <>
      <ScrollDepthTracker />
      <ElevatorCabLayout>
        <HeroFloor />
        <ServicesFloor />
        <IndustriesFloor />
        <ServiceAreasFloor />
        <CaseStudiesFloor />
        <AboutFloor />
        <ContactFloor />
        <GlobalFooter />
      </ElevatorCabLayout>
    </>
  );
}
