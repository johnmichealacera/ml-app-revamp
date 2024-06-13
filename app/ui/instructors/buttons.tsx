"use client"

import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '../button';
import { updateEnrollment } from '@/app/lib/actions';

export function UpdateInstructor({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/instructors/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}
