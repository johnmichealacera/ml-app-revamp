import { fetchFilteredInstructors, fetchInstructorsPages } from '@/app/lib/data';
import { CreateInstructor } from '@/app/ui/classes/buttons';
import { lusitana } from '@/app/ui/fonts';
import Table from '@/app/ui/instructors/table';
import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { getBasicUserdata } from '@/auth';
import { Metadata } from 'next';
import { Suspense } from 'react';
 
export const metadata: Metadata = {
  title: 'Trainers',
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
  const instructors: any = await fetchFilteredInstructors(query, currentPage);
  const totalPages = await fetchInstructorsPages(query);
  const userdata: any = await getBasicUserdata();
  const isUserAdmin = userdata?.role === 'administrator';

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Trainers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search trainers..." />
        {isUserAdmin && <CreateInstructor />}
      </div>
       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table instructors={instructors} isUserAdmin={isUserAdmin}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}