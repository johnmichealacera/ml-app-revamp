"use client"

import { PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function UpdateInternship({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/internship/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}
