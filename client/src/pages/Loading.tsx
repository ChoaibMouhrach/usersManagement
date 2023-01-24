import { CgSpinnerTwo } from "react-icons/cg";
export default function Loading() {
    return (
        <div className="bg-purple text-white w-full h-screen flex items-center justify-center ">
            <div className="text-8xl">
                <CgSpinnerTwo className="animate-spin" />
            </div>
        </div>
    );
}
