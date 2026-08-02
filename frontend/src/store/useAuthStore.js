import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('adminToken') || null,
  login: (userData, token) => {
    localStorage.setItem('adminToken', token);
    set({ user: userData, token });
  },
  logout: () => {
    localStorage.removeItem('adminToken');
    set({ user: null, token: null });
  }
}));
