import Form from '@/app/ui/reports/create-form';
import Breadcrumbs from '@/app/ui/reports/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Create Announcements',
};
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Announcements', href: '/dashboard/announcements' },
          {
            label: 'Create Announcement',
            href: '/dashboard/announcements/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}