import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
interface Delivery{
    from: string;
    to:string
    delivery: string;
    weight: number;
    token:string
    id: number;
    _id: string;
    distance: number;
    shipmentMethod: string;
    createdBy: string;
    region:string
    Available:string
    fetched_at: string;
    data:any
}
type DeliveryResponse = Delivery[];

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
export const deliveryApi = createApi({
    reducerPath: 'deliveryApi',
    baseQuery: baseQueryWithRetry,
    tagTypes: ['Deliveries'],
    endpoints: (build) => ({
        loginDeliveryManager: build.mutation<{ token?: string; data?: Delivery }, any>({
            query: (credentials: any) => ({ url: 'deliveryManager/login', method: 'POST', body: credentials }),
            extraOptions: {
                backoff: () => {
                    // We intentionally error once on login, and this breaks out of retrying. The next login attempt will succeed.
                    retry.fail({ fake: 'error' });
                }
            }
        }),
        getDeliveries: build.query<DeliveryResponse, void>({
            query: () => ({ url: 'delivery' })
        }),

        getDelivery: build.query<Delivery, string>({
            query: (id) => `delivery/${id}`
        }),
        addDelivery: build.mutation<Delivery, Partial<Delivery>>({
            query: (body) => ({
                url: `delivery`,
                method: 'POST',
                body
            })
        }),
        updateDelivery: build.mutation<Delivery, Partial<Delivery>>({
            query: ({ id, ...patch }) => ({
                url: `delivery/${id}`,
                method: 'PUT',
                body: patch
            })
        }),
        deleteDelivery: build.mutation<{ success: boolean; id: number }, number>({
            query(id) {
                return {
                    url: `delivery/${id}`,
                    method: 'DELETE'
                };
            }
        })
    })
});
export const { useGetDeliveriesQuery, useGetDeliveryQuery, useAddDeliveryMutation, useDeleteDeliveryMutation, useUpdateDeliveryMutation, useLoginDeliveryManagerMutation } = deliveryApi;
