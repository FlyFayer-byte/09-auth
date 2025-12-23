'use client';
import css from './EditProfilePage.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';



const EditProfilePage = () => {
    const router = useRouter();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <Image src="" alt="User Avatar" width={120} height={120} className={css.avatar} />

        <form className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input id="username" type="text" className={css.input} />
          </div>

          <p>Email: user_email@example.com</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              // При натисканні на кнопку Cancel користувач повинен повернутися назад на сторінку профілю.
              onClick={() => router.push('/profile')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfilePage;
