import Search from '@/app/ui/search';
import { ViewReport } from './buttons';
import { formatDateToLocal } from '@/app/lib/utils';
import ReportStatus from '../announcements/status';

export default async function ReportsTable({
  reports,
}: {
  reports: any[];
}) {
  return (
    <div className="w-full">
      <Search placeholder="Search reports..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {reports?.map((report) => (
                  <div
                    key={report.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <p>{report.name}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {report.contact_number}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Department</p>
                        <p className="font-medium">{report.department}</p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Description</p>
                        <p className="font-medium">{report.description}</p>
                      </div>
                    </div>
                    <div className="pt-4 text-sm">
                      <p>{formatDateToLocal(report.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Contact #
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Department
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Description
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {reports.map((report) => (
                    <tr key={report.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <p>{report.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {report.contact_number}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {report.department}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {report.description}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        <ReportStatus status={report.status} />
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {formatDateToLocal(report.date)}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        <div className="flex justify-end gap-3">
                          <ViewReport id={report.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
