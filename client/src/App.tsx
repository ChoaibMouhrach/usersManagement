import { useFetchProfileQuery } from "./features/Auth/authApi";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { setUser } from "./features/Auth/userSlice";
import { useDispatch } from "react-redux";
import Loading from "./pages/Loading";

export default function App() {
    const dispatch = useDispatch();
    let response = useFetchProfileQuery(undefined, {
        skip: !Boolean(localStorage.getItem("authToken")),
    });

    useEffect(() => {
        if (response.isSuccess) {
            dispatch(setUser({ user: response.data, token: localStorage.getItem("authToken") }));
        }
    }, [response]);

    return response.isLoading ? <Loading /> : <RouterProvider router={routes} />;
}
