import Breadcrumbs from '@/app/ui/classes/breadcrumbs';
import { fetchCourses, fetchInternshipById } from '@/app/lib/data';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Form from '@/app/ui/internship/edit-form';
 
export const metadata: Metadata = {
  title: 'Edit Internship',
};
 
export default async function Page({ params }: { params: { id: string } }) {
  const courses = await fetchCourses();

  const id = params?.id || '';
  const [internship] = await Promise.all([
    fetchInternshipById(id),
  ]);
  if (!internship) {
    notFound();
  }
  
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Internship', href: '/dashboard/internship' },
          {
            label: 'Edit Internship',
            href: `/dashboard/internship/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form internship={internship} courses={courses}/>
    </main>
  );
}