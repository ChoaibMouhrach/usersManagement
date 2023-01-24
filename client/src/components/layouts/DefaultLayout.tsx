import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchUserConnected } from "../../features/Auth/userSlice";
import Sidebar from "../Dashboard/Sidebar";

export default function DefaultLayout() {
    const connected = useSelector(fetchUserConnected);

    if (!connected) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="flex h-screen bg-gray-ish">
            <Sidebar />
            <div className="p-4 w-full">
                <Outlet />
            </div>
        </div>
    );
}
