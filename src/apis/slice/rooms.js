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
    getRoomsofhouse: build.mutation({
      query: (body) => ({
        url: `/v2/Agencies/get-all-houses-for-agency`,
        method: 'post',
        data: body
      }),
    }),
    getRoomsNotDepositOfHouse: build.query({
      query: (id) => ({
        url: `/v2/Rooms/get-rooms-not-deposit-of-house/${id}`,
        method: 'GET',
      }),
    }),
  }),
});


export const { useGetRoomsFilterMutation, useGetRoomsofhouseMutation, useGetRoomsNotDepositOfHouseQuery } = RoomsApi;
export default RoomsApi;
