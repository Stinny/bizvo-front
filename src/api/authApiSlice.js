import { apiSlice } from './apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    signup: builder.mutation({
      query: ({ email, pass }) => ({
        url: '/auth/signup',
        method: 'POST',
        body: { email: email, pass: pass },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApiSlice;
