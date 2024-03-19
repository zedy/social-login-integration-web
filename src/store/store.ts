/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/prefer-default-export */
// libs
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// types
import User from '../types/user';
import { setSession } from '../utils/tokenizer';

type State = {
  currentUser: User | null;
};

// initial state
export const initialState: State = {
  currentUser: null,
};

// TODO: create a typeface for the param: set
// @ts-ignore
const storeObject = (set) => ({
  currentUser: null,
  loginUser: (user: User) =>
    set(
      (store: State) => ({
        ...store,
        currentUser: user,
      }),
      false,
      'user logged in'
    ),
  logoutUser: () => {
    set(
      (store: State) => ({
        ...store,
        currentUser: null,
      }),
      false,
      'user logged out'
    );
    setSession(null);
  },
  updateProfile: (profile) => {
    set(
      (store: State) => ({
        ...store,
        currentUser: { ...store.currentUser, profile },
      }),
      false,
      'user profile updated'
    );
  },
});

// TODO: if prod then no devtools
export const useStore = create(
  persist(devtools(storeObject), { name: 'store' })
);