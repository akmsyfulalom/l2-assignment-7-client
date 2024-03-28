import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userInfo) => {
              console.log("Registering user:", userInfo);
              return {
                url: "/register",
                method: "POST",
                body: userInfo,
              };
            },
          }),

        login: builder.mutation({
            query: (userInfo) => {
              console.log("Logging in user:", userInfo);
              return {
                url: "/login",
                method: "POST",
                body: userInfo,
              };
            },
          }),
    }),

})


export const {useLoginMutation, useRegisterMutation} = authApi;