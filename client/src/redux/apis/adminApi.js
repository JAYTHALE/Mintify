import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/product`, credentials: "include" }),
    tagTypes: ["admin"],
    endpoints: (builder) => {
        return {
            getproduct: builder.query({
                query: () => {
                    return {
                        url: "/all",
                        method: "GET"
                    }
                },
                providesTags: ["admin"]
            }),
            getProductbyid: builder.query({
                query: (id) => ({
                    url: `/product/${id}`,
                    method: "GET",
                }),
                providesTags: ["admin"],
            }),

        }
    }
})

export const { useGetproductQuery, useGetProductbyidQuery } = adminApi