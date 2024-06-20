import Form from '@/app/ui/change-password/change-password';
import { lusitana } from '@/app/ui/fonts';
import { getBasicUserdata } from '@/auth';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Overview',
};
 
export default async function Page() {
  const userdata: any = await getBasicUserdata();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Change Password
      </h1>
        <Form userId={userdata?.id}/>
    </main>
  );
}