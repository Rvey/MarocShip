import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
interface Admin {
    email: string;
    password: string;
}

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/',
    prepareHeaders: (headers, { getState }) => {
        // By default, if we have a token in the store, let's use that for authenticated requests
        const token = (getState() as RootState).user.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    }
}) as any;

// Define a service using a base URL and expected endpoints
export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery,
    endpoints: (build) => ({
        loginAdmin: build.mutation<{ token?: string; data?: Admin ; role?: string ; email?: string }, any>({
            query: (credentials: any) => ({ url: 'admin/login', method: 'POST', body: credentials })
        }),
    })
});
export const { useLoginAdminMutation } = adminApi;
