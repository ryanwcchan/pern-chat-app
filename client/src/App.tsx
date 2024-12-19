import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import { useAuthContext } from "./context/useAuthContext.ts";

function App() {
  const { authUser, setAuthUser, isLoading } = useAuthContext();

  console.log("AuthUser: ", authUser);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
