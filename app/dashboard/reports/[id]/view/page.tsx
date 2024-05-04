import Form from '@/app/ui/reports/view-form';
import Breadcrumbs from '@/app/ui/announcements/breadcrumbs';
import { fetchReportById } from '@/app/lib/data';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
 
export const metadata: Metadata = {
  title: 'View Report',
};
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params?.id || '';
  const [report] = await Promise.all([
    fetchReportById(id),
  ]);
  if (!report) {
    notFound();
  }
  
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Reports', href: '/dashboard/reports' },
          {
            label: 'View Report',
            href: `/dashboard/reports/${id}/view`,
            active: true,
          },
        ]}
      />
      <Form report={report} />
    </main>
  );
}