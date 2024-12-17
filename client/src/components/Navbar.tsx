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
      <div className="font-bold text-4xl text-white">Messenger</div>
      <ul className="flex gap-[2rem]">
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
    </nav>
  );
}
