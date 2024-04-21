import Form from '@/app/ui/reports/edit-form';
import Breadcrumbs from '@/app/ui/reports/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Update Reports',
};
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params?.id || '';
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);
  if (!invoice) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Reports', href: '/dashboard/reports' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/reports/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}