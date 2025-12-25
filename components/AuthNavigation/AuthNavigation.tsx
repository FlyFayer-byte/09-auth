'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import css from './AuthNavigation.module.css';
import useAuthStore from '@/lib/store/authStore';

const AuthNavigation = () => {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      logout();
      document.cookie = 'accessToken=; Max-Age=0; path=/';
      document.cookie = 'refreshToken=; Max-Age=0; path=/';
      router.push('/sign-in');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <ul className={css.navigationList}>
      {isAuthenticated ? (
        <li className={css.navigationItem}>
          <Link href="/profile" className={css.navigationLink}>
            Profile: {user?.email}
          </Link>
          <button onClick={handleLogout} className={css.logoutButton}>
            Logout
          </button>
        </li>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link href="/sign-in" className={css.navigationLink}>
              Sign in
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link href="/sign-up" className={css.navigationLink}>
              Sign up
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default AuthNavigation;
