import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/auth`, credentials: "include", prepareHeaders: (headers, { getState }) => {
            headers.set('X-Prepared-By', 'MyFrontend');
            return headers;
        },
    }),
    tagTypes: ["auth"],
    endpoints: (builder) => {
        return {
            RegisterAdmin: builder.mutation({
                query: (data) => {
                    return {
                        url: "/admin/register",
                        method: "POST",
                        body: data,

                    }
                },
                providesTags: ["auth"]
            }),
            LoginAdmin: builder.mutation({
                query: userData => {
                    return {
                        url: "/admin/login",
                        method: "POST",
                        body: userData

                    }
                },
                invalidatesTags: ["auth"],
                transformResponse: data => {
                    localStorage.setItem("admin", JSON.stringify(data.data))
                    return data.data
                }
            }),
            LogoutAdmin: builder.mutation({
                query: userData => {
                    return {
                        url: "/admin/logout",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"],
                transformResponse: data => {
                    localStorage.removeItem("admin")
                    return data.result
                }
            }),


            Registercustomer: builder.mutation({
                query: (data) => {
                    return {
                        url: "/user/register",
                        method: "POST",
                        body: data,
                    }
                },
                providesTags: ["auth"]
            }),
            Logincustomer: builder.mutation({
                query: userData => {
                    return {
                        url: "/user/login",
                        method: "POST",
                        body: userData

                    }
                },
                invalidatesTags: ["auth"],
                transformResponse: (response) => {
                    const customerData = response?.customer;
                    if (customerData) {
                        localStorage.setItem("customer", JSON.stringify(customerData));
                    }
                    return customerData;
                }
            }),
            Logoutcustomer: builder.mutation({
                query: userData => {
                    return {
                        url: "/user/logout",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"],
                transformResponse: data => {
                    localStorage.removeItem("customer")
                    return data.result
                }
            }),
        }
    }
})

export const {
    useRegisterAdminMutation,
    useLoginAdminMutation,
    useLogoutAdminMutation,

    useRegistercustomerMutation,
    useLogincustomerMutation,
    useLogoutcustomerMutation
} = authApi
