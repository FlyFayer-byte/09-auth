import { create } from 'zustand';
import type { User } from '@/types/user';

export type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  sessionChecked: boolean;
  setUser: (user: User) => void;
  reset: () => void;
  logout: () => void;
  setSessionChecked: (checked: boolean) => void;
};

const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuthenticated: false,
  sessionChecked: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  reset: () => set({ user: null, isAuthenticated: false }),
  logout: () => set({ user: null, isAuthenticated: false }),
  setSessionChecked: (checked) => set({ sessionChecked: checked }),
}));

export default useAuthStore;
