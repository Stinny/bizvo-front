import { apiSlice } from './apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, pass }) => ({
        url: '/auth/login',
        method: 'POST',
        body: { email: email, pass: pass },
      }),
    }),
    signup: builder.mutation({
      query: ({ email, pass }) => ({
        url: '/auth/signup',
        method: 'POST',
        body: { email: email, pass: pass },
      }),
    }),
    googleLogin: builder.mutation({
      query: ({ code }) => ({
        url: '/auth/login/google',
        method: 'POST',
        body: {
          code: code,
        },
      }),
    }),
    googleSignup: builder.mutation({
      query: ({ code }) => ({
        url: '/auth/signup/google',
        method: 'POST',
        body: {
          code: code,
        },
      }),
    }),
    subscribe: builder.mutation({
      query: ({ email }) => ({
        url: '/auth/sub',
        method: 'POST',
        body: { email: email },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGoogleLoginMutation,
  useGoogleSignupMutation,
  useSubscribeMutation,
} = authApiSlice;
