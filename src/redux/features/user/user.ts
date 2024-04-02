import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => {
                return {
                    url: "/user", 
                    method: "GET"
                }
            }, 
            providesTags: ["users"]
        }), 
        getSingleUser:  builder.query({
            query: (email) => {
                return {
                    url: `/user/${email}`, 
                method: "GET"
                }
            }, 
            providesTags: ["users"]
        }), 
        postUser: builder.mutation({
            query: (data) => ({
              url: "/user",
              method: "POST",
              body: data,
            }),
            invalidatesTags: ["users"],
          }),
    })
}); 

export const {useGetUsersQuery, useGetSingleUserQuery, usePostUserMutation} = userApi