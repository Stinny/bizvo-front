import { apiSlice } from './apiSlice';

export const payoutsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPayouts: builder.query({
      query: () => `/payouts/get`,
    }),
    getPayout: builder.query({
      query: ({ payoutId }) => `/payouts/get/${payoutId}`,
    }),
    getBalance: builder.query({
      query: () => `/payouts/balance`,
    }),
  }),
});

export const { useGetPayoutsQuery, useGetPayoutQuery, useGetBalanceQuery } =
  payoutsApiSlice;
