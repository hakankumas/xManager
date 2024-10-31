import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../../../utils/api";
import {
    ContentById,
    ContentInitialState,
    ContentType,
    CreateContentType,
} from "../../../types/ContentTypes";

const initialState: ContentInitialState = {
    contents: [],
};

export const getall_content = createAsyncThunk<
    ContentType[],
    void,
    {
        rejectValue: string;
    }
>("content/getall-content", async (_, { rejectWithValue }) => {
    try {
        const response = await api().get("/content/getall-content");
        return response.data.contents;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const get_content = createAsyncThunk<
    ContentType,
    ContentById,
    {
        rejectValue: string;
    }
>("content/get-content", async (payload, { rejectWithValue }) => {
    try {
        const response = await api().get(`/content/get-content/${payload._id}`);
        return response.data.content;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const create_content = createAsyncThunk<
    ContentType,
    CreateContentType,
    {
        rejectValue: string;
    }
>("content/create-content", async (payload, { rejectWithValue }) => {
    try {
        const response = await api().post("/content/create-content", payload);
        return response.data.content;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const update_content = createAsyncThunk<
    ContentType,
    ContentType,
    {
        rejectValue: string;
    }
>("content/update-content", async (payload, { rejectWithValue }) => {
    try {
        const response = await api().put(
            `/content/update-content/${payload._id}`,
            payload
        );
        return response.data.content;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const delete_content = createAsyncThunk<
    ContentType,
    ContentById,
    { rejectValue: string }
>("content/delete-content", async (payload, { rejectWithValue }) => {
    try {
        const response = await api().delete(
            `/content/delete-content/${payload._id}`
        );
        return response.data.content;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const contentSlice = createSlice({
    name: "content",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                getall_content.fulfilled,
                (
                    state: ContentInitialState,
                    action: PayloadAction<ContentType[]>
                ) => {
                    state.contents = action.payload;
                }
            )
            .addCase(
                create_content.fulfilled,
                (
                    state: ContentInitialState,
                    action: PayloadAction<ContentType>
                ) => {
                    state.contents = [...state.contents, action.payload];
                }
            )
            .addCase(
                update_content.fulfilled,
                (
                    state: ContentInitialState,
                    action: PayloadAction<ContentType>
                ) => {
                    state.contents = [
                        ...state.contents.map((content) =>
                            content._id !== action.payload._id
                                ? content
                                : action.payload
                        ),
                    ];
                }
            )
            .addCase(
                delete_content.fulfilled,
                (
                    state: ContentInitialState,
                    action: PayloadAction<ContentType>
                ) => {
                    state.contents = state.contents.filter(
                        (content) => content._id !== action.payload._id
                    );
                }
            );
    },
});

export const {} = contentSlice.actions;
export default contentSlice.reducer;
