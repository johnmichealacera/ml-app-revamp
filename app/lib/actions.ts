'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { auth, getUserdata, signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { getUser } from './data';

const HelpAppFormSchema = z.object({
  id: z.string(),
  personnelId: z.string({
    invalid_type_error: 'Please select a personnel.',
  }),
  subject: z.string({
    invalid_type_error: 'Please enter a subject.',
  }).min(10),
  description: z.string({
    invalid_type_error: 'Please enter the description.',
  }).min(20),
  date: z.string(),
});

// This is temporary until @types/react-dom is updated
export type State = {
  errors?: {
    personnelId?: string[];
    subject?: string[];
    description?: string[];
    status?: string[];
  };
  message?: string | null;
};


const CreateAnnouncement = HelpAppFormSchema.omit({ id: true, date: true });
export async function createAnnouncement(prevState: State, formData: FormData) {
  const userdata: any = await getUserdata();
  const validatedFields = CreateAnnouncement.safeParse({
    personnelId: userdata?.id,
    subject: formData.get('subject'),
    description: formData.get('description'),
  });
  
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Announcement.',
    };
  }
  // Prepare data for insertion into the database
  const { personnelId, subject, description } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];
  try {
    await sql`
      INSERT INTO announcements (personnel_id, subject, description, date)
      VALUES (${personnelId}, ${subject}, ${description}, ${date})
    `;

  } catch(error) {
    return { message: 'Database Error: Failed to Create Announcement.' };
  }
  revalidatePath('/dashboard/announcements');
  redirect('/dashboard/announcements');
}

const UpdateAnnouncement = HelpAppFormSchema.omit({ id: true, date: true });
export async function updateAnnouncement(id: string, prevState: State, formData: FormData) {
  const userdata: any = await getUserdata();
  const validatedFields = UpdateAnnouncement.safeParse({
    personnelId: userdata?.id,
    subject: formData.get('subject'),
    description: formData.get('description'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Announcement.',
    };
  }
  const { personnelId, subject, description } = validatedFields.data;

    try{
    await sql`
      UPDATE announcements
      SET personnel_id = ${userdata?.id}, subject = ${subject}, description = ${description}
      WHERE id = ${id}
    `;
  
  } catch(error) {
    return { message: 'Database Error: Failed to Update Announcement.' };
  }
  revalidatePath('/dashboard/announcements');
  redirect('/dashboard/announcements');
}

export async function deleteAnnouncement(id: string) {
  try {
    await sql`DELETE FROM announcements WHERE id = ${id}`;
  } catch(error) {
    return { message: 'Database Error: Failed to Delete Announcement.' };
  }
  revalidatePath('/dashboard/announcements');
}

export async function updateReport(id: string, prevState: State, formData: FormData) {
  const reportStatus = formData.get('status')?.toString();
  const session = await auth();
  let userdata;
  if (session?.user?.email) {
    userdata = await getUser(session?.user?.email);
  }

    try{
    await sql`
      UPDATE reports
      SET status = ${reportStatus}, personnel_id = ${userdata?.id}
      WHERE id = ${id}
    `;
  
  } catch(error) {
    return { message: 'Database Error: Failed to Update Report.' };
  }
  revalidatePath('/dashboard/reports');
  redirect('/dashboard/reports');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}