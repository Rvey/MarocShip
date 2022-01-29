import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
interface DeliveryManager {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    verified:string
    _id:string
}
type DeliveryManagerResponse = DeliveryManager[];

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

// Define a service using a base URL and expected endpoints
export const deliveryManagerApi = createApi({
    reducerPath: 'deliveryManagerApi',
    baseQuery: baseQuery,
    tagTypes: ['DeliveryManager'],
    endpoints: (build) => ({
        loginDeliveryManagerManager: build.mutation<{ token?: string; data?: DeliveryManager }, any>({
            query: (credentials: any) => ({ url: 'deliveryManager/login', method: 'POST', body: credentials }),
        }),
        getDeliveryManagers: build.query<DeliveryManagerResponse, void>({
            query: () => ({ url: 'deliveryManager' })
        }),

        getDeliveryManager: build.query<DeliveryManager, string>({
            query: (id) => `deliveryManager/${id}`
        }),
        addDeliveryManager: build.mutation<DeliveryManager, Partial<DeliveryManager>>({
            query: (body) => ({
                url: `deliveryManager`,
                method: 'POST',
                body
            })
        }),
        updateDeliveryManager: build.mutation<DeliveryManager, Partial<DeliveryManager>>({
            query: ({ id, ...patch }) => ({
                url: `deliveryManager/${id}`,
                method: 'PUT',
                body: patch
            })
        }),
        deleteDeliveryManager: build.mutation<{ success: boolean; id: number }, number>({
            query(id) {
                return {
                    url: `deliveryManager/${id}`,
                    method: 'DELETE'
                };
            }
        })
    })
});
export const { useGetDeliveryManagersQuery, useGetDeliveryManagerQuery, useAddDeliveryManagerMutation, useDeleteDeliveryManagerMutation, useUpdateDeliveryManagerMutation, useLoginDeliveryManagerManagerMutation } = deliveryManagerApi;
