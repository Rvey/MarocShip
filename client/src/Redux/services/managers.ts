import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
export interface Manager {
    id: number;
    name: string;
    fetched_at: string;
  }
type ManagersResponse = Manager[];

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/',
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
  endpoints: (build) => ({
    getManagers: build.query<ManagersResponse, void>({
        query: () => ({ url: 'Manager' }),
 
    
  }),
})
})
export const { useGetManagersQuery } = managerApi