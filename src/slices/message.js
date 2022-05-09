import { createSlice } from '@reduxjs/toolkit';

const initialState = {};
const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessage: (state, action) => {
            return { message: action.payload };
        },
        clearMessage: () => {
            return { message: '' };
        },
    },
});

const { reducer, actions } = messagesSlice;
export const { setMessage, clearMessage } = actions;
export default reducer;