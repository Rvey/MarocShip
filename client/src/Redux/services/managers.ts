import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
interface Manager {
    lastName: string;
    firstName: string;
    id: number;
    _id: string;
    name: string;
    email: string;
    fetched_at: string;
}
type ManagersResponse = Manager[];

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/'
    // prepareHeaders: (headers, { getState }) => {
    //   // By default, if we have a token in the store, let's use that for authenticated requests
    //   const token = (getState() as RootState).auth.token;
    //   if (token) {
    //     headers.set('authentication', `Bearer ${token}`);
    //   }
    //   return headers;
    // },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

// Define a service using a base URL and expected endpoints
export const managerApi = createApi({
    reducerPath: 'managerApi',
    baseQuery: baseQueryWithRetry,
    tagTypes: ['Managers'],
    endpoints: (build) => ({
        loginManager: build.mutation<{ token: string; user: Manager }, any>({
            query: (credentials: any) => ({ url: 'manager/login', method: 'POST', body: credentials }),
            extraOptions: {
                backoff: () => {
                    // We intentionally error once on login, and this breaks out of retrying. The next login attempt will succeed.
                    retry.fail({ fake: 'error' });
                }
            }
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
        })
    })
});
export const { useGetManagersQuery, useGetManagerQuery, useUpdateManagerMutation, useDeleteManagerMutation, useAddManagerMutation, useLoginManagerMutation } = managerApi;
