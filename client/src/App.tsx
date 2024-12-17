import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <footer className="footer footer-center bg-black text-base-content p-4">
        <p className="text-white">
          Copyright © 2024 - Made by Ryan Chan
          <a href="https://github.com/ryanwcchan" className="link link-neutral">
            Github
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
