import { create } from 'zustand';
import type { User } from '@/types/user';

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
  logout: () => void; // додали у тип
};

const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  clearIsAuthenticated: () => set({ user: null, isAuthenticated: false }),
  logout: () => set({ user: null, isAuthenticated: false }), // додали у стор
}));

export default useAuthStore;
