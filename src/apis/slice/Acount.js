import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "./AxiosBaseQuery";
const API_URL = import.meta.env.VITE_APP_ROOM_URL;

const AcountsApi = createApi({
  reducerPath: "acountsApi",
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),
  keepUnusedDataFor: 600,
  endpoints: (build) => ({
    postLogin: build.mutation({
      query: (body) => ({
        url: `/Accounts/sign-in`,
        method: "POST",
        data: body,
      }),
    }),
    postRegister: build.mutation({
      query: (body) => ({
        url: `/v2/Accounts/sign-up-with-phone`,
        method: "POST",
        data: body,
      }),
    }),
   
  }),
});

export const { usePostLoginMutation, usePostRegisterMutation } = AcountsApi;
export default AcountsApi;
