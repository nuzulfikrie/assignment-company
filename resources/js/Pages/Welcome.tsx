import { Link, Head } from '@inertiajs/react';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import WelcomeUnAuthenticated from '../Components/Welcome/WelcomeUnAuthenticated';
import HeaderUnauthenticated from '../Components/Pages/HeaderUnauthenticated';
import HeaderAuthenticated from '../Components/Pages/HeaderAuthenticated';

interface Props {
  canLogin: boolean;
  canRegister: boolean;
  laravelVersion: string;
  phpVersion: string;
}

export default function Welcome({
  canLogin,
  canRegister,
  laravelVersion,
  phpVersion,
}: Props) {
  const route = useRoute();
  const page = useTypedPage();

  return (
    <>
      <Head title="Welcome" />
      {/*check if user already authenticated */}

      {page.props.auth.user ? (  <HeaderAuthenticated/>) : (    <HeaderUnauthenticated/>)}


      <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-50 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
        {canLogin && (
          <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-right">
            {page.props.auth.user ? (
              <Link
                href={route('dashboard')}
                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href={route('login')}
                  className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                >
                  Log in
                </Link>

                {canRegister && (
                  <Link
                    href={route('register')}
                    className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                  >
                    Register
                  </Link>
                )}
              </>
            )}
          </div>
        )}

        <WelcomeUnAuthenticated User={page.props.auth.user} />
      </div>
    </>
  );
}
