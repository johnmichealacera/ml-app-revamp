import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import { getUserdata } from '@/auth';

export default async function TecVocPortalLogo() {
  const userdata: any = await getUserdata();

  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white w-80 md:w-80 lg:w-48`}
    >
      <Image
        src="/bgfc-logo-Photoroom.png"
        width={50}
        height={50}
        className="h-12 w-12 md:h-16 md:w-16"
        alt="BGFC logo"
      />
      <p className="text-[32px]">TecVoc Portal</p>
    </div>
  );
}
