// src/slice/roomSlice.js
import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './AxiosBaseQuery';

const API_URL = import.meta.env.VITE_APP_ROOM_URL; // URL from environment variables

const InformationApi = createApi({
  reducerPath: 'InformationApi',
  keepUnusedDataFor: 600, // Time (in seconds) to keep unused data
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    getInformations: builder.query({
      query: () => ({
        url: '/v2/Notices/get-notifications',
        method: 'GET',
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetInformationsQuery } = InformationApi;
export default InformationApi;
