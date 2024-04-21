import Form from '@/app/ui/announcements/create-form';
import Breadcrumbs from '@/app/ui/announcements/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Announcements', href: '/dashboard/announcements' },
          {
            label: 'Create Invoice',
            href: '/dashboard/announcements/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}