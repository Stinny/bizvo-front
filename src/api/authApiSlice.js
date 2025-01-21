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
    changePswd: builder.mutation({
      query: ({ oldPswd, newPswd }) => ({
        url: '/auth/password/change',
        method: 'POST',
        body: { oldPassword: oldPswd, newPassword: newPswd },
      }),
    }),
    subscribe: builder.mutation({
      query: ({ email }) => ({
        url: '/auth/sub',
        method: 'POST',
        body: { email: email },
      }),
    }),
    confirmEmail: builder.mutation({
      query: ({ userId, ect }) => ({
        url: '/auth/confirm/email',
        method: 'POST',
        body: { userId: userId, ect: ect },
      }),
    }),
    sendConfirmLink: builder.mutation({
      query: ({ userId }) => ({
        url: '/auth/confirm/link',
        method: 'POST',
        body: { userId: userId },
      }),
    }),
    reqPswdLink: builder.mutation({
      query: ({ email }) => ({
        url: '/auth/password/link',
        method: 'POST',
        body: { email: email },
      }),
    }),
    resetPswd: builder.mutation({
      query: ({ pass, ect, userId }) => ({
        url: '/auth/password/reset',
        method: 'POST',
        body: { pass: pass, ect: ect, userId: userId },
      }),
    }),
    sendMsg: builder.mutation({
      query: ({ email, msg, type, userId }) => ({
        url: '/auth/message',
        method: 'POST',
        body: { email: email, type: type, msg: msg, userId: userId },
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
  useChangePswdMutation,
  useConfirmEmailMutation,
  useSendConfirmLinkMutation,
  useReqPswdLinkMutation,
  useResetPswdMutation,
  useSendMsgMutation,
} = authApiSlice;
