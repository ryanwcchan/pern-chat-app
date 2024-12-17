import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import { AuthContextProvider } from "./context/AuthProvider.tsx";
import { useAuthContext } from "./context/useAuthContext.ts";

function App() {
  const { authUser, setAuthUser, isLoading } = useAuthContext();

  console.log("AuthUser: ", authUser);

  return (
    <AuthContextProvider>
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
    </AuthContextProvider>
  );
}

export default App;
