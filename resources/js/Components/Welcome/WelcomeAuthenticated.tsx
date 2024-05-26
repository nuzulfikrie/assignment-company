import { Link, Head } from '@inertiajs/react';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import WelcomeUnAuthenticated from '../Welcome/WelcomeUnAuthenticated';

interface Props {
  canLogin: boolean;
  canRegister: boolean;
  laravelVersion: string;
  phpVersion: string;
}

export default function WelcomeAuthenticated({
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

      <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-50 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
        <WelcomeUnAuthenticated User={page.props.auth.user} />
      </div>
    </>
  );
}
