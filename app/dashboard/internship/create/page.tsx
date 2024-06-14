import Form from '@/app/ui/internship/register-form';
import Breadcrumbs from '@/app/ui/registration/breadcrumbs';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Create Internship',
};
 
export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Internship', href: '/dashboard/internship' },
          {
            label: 'Create Internship',
            href: '/dashboard/internship/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}