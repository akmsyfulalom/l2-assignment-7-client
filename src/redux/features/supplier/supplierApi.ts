import { baseApi } from "@/redux/api/baseApi";

const supplyApi = baseApi.injectEndpoints({
endpoints: (builder) => ({
    getSupplier: builder.query({
        query: () =>{
            return{
                url: "/supplies", 
                method: "GET",
            }
        },
        providesTags: ["supply"]
    }), 
    getSixSupply: builder.query({
query: () => {
  return {
    url: "/supplies", 
    method: "GET", 
    params: {
      limit: 6, 
    }
  }
}
    }),
    getSingleSupply: builder.query({
        query: (id) => {
            return {
                url: `/supply/${id}`, 
                method: "GET"
            }
        },
        providesTags: ["supply"]
    }),
    postSupply: builder.mutation({
        query: (data) => { 
            return {
            url: "/create-supply",
            method: "POST", 
            body: data
        }
        },
        invalidatesTags: ["supply"]
    }), 
    updateSupply: builder.mutation({
        query: ({ id, data }) => {
          console.log("Data sent to updateSupply mutation:", data); 
          return {
            url: `/supply/${id}`,
            method: "PUT",
            body: data,
          };
        },
        invalidatesTags: ["supply"],
      }),
      
     
      
    deleteSupply: builder.mutation({
        query: ({id}) => {
          console.log("🚀 ~ id:", id)
          
          return {
            url: `/supply/${id}`,
            method: "DELETE",
            credentials: "include",
          };
        },
        invalidatesTags: ["supply"],
      }),

})
})

export const {
  useGetSixSupplyQuery, 
    useGetSupplierQuery, 
    useGetSingleSupplyQuery, 
    usePostSupplyMutation, 
    useUpdateSupplyMutation, 
    useDeleteSupplyMutation
} = supplyApi