"use client"

import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function AddSubject() {
  return (
    <Link
      href={`/dashboard/enrollments`}
      className="rounded-md border p-2 hover:bg-gray-100 hover:bg-green-300"
    >
      <PlusIcon className="w-5" />
    </Link>
  );
}
