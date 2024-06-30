import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./AxiosBaseQuery";

const API_URL = import.meta.env.VITE_APP_ROOM_URL;

const ScheduleApi = createApi({
  reducerPath: "ScheduleApi",
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),
  keepUnusedDataFor: 600,
  endpoints: (build) => ({
    postScheduleRoom: build.mutation({
      query: (data) => ({
        url: `/v2/Agencies/schedule-view-room`,
        method: 'POST',
        data,
      }),
    }),
  }),
});

export const {usePostScheduleRoomMutation  } = ScheduleApi;
export default ScheduleApi;
