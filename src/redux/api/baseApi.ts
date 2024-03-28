import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: 'baseApi', 
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://l2-assignment-6-server-snowy.vercel.app/api/v1', 
        credentials: 'include',
    }),
    tagTypes: ["supply"],
    endpoints: () => ({}),
})