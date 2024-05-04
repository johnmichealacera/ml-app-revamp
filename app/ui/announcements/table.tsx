import Image from 'next/image';
import { UpdateAnnouncement, DeleteAnnouncement } from '@/app/ui/announcements/buttons';
import { formatDateToLocal } from '@/app/lib/utils';
import { fetchFilteredAnnouncements } from '@/app/lib/data';

export default async function AnnouncementsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const announcements = await fetchFilteredAnnouncements(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {announcements?.map((announcement) => (
              <div
                key={announcement.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={announcement.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${announcement.name}'s profile picture`}
                      />
                      <p>{announcement.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{announcement.department}</p>
                  </div>
                </div>
                <div className="flex flex-col w-full md:flex-row md:items-center md:justify-between md:pt-4">
                  <div className="md:w-1/2">
                    <p className="text-lg font-medium">{announcement.subject}</p>
                    <p className="text-sm md:text-base">{announcement.description}</p>
                    <p className="text-xs text-gray-500">{formatDateToLocal(announcement.date)}</p>
                  </div>
                  <div className="flex justify-end mt-2 md:mt-0 md:w-1/2 md:justify-end md:gap-2">
                    <UpdateAnnouncement id={announcement.id} />
                    <DeleteAnnouncement id={announcement.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Personnel
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Department
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Subject
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Description
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {announcements?.map((announcement) => (
                <tr
                  key={announcement.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={announcement.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${announcement.name}'s profile picture`}
                      />
                      <p>{announcement.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {announcement.department}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 max-w-xs">
                    <div className="truncate">{announcement.subject}</div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 max-w-xs">
                    <div className="truncate">{announcement.description}</div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(announcement.date)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateAnnouncement id={announcement.id} />
                      <DeleteAnnouncement id={announcement.id} />
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
