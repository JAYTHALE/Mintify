import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apis/authApi";
import { adminApi } from "./apis/adminApi";
import authSlice from "./slices/authslice"
import { productApi } from "./apis/productApi";
import { customerApi } from "./apis/customer";


const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [customerApi.reducerPath]: customerApi.reducer,
        auth: authSlice
    },
    middleware: def => [...def(), authApi.middleware, adminApi.middleware, productApi.middleware, customerApi.middleware]
})

export default reduxStore
