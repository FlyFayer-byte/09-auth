'use client';

import Link from 'next/link';
import css from './AuthNavigation.module.css';

interface AuthNavigationProps {
  isAuthenticated: boolean;
  userEmail?: string;
  onLogout: () => void;
}

const AuthNavigation: React.FC<AuthNavigationProps> = ({
  isAuthenticated,
  userEmail,
  onLogout,
}) => {
  return (
    <ul className={css.navigationList}>
      {isAuthenticated ? (
        <>
          <li className={css.navigationItem}>
            <Link href="/profile" prefetch={false} className={css.navigationLink}>
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>{userEmail}</p>
            <button onClick={onLogout} className={css.logoutButton}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
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
        </>
      )}
    </ul>
  );
};

export default AuthNavigation;
