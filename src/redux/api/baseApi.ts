import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: 'baseApi', 
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://l2-assignment-7-server-eight.vercel.app/api/v1', 
        credentials: 'include',
    }),
    tagTypes: ["supply", "testimonial", "community", "comment", "volunteer", "users"],
    endpoints: () => ({}),
})