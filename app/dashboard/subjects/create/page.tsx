import Breadcrumbs from '@/app/ui/classes/breadcrumbs';
import Form from '@/app/ui/subjects/create-form';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Create Announcements',
};
 
export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Subjects', href: '/dashboard/subjects' },
          {
            label: 'Create Subject',
            href: '/dashboard/subjects/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}