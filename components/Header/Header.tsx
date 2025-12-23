// components/Header/Header.tsx
'use client';
import Link from 'next/link';
import css from './Header.module.css';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from 'next/navigation';

const Header = () => {
  // const categories = await getEnabledCategories();
  const router = useRouter();
  const isAuthenticated = useAuthStore.getState().isAuthenticated;
  const user = useAuthStore.getState().user;
  const logout = useAuthStore.getState().logout;

  
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
            onLogout={() => {
              logout();
              router.push('/sign-in');
            }}
          />
          <li className={css.navigationItem}>
            <Link className={css.navigationLink} href="/notes/filter/all">
              Notes
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
