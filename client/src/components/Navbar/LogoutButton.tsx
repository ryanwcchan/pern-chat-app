import React from "react";
import useLogout from "../../hooks/useLogout";

export default function LogoutButton() {
  const { logout, loading } = useLogout();

  return <button onClick={logout}>Logout</button>;
}
