import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { PURGE } from 'redux-persist';
import { persistStore } from 'redux-persist'
import { store } from '../../store'
interface User {
    token?: string;
    role?: string;
    email?: string;
    name?: string;
}

const initialState: User = {
    token: '',
    role: '',
    email: ''
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userData: (state, action: PayloadAction<User>) => {
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.email = action.payload.email;
        },
        clearData: (state) => {
            // Note that this should be left intentionally empty.
            // Clearing redux state and localForage happens in rootReducer.ts.
            state.token = '';
            state.role = '';
            state.email = '';
        }
    }
});

export const { userData , clearData } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
