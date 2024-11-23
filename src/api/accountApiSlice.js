import { apiSlice } from './apiSlice';

export const accountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => `/accounts/get`,
    }),
    setup: builder.mutation({
      query: ({
        name,
        desc,
        phone,
        dob,
        image,
        address,
        zip,
        country,
        busType,
      }) => ({
        url: '/accounts/setup',
        method: 'POST',
        body: {
          name: name,
          description: desc,
          phone: phone,
          dob: dob,
          image: image,
          address: address,
          zip: zip,
          country: country,
          busType: busType,
        },
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
  }),
});

export const {
  useSetupMutation,
  useGetUserQuery,
  useEditAccountMutation,
  useEditProfileMutation,
  useEditNotisMutation,
} = accountApiSlice;
