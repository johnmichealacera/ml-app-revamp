'use client';
import {
  ShieldExclamationIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateInstructor } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function Form({
  instructor,
}: {
  instructor: any;
}) {
  const initialState = { message: null, errors: {} };
  const updateInstructorWithId = updateInstructor.bind(null, instructor.id);
  const [state, dispatch] = useFormState(updateInstructorWithId, initialState);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6" aria-describedby="form-error">
      <div className="mb-4">
          <label htmlFor="firstName" className="mb-2 block text-sm font-medium">
            Enter first name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="firstName"
                name="firstName"
                type="text"
                defaultValue={instructor.first_name}
                placeholder="Enter subject"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="firstName-error"
              />
              <ShieldExclamationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="firstName-error" aria-live="polite" aria-atomic="true">
              {state.errors?.firstName &&
                state.errors.firstName.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="mb-2 block text-sm font-medium">
          Enter last name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <div className="relative">
                <textarea
                  id="lastName"
                  name="lastName"
                  defaultValue={instructor.last_name}
                  placeholder="Enter last name"
                  className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-none placeholder-gray-500 resize-none"
                  rows={5}
                  aria-describedby="lastName-error"
                />
                <ShieldExclamationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div id="amount-error" aria-live="polite" aria-atomic="true">
              {state.errors?.lastName &&
                state.errors.lastName.map((error: string) => (
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
          href="/dashboard/instructors"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Instructor</Button>
      </div>
    </form>
  );
}
