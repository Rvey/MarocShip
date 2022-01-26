import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { managerApi } from './services/managers';
import userReducer from './features/auth/userSlice';
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer,
        [managerApi.reducerPath]: managerApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(managerApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
