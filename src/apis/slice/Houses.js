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
    getCommisstionPolicies: build.query({
      query: (id) => ({
        url: `/v2/Houses/get-commisstion-policies/${id}`,
      }),
    }),
    getHouseName: build.query({
      query: () => ({
        url: `/v2/Houses/get-house-names`,
      }),
    }),
    getInfoHome: build.query({
      query: (id) => ({
        url: `/v2/Houses/get-house-infor/${id}`,
      }),
    }),
    getAllHouses: build.query({
      query: (id) => ({
        url: `/v2/Houses/get-house-names/${id}`,
      }),
    }),
    postVeriPW: build.mutation({
      query: (body) => ({
        url: `/v2/Houses/verify-house-password`,
        method: "POST",
        data:body
      }),
    }),
  }),
});

export const {
  useGetFullInformationOFHomeQuery,
  useGetPolicyOfHomeQuery,
  useGetHouseNameQuery,
  useGetCommisstionPoliciesQuery,
  useGetInfoHomeQuery,
  useGetAllHousesQuery,
  usePostVeriPWMutation
} = HousesApi;
export default HousesApi;
