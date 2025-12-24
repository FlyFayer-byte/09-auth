'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/api/clientApi';
import  useAuthStore  from '@/lib/store/authStore';
import css from './SignInPage.module.css';
import type { User } from '@/types/user';
import axios, { AxiosError } from 'axios';

const SignIn = () => {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const user: User = await login({ email, password });
      setUser(user);
      router.push('/profile');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError<{ message?: string }>;
        if (error.response?.data?.message === 'Invalid credentials') {
          setError('Невірний email або пароль');
        } else if (error.response?.status === 400) {
          setError('Некоректні дані. Перевірте email та пароль');
        } else {
          setError(error.message || 'Помилка входу. Спробуйте ще раз');
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Невідома помилка');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign in</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className={css.actions}>
          <button type="submit" className={css.submitButton} disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
        </div>
        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignIn;
