const { db } = require('@vercel/postgres');
const {
  students,
  users,
  courses,
  subjects,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        student_id UUID REFERENCES students(id) ON DELETE CASCADE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (student_id, password)
        VALUES (${user.student_id}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedStudents(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS students (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      id_number TEXT NOT NULL UNIQUE,
      first_name VARCHAR(255) NOT NULL,
      middle_name VARCHAR(255),
      last_name VARCHAR(255) NOT NULL,
      suffix VARCHAR(50),
      gender VARCHAR(20) NOT NULL,
      civil_status VARCHAR(20) NOT NULL,
      birthday DATE NOT NULL,
      birth_place VARCHAR(255),
      age INT,
      nationality VARCHAR(50),
      religion VARCHAR(50),
      ethnicity VARCHAR(50),
      email VARCHAR(255),
      facebook VARCHAR(255),
      skype VARCHAR(255),
      zoom_account VARCHAR(255),
      course_id UUID REFERENCES courses(id) ON DELETE CASCADE
  );
  `;

  console.log(`Created "students" table`);


  // Insert data into the "students" table
  const insertedStudents = await Promise.all(
    students.map(async (student) => {
      return client.sql`
      INSERT INTO students (id, id_number, first_name, middle_name, last_name, suffix, gender, civil_status, birthday, birth_place, age, nationality, religion, ethnicity, email, facebook, skype, zoom_account, course_id)
  VALUES
      (${student.id}, ${student.id_number}, ${student.first_name}, ${student.middle_name}, ${student.last_name}, ${student.suffix}, ${student.gender}, ${student.civil_status}, ${student.birthday}, ${student.birth_place}, ${student.age}, ${student.nationality}, ${student.religion}, ${student.ethnicity}, ${student.email}, ${student.facebook}, ${student.skype}, ${student.zoom_account}, ${student.course_id})
      ON CONFLICT (id) DO NOTHING;
    `;
    }),
  );

    console.log(`Seeded ${insertedStudents.length} students`);

    return {
      createTable,
      students: insertedStudents,
    };
  } catch (error) {
    console.error('Error seeding students:', error);
    throw error;
  }
}

async function seedCourses(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "courses" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS courses (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        industry_sector TEXT NOT NULL,
        program_title TEXT NOT NULL
      );
    `;

    console.log(`Created "courses" table`);

    // Insert data into the "courses" table
    const insertedCourses = await Promise.all(
      courses.map(async (course) => {
        return client.sql`
        INSERT INTO courses (industry_sector, program_title)
        VALUES (${course.industry_sector}, ${course.program_title})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedCourses.length} courses`);

    return {
      createTable,
      courses: insertedCourses,
    };
  } catch (error) {
    console.error('Error seeding courses:', error);
    throw error;
  }
}

async function seedSubjects(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "subjects" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS subjects (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        subject_code TEXT NOT NULL,
        subject_title TEXT NOT NULL,
        subject_description TEXT NOT NULL
      );
    `;

    console.log(`Created "subjects" table`);

    // Insert data into the "subjects" table
    const insertedSubjects = await Promise.all(
      subjects.map(async (subject) => {
        return client.sql`
        INSERT INTO subjects (subject_code, subject_title, subject_description)
        VALUES (${subject.subject_code}, ${subject.subject_title}, ${subject.subject_description})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedSubjects.length} subjects`);

    return {
      createTable,
      subjects: insertedSubjects,
    };
  } catch (error) {
    console.error('Error seeding subjects:', error);
    throw error;
  }
}

async function seedEnrollments(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "enrollments" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS enrollments (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        student_id UUID REFERENCES students(id) ON DELETE CASCADE,
        subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
        enrollment_date DATE DEFAULT CURRENT_DATE,
        grade NUMERIC(5, 2)
      );
    `;

    console.log(`Created "enrollments" table`);

    // Insert data into the "enrollments" table
    // const insertedEnrollments = await Promise.all(
    //   enrollments.map(async (enrollment) => {
    //     return client.sql`
    //     INSERT INTO enrollments (student_id, course_id, grade)
    //     VALUES (${enrollment.student_id}, ${enrollment.course_id}, ${enrollment.grade})
    //     ON CONFLICT (id) DO NOTHING;
    //   `;
    //   }),
    // );

    // console.log(`Seeded ${insertedEnrollments.length} enrollments`);

    // return {
    //   createTable,
    //   enrollments: insertedEnrollments,
    // };
  } catch (error) {
    console.error('Error seeding enrollment:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();
  // await seedCourses(client);
  // await seedSubjects(client);
  // await seedStudents(client);
  // await seedUsers(client);
  await seedEnrollments(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
