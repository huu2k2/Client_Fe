import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./AxiosBaseQuery";

const API_URL = import.meta.env.VITE_APP_ROOM_URL;

const Agencies = createApi({
  reducerPath: "Agencies",
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
    headers: () => {
      const token = localStorage.getItem("token");
      return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
    },
  }),
  keepUnusedDataFor: 600,
  endpoints: (build) => ({
    postschedule: build.mutation({
      query: (data) => ({
        url: `/v2/Agencies/schedule-view-room`,
        method: "POST",
        data: data,
      }),
    }),
    getSchedules: build.query({
      query: ({ roomId }) => ({
        url: `/v2/Agencies/get-schedules/${roomId}`,
        method: "GET",
      }),
    }),
    addFavorite: build.mutation({
      query: (roomId) => ({
        url: `/v2/Agencies/add-favorite-room/${roomId}`,
        method: "POST",
      }),
      // Add the onQueryStarted lifecycle method
      async onQueryStarted(roomId, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            Agencies.util.updateQueryData("getFavorite", undefined, (draft) => {
              draft.push(data); // assuming the API returns the added favorite room details
            })
          );
        } catch (error) {
          console.error("Failed to update the favorite list:", error);
        }
      },
    }),
    removeFavorite: build.mutation({
      query: (roomId) => ({
        url: `/v2/Agencies/remove-favorite-room`,
        method: "DELETE",
      }),
      // Add the onQueryStarted lifecycle method
      async onQueryStarted(roomId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          Agencies.util.updateQueryData("getFavorite", undefined, (draft) => {
            return draft.filter((room) => room.id !== roomId);
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
          console.error("Failed to remove from the favorite list:", error);
        }
      },
    }),
    getFavorite: build.query({
      query: () => ({
        url: `/v2/Agencies/get-favorite-rooms`,
        method: "GET",
      }),
    }),
    getListOfAppointments: build.mutation({
      query: ({ queries, body }) => ({
        url: `/v2/Agencies/get-schedules?${Object.keys(queries)
          .map((key) => `${key}=${queries[key]}`)
          .join("&")}`,
        method: "POST",
        data: body,
      }),
    }),
  }),
});

export const {
  usePostscheduleMutation,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useGetFavoriteQuery,
  useGetListOfAppointmentsMutation,
} = Agencies;

export default Agencies;
