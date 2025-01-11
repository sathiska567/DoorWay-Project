import { create } from 'zustand';

const useAuthStore = create((set) => ({
  token: null,
  username: '',
  email: '',
  setToken: (token) => set({ token }),
  setUsername: (username) => set({ username }),
  setEmail: (email) => set({ email }),
  removeToken: () => set({ token: null }), 
}));

export default useAuthStore;
