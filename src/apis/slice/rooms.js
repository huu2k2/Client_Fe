import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./AxiosBaseQuery";

const API_URL = import.meta.env.VITE_APP_ROOM_URL;

const RoomsApi = createApi({
  reducerPath: "roomsApi",
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
    // Add default headers if necessary
    headers: {
      'Content-Type': 'application/json',
    },
  }),
  keepUnusedDataFor: 600,
  endpoints: (build) => ({
    getRoomsFilter: build.mutation({
      query: (data) => ({
        url: `/Rooms/filter-room-of-house`,
        method: 'POST',
        data, // Use `data` instead of `body` for axios
      }),
    }),

  }),
});


export const { useGetRoomsFilterMutation } = RoomsApi;
export default RoomsApi;
