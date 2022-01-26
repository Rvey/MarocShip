import { createSlice,PayloadAction  } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

interface User {
    token: string
    name: string
    email: string
}

const initialState: User = {
    token: '',
    name: '',
    email: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userData: (state , action: PayloadAction<User>) => {
            state.token = action.payload.token
            state.name = action.payload.name
            state.email = action.payload.email
        }
    }
})

export const { userData } = userSlice.actions
export const selectUser = (state: RootState) => state.user
export default userSlice.reducer