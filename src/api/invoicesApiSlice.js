import { apiSlice } from './apiSlice';

export const invoicesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createInvoice: builder.mutation({
      query: ({ title, description, amount, customerId, due }) => ({
        url: '/invoices/create',
        method: 'POST',
        body: {
          title: title,
          description: description,
          amount: amount,
          customerId: customerId,
          dueDate: due,
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
      }) => ({
        url: `/invoices/edit`,
        method: 'POST',
        body: {
          title: title,
          description: description,
          amount: amount,
          customerId: customerId,
          dueDate: dueDate,
          invoiceId: invoiceId,
        },
      }),
    }),
    deleteInvoice: builder.mutation({
      query: ({ invoiceId }) => ({
        url: `/invoices/delete`,
        method: 'POST',
        body: {
          invoiceId: invoiceId,
        },
      }),
    }),
    getInvoices: builder.query({
      query: () => `/invoices/get`,
    }),
    getInvoice: builder.query({
      query: ({ invoiceId }) => `/invoices/get/${invoiceId}`,
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useCreateInvoiceMutation,
  useDeleteInvoiceMutation,
  useGetInvoiceQuery,
  useEditInvoiceMutation,
} = invoicesApiSlice;
