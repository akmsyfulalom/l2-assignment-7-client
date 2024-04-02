import { baseApi } from "@/redux/api/baseApi";

const communityApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
        getCommunity : builder.query({
            query: () => {
                return {
                    url: "/community", 
                    method: "GET"
                }
            },
            providesTags: ['community']
        }), 
        getSingleCommunity: builder.query({
            query: (id) => {
                return {
                    url: `/community/${id}`, 
                    method: "GET"
                }
            }, 
            providesTags: ["community"]

        }),
        postCommunity : builder.mutation({
            query: (data) => {
                return {
                    url: "/community", 
                    method: "POST", 
                    body: data
                }
            }, 
            invalidatesTags: ['community']
        })

    })
})



export const {useGetCommunityQuery, useGetSingleCommunityQuery, usePostCommunityMutation} = communityApi