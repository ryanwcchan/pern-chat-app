import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/useAuthContext";

export const PrivateRoute = () => {
  const { authUser, isLoading } = useAuthContext();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return authUser ? <Outlet /> : <Navigate to="/login" />;
};
