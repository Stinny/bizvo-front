import { apiSlice } from './apiSlice';

export const invoicesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createInvoice: builder.mutation({
      query: ({
        title,
        description,
        amount,
        customerId,
        due,
        send,
        type,
        interval,
      }) => ({
        url: '/invoices/create',
        method: 'POST',
        body: {
          title: title,
          description: description,
          amount: amount,
          customerId: customerId,
          dueDate: due,
          send: send,
          type: type,
          interval: interval,
        },
      }),
    }),
    editInvoice: builder.mutation({
      query: ({
        title,
        description,
        amount,
        customerId,
        dueDate,
        invoiceId,
        send,
        type,
        interval,
      }) => ({
        url: `/invoices/edit`,
        method: 'POST',
        body: {
          title: title,
          description: description,
          amount: amount,
          customerId: customerId,
          dueDate: dueDate,
          invoId: invoiceId,
          send: send,
          type: type,
          interval: interval,
        },
      }),
    }),
    updateInvoForPay: builder.mutation({
      query: ({ invoiceId }) => ({
        url: `/invoices/update/pay`,
        method: 'POST',
        body: {
          invoiceId: invoiceId,
        },
      }),
    }),
    confirmPayInvo: builder.mutation({
      query: ({ invoiceId, tkn, payOrigin, allow }) => ({
        url: `/invoices/confirm/pay`,
        method: 'POST',
        body: {
          invoiceId: invoiceId,
          confirmTkn: tkn,
          payOrigin: payOrigin,
          allow: allow,
        },
      }),
    }),
    confirmPayInvoExist: builder.mutation({
      query: ({ invoiceId, trxId }) => ({
        url: `/invoices/confirm/pay/exists`,
        method: 'POST',
        body: {
          invoiceId: invoiceId,
          trxId: trxId,
        },
      }),
    }),
    deleteInvoice: builder.mutation({
      query: ({ invoiceId }) => ({
        url: `/invoices/delete`,
        method: 'POST',
        body: {
          invoId: invoiceId,
        },
      }),
    }),
    cancelInvoice: builder.mutation({
      query: ({ invoId, msg }) => ({
        url: `/invoices/cancel`,
        method: 'POST',
        body: {
          invoId: invoId,
          msg: msg,
        },
      }),
    }),
    sendInvoice: builder.mutation({
      query: ({ invoiceId }) => ({
        url: `/invoices/send`,
        method: 'POST',
        body: {
          invoId: invoiceId,
        },
      }),
    }),
    getNewLink: builder.mutation({
      query: ({ invoId, iat }) => ({
        url: `/invoices/new/link`,
        method: 'POST',
        body: {
          invoId: invoId,
          iat: iat,
        },
      }),
    }),
    getInvoices: builder.query({
      query: () => `/invoices/get`,
    }),
    getInvoice: builder.query({
      query: ({ invoiceId }) => `/invoices/get/${invoiceId}`,
    }),
    getInvoiceToPay: builder.query({
      query: ({ invoId, invoTkn, uid }) =>
        `/invoices/get/pay/${invoId}?iat=${invoTkn}&uid=${uid}`,
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useCreateInvoiceMutation,
  useDeleteInvoiceMutation,
  useGetInvoiceQuery,
  useEditInvoiceMutation,
  useGetInvoiceToPayQuery,
  useSendInvoiceMutation,
  useUpdateInvoForPayMutation,
  useConfirmPayInvoMutation,
  useCancelInvoiceMutation,
  useGetNewLinkMutation,
  useConfirmPayInvoExistMutation,
} = invoicesApiSlice;
