import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    value: null,
};

export let userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.value = payload;
            localStorage.setItem("authToken", payload.token);
        },
        destroyUser: (state) => {
            state.value = null;
            localStorage.removeItem("authToken");
        },
    },
});

export const fetchUser = (state: { user: { value: any } }) => state.user.value?.user;
export const fetchUserConnected = (state: { user: { value: any } }) => Boolean(state.user.value?.user);
export const fetchToken = (state: { user: { value: any } }) => state.user.value?.token;
export const fetchAuth = (state: { user: { value: any } }) => state.user.value;
export const { setUser, destroyUser } = userSlice.actions;
export default userSlice.reducer;
