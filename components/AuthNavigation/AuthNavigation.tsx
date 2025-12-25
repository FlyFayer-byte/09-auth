'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import css from './AuthNavigation.module.css';
import useAuthStore from '@/lib/store/authStore';

type AuthNavigationProps = {
  isAuthenticated: boolean;
  userEmail?: string;
  onLogout: () => void;
};


const AuthNavigation: React.FC<AuthNavigationProps> = () => {
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
        <>
          <li className={css.navigationItem}>
            <Link href="/profile" prefetch={false} className={css.navigationLink}>
              Profile: {user?.email}
            </Link>
            <button onClick={handleLogout} className={css.logoutButton}>
              Logout
            </button>
            {/* <p className={css.userEmail}>{user?.email}</p> */}
          </li>
          {/* <li className={css.navigationItem}> */}
          {/* <p className={css.userEmail}>{user?.email}</p> */}
          {/* <button onClick={handleLogout} className={css.logoutButton}> */}
          {/* Logout */}
          {/* </button> */}
          {/* </li> */}
        </>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <li className={css.navigationItem}>
            <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
              Login
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
              Sign up
            </Link>
          </li>
        </div>
      )}
    </ul>
  );
};

export default AuthNavigation;
