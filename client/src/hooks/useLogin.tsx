/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAuthContext } from "../context/useAuthContext";

type Inputs = {
  username: string;
  password: string;
};

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setAuthUser } = useAuthContext();

  const login = async (inputs: Inputs) => {
    setError("");
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(inputs),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setAuthUser(data);
      } else {
        const errorData = data.error;
        setError(errorData.message || "Invalid login credentials");
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, setError };
};

export default useLogin;
