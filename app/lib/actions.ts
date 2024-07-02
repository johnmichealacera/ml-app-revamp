'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { auth, getUserdata, signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { getUser } from './data';
const bcrypt = require('bcrypt');

const ChangePasswordFormSchema = z.object({
  password: z.string({
    invalid_type_error: 'Please enter password.',
  }),
  confirmPassword: z.string({
    invalid_type_error: 'Please confirm password.',
  }),
});

const ChangePassword = ChangePasswordFormSchema;
export async function changePassword(userId: string, prevState: any, formData: FormData) {
  const userdata: any = await getUserdata();
  const validatedFields = ChangePassword.safeParse({
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });
  
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Change Password.',
    };
  }
  // Prepare data for insertion into the database
  const { password, confirmPassword } = validatedFields.data;
  if (password !== confirmPassword) {
    return {
      errors: 'Password do not match',
      message: 'Password does not match. Failed to change password.',
    };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await sql`
      UPDATE users SET password = ${hashedPassword} where id=${userId}
    `;

  } catch(error) {
    return { message: 'Database Error: Failed to Update Password.' };
  }
  revalidatePath('/dashboard/internship');
  redirect('/dashboard/internship');
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

export async function createUser(name: string, email:string, password: string, role: string) {
  const userdata: any = await getUserdata();
  if (userdata?.email === email) {
    return {
      errors: 'Error',
      message: 'Email already created. Failed to Create User.',
    };
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await sql`
      INSERT INTO users (name, email, password, role)
      VALUES (${name}, ${email}, ${hashedPassword}, ${role})
    `;

  } catch(error) {
    return { message: 'Database Error: Failed to Create Announcement.' };
  }
  revalidatePath('/dashboard/announcements');
  redirect('/dashboard/announcements');
}

const StudentFormSchema = z.object({
  courseId: z.string({
    invalid_type_error: 'No course selected.',
  }),
  firstName: z.string({
    invalid_type_error: 'Please enter a first name.',
  }),
  middleName: z.string({
    invalid_type_error: 'Please enter a middle name.',
  }),
  lastName: z.string({
    invalid_type_error: 'Please enter a last name.',
  }),
  suffix: z.string({
    invalid_type_error: 'Please enter a suffix.',
  }),
  gender: z.string({
    invalid_type_error: 'Please select gender.',
  }),
  civilStatus: z.string({
    invalid_type_error: 'Please enter civil status.',
  }),
  birthday: z.string({
    invalid_type_error: 'Please select birthday.',
  }),
  birthPlace: z.string({
    invalid_type_error: 'Please enter birth place.',
  }),
  nationality: z.string({
    invalid_type_error: 'Please enter nationality.',
  }),
  religion: z.string({
    invalid_type_error: 'Please enter religion.',
  }),
  ethnicity: z.string({
    invalid_type_error: 'Please enter ethnicity.',
  }),
  email: z.string({
    invalid_type_error: 'Please enter email.',
  }).min(6),
  facebook: z.string({
    invalid_type_error: 'Please enter facebook account.',
  }),
  skype: z.string({
    invalid_type_error: 'Please enter skype account.',
  }),
  zoom: z.string({
    invalid_type_error: 'Please enter zoom account.',
  }),
});
const StudentFormSchemaWithoutCourse = z.object({
  firstName: z.string({
    invalid_type_error: 'Please enter a first name.',
  }),
  middleName: z.string({
    invalid_type_error: 'Please enter a middle name.',
  }),
  lastName: z.string({
    invalid_type_error: 'Please enter a last name.',
  }),
  suffix: z.string({
    invalid_type_error: 'Please enter a suffix.',
  }),
  gender: z.string({
    invalid_type_error: 'Please select gender.',
  }),
  civilStatus: z.string({
    invalid_type_error: 'Please enter civil status.',
  }),
  birthday: z.string({
    invalid_type_error: 'Please select birthday.',
  }),
  birthPlace: z.string({
    invalid_type_error: 'Please enter birth place.',
  }),
  nationality: z.string({
    invalid_type_error: 'Please enter nationality.',
  }),
  religion: z.string({
    invalid_type_error: 'Please enter religion.',
  }),
  ethnicity: z.string({
    invalid_type_error: 'Please enter ethnicity.',
  }),
  email: z.string({
    invalid_type_error: 'Please enter email.',
  }).min(6),
  facebook: z.string({
    invalid_type_error: 'Please enter facebook account.',
  }),
  skype: z.string({
    invalid_type_error: 'Please enter skype account.',
  }),
  zoom: z.string({
    invalid_type_error: 'Please enter zoom account.',
  }),
});

