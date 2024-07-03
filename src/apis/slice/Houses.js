import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./AxiosBaseQuery";

const API_URL = import.meta.env.VITE_APP_ROOM_URL;

const HousesApi = createApi({
  reducerPath: "housesApi",
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),
  keepUnusedDataFor: 600,
  endpoints: (build) => ({
    getFullInformationOFHome: build.query({
      query: (id) => ({
        url: `/Houses/get-full-house-information-by-id/${id}`,
      }),
    }),
    getPolicyOfHome: build.query({
      query: (id) => ({
        url: `/v2/Houses/get-policies/${id}`,
      }),
    }),
  }),
});

export const { useGetFullInformationOFHomeQuery ,useGetPolicyOfHomeQuery} = HousesApi;
export default HousesApi;
