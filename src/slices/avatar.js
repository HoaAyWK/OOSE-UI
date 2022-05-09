import { createSlice } from '@reduxjs/toolkit';

const initialState = {};
const avatarSlice = createSlice({
    name: 'avatar',
    initialState,
    reducers: {
        setAvatar: (state, action) => {
            return { avatar: action.payload };
        },
    },
});

const { reducer, actions } = avatarSlice;
export const { setAvatar } = actions;
export default reducer;