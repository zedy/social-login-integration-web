import { ReactElement } from 'react';

export type GuardProps = {
  children: ReactElement | null;
};

export type UserProfile = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
};

export interface AuthProps {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: UserProfile | null;
  token?: string | null;
}

export interface AuthActionProps {
  type: string;
  payload?: AuthProps;
}

export interface InitialLoginContextProps {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: UserProfile | null | undefined;
}

export interface JWTDataProps {
  userId: string;
}

export type AuthContextType = {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user: UserProfile | null | undefined;
  logout: () => void;
  login: (data: Record<string, string>) => Promise<void>;
  registerUser: (
    data: Record<string, string>
  ) => Promise<{ message: string; created: boolean }>;
};