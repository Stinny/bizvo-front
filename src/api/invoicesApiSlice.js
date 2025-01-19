import { apiSlice } from './apiSlice';

export const invoicesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createInvoice: builder.mutation({
      query: ({ title, description, amount, customerId, due, send }) => ({
        url: '/invoices/create',
        method: 'POST',
        body: {
          title: title,
          description: description,
          amount: amount,
          customerId: customerId,
          dueDate: due,
          send: send,
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
      query: ({ invoiceId, tkn, payOrigin }) => ({
        url: `/invoices/confirm/pay`,
        method: 'POST',
        body: {
          invoiceId: invoiceId,
          confirmTkn: tkn,
          payOrigin: payOrigin,
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
    getInvoices: builder.query({
      query: () => `/invoices/get`,
    }),
    getInvoice: builder.query({
      query: ({ invoiceId }) => `/invoices/get/${invoiceId}`,
    }),
    getInvoiceToPay: builder.query({
      query: ({ invoId, invoTkn }) =>
        `/invoices/get/pay/${invoId}?iat=${invoTkn}`,
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
} = invoicesApiSlice;
