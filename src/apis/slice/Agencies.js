import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./AxiosBaseQuery";

const API_URL = import.meta.env.VITE_APP_ROOM_URL;

const Agencies = createApi({
    reducerPath: "Agencies",
    baseQuery: axiosBaseQuery({
        baseUrl: API_URL,
        headers: () => {
            const token = localStorage.getItem('token');
            return {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            };
        },
    }),
    keepUnusedDataFor: 600,
    endpoints: (build) => ({
        postschedule: build.mutation({
            query: (data) => ({
                url: `/v2/Agencies/schedule-view-room`,
                method: 'POST',
                data,
            }),
        }),
    }),
});

export const { usePostscheduleMutation } = Agencies;
export default Agencies;
