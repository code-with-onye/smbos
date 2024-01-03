import { create } from "zustand";

type RegisterState = {
  businessName: string;
  email: string;
  password?: string;
};

type RegisterActions = {
  user: RegisterState;
  // setBusinessName: (name: string) => void;
  // setEmail: (email: string) => void;
  // setPassword: (password: string) => void;
  setUser: (user: RegisterState) => void;
};

export const useRegisterStore = create<RegisterActions>((set) => ({
  user: {
    businessName: "",
    email: "",
    password: "",
  },
  setUser: (user) => set((state) => ({ ...state.user, user })), 
}));



// setBusinessName: (name) =>
//     set((state) => ({ user: { ...state.user, businessName: name } })),
//   setEmail: (email) => set((state) => ({ user: { ...state.user, email } })),
//   setPassword: (password) =>
//     set((state) => ({ user: { ...state.user, password } })),