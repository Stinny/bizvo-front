import { apiSlice } from './apiSlice';

export const customersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCustomer: builder.mutation({
      query: ({ email, name, phone, desc, country, zip, address }) => ({
        url: '/customers/create',
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
    editCustomer: builder.mutation({
      query: ({
        email,
        name,
        phone,
        desc,
        country,
        zip,
        address,
        customerId,
      }) => ({
        url: `/customers/edit/${customerId}`,
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
    deleteCustomer: builder.mutation({
      query: ({ customerId }) => ({
        url: `/customers/delete`,
        method: 'POST',
        body: {
          customerId: customerId,
        },
      }),
    }),
    getCustomers: builder.query({
      query: () => `/customers/get`,
    }),
    getCustomer: builder.query({
      query: ({ customerId }) => `/customers/get/${customerId}`,
    }),
    getCustomerOpts: builder.query({
      query: () => `/customers/get/opts`,
    }),
  }),
});

export const {
  useCreateCustomerMutation,
  useGetCustomersQuery,
  useEditCustomerMutation,
  useGetCustomerQuery,
  useDeleteCustomerMutation,
  useGetCustomerOptsQuery,
} = customersApiSlice;