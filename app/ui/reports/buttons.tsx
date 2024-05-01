import { EyeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function ViewReport({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/reports/${id}/view`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <EyeIcon className="w-5" />
    </Link>
  );
}
