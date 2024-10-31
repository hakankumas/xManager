import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import adminReducer from "../features/admin/adminSlice";
import userReducer from "../features/user/userSlice";
import contentReducer from "../features/content/contentSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        user: userReducer,
        content: contentReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
