'use client';

import Link from 'next/link';
import {
  ShieldExclamationIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useFormState } from 'react-dom';
import { createCourse } from '@/app/lib/actions';

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createCourse, initialState);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6" aria-describedby="form-error">
        <div className="mb-4">
          <label htmlFor="industrySector" className="mb-2 block text-sm font-medium">
            Enter Industry Sector
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="industrySector"
                name="industrySector"
                type="text"
                placeholder="Enter industry sector"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="industrySector-error"
              />
              <ShieldExclamationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="industrySector-error" aria-live="polite" aria-atomic="true">
              {state.errors?.industrySector &&
                state.errors.industrySector.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="programTitle" className="mb-2 block text-sm font-medium">
            Enter Program Title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="programTitle"
                name="programTitle"
                type="text"
                placeholder="Enter program title"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />

              <ShieldExclamationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="programTitle-error" aria-live="polite" aria-atomic="true">
              {state.errors?.programTitle &&
                state.errors.programTitle.map((error: string) => (
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
          href="/dashboard/courses"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Course</Button>
      </div>
    </form>
  );
}
