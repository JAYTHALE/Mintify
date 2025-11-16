import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const customerApi = createApi({
    reducerPath: "customerApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/admin`, credentials: "include" }),
    tagTypes: ["customer"],
    endpoints: (builder) => {
        return {
            getcustomer: builder.query({
                query: () => {
                    return {
                        url: "/customers",
                        method: "GET"
                    }
                },
                providesTags: ["customers"]
            })
        }
    }
})

export const { useGetcustomerQuery } = customerApi