import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserInitialState } from "../../../types/UserTypes";

const initialState: UserInitialState = {
    users: [],
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
});

export const {} = userSlice.actions;
export default userSlice.reducer;
