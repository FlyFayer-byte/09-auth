'use client';

import { useEffect, useState } from 'react';
import { checkSession } from '@/lib/api/clientApi';
import useAuthStore from '@/lib/store/authStore';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const user = await checkSession();
        if (user) {
          setUser(user);
        } else {
          logout(); 
        }
      } catch (err) {
        console.error('Session check failed:', err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [setUser, logout]);

  if (loading) return <p>Loading...</p>;
  return <>{children}</>;
}
