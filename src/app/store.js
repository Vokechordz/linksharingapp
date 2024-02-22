import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import linksReducer from '../features/linksSlice'
import authReducer from '../features/auth/authSlice'
import { faTurkishLira } from "@fortawesome/free-solid-svg-icons";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store= configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        links: linksReducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: false
})

setupListeners(store.dispatch)