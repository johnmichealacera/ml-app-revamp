import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image
            src="/socorro-logo.png"
            width={50}
            height={50}
            className="h-12 w-12"
            alt="Socorro logo"
          />
      <p className="text-[32px]">Socorro Help App</p>
    </div>
  );
}
