'use client';

import Link from 'next/link';
import css from './Header.module.css';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import AuthInitializer from '../AuthInitializer/AuthInitializer';

const Header = () => {
  return (
    <header className={css.header}>
      <AuthInitializer />
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
          <li className={css.navigationItem}>
            <Link href="/notes/filter/all" className={css.navigationLink}>
              Notes
            </Link>
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
