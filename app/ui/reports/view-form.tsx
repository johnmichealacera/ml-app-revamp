'use client';

import {
  CheckIcon,
  ClockIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateReport } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function ViewReportForm({
  report,
}: {
  report: any;
}) {
  const initialState = { message: null, errors: {} };
  const updateReportWithId = updateReport.bind(null, report.id);
  const [state, dispatch] = useFormState(updateReportWithId, initialState);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6" aria-describedby="form-error">
        <div className="mb-4">
            <label htmlFor="subject" className="mb-2 block text-sm font-medium">
              Sender Name
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  defaultValue={report.name}
                  disabled
                  placeholder="Enter subject"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="subject-error"
                />
                <ShieldExclamationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
        </div>
        <div className="mb-4">
          <label htmlFor="subject" className="mb-2 block text-sm font-medium">
            Sender Contact Number
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="contact_number"
                name="contact_number"
                type="text"
                defaultValue={report.contact_number}
                disabled
                placeholder="Enter contact number"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="subject-error"
              />
              <ShieldExclamationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
          Description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <div className="relative">
                <textarea
                  id="description"
                  name="description"
                  defaultValue={report.description}
                  disabled
                  placeholder="Enter contact number"
                  className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-none placeholder-gray-500 resize-none"
                  rows={5}
                  aria-describedby="description-error"
                />
                <ShieldExclamationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
        </div>
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the report status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  defaultChecked={report.status === 'pending'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div id="status-error" aria-live="polite" aria-atomic="true">
                {state.errors?.status &&
                  state.errors.status.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
              <div className="flex items-center">
                <input
                  id="resolved"
                  name="status"
                  type="radio"
                  value="resolved"
                  defaultChecked={report.status === 'resolved'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="resolved"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Resolved <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div id="form-error" aria-live="polite" aria-atomic="true">
        {state?.message &&
          <p className="mt-2 text-sm text-red-500" key={state?.message}>
            {state?.message}
        </p>}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/reports"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Report</Button>
      </div>
    </form>
  );
}