const UpdateStudent = StudentFormSchemaWithoutCourse;
export async function updateStudent(id: string, prevState: any, formData: FormData) {
  const validatedFields = UpdateStudent.safeParse({
    firstName: formData.get('firstName'),
    middleName: formData.get('middleName'),
    lastName: formData.get('lastName'),
    suffix: formData.get('suffix'),
    gender: formData.get('gender'),
    civilStatus: formData.get('civilStatus'),
    birthday: formData.get('birthday'),
    birthPlace: formData.get('birthPlace'),
    age: formData.get('age'),
    nationality: formData.get('nationality'),
    religion: formData.get('religion'),
    ethnicity: formData.get('ethnicity'),
    email: formData.get('email'),
    facebook: formData.get('facebook'),
    skype: formData.get('skype'),
    zoom: formData.get('zoom'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Student.',
    };
  }
  const { firstName, middleName, lastName, suffix, gender, civilStatus, birthday, birthPlace, nationality, religion, ethnicity, email, facebook, skype, zoom } = validatedFields.data;
    try{
      await sql`
        UPDATE users
        SET first_name = ${firstName},
          middle_name = ${middleName},
          last_name = ${lastName},
          suffix = ${suffix},
          email = ${email}
        WHERE id = ${id};
      `;
      await sql`
        UPDATE students
        SET gender = ${gender},
          civil_status = ${civilStatus},
          birthday = ${birthday},
          birth_place = ${birthPlace},
          nationality = ${nationality},
          religion = ${religion},
          ethnicity = ${ethnicity},
          facebook = ${facebook},
          skype = ${skype},
          zoom_account = ${zoom}
        WHERE user_id = ${id};
    `;
  } catch(error) {
    console.error('error', error);
    
    return { message: 'Database Error: Failed to Update Student.' };
  }
  revalidatePath('/dashboard/profile');
  redirect('/dashboard/profile');
}

export async function updateEnrollment(student_id: string, subject_id: string) {
  try {
    await sql`
      INSERT INTO enrollments (student_id, subject_id)
      VALUES (${student_id}, ${subject_id})
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update enrollment.');
  }
}

const CreateStudent = StudentFormSchema;
export async function createStudent(prevState: any, formData: FormData) {
  
  const validatedFields = CreateStudent.safeParse({
    courseId: formData.get('courseId'),
    firstName: formData.get('firstName'),
    middleName: formData.get('middleName'),
    lastName: formData.get('lastName'),
    suffix: formData.get('suffix'),
    gender: formData.get('gender'),
    civilStatus: formData.get('civilStatus'),
    birthday: formData.get('birthday'),
    birthPlace: formData.get('birthPlace'),
    age: formData.get('age'),
    nationality: formData.get('nationality'),
    religion: formData.get('religion'),
    ethnicity: formData.get('ethnicity'),
    email: formData.get('email'),
    facebook: formData.get('facebook'),
    skype: formData.get('skype'),
    zoom: formData.get('zoom'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Student.',
    };
  }
  const { courseId, firstName, middleName, lastName, suffix, gender, civilStatus, birthday, birthPlace, nationality, religion, ethnicity, email, facebook, skype, zoom } = validatedFields.data;

  try {
    const hashedPassword = await bcrypt.hash('123456', 10);
    const result = await sql`
      INSERT INTO users (email, first_name, middle_name, last_name, suffix, password, role)
      VALUES (${email}, ${firstName}, ${middleName}, ${lastName}, ${suffix}, ${hashedPassword}, 'student')
      RETURNING id
    `;
    // Access the new user ID from the result
    const newUser = result.rows[0];

    // Confirm that the user is in the database
    const confirmedUser = await sql`
      SELECT id FROM users WHERE id = ${newUser.id}
    `;

    if (confirmedUser.rowCount === 0) {
      throw new Error('User insertion failed');
    }

    await sql`
      INSERT INTO students (user_id, gender, civil_status, birthday, birth_place, nationality, religion, ethnicity, facebook, skype, zoom_account, course_id)
      VALUES
      (${newUser.id}, ${gender}, ${civilStatus}, ${birthday}, ${birthPlace}, ${nationality}, ${religion}, ${ethnicity}, ${facebook}, ${skype}, ${zoom}, ${courseId})
    `;
  } catch (error) {
    console.error('error', error);
    return { message: 'Database Error: Failed to Create Student.' };
  }
  revalidatePath('/dashboard/registration');
  redirect('/dashboard/registration');
}

const InstructorFormSchema = z.object({
  firstName: z.string({
    invalid_type_error: 'Please enter a first name.',
  }),
  middleName: z.string({
    invalid_type_error: 'Please enter a middle name.',
  }),
  lastName: z.string({
    invalid_type_error: 'Please enter a last name.',
  }),
});

const CreateInstructor = InstructorFormSchema;
export async function createInstructor(prevState: any, formData: FormData) {
  
  const validatedFields = CreateInstructor.safeParse({
    firstName: formData.get('firstName'),
    middleName: formData.get('middleName'),
    lastName: formData.get('lastName'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Instructor.',
    };
  }
  const { firstName, middleName, lastName } = validatedFields.data;

  try {
    await sql`
      INSERT INTO instructors (first_name, middle_name, last_name)
      VALUES (${firstName}, ${middleName}, ${lastName})
    `;
  } catch (error) {
    console.error('error', error);
    return { message: 'Database Error: Failed to Create Instructor.' };
  }
  revalidatePath('/dashboard/trainers');
  redirect('/dashboard/trainers');
}

const UpdateInstructor = InstructorFormSchema;
export async function updateInstructor(id: string, prevState: any, formData: FormData) {
  const validatedFields = UpdateInstructor.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Announcement.',
    };
  }
  const { firstName, lastName } = validatedFields.data;
  try{
    await sql`
      UPDATE instructors
      SET first_name = ${firstName}, last_name = ${lastName}
      WHERE id = ${id}
    `;
  
  } catch(error) {
    return { message: 'Database Error: Failed to Update Instructor.' };
  }
  revalidatePath('/dashboard/instructors');
  redirect('/dashboard/instructors');
}

const InternshipFormSchema = z.object({
  courseId: z.string({
    invalid_type_error: 'Please select a course.',
  }),
  title: z.string({
    invalid_type_error: 'Please enter a title.',
  }),
  companyName: z.string({
    invalid_type_error: 'Please enter company name.',
  }),
  location: z.string({
    invalid_type_error: 'Please enter location.',
  }),
  contactInformation: z.string({
    invalid_type_error: 'Please enter contact information.',
  }),
  internshipStatus: z.string({
    invalid_type_error: 'Please select application status.',
  }),
});
const CreateInternship = InternshipFormSchema;
export async function createInternship(prevState: any, formData: FormData) {
  const validatedFields = CreateInternship.safeParse({
    courseId: formData.get('courseId'),
    title: formData.get('title'),
    companyName: formData.get('companyName'),
    location: formData.get('location'),
    contactInformation: formData.get('contactInformation'),
    internshipStatus: formData.get('internshipStatus'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Internship.',
    };
  }
  const { courseId, title, companyName, location, contactInformation, internshipStatus } = validatedFields.data;

  try {
    await sql`
      INSERT INTO internships (course_id, title, company_name, location, contact_information, application_status)
      VALUES (${courseId}, ${title}, ${companyName}, ${location}, ${contactInformation}, ${internshipStatus})
    `;
  } catch (error) {
    console.error('error', error);
    return { message: 'Database Error: Failed to Create Internship.' };
  }
  revalidatePath('/dashboard/internship');
  redirect('/dashboard/internship');
}

const UpdateInternship = InternshipFormSchema;
export async function updateInternship(id: string, prevState: any, formData: FormData) {
  const validatedFields = UpdateInternship.safeParse({
    courseId: formData.get('courseId'),
    title: formData.get('title'),
    companyName: formData.get('companyName'),
    location: formData.get('location'),
    contactInformation: formData.get('contactInformation'),
    internshipStatus: formData.get('internshipStatus'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Internship.',
    };
  }
  const { courseId, title, companyName, location, contactInformation, internshipStatus } = validatedFields.data;
  try{
    await sql`
      UPDATE internships
      SET course_id = ${courseId}, title = ${title}, company_name = ${companyName}, location = ${location}, contact_information = ${contactInformation}, application_status = ${internshipStatus}
      WHERE id = ${id}
    `;
  
  } catch(error) {
    console.error('error', error);
    return { message: 'Database Error: Failed to Update Internship.' };
  }
  revalidatePath('/dashboard/internship');
  redirect('/dashboard/internship');
}

const CourseFormSchema = z.object({
  industrySector: z.string({
    invalid_type_error: 'Please enter industry sector.',
  }),
  programTitle: z.string({
    invalid_type_error: 'Please enter program title.',
  }),
});
const CreateCourse = CourseFormSchema;
export async function createCourse(prevState: any, formData: FormData) {
  const validatedFields = CreateCourse.safeParse({
    industrySector: formData.get('industrySector'),
    programTitle: formData.get('programTitle'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Course.',
    };
  }
  const { industrySector, programTitle } = validatedFields.data;

  try {
    await sql`
      INSERT INTO courses (industry_sector, program_title)
      VALUES (${industrySector}, ${programTitle})
    `;
  } catch (error) {
    console.error('error', error);
    return { message: 'Database Error: Failed to Create Course.' };
  }
  revalidatePath('/dashboard/courses');
  redirect('/dashboard/courses');
}

const SubjectFormSchema = z.object({
  subjectCode: z.string({
    invalid_type_error: 'Please enter subject code.',
  }),
  subjectTitle: z.string({
    invalid_type_error: 'Please enter subject title.',
  }),
  subjectDescription: z.string({
    invalid_type_error: 'Please enter program description.',
  }),
});
const CreateSubject = SubjectFormSchema;
export async function createSubject(prevState: any, formData: FormData) {
  const validatedFields = CreateSubject.safeParse({
    subjectCode: formData.get('subjectCode'),
    subjectTitle: formData.get('subjectTitle'),
    subjectDescription: formData.get('subjectDescription'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Subject.',
    };
  }
  const { subjectCode, subjectTitle, subjectDescription } = validatedFields.data;

  try {
    await sql`
      INSERT INTO subjects (subject_code, subject_title, subject_description)
      VALUES (${subjectCode}, ${subjectTitle}, ${subjectDescription})
    `;
  } catch (error) {
    console.error('error', error);
    return { message: 'Database Error: Failed to Create Subject.' };
  }
  revalidatePath('/dashboard/subjects');
  redirect('/dashboard/subjects');
}