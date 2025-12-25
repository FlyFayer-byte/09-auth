import { cookies } from 'next/headers';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getMeServer } from '@/lib/api/serverApi';
import type { User } from '@/types/user';
import css from './ProfilePage.module.css';

export const metadata: Metadata = {
  title: 'Profile Page',
  description: 'User profile page with avatar and details.',
};

export default async function ProfilePage() {
  const cookieStore = await cookies(); // <-- await
  const cookieHeader = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join('; ');

  const user: User = await getMeServer(cookieHeader);

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar ?? '/default-avatar.png'}
            alt={`${user.username}'s Avatar`}
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
