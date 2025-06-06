'use client';

import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { usePathname } from 'next/navigation';

export default function Home() {
  const { isAuthenticated } = useKindeBrowserClient();
  const pathname = usePathname();

  return (
    <div className='flex items-center justify-center gap-10 h-screen flex-col w-full max-w-96 mx-auto'>

      <h1 className='text-3xl font-bold'>Kinde Auth Next.js Example</h1>

      {!isAuthenticated && (
        <LoginLink
          postLoginRedirectURL={pathname}
          authUrlParams={{
            scope: '1234567890',
            connection_id: 'conn_019506549e971c5dfc9dee81d9b23037',
            login_hint: "nathaly12toledo@gmail.com", // TODO: remove this line to allow user to enter email

          }}
          className='m-0 flex h-14 w-full items-center justify-center rounded bg-crRed px-4 py-3 text-center font-bold uppercase text-white bg-red-500 hover:opacity-100 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:opacity-100'
        >
          Login
        </LoginLink>
      )}
      {!isAuthenticated && (
        <RegisterLink
          postLoginRedirectURL={pathname}
          authUrlParams={{
              connection_id: 'conn_019506549e971c5dfc9dee81d9b23037'
          }}
          className='m-0 flex h-14 w-full items-center justify-center rounded bg-crRed px-4 py-3 text-center font-bold uppercase text-white bg-red-500 hover:opacity-100 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:opacity-100'
        >
          Register
        </RegisterLink>
      )}
      {isAuthenticated && (
        <LogoutLink className='m-0 flex h-14 w-full items-center justify-center rounded bg-crRed px-4 py-3 text-center font-bold uppercase text-white bg-red-500 hover:opacity-100 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:opacity-100'>
          Logout
        </LogoutLink>
      )}
    </div>
  );
}
