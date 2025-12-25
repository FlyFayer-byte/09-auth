'use client';

import { useEffect, useState } from 'react';
import { checkSession } from '@/lib/api/clientApi';
import useAuthStore from '@/lib/store/authStore';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const user = await checkSession();
        if (user) {
          setUser(user);
        } else {
          clearIsAuthenticated();
        }
      } catch (err) {
        console.error('Session check failed:', err);
        clearIsAuthenticated();
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [setUser, clearIsAuthenticated]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}
