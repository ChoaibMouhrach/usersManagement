import { createBrowserRouter, Navigate } from "react-router-dom";
import GuestLayout from "./components/layouts/GuestLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DefaultLayout from "./components/layouts/DefaultLayout";
import Dashboard from "./pages/Dashboard/Dashboard";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/login" replace />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
]);

export default routes;
