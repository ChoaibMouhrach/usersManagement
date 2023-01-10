import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { apiConstants } from "../constants/apiConstants";

const baseQuery = fetchBaseQuery({
    baseUrl: apiConstants.baseURL,
    prepareHeaders: (headers) => {
        headers.set("Accept", "application/json");

        if (localStorage.getItem("authToken")) {
            headers.set("Authorization", `Bearer ${localStorage.getItem("authToken")}`);
        }

        return headers;
    },
});

export const Api = createApi({
    baseQuery,
    endpoints: (builder) => ({}),
});
