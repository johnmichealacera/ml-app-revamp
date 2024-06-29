import Breadcrumbs from '@/app/ui/registration/breadcrumbs';
import { Metadata } from 'next';
import { fetchCourses } from '@/app/lib/data';
import Form from '@/app/ui/instructors/register-form';
 
export const metadata: Metadata = {
  title: 'Create Trainer',
};
 
export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Trainers', href: '/dashboard/trainers' },
          {
            label: 'Create Trainer',
            href: '/dashboard/trainers/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}