import { apiSlice } from './apiSlice';

export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => `/events/get`,
    }),
    getRecentEvents: builder.query({
      query: () => `/events/get/recent`,
    }),
    markAsSeen: builder.mutation({
      query: ({ eventId }) => ({
        url: `/events/seen`,
        method: 'POST',
        body: {
          eventId: eventId,
        },
      }),
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetRecentEventsQuery,
  useMarkAsSeenMutation,
} = eventsApiSlice;
