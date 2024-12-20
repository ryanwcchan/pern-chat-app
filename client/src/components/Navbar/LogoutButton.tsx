import React from "react";
import useLogout from "../../Hooks/useLogout";

export default function LogoutButton() {
  const { logout, loading } = useLogout();

  return <button onClick={logout}>Logout</button>;
}
