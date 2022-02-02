import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
interface Delivery{
    from: string;
    name:string
    to:string
    delivery: string;
    location:string
    weight: string;
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
    updatedAt: string;
    driverId:string
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


// Define a service using a base URL and expected endpoints
export const deliveryApi = createApi({
    reducerPath: 'deliveryApi',
    baseQuery,
    tagTypes: ['Deliveries'],
    endpoints: (build) => ({
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
        }),
        acceptDelivery: build.mutation<Delivery, Partial<Delivery>>({
            query: ({ id ,...patch }) => ({
                url: `delivery/acceptDelivery/${id}`,
                method: 'PUT',
                body: patch
            })
        })
    })
});
export const { useGetDeliveriesQuery, useGetDeliveryQuery, useAddDeliveryMutation, useDeleteDeliveryMutation, useUpdateDeliveryMutation , useAcceptDeliveryMutation} = deliveryApi;
