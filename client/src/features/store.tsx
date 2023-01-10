import { configureStore } from "@reduxjs/toolkit";
import { Api } from "./Api";
import UserSlice from "./Auth/userSlice";

const store = configureStore({
    reducer: {
        user: UserSlice,
        [Api.reducerPath]: Api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(Api.middleware),
    devTools: true,
});

export default store;
