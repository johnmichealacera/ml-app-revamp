import Form from '@/app/ui/profile/edit-form';
import Breadcrumbs from '@/app/ui/announcements/breadcrumbs';
import { fetchStudentById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Update Profile',
};
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params?.id || '';
  try {
    const [student] = await Promise.all([
      fetchStudentById(id),
    ]);
    if (!student) {
      notFound();
    }
    
    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Profile', href: '/dashboard/profile' },
            {
              label: 'Edit Profile',
              href: `/dashboard/profile/${id}/edit`,
              active: true,
            },
          ]}
        />
        <Form student={student} />
      </main>
    );
  } catch (e) {
    notFound();
  }
}