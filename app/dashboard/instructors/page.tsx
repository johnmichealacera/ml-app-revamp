import { fetchFilteredInstructors, fetchFilteredReports, fetchReportsPages } from '@/app/lib/data';
import { CreateInstructor } from '@/app/ui/classes/buttons';
import { lusitana } from '@/app/ui/fonts';
import Table from '@/app/ui/instructors/table';
import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Metadata } from 'next';
import { Suspense } from 'react';
 
export const metadata: Metadata = {
  title: 'Instructors',
};

export default async function Page({
  searchParams
}: {
  searchParams: {
    query: string,
    page: number
  }
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  // const totalPages = await fetchReportsPages(query);
  const instructors: any = await fetchFilteredInstructors(query, currentPage);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Instructors</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search instructors..." />
        <CreateInstructor />
      </div>
       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table instructors={instructors} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}