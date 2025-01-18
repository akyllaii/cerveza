
import { createSlice } from '@reduxjs/toolkit';



const initialState = {
    loading: false,
    success: false,
    error: null,
};

const passwordResetSlice = createSlice({
    name: 'passwordReset',
    initialState,
    reducers: {},
});

export default passwordResetSlice.reducer;