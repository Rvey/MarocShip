import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { managerApi } from './services/managers';
import { deliveryApi } from './services/deliveries';
import { driverApi } from './services/driver';
import { deliveryManagerApi } from './services/deliveryManager';
import userReducer from './features/auth/userSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: [managerApi.reducerPath],

};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: persistedReducer,
        [managerApi.reducerPath]: managerApi.reducer,
        [deliveryApi.reducerPath]: deliveryApi.reducer,
        [driverApi.reducerPath]: driverApi.reducer,
        [deliveryManagerApi.reducerPath]: deliveryManagerApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }).concat(managerApi.middleware , deliveryApi.middleware , driverApi.middleware , deliveryManagerApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
