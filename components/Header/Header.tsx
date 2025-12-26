'use client';

import Link from 'next/link';
import css from './Header.module.css';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import useAuthStore from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { logout as logoutApi } from '@/lib/api/clientApi';

const Header = () => {
  const router = useRouter();

  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const user = useAuthStore(state => state.user);
  const resetAuth = useAuthStore(state => state.logout);

  const handleLogout = async () => {
    await logoutApi();
    resetAuth();
    router.push('/sign-in');
  };

  return (
    <header className={css.header}>
      <Link className={css.headerLink} href="/" aria-label="Home">
        NoteHub
      </Link>

      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link className={css.navigationLink} href="/">
              Home
            </Link>
          </li>

          <AuthNavigation
            isAuthenticated={isAuthenticated}
            userEmail={user?.email}
            onLogout={handleLogout}
          />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
