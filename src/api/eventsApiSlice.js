import { apiSlice } from './apiSlice';

export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => `/events/get`,
    }),
    getRecentEvents: builder.query({
      query: () => `/events/get/recent`,
    }),
  }),
});

export const { useGetEventsQuery, useGetRecentEventsQuery } = eventsApiSlice;
