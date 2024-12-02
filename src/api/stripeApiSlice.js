import { apiSlice } from './apiSlice';

export const stripeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBankUrl: builder.mutation({
      query: () => ({
        url: '/stripe/get/bank',
        method: 'POST',
        body: {},
      }),
    }),
    getStripeUrl: builder.mutation({
      query: () => ({
        url: '/stripe/get/stripe',
        method: 'POST',
        body: {},
      }),
    }),
    getUpdateUrl: builder.mutation({
      query: () => ({
        url: '/stripe/get/update',
        method: 'POST',
        body: {},
      }),
    }),
    removeBank: builder.mutation({
      query: () => ({
        url: '/stripe/remove/bank',
        method: 'POST',
        body: {},
      }),
    }),
    removeStripe: builder.mutation({
      query: () => ({
        url: '/stripe/remove/stripe',
        method: 'POST',
        body: {},
      }),
    }),
  }),
});

export const {
  useGetBankUrlMutation,
  useGetStripeUrlMutation,
  useGetUpdateUrlMutation,
  useRemoveBankMutation,
  useRemoveStripeMutation,
} = stripeApiSlice;