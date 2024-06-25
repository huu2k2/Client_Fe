import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "./AxiosBaseQuery";
const API_URL = import.meta.env.VITE_APP_ROOM_URL;

const ImagesApi = createApi({
  reducerPath: "ImagesApi",
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),
  keepUnusedDataFor:600,
  endpoints: (build) => ({
    getImages: build.query({
      query: (id) => ({
        url: `/v2/Rooms/get-pictures-of-room/${id}`,
      }),
    }),
    
  }),
});

export const {useGetImagesQuery} = ImagesApi;
export default ImagesApi;
