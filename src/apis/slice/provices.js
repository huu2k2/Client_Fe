// src/slice/roomSlice.js
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./AxiosBaseQuery";
const API_URL = import.meta.env.VITE_API_URL;

const ProvicesApi = createApi({
  reducerPath: "provicesApi",
  keepUnusedDataFor: 600,
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (build) => ({
    getDistricts: build.query({
      query: () => ({ url: `/api/province/district/79`, method: "get" }),
    }),
    getWards: build.query({
      query: (id) => ({ url: `/api/province/ward/${id}`, method: "get" }),
    }),
    
  }),
});

export const { useGetDistrictsQuery, useGetWardsQuery } = ProvicesApi;
export default ProvicesApi;
