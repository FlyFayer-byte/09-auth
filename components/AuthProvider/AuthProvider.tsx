'use client';

import { useEffect, ReactNode } from 'react';
import { checkSession } from '@/lib/api/clientApi';
import useAuthStore from '@/lib/store/authStore';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, logout, setSessionChecked } = useAuthStore();

  useEffect(() => {
    const verifySession = async () => {
      try {
        const user = await checkSession();
        if (user) setUser(user);
        else logout();
      } catch {
        logout();
      } finally {
        setSessionChecked(true);
      }
    };
    verifySession();
  }, [setUser, logout, setSessionChecked]);

  return <>{children}</>;
}
