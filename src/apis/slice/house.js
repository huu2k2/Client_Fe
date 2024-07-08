import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "./AxiosBaseQuery";
const API_URL = import.meta.env.VITE_APP_ROOM_URL;

const HousesApi = createApi({
  reducerPath: "housesApi",
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),
  keepUnusedDataFor:600,
  endpoints: (build) => ({
    get: build.query({
      query: (queries) => ({
        url: `/Rooms/filter-room-of-house?${Object.keys(queries)
          .map((key) => `${key}=${queries[key]}`)
          .join("&")}`,
      }),
    }),
    
  }),
});

export const {   } = HousesApi;
export default HousesApi;
