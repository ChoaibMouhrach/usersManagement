import { RiUserSmileLine } from "react-icons/ri";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../features/Auth/authApi";
import { MouseEvent } from "react";
import { destroyUser } from "../../features/Auth/userSlice";

export default function Sidebar() {
    const dispatch = useDispatch();
    const [logout] = useLogoutMutation();

    async function handleLogout(event: MouseEvent<HTMLButtonElement>) {
        try {
            await logout({});
            dispatch(destroyUser());
        } catch (err) {
            alert(err);
        }
    }

    return (
        <div className="w-12 p-1 bg-purple text-white flex flex-col gap-4 py-4">
            <div className="flex items-center justify-center">
                <Link to="/dashboard" className="w-8 h-8 bg-white text-purple flex items-center justify-center rounded-md">
                    <RiUserSmileLine className="w-7 h-7" />
                </Link>
            </div>
            <div className="flex flex-1 flex-col items-center gap-2">
                <Link to="/dashboard" className="w-8 h-8  text-white flex items-center justify-center rounded-sm">
                    <MdOutlineDashboardCustomize className="w-5 h-5" />
                </Link>
            </div>
            <div className="flex flex-col items-center gap-2">
                <button onClick={handleLogout} className="w-8 h-8 bg-white text-purple flex items-center justify-center rounded-md">
                    <BiLogOutCircle className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
