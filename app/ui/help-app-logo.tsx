import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import { getUserdata } from '@/auth';

export default async function HelpAppLogo() {
  const userdata: any = await getUserdata();

  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white w-80 md:w-80 lg:w-48`}
    >
      <Image
        src="/socorro-logo.png"
        width={50}
        height={50}
        className="h-12 w-12 md:h-16 md:w-16"
        alt="Socorro logo"
      />
      {userdata?.department === 'hospital' && (
        <Image
          src="/hospital.png"
          width={50}
          height={50}
          className="h-12 w-12 md:h-16 md:w-16"
          alt="Hospital logo"
        />
      )}
      {userdata?.department === 'police' && (
        <Image
          src="/police.png"
          width={50}
          height={50}
          className="h-12 w-12 md:h-16 md:w-16"
          alt="Police logo"
        />
      )}
      {userdata?.department === 'fire' && (
        <Image
          src="/fire.png"
          width={50}
          height={50}
          className="h-12 w-12 md:h-16 md:w-16"
          alt="Fire logo"
        />
      )}
      <p className="text-[32px]">Socorro Help App</p>
    </div>
  );
}
