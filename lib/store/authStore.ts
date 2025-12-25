import { create } from 'zustand';
import type { User } from '@/types/user';

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
  reset: () => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  reset: () => set({ user: null, isAuthenticated: false }),
}));

export default useAuthStore;
