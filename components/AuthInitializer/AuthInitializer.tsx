'use client';

import { useEffect } from 'react';
import useAuthStore from '@/lib/store/authStore';
import { checkSession } from '@/lib/api/clientApi';

const AuthInitializer = () => {
  const setUser = useAuthStore(state => state.setUser);
  const reset = useAuthStore(state => state.reset);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await checkSession();
        if (user) {
          setUser(user);
        } else {
          reset();
        }
      } catch (err) {
        reset();
      }
    };
    initAuth();
  }, [setUser, reset]);

  return null;
};

export default AuthInitializer;
