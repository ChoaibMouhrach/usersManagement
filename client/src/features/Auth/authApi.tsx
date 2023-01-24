import { Api } from "../Api";

export const authApi = Api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "/auth",
                method: "POST",
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: "/register",
                method: "POST",
                body: data,
            }),
        }),
        FetchUsers: builder.query({
            query: ({ page, search }: { page?: number; search?: string }) => {
                let url = `/users`;

                if (page) {
                    url += `?page=${page}`;
                }

                if (search) {
                    if (url.includes("?")) {
                        url += "&search=" + search;
                    } else {
                        url += "?search" + search;
                    }
                }

                return url;
            },
        }),
        showUsers: builder.query({
            query: (id: number) => `/users/${id}`,
        }),
        storeUser: builder.mutation({
            query: (data) => ({
                url: "/users",
                method: "POST",
                body: data,
            }),
        }),
        updateUser: builder.mutation({
            query: ({ id, data }: { id: number; data: any }) => ({
                url: `/users/${id}`,
                method: "POST",
                body: { ...data, _method: "patch" },
            }),
        }),
        deleteUser: builder.mutation({
            query: (id: number) => ({
                url: `/users/${id}`,
                method: "DELETE",
            }),
        }),
        fetchProfile: builder.query({
            query: () => "/profile",
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "post",
            }),
        }),
        fetchRoles: builder.query({
            query: () => "/roles",
        }),
    }),
});

export const { useFetchRolesQuery, useFetchProfileQuery, useLoginMutation, useRegisterMutation, useDeleteUserMutation, useFetchUsersQuery, useShowUsersQuery, useUpdateUserMutation, useStoreUserMutation, useLogoutMutation } = authApi;
