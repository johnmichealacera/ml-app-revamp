import Image from 'next/image';
import { UpdateAnnouncement, DeleteAnnouncement } from '@/app/ui/classes/buttons';
import { formatDateToLocal } from '@/app/lib/utils';
import { fetchEnrolledSubjects } from '@/app/lib/data';

export default async function ClassesTable({
  idNumber,
  query,
  currentPage,
}: {
  idNumber: string;
  query: string;
  currentPage: number;
}) {
  const classes = await fetchEnrolledSubjects(idNumber, query, currentPage);
  
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {classes?.map((item) => (
              <div
                key={item.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{item.subject_code}</p>
                    </div>
                    <p className="text-sm text-gray-500">{item.department}</p>
                  </div>
                </div>
                <div className="flex flex-col w-full md:flex-row md:items-center md:justify-between md:pt-4">
                  <div className="md:w-1/2">
                    <p className="text-lg font-medium">{item.subject}</p>
                    <p className="text-sm md:text-base">{item.description}</p>
                  </div>
                  <div className="flex justify-end mt-2 md:mt-0 md:w-1/2 md:justify-end md:gap-2">
                    <UpdateAnnouncement id={item.id} />
                    <DeleteAnnouncement id={item.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Code
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Title
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
              {classes?.map((item) => (
                <tr
                  key={item.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{item.subject_code}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {item.subject_title}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 max-w-xs">
                    <div className="truncate">{item.subject_description}</div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      {/* <UpdateAnnouncement id={item.id} />
                      <DeleteAnnouncement id={item.id} /> */}
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
