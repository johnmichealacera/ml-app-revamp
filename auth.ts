import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import {auth as auth1} from '@/auth';
 
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function getUserdata() {
  const session = await auth1();
  if (session?.user?.email) {
    const userdata = await getUser(session?.user?.email);
    return userdata;
  }
  return session;
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6), department: z.string().min(4) })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password, department } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch && department === user?.department) {
            return user;
          }
        }
 
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});