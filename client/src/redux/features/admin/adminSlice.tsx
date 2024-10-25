import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
    AdminDeleteId,
    AdminInitialState,
    AdminType,
} from "../../../types/AdminTypes";
import api from "../../../utils/api";

const initialState: AdminInitialState = {
    admins: [],
};

export const getall_admin = createAsyncThunk("admin/getall-admin", async () => {
    try {
        const response = await api().get("/admin/getall-admin");
        return response.data.admins;
    } catch (error) {
        console.log("error");
    }
});

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

export const delete_admin = createAsyncThunk(
    "admin/delete-admin",
    async (payload: AdminDeleteId) => {
        try {
            const response = await api().delete(
                `/admin/delete-admin/${payload._id}`
            );
            return response.data.admin;
        } catch (error: any) {
            console.log(error);
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
        ),
            builder.addCase(
                getall_admin.fulfilled,
                (
                    state: AdminInitialState,
                    action: PayloadAction<AdminType[]>
                ) => {
                    state.admins = action.payload;
                }
            ),
            builder.addCase(
                delete_admin.fulfilled,
                (
                    state: AdminInitialState,
                    action: PayloadAction<AdminType>
                ) => {
                    state.admins = state.admins.filter(
                        (admin) => admin._id !== action.payload._id
                    );
                }
            );
    },
});

export const {} = adminSlice.actions;
export default adminSlice.reducer;
