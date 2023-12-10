import { ReactNode } from "react";

export type AuthAction = { type: "LOGIN_SUCCESS"; payload: any } | { type: "LOGOUT" };

export type InitialStateType = {
  user: any | null;
  isAuth: boolean;
  dispatch: React.Dispatch<AuthAction>;
};

export interface AuthState {
  user: any | null;
  isAuth: boolean;
}

export type AuthContextType = {
  state: InitialStateType;
  dispatch: React.Dispatch<AuthAction>;
};

export interface AuthContextProviderProps {
  children: ReactNode;
}
