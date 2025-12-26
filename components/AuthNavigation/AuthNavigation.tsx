'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import css from './AuthNavigation.module.css';
import React from 'react';

interface AuthNavigationProps {
  isAuthenticated: boolean;
  userEmail?: string;
  onLogout: () => Promise<void>;
}

const AuthNavigation: React.FC<AuthNavigationProps> = ({
  isAuthenticated,
  userEmail,
  onLogout,
}) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await onLogout();
      router.push('/sign-in');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  if (isAuthenticated) {
    return (
      <>
        <li className={css.navigationItem}>
          <Link href="/notes/filter/all" className={css.navigationLink}>
            Notes
          </Link>
        </li>
        <li className={css.navigationItem}>
          <Link href="/profile" className={css.navigationLink}>
            Profile: {userEmail}
          </Link>
        </li>
        <li className={css.navigationItem}>
          <button onClick={handleLogout} className={css.logoutButton}>
            Logout
          </button>
        </li>
      </>
    );
  }

  return (
    <>
      <li className={css.navigationItem}>
        <Link href="/sign-in" className={css.navigationLink}>
          Sign In
        </Link>
      </li>
      <li className={css.navigationItem}>
        <Link href="/sign-up" className={css.navigationLink}>
          Sign Up
        </Link>
      </li>
    </>
  );
};

export default AuthNavigation;
