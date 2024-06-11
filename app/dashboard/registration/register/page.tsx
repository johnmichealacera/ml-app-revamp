import Form from '@/app/ui/registration/register-form';
import Breadcrumbs from '@/app/ui/registration/breadcrumbs';
import { Metadata } from 'next';
import { fetchCourses } from '@/app/lib/data';
 
export const metadata: Metadata = {
  title: 'Register Student',
};
 
export default async function Page() {
  const courses = await fetchCourses();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Registration', href: '/dashboard/registration' },
          {
            label: 'Register Student',
            href: '/dashboard/registration/register',
            active: true,
          },
        ]}
      />
      <Form courses={courses}/>
    </main>
  );
}