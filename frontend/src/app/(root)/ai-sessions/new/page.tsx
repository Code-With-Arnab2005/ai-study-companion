import PageWrapper from '@/components/PageWrapper';
import { Suspense } from 'react';
import ModeClient from './ModeClient';

export default function Page() {
  return (
    <PageWrapper>
      <Suspense fallback={<div>Loading...</div>}>
        <ModeClient />
      </Suspense>
    </PageWrapper>
  );
}