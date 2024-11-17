import { apiSlice } from './apiSlice';

export const invoicesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createInvoice: builder.mutation({
      query: ({ title, description, items, customerId, dueDate }) => ({
        url: '/invoices/create',
        method: 'POST',
        body: {
          title: title,
          description: description,
          items: items,
          customerId: customerId,
          dueDate: dueDate,
        },
      }),
    }),
    editInvoice: builder.mutation({
      query: ({
        email,
        name,
        phone,
        desc,
        country,
        zip,
        address,
        invoiceId,
      }) => ({
        url: `/invoices/edit/${invoiceId}`,
        method: 'POST',
        body: {
          email: email,
          name: name,
          phone: phone,
          desc: desc,
          country: country,
          zip: zip,
          address: address,
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
