import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { CardsSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from '@/app/ui/skeletons';
import { Metadata } from 'next';
import { getUserdata } from '@/auth';
import { formatDateToLocal } from '@/app/lib/utils';
 
export const metadata: Metadata = {
  title: 'Profile',
};
 
export default async function Page() {
  const userdata: any = await getUserdata();
  console.log('userdata', userdata);
  
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Profile
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          {/* <CardWrapper /> */}
        </Suspense>
      </div>
      <div className="mt-6 w-full">
        {/* TODO: Think of what chart to add in here */}
        <Suspense fallback={<RevenueChartSkeleton />}>
          <div className="bg-gray-100">
            <div className="max-w-4xl bg-white rounded-lg shadow-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="col-span-1">
                  <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
                  <p><strong>ID Number:</strong> {userdata.id_number}</p>
                  <p><strong>First Name:</strong> {userdata.first_name}</p>
                  <p><strong>Middle Name:</strong> {userdata.middle_name}</p>
                  <p><strong>Last Name:</strong> {userdata.last_name}</p>
                  <p><strong>Suffix:</strong> {userdata.suffix}</p>
                  <p><strong>Gender:</strong> {userdata.gender}</p>
                  <p><strong>Civil Status:</strong> {userdata.civil_status}</p>
                  <p><strong>Birthday:</strong> {formatDateToLocal(userdata.birthday)}</p>
                  <p><strong>Birth Place:</strong> {userdata.birth_place}</p>
                  <p><strong>Age:</strong> {userdata.age}</p>
                  <p><strong>Nationality:</strong> {userdata.nationality}</p>
                  <p><strong>Religion:</strong> {userdata.religion}</p>
                  <p><strong>Ethnicity:</strong> {userdata.ethnicity}</p>
                </div>
                
                <div className="col-span-1">
                  <h2 className="text-xl font-semibold mb-2">Contact & Address</h2>
                  <p><strong>Email:</strong> {userdata.email}</p>
                  <p><strong>Facebook:</strong> {userdata.facebook}</p>
                  <p><strong>Skype:</strong> {userdata.skype}</p>
                  <p><strong>Zoom:</strong> {userdata.zoom_account}</p>
                </div>
              </div>
            </div>
          </div>
        </Suspense>
      </div>
    </main>
  );
}