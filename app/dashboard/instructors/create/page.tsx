import Breadcrumbs from '@/app/ui/registration/breadcrumbs';
import { Metadata } from 'next';
import { fetchCourses } from '@/app/lib/data';
import Form from '@/app/ui/instructors/register-form';
 
export const metadata: Metadata = {
  title: 'Create Instructor',
};
 
export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Instructors', href: '/dashboard/instructors' },
          {
            label: 'Create Instructor',
            href: '/dashboard/instructors/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}