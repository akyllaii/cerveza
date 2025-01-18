import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUsers = createAsyncThunk(
    'users/getUsers',  // Ensure this matches the slice name "auth"
    async (_, fetchApi) => {
        try {
            const res = await axios('https://cervback.onrender.com/users');
            return res.data;
        } catch (err) {
            fetchApi.rejectWithValue(err);
        }
    }
);

const authSlice = createSlice({
    name: 'users',
    initialState: {
        user: null,   // Current logged-in user
        users: [],    // List of all users
        token: null,
    },
    reducers: {
        authUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logOutUser: (state) => {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload;  // Store fetched users
            state.isLoading = false;
        });
        builder.addCase(getUsers.rejected, (state) => {
            state.isLoading = false;
        });
    }
});


export const { authUser, logOutUser } = authSlice.actions;
export default authSlice.reducer;
