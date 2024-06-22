// src/slice/roomSlice.js
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./AxiosBaseQuery";
const API_URL = import.meta.env.VITE_API_URL_BANK;

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
     
    
  }),
});

export const { useGetBankQuery} = BankApi;
export default BankApi;
