"use client"

import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '../button';
import { updateEnrollment } from '@/app/lib/actions';

export async function EnrollSubject({id, studentId}: {id: string, studentId: string}) {

  const openModal = async () => {
    let willEnrollSubject = "Are you sure to enroll subject?";
    if (confirm(willEnrollSubject) == true) {
      await updateEnrollment(studentId, id);
    }
  };
  return (
    <Button className="rounded-md border p-2 bg-green-500 hover:bg-green-300" type="button" onClick={openModal}>
      <PlusIcon className="w-5" />
    </Button>
  );
}
