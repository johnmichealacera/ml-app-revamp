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
          { label: 'Trainers', href: '/dashboard/trainers' },
          {
            label: 'Edit Trainers',
            href: `/dashboard/trainers/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form instructor={instructor} />
    </main>
  );
}