import { baseApi } from "@/redux/api/baseApi";

const testimonialApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTestimonialApi : builder.query({
            query: () => {
                return {
                    url: "/testimonial", 
                method: "GET"
                }
            },
            providesTags: ["testimonial"]
        }), 

        postTestimonialApi : builder.mutation({
            query: (data) => {
                return {
                    url: "create-testimonial", 
                    method: "POST", 
                    body: data
                }
            }
        })

    })

})


export const {
    useGetTestimonialApiQuery, 
    usePostTestimonialApiMutation
} = testimonialApi