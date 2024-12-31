import useLogout from "../../hooks/useLogout";

export default function LogoutButton() {
  const { logout, loading } = useLogout();

  return (
    <button onClick={logout} disabled={loading}>
      Logout
    </button>
  );
}
