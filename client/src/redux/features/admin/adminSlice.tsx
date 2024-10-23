import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AdminInitialState, AdminType } from "../../../types/AdminTypes";
import api from "../../../utils/api";

const initialState: AdminInitialState = {
    admins: [],
};

export const create_admin = createAsyncThunk(
    "admin/create-admin",
    async (payload: AdminType, { rejectWithValue }) => {
        try {
            const response = await api().post("/admin/create-admin", payload);
            return response.data.admin;
        } catch (error: any) {
            console.log("error");
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            create_admin.fulfilled,
            (state: AdminInitialState, action: PayloadAction<AdminType>) => {
                state.admins = [...state.admins, action.payload];
            }
        );
    },
});

export const {} = adminSlice.actions;
export default adminSlice.reducer;
