import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { setMessage } from './message';
import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem('authenticated'));

export const customerRegister = createAsyncThunk(
    'auth/customerRegister',
    async ({ email, password, firstName, lastName, phone,
        address, country }, thunkApi) => {
        try {
            const data = await AuthService
                .customerRegister(email, password, firstName, lastName,
                    phone, address, country);
            thunkApi.dispatch(setMessage(data.message));
            return { user: data };
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) 
                || error.message || error.toString();
            thunkApi.dispatch(message);
            return thunkApi.rejectWithValue();
        }
    }
);

export const freelancerRegister = createAsyncThunk(
    'auth/freelancerRegister',
    async({ email, password, firstName, lastName, phone,
        address, country}, thunkApi) => {
        try {
            const data = await AuthService
                .freelancerRegister(email, password, firstName, lastName,
                    phone, address, country);
            thunkApi.dispatch(setMessage(data.message));
            return { user: data };
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) 
                || error.message || error.toString();
            thunkApi.dispatch(message);
            return thunkApi.rejectWithValue();
        }
    }
);

export const signIn = createAsyncThunk(
    'auth/signIn',
    async ({ email, password }, thunkApi) => {
        try {
            const data = await AuthService.signIn(email, password);
            return { user: data };
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) 
                || error.message || error.toString();
            thunkApi.dispatch(message);
            return thunkApi.rejectWithValue();
        }
    }
);

export const signout = createAsyncThunk(
    'auth/signOut',
    () => { 
        AuthService.signOut(); 
    }
);

const initialState = user ? { isSignedIn: true, user } : { isSignedIn: false, user: null };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: {
        [customerRegister.fulfilled]: (state, action) => {
            state.isSignedIn = true;
            state.user = action.payload.user;
        },
        [customerRegister.rejected]: (state, action) => {
            state.isSignedIn = false;
        },
        [freelancerRegister.fulfilled]: (state, action) => {
            state.isSignedIn = true;
            state.user = action.payload.user;
        },
        [freelancerRegister.rejected]: (state, action) => {
            state.isSignedIn = false;
        },
        [signIn.fulfilled]: (state, action) => {
            state.isSignedIn = true;
            state.user = action.payload.user;
        },
        [signIn.rejected]: (state, action) => {
            state.isSignedIn = false;
            state.user = null;
        },
        [signout.fulfilled]: (state, action) => {
            state.isSignedIn = false;
            state.user = null;
        },
    },
});

const { reducer } = authSlice;
export default reducer;