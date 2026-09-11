import React from 'react';
import GenericContentManagerClient from './GenericContentManagerClient';
import { adminContentConfigs } from './adminContentConfig';

export function generateStaticParams() {
  return Object.keys(adminContentConfigs).map((contentType) => ({
    contentType,
  }));
}

export default function GenericContentManagerPage({
  params,
}: {
  params: { contentType: string };
}) {
  return <GenericContentManagerClient contentType={params.contentType} />;
}
