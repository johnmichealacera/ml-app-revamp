import Form from '@/app/ui/classes/create-form';
import Breadcrumbs from '@/app/ui/classes/breadcrumbs';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Create Announcements',
};
 
export default async function Page() {
 
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
      <Form />
    </main>
  );
}