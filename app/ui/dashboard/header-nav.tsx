"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function HeaderNav({studentName}: {studentName: string}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef: any = useRef(null);

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
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            {studentName}
          </button>
          {isOpen && (
            <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg">
              <div className="px-1 py-1">
                <button
                  className="group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-900 hover:bg-blue-500 hover:text-white"
                  onClick={() => console.log('Profile')}
                >
                  Profile
                </button>
                <button
                  className="group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-900 hover:bg-blue-500 hover:text-white"
                  onClick={() => console.log('Change Password')}
                >
                  Change Password
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
