'use client';
import React from 'react';
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { usePathname } from 'next/navigation';

const Dashboard = () => {
  const pathname = usePathname();

  return (
    <LoginLink
      postLoginRedirectURL={`${pathname}`}
      className='m-0 flex h-14 w-full items-center justify-center rounded bg-crRed px-4 py-3 text-center font-bold uppercase text-white bg-red-500 hover:opacity-100 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:opacity-100'
    >
      Login
    </LoginLink>
  );
};

export default Dashboard;
