import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    userInfo: {
        _id: string;
        username: string;
        email: string;
        role: 'admin' | 'author';
    } | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    userInfo: localStorage.getItem('userInfo') 
        ? JSON.parse(localStorage.getItem('userInfo')!) 
        : null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<any>) => {
            state.userInfo = action.payload;
            state.loading = false;
            state.error = null;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.userInfo = null;
            state.loading = false;
            state.error = null;
            localStorage.removeItem('userInfo');
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        }
    },
});

export const { setCredentials, logout, setLoading, setError } = authSlice.actions;

export default authSlice.reducer;
