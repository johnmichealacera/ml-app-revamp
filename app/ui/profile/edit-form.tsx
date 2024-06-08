'use client';
import {
  ShieldExclamationIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateStudent } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { format } from 'date-fns';

export default function EditProfileForm({
  student,
}: {
  student: any;
}) {
  const birthday = new Date(student.birthday);
  const formattedBirthday = format(birthday, 'yyyy-MM-dd');
  const initialState = { message: null, errors: {} };
  const updateStudentWithId = updateStudent.bind(null, student.id);
  const [state, dispatch] = useFormState(updateStudentWithId, initialState);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6" aria-describedby="form-error">
        <div className="mb-4">
          <label htmlFor="firstName" className="mb-2 block text-sm font-medium">
            First Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="firstName"
                name="firstName"
                type="text"
                defaultValue={student.first_name}
                placeholder="Enter first name"
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
          <label htmlFor="suffix" className="mb-2 block text-sm font-medium">
          Middle Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <div className="relative">
              <input
                id="middleName"
                name="middleName"
                type="text"
                defaultValue={student.middle_name}
                placeholder="Enter first name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="middleName-error"
              />
                <ShieldExclamationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div id="middleName-error" aria-live="polite" aria-atomic="true">
              {state.errors?.middleName &&
                state.errors.middleName.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="suffix" className="mb-2 block text-sm font-medium">
          Last Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <div className="relative">
              <input
                id="suffix"
                name="lastName"
                type="text"
                defaultValue={student.last_name}
                placeholder="Enter first name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="lastName-error"
              />
                <ShieldExclamationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div id="lastName-error" aria-live="polite" aria-atomic="true">
              {state.errors?.lastName &&
                state.errors.lastName.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="suffix" className="mb-2 block text-sm font-medium">
          Suffix
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <div className="relative">
              <input
                id="suffix"
                name="suffix"
                type="text"
                defaultValue={student.suffix}
                placeholder="Enter suffix"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="suffix-error"
              />
                <ShieldExclamationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div id="suffix-error" aria-live="polite" aria-atomic="true">
              {state.errors?.suffix &&
                state.errors.suffix.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="mb-2 block text-sm font-medium">
          Gender
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <div className="relative">
              <select
                id="gender"
                name="gender"
                placeholder="Enter gender"
                defaultValue={student.gender}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="gender-error"
                aria-readonly
              >
                <option value="">Select gender...</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
                <ShieldExclamationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div id="gender-error" aria-live="polite" aria-atomic="true">
              {state.errors?.gender &&
                state.errors.gender.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="civilStatus" className="mb-2 block text-sm font-medium">
          Civil Status
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <div className="relative">
              <select
                id="civilStatus"
                name="civilStatus"
                placeholder="Enter civil status"
                defaultValue={student.civil_status}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="civilStatus-error"
              >
                <option value="">Select civil status...</option>
                <option value="SINGLE">Single</option>
                <option value="MARRIED">Married</option>
              </select>
                <ShieldExclamationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div id="civilStatus-error" aria-live="polite" aria-atomic="true">
              {state.errors?.civilStatus &&
                state.errors.civilStatus.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="birthday" className="mb-2 block text-sm font-medium">
          Birthday
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <div className="relative">
              <input
                id="birthday"
                name="birthday"
                type="date"
                defaultValue={formattedBirthday}
                placeholder="select birthday"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="birthday-error"
              />
                <ShieldExclamationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div id="birthday-error" aria-live="polite" aria-atomic="true">
              {state.errors?.birthday &&
                state.errors.birthday.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="birthPlace" className="mb-2 block text-sm font-medium">
          Birth Place
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <div className="relative">
              <input
                id="birthPlace"
                name="birthPlace"
                type="text"
                defaultValue={student.birth_place}
                placeholder="Enter birth place"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="birthPlace-error"
              />
                <ShieldExclamationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div id="birthPlace-error" aria-live="polite" aria-atomic="true">
              {state.errors?.birthPlace &&
                state.errors.birthPlace.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="nationality" className="mb-2 block text-sm font-medium">
            Nationality
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="nationality"
                name="nationality"
                type="text"
                defaultValue={student.nationality}
                placeholder="Enter nationality"
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
          <label htmlFor="religion" className="mb-2 block text-sm font-medium">
            Religion
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="religion"
                name="religion"
                type="text"
                defaultValue={student.religion}
                placeholder="Enter religion"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="firstName-error"
              />
              <ShieldExclamationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="religion-error" aria-live="polite" aria-atomic="true">
              {state.errors?.religion &&
                state.errors.religion.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="ethnicity" className="mb-2 block text-sm font-medium">
            Ethnicity
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="ethnicity"
                name="ethnicity"
                type="text"
                defaultValue={student.ethnicity}
                placeholder="Enter ethnicity"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="firstName-error"
              />
              <ShieldExclamationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="ethnicity-error" aria-live="polite" aria-atomic="true">
              {state.errors?.ethnicity &&
                state.errors.ethnicity.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email address
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={student.email}
                placeholder="Enter email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="firstName-error"
              />
              <ShieldExclamationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="email-error" aria-live="polite" aria-atomic="true">
              {state.errors?.email &&
                state.errors.email.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="facebook" className="mb-2 block text-sm font-medium">
            Facebook Account
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="facebook"
                name="facebook"
                type="text"
                defaultValue={student.facebook}
                placeholder="Enter facebook"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="firstName-error"
              />
              <ShieldExclamationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="facebook-error" aria-live="polite" aria-atomic="true">
              {state.errors?.facebook &&
                state.errors.facebook.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="skype" className="mb-2 block text-sm font-medium">
            Skype Account
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="skype"
                name="skype"
                type="text"
                defaultValue={student.skype}
                placeholder="Enter skype"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="firstName-error"
              />
              <ShieldExclamationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="skype-error" aria-live="polite" aria-atomic="true">
              {state.errors?.skype &&
                state.errors.skype.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="zoom" className="mb-2 block text-sm font-medium">
            Zoom Account
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="zoom"
                name="zoom"
                type="text"
                defaultValue={student.zoom}
                placeholder="Enter zoom"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="firstName-error"
              />
              <ShieldExclamationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="zoom-error" aria-live="polite" aria-atomic="true">
              {state.errors?.zoom &&
                state.errors.zoom.map((error: string) => (
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
          href="/dashboard/profile"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
