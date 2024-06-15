import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "./AxiosBaseQuery";
const API_URL = import.meta.env.VITE_APP_ROOM_URL;

const ServicesApi = createApi({
  reducerPath: "ServicesApi",
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),
  keepUnusedDataFor:600,
  endpoints: (build) => ({
    getServicesOfRoom: build.query({
      query: (id) => ({
        url: `/Deposits/get-services-furnitures-of-room/${id}`,
      }),
    }),
    
  }),
});

export const {useGetServicesOfRoomQuery} = ServicesApi;
export default ServicesApi;
