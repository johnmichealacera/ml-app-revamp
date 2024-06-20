import Breadcrumbs from '@/app/ui/classes/breadcrumbs';
import { fetchInstructorById } from '@/app/lib/data';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Form from '@/app/ui/instructors/edit-form';
 
export const metadata: Metadata = {
  title: 'View Report',
};
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params?.id || '';
  const [instructor] = await Promise.all([
    fetchInstructorById(id),
  ]);
  if (!instructor) {
    notFound();
  }
  
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Instructors', href: '/dashboard/instructors' },
          {
            label: 'Edit Instructor',
            href: `/dashboard/instructors/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form instructor={instructor} />
    </main>
  );
}