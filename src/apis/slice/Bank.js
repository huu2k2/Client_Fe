// src/slice/roomSlice.js
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./AxiosBaseQuery";
const API_URL = import.meta.env.VITE_APP_ROOM_URL;

const BankApi = createApi({
  reducerPath: "banksApi",
  keepUnusedDataFor: 600,
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (build) => ({
    getBank: build.query({
      query: () => ({ url: `/banks`, method: "get" }),
    }),

    CreateDepositPaymentLinkFirst: build.mutation({
      query: (id) => ({
        url: `/v2/Bank/CreateDepositPaymentLinkFirst?DepositID=${id}`,
        method: "POST",

      }),
    }),
  }),
});

export const { useGetBankQuery, useCreateDepositPaymentLinkFirstMutation } = BankApi;
export default BankApi;

