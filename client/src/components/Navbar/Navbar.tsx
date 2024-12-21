import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const { authUser } = useAuthContext();

  const loggedOutNavItems = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Login",
      link: "/login",
    },
    {
      label: "Sign Up",
      link: "/signup",
    },
  ];

  const loggedInNavItems = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Profile",
      link: "/profile",
    },
    {
      label: "Chats",
      link: "/dashboard",
    },
    {
      label: "Logout",
      link: "/login",
    },
  ];

  const navItems = authUser ? loggedInNavItems : loggedOutNavItems;

  return (
    <nav className="flex items-center justify-between w-full p-[2rem] navbar bg-primary">
      {/* Mobile Nav */}
      <div className="navbar lg:hidden">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-primary border-2 border-black rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navItems.map((item) => (
              <Link
                to={item.link}
                className="font-bold text-2xl text-black btn btn-ghost"
                key={item.link}
              >
                {(item.label === "Logout" && <LogoutButton />) || item.label}
              </Link>
            ))}
          </ul>
        </div>
      </div>

      {/* Desktop Nav */}
      <div className="navbar-start hidden lg:flex">
        <ul className="menu menu-horizontal">
          {navItems.map((item) => (
            <Link
              to={item.link}
              className="font-bold text-2xl text-black btn btn-ghost"
              key={item.link}
            >
              {(item.label === "Logout" && <LogoutButton />) || item.label}
            </Link>
          ))}
        </ul>
      </div>

      {/* Logo */}
      <div>
        <div className="font-bold text-4xl text-black">Messenger</div>
        {authUser && (
          <img
            className="w-12 mx-4"
            src={authUser?.profilePic}
            alt="profile pic"
          />
        )}
      </div>
    </nav>
  );
}
