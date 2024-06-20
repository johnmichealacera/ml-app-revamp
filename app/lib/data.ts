import { sql } from '@vercel/postgres';
import {
  User,
  Revenue,
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';
import { auth } from '@/auth';

const ITEMS_PER_PAGE = 6;

export async function getUser(email: string) {
  noStore();
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

// tec voc portal

export async function fetchStudentById(id: string) {
  noStore();
  try {
    const data = await sql`
      SELECT
        *
      FROM students
      JOIN users ON users.id = students.user_id
      WHERE students.id = ${id};
    `;

    const student = data.rows.map((item) => ({
      ...item,
    }));
    

    return student[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch student.');
  }
}

export async function fetchStudentBySession() {
  noStore();
  const session = await auth();
  if (!session?.user?.email) {
    return null;
  }
  try {
    const data = await sql`
      SELECT
        students.id AS student_id,
        *
        FROM students
        JOIN courses ON students.course_id = courses.id
        JOIN users ON users.id = students.user_id
        WHERE users.email = ${session?.user?.email};
    `;

    const student = data.rows.map((item) => ({
      ...item,
    }));

    return student[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch student.');
  }
}

export async function fetchUnEnrolledSubjects(
  idNumber: string,
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const subjects = await sql`
    SELECT
      subjects.*
    FROM
      subjects
    LEFT JOIN
      enrollments ON subjects.id = enrollments.subject_id AND enrollments.student_id = (
        SELECT id FROM students WHERE id_number = ${idNumber}
      )
    WHERE
      enrollments.subject_id IS NULL
    AND 
      (subjects.subject_title ILIKE ${`%${query}%`} OR
      subjects.subject_description ILIKE ${`%${query}%`})
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
    `;

    return subjects.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch subjects.');
  }
}

export async function fetchSubjectsPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM subjects
    WHERE
      subjects.subject_title ILIKE ${`%${query}%`} OR
      subjects.subject_description ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of subjects.');
  }
}

export async function fetchClassesPages(idNumber: string, query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
      FROM students
      JOIN enrollments ON enrollments.student_id = students.id
      JOIN subjects ON subjects.id = enrollments.subject_id
      WHERE
        students.id_number = ${idNumber} AND
        (subjects.subject_title ILIKE ${`%${query}%`} OR
        subjects.subject_description ILIKE ${`%${query}%`})
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of classes.');
  }
}

export async function fetchEnrolledSubjects(
  idNumber: string,
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const subjects = await sql`
      SELECT
        *
      FROM students
      JOIN enrollments ON enrollments.student_id = students.id
      JOIN subjects ON subjects.id = enrollments.subject_id
      WHERE
        students.id_number = ${idNumber} AND
        (subjects.subject_title ILIKE ${`%${query}%`} OR
        subjects.subject_description ILIKE ${`%${query}%`})
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return subjects.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch subjects.');
  }
}

export async function fetchStudents(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const students = await sql`
      SELECT
        *
      FROM
        students
        JOIN users ON users.id = students.user_id
        JOIN courses ON courses.id = students.course_id
      WHERE
        users.first_name ILIKE ${`%${query}%`} OR
        users.last_name ILIKE ${`%${query}%`} OR
        courses.program_title ILIKE ${`%${query}%`}
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
    `;

    return students.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch students.');
  }
}

export async function fetchCourses() {
  noStore();
  try {
    const courses = await sql`
      SELECT
        *
      FROM courses
    `;

    return courses.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch courses.');
  }
}

export async function fetchSubjects(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const subjects = await sql`
      SELECT
        *
      FROM
        subjects
      WHERE
        subjects.subject_code ILIKE ${`%${query}%`} OR
        subjects.subject_title ILIKE ${`%${query}%`} OR
        subjects.subject_description ILIKE ${`%${query}%`}
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
    `;

    return subjects.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch subjects.');
  }
}

export async function fetchFilteredInstructors(query: string, 
  currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const data = await sql`
		SELECT
		  *
		FROM instructors
		WHERE
      instructors.first_name ILIKE ${`%${query}%`} OR
      instructors.last_name ILIKE ${`%${query}%`}
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
	  `;

    return data?.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch instructors table.');
  }
}

export async function fetchInstructorById(id: string) {
  noStore();
  try {
    const data = await sql`
      SELECT
        *
      FROM instructors
      WHERE instructors.id = ${id};
    `;

    const instructor = data.rows.map((item) => ({
      ...item,
    }));

    return instructor[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch instructor.');
  }
}

export async function fetchCoursesWithQuery(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const courses = await sql`
      SELECT
        *
      FROM
        courses
      WHERE
        courses.industry_sector ILIKE ${`%${query}%`} OR
        courses.program_title ILIKE ${`%${query}%`}
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
    `;

    return courses.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch courses.');
  }
}

export async function fetchFilteredInternships(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const subjects = await sql`
      SELECT
        *,
        internships.id as id,
        courses.id as course_id
      FROM
        internships
      JOIN courses ON courses.id = internships.course_id
      WHERE
        internships.title ILIKE ${`%${query}%`} OR
        internships.company_name ILIKE ${`%${query}%`} OR
        internships.location ILIKE ${`%${query}%`} OR
        internships.contact_information ILIKE ${`%${query}%`} OR
        internships.application_status ILIKE ${`%${query}%`} OR
        courses.program_title ILIKE ${`%${query}%`}
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
    `;

    return subjects.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch subjects.');
  }
}

export async function fetchInternshipsPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM
      internships
    WHERE
      internships.title ILIKE ${`%${query}%`} OR
      internships.company_name ILIKE ${`%${query}%`} OR
      internships.location ILIKE ${`%${query}%`} OR
      internships.contact_information ILIKE ${`%${query}%`} OR
      internships.application_status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of internships.');
  }
}

export async function fetchInternshipById(id: string) {
  noStore();
  try {
    const data = await sql`
      SELECT
        *
      FROM internships
      WHERE internships.id = ${id};
    `;

    const internship = data.rows.map((item) => ({
      ...item,
    }));

    return internship[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch internship.');
  }
}
