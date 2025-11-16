import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/order`, credentials: "include" }),
    tagTypes: ["product"],
    endpoints: (builder) => {
        return {
            placeOrder: builder.mutation({
                query: (orderData) => ({
                    url: "/place",
                    method: "POST",
                    body: orderData,
                }),
                invalidatesTags: ["product"],
            }),
            getcustomerorder: builder.query({
                query: () => {
                    return {
                        url: "/yourorder",
                        method: "GET"
                    }
                },
                providesTags: ["admin"]
            }),
            getorders: builder.query({
                query: () => {
                    return {
                        url: "/orders",
                        method: "GET"
                    }
                },
                providesTags: ["admin"]
            }),
        }
    }
})

export const { usePlaceOrderMutation, useGetcustomerorderQuery, useGetordersQuery } = productApi