import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import { AuthContextProvider } from "./context/AuthProvider.tsx";
import { useAuthContext } from "./context/useAuthContext.ts";

function App() {
  const { authUser, setAuthUser, isLoading } = useAuthContext();

  console.log("AuthUser: ", authUser);

  return (
    <AuthContextProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Outlet />
      </div>
    </AuthContextProvider>
  );
}

export default App;
