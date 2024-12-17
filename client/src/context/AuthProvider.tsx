import { useEffect, useState, ReactNode } from "react";
import { AuthContext } from "./AuthContext";

type AuthUserType = {
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
        const response = await fetch("/api/auth/me");
        const data = await response.json();

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
