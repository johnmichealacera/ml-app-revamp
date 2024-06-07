const { db } = require('@vercel/postgres');
const {
  students,
  users,
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
      zoom_account VARCHAR(255)
  );
  `;

  console.log(`Created "students" table`);


  // Insert data into the "users" table
  const insertedStudents = await Promise.all(
    students.map(async (student) => {
      return client.sql`
      INSERT INTO students (id, id_number, first_name, middle_name, last_name, suffix, gender, civil_status, birthday, birth_place, age, nationality, religion, ethnicity, email, facebook, skype, zoom_account)
  VALUES
      (${student.id}, ${student.id_number}, ${student.first_name}, ${student.middle_name}, ${student.last_name}, ${student.suffix}, ${student.gender}, ${student.civil_status}, ${student.birthday}, ${student.birth_place}, ${student.age}, ${student.nationality}, ${student.religion}, ${student.ethnicity}, ${student.email}, ${student.facebook}, ${student.skype}, ${student.zoom_account})
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

async function main() {
  const client = await db.connect();
  await seedStudents(client);
  await seedUsers(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
