import { apiSlice } from './apiSlice';

export const accountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => `/accounts/get`,
    }),
    getStatsTemp: builder.query({
      query: () => `/accounts/get/stats`,
    }),
    checkSlug: builder.query({
      query: (slug) => ({
        url: '/accounts/checkSlug?slug=' + slug, // Call the backend to check the slug
        method: 'GET',
      }),
    }),
    setup: builder.mutation({
      query: (formData) => ({
        url: '/accounts/setup',
        method: 'POST',
        body: formData,
      }),
    }),
    editAccount: builder.mutation({
      query: ({
        phone,
        dob,
        address,
        zip,
        country,
        busType,
        currency,
        taxId,
        name,
      }) => ({
        url: '/accounts/edit/account',
        method: 'POST',
        body: {
          phone: phone,
          dob: dob,
          address: address,
          zip: zip,
          country: country,
          busType: busType,
          currency: currency,
          taxId: taxId,
          name: name,
        },
      }),
    }),
    editProfile: builder.mutation({
      query: ({ name, desc, image, slug, link, x, medium, insta, linked }) => ({
        url: '/accounts/edit/profile',
        method: 'POST',
        body: {
          name: name,
          description: desc,
          image: image,
          medium: medium,
          x: x,
          insta: insta,
          link: link,
          slug: slug,
          linked: linked,
        },
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
  useEditProfileMutation,
  useEditNotisMutation,
  useDeleteAccountMutation,
  useUploadLogoMutation,
  useCheckSlugQuery,
  useGetStatsTempQuery,
} = accountApiSlice;
