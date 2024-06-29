import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { CardsSkeleton, LatestInvoicesSkeleton } from '@/app/ui/skeletons';
import { Metadata } from 'next';
import CardWrapper from '@/app/ui/dashboard/cards';
import Announcements from '@/app/ui/dashboard/announcements';
 
export const metadata: Metadata = {
  title: 'Overview',
};
 
export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <br />
      <br />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* TODO: Think of what chart to add in here */}
        {/* <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense> */}
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <Announcements />
        </Suspense>
      </div>
    </main>
  );
}