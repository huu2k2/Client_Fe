import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "./AxiosBaseQuery";
const API_URL = import.meta.env.VITE_APP_ROOM_URL;

const DepositsApi = createApi({
  reducerPath: "DepositsApi",
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),
  keepUnusedDataFor: 600,
  endpoints: (build) => ({
    addDeposit: build.mutation({
      query: (body) => ({
        url: `/v2/Agencies/insert-deposit-broker`,
        method: "POST",
        data: body,
      }),
    }),
    
  }),
});

export const {useAddDepositMutation } = DepositsApi;
export default DepositsApi;
