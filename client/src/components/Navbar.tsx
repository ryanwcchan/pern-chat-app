import { Link } from "react-router-dom";

export default function Navbar() {
  const navItems = [
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

  return (
    <nav className="flex items-center justify-between w-full p-[2rem] navbar bg-neutral">
      <div className="navbar lg:hidden">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden text-white"
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
            className="menu menu-sm dropdown-content bg-info rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navItems.map((item) => (
              <Link
                to={item.link}
                className="font-bold text-2xl text-white btn btn-ghost"
                key={item.link}
              >
                <li>{item.label}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
      <div className="font-bold text-4xl text-white">Messenger</div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal">
          {navItems.map((item) => (
            <Link
              to={item.link}
              className="font-bold text-2xl text-white btn btn-ghost"
              key={item.link}
            >
              <li>{item.label}</li>
            </Link>
          ))}
        </ul>
      </div>
    </nav>
  );
}
