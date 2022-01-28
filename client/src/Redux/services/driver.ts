import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
interface Driver {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    license: string;
    createdAt: string;
    name:string
    file:string
    verified:string
    _id:string
}
type DriverResponse = Driver[];

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
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

// Define a service using a base URL and expected endpoints
export const driverApi = createApi({
    reducerPath: 'driverApi',
    baseQuery: baseQueryWithRetry,
    tagTypes: ['Driver'],
    endpoints: (build) => ({
        loginDriverManager: build.mutation<{ token?: string; data?: Driver }, any>({
            query: (credentials: any) => ({ url: 'driver/login', method: 'POST', body: credentials }),
            extraOptions: {
                backoff: () => {
                    // We intentionally error once on login, and this breaks out of retrying. The next login attempt will succeed.
                    retry.fail({ fake: 'error' });
                }
            }
        }),
        getDrivers: build.query<DriverResponse, void>({
            query: () => ({ url: 'driver' })
        }),

        getDriver: build.query<Driver, string>({
            query: (id) => `driver/${id}`
        }),
        addDriver: build.mutation<Driver, Partial<Driver>>({
            query: (body) => ({
                url: `driver`,
                method: 'POST',
                body
            })
        }),
        updateDriver: build.mutation<Driver, Partial<Driver>>({
            query: ({ id, ...patch }) => ({
                url: `driver/${id}`,
                method: 'PUT',
                body: patch
            })
        }),
        acceptDriver: build.mutation<Driver, Partial<Driver>>({
            query: ({ id}) => ({
                url: `driver/validateDriver/${id}`,
                method: 'PUT'
            })
        }),
        deleteDriver: build.mutation<{ success: boolean; id: number }, number>({
            query(id) {
                return {
                    url: `driver/${id}`,
                    method: 'DELETE'
                };
            }
        })
    })
});
export const { useGetDriversQuery, useGetDriverQuery, useAddDriverMutation, useDeleteDriverMutation, useUpdateDriverMutation,useAcceptDriverMutation, useLoginDriverManagerMutation } = driverApi;
