'use client';
import {
  ShieldExclamationIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateAnnouncement } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function EditAnnouncementForm({
  announcement,
}: {
  announcement: any;
}) {
  const initialState = { message: null, errors: {} };
  const updateAnnouncementWithId = updateAnnouncement.bind(null, announcement.id);
  const [state, dispatch] = useFormState(updateAnnouncementWithId, initialState);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6" aria-describedby="form-error">
      <div className="mb-4">
          <label htmlFor="subject" className="mb-2 block text-sm font-medium">
            Enter subject
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="subject"
                name="subject"
                type="text"
                defaultValue={announcement.subject}
                placeholder="Enter subject"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="subject-error"
              />
              <ShieldExclamationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="subject-error" aria-live="polite" aria-atomic="true">
              {state.errors?.subject &&
                state.errors.subject.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
          Enter description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <div className="relative">
                <textarea
                  id="description"
                  name="description"
                  defaultValue={announcement.description}
                  placeholder="Enter description"
                  className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-none placeholder-gray-500 resize-none"
                  rows={5}
                  aria-describedby="description-error"
                />
                <ShieldExclamationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div id="amount-error" aria-live="polite" aria-atomic="true">
              {state.errors?.description &&
                state.errors.description.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div id="form-error" aria-live="polite" aria-atomic="true">
        {state?.message &&
          <p className="mt-2 text-sm text-red-500" key={state?.message}>
            {state?.message}
        </p>}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/announcements"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Announcement</Button>
      </div>
    </form>
  );
}
