import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
interface Manager {
    lastName: string;
    firstName: string;
    token:string
    id: number;
    _id: string;
    name: string;
    email: string;
    fetched_at: string;
    data:any
}
type ManagersResponse = Manager[];

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
export const managerApi = createApi({
    reducerPath: 'managerApi',
    baseQuery,
    tagTypes: ['Managers'],
    endpoints: (build) => ({
        loginManager: build.mutation<{ token?: string; data?: Manager;  role?:string ; email?:string }, any>({
            query: (credentials: any) => ({ url: 'manager/login', method: 'POST', body: credentials }),
            
        }),
        getManagers: build.query<ManagersResponse, void>({
            query: () => ({ url: 'Manager' })
        }),

        getManager: build.query<Manager, string>({
            query: (id) => `manager/${id}`
        }),
        addManager: build.mutation<Manager, Partial<Manager>>({
            query: (body) => ({
                url: `manager`,
                method: 'POST',
                body
            })
        }),
        updateManager: build.mutation<Manager, Partial<Manager>>({
            query: ({ id, ...patch }) => ({
                url: `manager/${id}`,
                method: 'PUT',
                body: patch
            })
        }),
        deleteManager: build.mutation<{ success: boolean; id: number }, number>({
            query(id) {
                return {
                    url: `manager/${id}`,
                    method: 'DELETE'
                };
            }
        }),
        resetManagerPwd: build.mutation<Manager, Partial<Manager>>({
            query: (body) => ({
                url: `/manager/resetPassword`,
                method: 'POST',
                body
            })
        }),
    })
});
export const { useGetManagersQuery, useGetManagerQuery, useUpdateManagerMutation, useDeleteManagerMutation, useAddManagerMutation, useLoginManagerMutation , useResetManagerPwdMutation } = managerApi;
