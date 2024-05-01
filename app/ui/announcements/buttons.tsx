"use client"

import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteAnnouncement, deleteInvoice } from '@/app/lib/actions';
import { useState } from 'react';

export function CreateAnnouncement() {
  return (
    <Link
      href="/dashboard/announcements/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Announcement</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateAnnouncement({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/announcements/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteAnnouncement({ id }: { id: string }) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    deleteAnnouncement(id);
    setShowModal(false);
  };
  

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
          <div className="fixed inset-0 bg-black opacity-25"></div>
          <div className="bg-white rounded-lg p-4 max-w-md mx-auto relative">
            <p className="text-center">Are you sure you want to delete this announcement?</p>
            <div className="flex justify-center mt-4">
              <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 mr-2 rounded-md">
                Delete
              </button>
              <button onClick={() => setShowModal(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
