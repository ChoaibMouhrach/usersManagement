import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { fetchUserConnected } from "../../features/Auth/userSlice";

export default function GuestLayout() {
    let connected = useSelector(fetchUserConnected);

    if (connected) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="w-full h-screen bg-purple flex items-center justify-center">
            <Outlet />
        </div>
    );
}
