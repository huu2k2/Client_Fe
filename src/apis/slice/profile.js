import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "./AxiosBaseQuery";
const API_URL = import.meta.env.VITE_APP_ROOM_URL;

const ProfilesApi = createApi({
  reducerPath: "ProfilesApi",
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),
  keepUnusedDataFor: 600,
  endpoints: (build) => ({
    getProfile: build.query({
      query: () => ({
        url: `/Accounts/get-profile`,
        method: "GET",
      }),
    }),
  }),
});

export const {useGetProfileQuery} = ProfilesApi;
export default ProfilesApi;
