import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Home from "./pages/Home.tsx";
import { PrivateRoute } from "./routes/PrivateRoute.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import { AuthContextProvider } from "./context/AuthProvider.tsx";
import { RedirectRoute } from "./routes/RedirectRoute.tsx";
import Profile from "./pages/Profile.tsx";
import AddUsers from "./pages/AddUsers.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <RedirectRoute>
            <Login />
          </RedirectRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <RedirectRoute>
            <Signup />
          </RedirectRoute>
        ),
      },
      {
        path: "/chat",
        element: <PrivateRoute />,
        children: [
          {
            path: "/chat",
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "/profile",
        element: <PrivateRoute />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "/addusers",
        element: <PrivateRoute />,
        children: [
          {
            path: "/addusers",
            element: <AddUsers />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>
);
