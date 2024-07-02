'use client';
import {
  UserGroupIcon,
  DocumentDuplicateIcon,
  BriefcaseIcon,
  UsersIcon,
  DocumentIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  // { name: 'Internship', href: '/dashboard/internship', icon: BriefcaseIcon },
  { name: 'Enrollment', href: '/dashboard/enrollment', icon: UserGroupIcon },
  { name: 'Classes', href: '/dashboard/classes', icon: DocumentDuplicateIcon },
  { name: 'Trainers', href: '/dashboard/trainers', icon: UsersIcon },
];

const adminLinks = [
  // { name: 'Internship', href: '/dashboard/internship', icon: InformationCircleIcon },
  { name: 'Students', href: '/dashboard/registration', icon: UserGroupIcon },
  { name: 'Trainers', href: '/dashboard/trainers', icon: UsersIcon },
  { name: 'Courses', href: '/dashboard/courses', icon: BriefcaseIcon },
  { name: 'Subjects', href: '/dashboard/subjects', icon: DocumentIcon },
];

export default function NavLinks({userdata}: {userdata: any}) {
  const pathname = usePathname();
  const navLinks = userdata?.role === 'student' ? links : adminLinks;

  return (
    <>
      {navLinks.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx('flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': link.href === pathname
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
