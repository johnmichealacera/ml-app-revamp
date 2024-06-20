"use client"

import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function RegisterStudent() {
  return (
    <Link
      href="/dashboard/registration/register"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Register Student</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function CreateInstructor() {
  return (
    <Link
      href="/dashboard/instructors/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Instructor</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function CreateInternship() {
  return (
    <Link
      href="/dashboard/internship/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Internship</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function CreateCourse() {
  return (
    <Link
      href="/dashboard/courses/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Course</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function CreateSubject() {
  return (
    <Link
      href="/dashboard/subjects/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Subject</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}
