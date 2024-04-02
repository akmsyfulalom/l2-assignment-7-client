import { baseApi } from "@/redux/api/baseApi";

const volunteerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getVolunteer: builder.query({
            query: () => {
                return {
                    url: "/volunteer", 
                    method: "GET"
                }
            }, 
            providesTags: ["volunteer"]
        }), 
        postVolunteer: builder.mutation({
            query: (data) => {
                return {
                    url: "/volunteer", 
                    method: "POST", 
                    body: data
                }
            }
        })
    })
});


export const {useGetVolunteerQuery, usePostVolunteerMutation} = volunteerApi