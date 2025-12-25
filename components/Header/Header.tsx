'use client';

import Link from 'next/link';
import css from './Header.module.css';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import useAuthStore from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import React from 'react';

const Header: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, sessionChecked, logout, user } = useAuthStore();

  // Блокуємо рендер поки сесія не перевірена
  if (!sessionChecked) return null;

  return (
    <header className={css.header}>
      <Link href="/" className={css.headerLink} aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link href="/" className={css.navigationLink}>
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
