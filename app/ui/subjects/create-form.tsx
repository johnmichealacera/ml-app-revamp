'use client';

import Link from 'next/link';
import {
  ShieldExclamationIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useFormState } from 'react-dom';
import { createSubject } from '@/app/lib/actions';

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createSubject, initialState);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6" aria-describedby="form-error">
        <div className="mb-4">
          <label htmlFor="subjectCode" className="mb-2 block text-sm font-medium">
            Enter Subject Code
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="subjectCode"
                name="subjectCode"
                type="text"
                placeholder="Enter subject code"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="subjectCode-error"
              />
              <ShieldExclamationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="subjectCode-error" aria-live="polite" aria-atomic="true">
              {state.errors?.subjectCode &&
                state.errors.subjectCode.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="subjectTitle" className="mb-2 block text-sm font-medium">
            Enter Subject Title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="subjectTitle"
                name="subjectTitle"
                type="text"
                placeholder="Enter subject title"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />

              <ShieldExclamationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="subjectTitle-error" aria-live="polite" aria-atomic="true">
              {state.errors?.subjectTitle &&
                state.errors.subjectTitle.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="subjectDescription" className="mb-2 block text-sm font-medium">
            Enter Subject Description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="subjectDescription"
                name="subjectDescription"
                type="text"
                placeholder="Enter subject description"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />

              <ShieldExclamationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="subjectDescription-error" aria-live="polite" aria-atomic="true">
              {state.errors?.subjectDescription &&
                state.errors.subjectDescription.map((error: string) => (
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
          href="/dashboard/subjects"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Subject</Button>
      </div>
    </form>
  );
}
