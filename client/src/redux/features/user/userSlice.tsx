import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../../../utils/api";
import { UserById, UserInitialState, UserType } from "../../../types/UserTypes";

const initialState: UserInitialState = {
    users: [],
    errorMessage: null,
};

export const getall_user = createAsyncThunk("user/getall-user", async () => {
    try {
        const response = await api().get("/user/getall-user");
        return response.data.users;
    } catch (error: any) {
        console.log(error.response.data.message);
        return error.response.data.message;
    }
});

export const delete_user = createAsyncThunk<
    UserType, // fulfilled durumunda dönecek veri tipi
    UserById, // thunk argüman tipi (func çağrıldığında kullanılacak condition değeri)
    { rejectValue: string } // rejected durumunda dönecek hata tipi
>("user/delete-user", async (payload, { rejectWithValue }) => {
    try {
        const response = await api().delete(`/user/delete-user/${payload._id}`);
        return response.data.user;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                getall_user.fulfilled,
                (
                    state: UserInitialState,
                    action: PayloadAction<UserType[]>
                ) => {
                    state.users = action.payload;
                    state.errorMessage = null;
                }
            )
            .addCase(
                delete_user.fulfilled,
                (state: UserInitialState, action: PayloadAction<UserType>) => {
                    state.users = state.users.filter(
                        (user) => user._id !== action.payload._id
                    );
                    state.errorMessage = null;
                }
            )
            .addCase(
                delete_user.rejected,
                (
                    state: UserInitialState,
                    action: PayloadAction<string | undefined>
                ) => {
                    state.errorMessage =
                        action.payload || "Something went wrong";
                }
            );
    },
});

export const {} = userSlice.actions;
export default userSlice.reducer;