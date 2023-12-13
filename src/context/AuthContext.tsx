import { AuthAction, AuthContextProviderProps, AuthState, InitialStateType } from "@/types/context.types";
import { createContext, useEffect, useReducer } from "react";

const initialUser: any | null = (() => {
  const item = sessionStorage.getItem("user");
  if (item === null) {
    return null;
  }
  try {
    return JSON.parse(item);
  } catch (error) {
    return null;
  }
})();

const INITIAL_STATE: InitialStateType = {
  user: initialUser,
  isAuth: false,
  dispatch: () => null,
};

const AuthReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isAuth: true,
      };
    case "LOGOUT":
      return {
        user: null,
        isAuth: false,
      };
    default:
      return state;
  }
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer<React.Reducer<AuthState, AuthAction>>(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuth: state.isAuth,
        dispatch,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
