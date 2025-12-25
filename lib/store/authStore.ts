import { create } from 'zustand';
import type { User } from '@/types/user';

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  reset: () => void;
  logout: () => void;
};

const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  reset: () => set({ user: null, isAuthenticated: false }),
  logout: () => set({ user: null, isAuthenticated: false }),
  
}));

export default useAuthStore;
