// RedirectRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/useAuthContext";

export const RedirectRoute = ({ children }: { children: React.ReactNode }) => {
  const { authUser, isLoading } = useAuthContext();

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading spinner or screen
  }

  return authUser ? <Navigate to="/dashboard" /> : <>{children}</>;
};
