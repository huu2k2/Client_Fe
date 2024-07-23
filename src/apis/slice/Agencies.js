import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./AxiosBaseQuery";

const API_URL = import.meta.env.VITE_APP_ROOM_URL;

const Agencies = createApi({
  reducerPath: "Agencies",
  tagTypes: ["Appointments", "ContractManagement"],
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
    }),
    removeFavorite: build.mutation({
      query: (roomId) => ({
        url: `/v2/Agencies/remove-favorite-room/${roomId}`,
        method: "DELETE",
      }),
    }),
    getFavorite: build.query({
      query: () => ({
        url: `/v2/Agencies/get-favorite-rooms`,
        method: "GET",
      }),
    }),

    getDepositInfomation: build.query({
      query: (id) => ({
        url: `/v2/Agencies/get-deposit-by-id/${id}`,
        method: "GET",
      }),
    }),
    getListOfAppointments: build.query({
      query: ({ queries, body }) => ({
        url: `/v2/Agencies/get-schedules?${Object.keys(queries)
          .map((key) => `${key}=${queries[key]}`)
          .join("&")}`,
        method: "POST",
        data: body,
      }),
      providesTags: (result) =>
        result?.response?.items
          ? [
            ...result.response.items.map(({ scheduleId }) => ({
              type: "Appointments",
              id: scheduleId,
            })),
          ]
          : ["Appointments"],
    }),
    postChangeRoom: build.mutation({
      query: (body) => ({
        url: `/v2/Agencies/change-room-schedule`,
        method: "PUT",
        data: body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Appointments", id: arg.scheduleId },
      ],
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        // Update cache with optimistic update
        const patchResult = dispatch(
          api.util.updateQueryData(
            "getListOfAppointments",
            { queries: {}, body: {} },
            (draft) => {
              // Find and update the changed appointment
              const appointmentIndex = draft.response.items.findIndex(
                (appointment) => appointment.scheduleId === body.scheduleId
              );
              if (appointmentIndex !== -1) {
                draft.response.items[appointmentIndex].roomCode = body.roomCode;
              }
            }
          )
        );

        try {
          // Await the result of the mutation
          await queryFulfilled;
        } catch {
          // Rollback the optimistic update if mutation fails
          patchResult.undo();
        }
      },
    }),

    putDepositInfomation: build.mutation({
      query: (body) => ({
        url: `/v2/Agencies/update-deposit`,
        method: "PUT",
        data: body,
      }),
    }),
    getListsOfContractManagement: build.query({
      query: ({ queries, body }) => ({
        url: `/v2/Agencies/get-agency-deposits?${Object.keys(queries)
          .map((key) => `${key}=${queries[key]}`)
          .join("&")}`,
        method: "POST",
        data: body,
      }),
      providesTags: ['ContractManagement'],
    }),
    postCancelDeposite: build.mutation({
      query: (body) => ({
        url: `/v2/Agencies/end-of-deposit`,
        data: body,
        method: "PUT",
      }),
      invalidatesTags: ['ContractManagement'],
    }),
  }),
});

export const {
  usePostscheduleMutation,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useGetFavoriteQuery,
  useGetListOfAppointmentsQuery,
  useGetDepositInfomationQuery,
  usePostChangeRoomMutation,
  usePutDepositInfomationMutation,

  useGetListsOfContractManagementQuery,
  usePostCancelDepositeMutation,
} = Agencies;

export default Agencies;
