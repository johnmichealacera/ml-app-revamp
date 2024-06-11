"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LockClosedIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Profile', href: '/dashboard/profile', icon: UserCircleIcon },
  { name: 'Change Password', href: '/dashboard/change-password', icon: LockClosedIcon },
];

export default function HeaderNav({ studentName, role }: { studentName: string; role: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef: any = useRef(null);
  const pathname = usePathname();

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleButtonClick = () => {
    if (role === 'student') {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="bg-gray-800 text-white flex justify-end items-center p-4">
      <div className="flex items-center space-x-4">
        <Image
          src="/profile-fallback.png"
          width={50}
          height={50}
          className="h-12 w-12 rounded-full"
          alt="Profile"
        />
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={handleButtonClick}
            className={clsx(
              "inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none",
              {
                "bg-blue-600 hover:bg-blue-700": role === 'student',
                "bg-gray-600 cursor-not-allowed": role !== 'student',
              }
            )}
          >
            {studentName}
          </button>
          {isOpen && role === 'student' && (
            <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg">
              <div className="px-1 py-1">
                {links.map((link) => {
                  const LinkIcon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={clsx(
                        'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                        {
                          'bg-sky-100 text-blue-600': link.href === pathname,
                        }
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <LinkIcon className="w-6" />
                      <p className="md:block">{link.name}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
