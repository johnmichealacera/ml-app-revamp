import { fetchCourses } from '@/app/lib/data';
import Form from '@/app/ui/internship/register-form';
import Breadcrumbs from '@/app/ui/registration/breadcrumbs';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Create Internship',
};
 
export default async function Page() {
  const courses = await fetchCourses();
  
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
      <Form courses={courses}/>
    </main>
  );
}