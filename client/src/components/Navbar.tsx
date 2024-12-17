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
  ]

  return (
    <nav className="flex items-center justify-between w-full p-[2rem] border-b-2 border-gray-200">
      <div className="font-bold text-4xl">Messenger</div>
      <ul className="flex gap-[2rem]">
        {navItems.map((item) => (
          <li key={item.link} className="font-bold text-2xl hover:underline hover:text-red-500">
            <Link to={item.link}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
