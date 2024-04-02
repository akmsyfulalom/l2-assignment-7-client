import { baseApi } from "@/redux/api/baseApi";

const commentApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
        getComment: builder.query({
            query: (id) => { 
                return {
                    url: `/comment?id=${id}`, 
                    method: "GET"
                }
            },
            providesTags: ["comment"]
        }),
        postComment : builder.mutation({
            query: (data) => {
                return {
                    url: "/comment", 
                    method: "POST", 
                    body: data
                }
            },
            invalidatesTags: ["comment"]
        })
    })
})


export const {useGetCommentQuery, usePostCommentMutation} = commentApi