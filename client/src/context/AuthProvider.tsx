import { useEffect, useState, ReactNode } from "react";
import { AuthContext } from "./AuthContext";

export type AuthUserType = {
  id: string;
  username: string;
  fullName: string;
  profilePic: string;
  gender: string;
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/me`
        );
        const data = await response.json();

        console.log(data);

        if (!response.ok) {
          throw new Error(data.error);
        }
        setAuthUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
