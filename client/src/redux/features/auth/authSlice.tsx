import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AuthInitialState, AuthType } from "../../../types/AuthTypes";
import api from "../../../utils/api";

const initialState: AuthInitialState = {
    auth: [],
    session: false,
};

export const login = createAsyncThunk(
    "admin/login",
    async (payload: AuthType, { rejectWithValue }) => {
        try {
            const response = await api().post("/admin/login", payload);
            localStorage.setItem("username", response.data.admin.username);
            localStorage.setItem("token", response.data.token);
            return response.data.admin;
        } catch (error: any) {
            console.log("error");
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state: AuthInitialState) => {
            localStorage.clear();
            state.auth = [];
            state.session = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            login.fulfilled,
            (state: AuthInitialState, action: PayloadAction<AuthType>) => {
                state.auth = [...state.auth, action.payload];
                state.session = true;
            }
        );
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
