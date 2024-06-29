'use client';
import {
  ShieldExclamationIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateInternship } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function Form({
  internship,
  courses,
}: {
  internship: any;
  courses: any,
}) {
  const initialState = { message: null, errors: {} };
  const updateInternshipWithId = updateInternship.bind(null, internship.id);
  const [state, dispatch] = useFormState(updateInternshipWithId, initialState);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6" aria-describedby="form-error">
        <div className="mb-4">
          <label htmlFor="courseId" className="mb-2 block text-sm font-medium">
          Course
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <div className="relative">
              <select
                id="courseId"
                name="courseId"
                placeholder="Select course"
                defaultValue={internship?.course_id}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="courseId-error"
              >
                <option value="">Select course...</option>
                {courses.map((course: any) => (
                  <option key={course.id} value={course.id}>
                    {course.program_title}
                  </option>
                ))}
              </select>
                <ShieldExclamationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div id="courseId-error" aria-live="polite" aria-atomic="true">
              {state.errors?.courseId &&
                state.errors.courseId.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter title"
                defaultValue={internship?.title}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="title-error"
              />
              <ShieldExclamationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="title-error" aria-live="polite" aria-atomic="true">
              {state.errors?.title &&
                state.errors.title.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="companyName" className="mb-2 block text-sm font-medium">
          Company
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <div className="relative">
              <input
                id="companyName"
                name="companyName"
                type="text"
                defaultValue={internship?.company_name}
                placeholder="Enter company name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="suffix-error"
              />
                <ShieldExclamationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div id="companyName-error" aria-live="polite" aria-atomic="true">
              {state.errors?.companyName &&
                state.errors.companyName.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="mb-2 block text-sm font-medium">
          Location
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <div className="relative">
              <input
                id="location"
                name="location"
                type="text"
                defaultValue={internship?.location}
                placeholder="Enter location"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="location-error"
              />
                <ShieldExclamationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div id="location-error" aria-live="polite" aria-atomic="true">
              {state.errors?.location &&
                state.errors.location.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="contactInformation" className="mb-2 block text-sm font-medium">
            Contact Information
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="contactInformation"
                name="contactInformation"
                type="text"
                defaultValue={internship?.contact_information}
                placeholder="Enter contact information"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="firstName-error"
              />
              <ShieldExclamationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="contactInformation-error" aria-live="polite" aria-atomic="true">
              {state.errors?.contactInformation &&
                state.errors.contactInformation.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="internshipStatus" className="mb-2 block text-sm font-medium">
          Internship Status
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <div className="relative">
              <select
                id="internshipStatus"
                name="internshipStatus"
                defaultValue={internship?.application_status}
                placeholder="Enter internshipStatus"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="internshipStatus-error"
                aria-readonly
              >
                <option value="">Select internship status...</option>
                <option value="Closed">Closed</option>
                <option value="Open">Open</option>
              </select>
                <ShieldExclamationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div id="internshipStatus-error" aria-live="polite" aria-atomic="true">
              {state.errors?.internshipStatus &&
                state.errors.internshipStatus.map((error: string) => (
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
          href="/dashboard/trainers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Internship</Button>
      </div>
    </form>
  );
}
