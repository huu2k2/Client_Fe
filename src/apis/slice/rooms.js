import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "./AxiosBaseQuery";
const API_URL = import.meta.env.VITE_APP_ROOM_URL;

const RoomsApi = createApi({
  reducerPath: "roomsApi",
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),
  keepUnusedDataFor:600,
  endpoints: (build) => ({
    // getRoomsFilter: build.query({
    //   query: (queries) => ({
    //     url: `/Rooms/filter-room-of-house?${Object.keys(queries)
    //       .map((key) => `${key}=${queries[key]}`)
    //       .join("&")}`,
    //   }),
    // }),
    getRoomsFilter: build.query({
      query: (queries) => ({
        url: `/Rooms/filter-room-of-house?${queries}`,
      }),
    }),
  }),
});

export const { useGetRoomsFilterQuery } = RoomsApi;
export default RoomsApi;
