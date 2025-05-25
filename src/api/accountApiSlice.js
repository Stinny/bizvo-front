import { apiSlice } from './apiSlice';

export const accountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => `/accounts/get`,
    }),
    getStatsTemp: builder.query({
      query: ({ filter }) => `/accounts/get/stats?filter=${filter}`,
    }),
    setup: builder.mutation({
      query: (formData) => ({
        url: '/accounts/setup',
        method: 'POST',
        body: formData,
      }),
    }),
    editAccount: builder.mutation({
      query: (formData) => ({
        url: '/accounts/edit/account',
        method: 'POST',
        body: formData,
      }),
    }),
    editNotis: builder.mutation({
      query: ({ news, paid, late, revCol }) => ({
        url: '/accounts/edit/notis',
        method: 'POST',
        body: {
          news: news,
          paid: paid,
          late: late,
          revCol: revCol,
        },
      }),
    }),
    deleteAccount: builder.mutation({
      query: () => ({
        url: '/accounts/delete',
        method: 'POST',
        body: {},
      }),
    }),
    uploadLogo: builder.mutation({
      query: (logo) => {
        const formData = new FormData();
        formData.append('logoImg', logo);

        return {
          url: '/accounts/edit/logo',
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useSetupMutation,
  useGetUserQuery,
  useEditAccountMutation,
  useEditNotisMutation,
  useDeleteAccountMutation,
  useUploadLogoMutation,
  useGetStatsTempQuery,
} = accountApiSlice;
