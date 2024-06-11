import { fetchStudents, fetchUnEnrolledSubjects } from '@/app/lib/data';
import { getUserdata } from '@/auth';

export default async function RegistrationTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const students = await fetchStudents(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {students?.map((subject) => (
              <div
                key={subject.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex flex-col w-full md:flex-row md:items-center md:justify-between md:pt-4">
                  <div className="md:w-1/2">
                    <p className="text-lg font-medium">{subject.subject_code}</p>
                    <p className="text-lg font-medium">{subject.subject_title}</p>
                    <p className="text-sm md:text-base">{subject.subject_description}</p>
                  </div>
                  <div className="flex justify-end mt-2 md:mt-0 md:w-1/2 md:justify-end md:gap-2">
                    {/* <EnrollSubject id={subject.id} studentId={userdata?.student_id}/> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-3 py-5 font-medium">
                  Full Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Course
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Description
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {students?.map((student) => (
                <tr
                  key={student.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3 max-w-xs">
                    <div className="truncate">{`${student.first_name} ${student.middle_name} ${student.last_name} `}</div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 max-w-xs">
                    <div className="truncate">{student.program_title}</div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 max-w-xs">
                    <div className="truncate">{student.subject_description}</div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      {/* <EnrollSubject id={subject.id} studentId={userdata?.student_id}/> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
