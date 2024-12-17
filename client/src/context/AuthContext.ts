import { createContext, SetStateAction, Dispatch } from "react";

type AuthUserType = {
  id: string;
  username: string;
  fullName: string;
  profilePic: string;
  gender: string;
};

export const AuthContext = createContext<{
  authUser: AuthUserType | null;
  setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>;
  isLoading: boolean;
}>({
  authUser: null,
  setAuthUser: () => {},
  isLoading: true,
});
