import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../apis/authApi";


const parseLocalStorage = (key) => {
    const value = localStorage.getItem(key);
    try {
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.warn(`Error parsing localStorage key "${key}":`, error);
        return null;
    }
};

const authSlice = createSlice({
    name: "authSlice",
    initialState: { admin: parseLocalStorage("admin"), customer: parseLocalStorage("customer") },
    reducers: {
        adminLogout: (state) => {
            localStorage.removeItem("admin");
            state.admin = null;
        },
        customerLogout: (state) => {
            localStorage.removeItem("customer");
            state.customer = null;
        },
    },
    extraReducers: builder => builder
        .addMatcher(authApi.endpoints.LoginAdmin.matchFulfilled, (state, { payload }) => {
            state.admin = payload;
            localStorage.setItem("admin", JSON.stringify(payload));
        })
        .addMatcher(authApi.endpoints.Logincustomer.matchFulfilled, (state, { payload }) => {
            state.customer = payload;
            localStorage.setItem("customer", JSON.stringify(payload));
        })
        .addMatcher(authApi.endpoints.LogoutAdmin.matchFulfilled, (state) => {
            state.admin = null;
        })
        .addMatcher(authApi.endpoints.Logoutcustomer.matchFulfilled, (state) => {
            state.customer = null;
        })

})

export const { adminLogout } = authSlice.actions
export default authSlice.reducer