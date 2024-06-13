import { fetchFilteredReports, fetchReportsPages, fetchSubjects, fetchSubjectsPages } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';
import Pagination from '@/app/ui/pagination';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import Table from '@/app/ui/subjects/table';
import { Metadata } from 'next';
import { Suspense } from 'react';
 
export const metadata: Metadata = {
  title: 'Subjects',
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
  const totalPages = await fetchSubjectsPages(query);
  const subjects: any = await fetchSubjects(query, currentPage);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Subjects</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
      </div>
       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table subjects={subjects} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}