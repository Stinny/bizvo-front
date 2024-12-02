import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers) => {
    const aToken = Cookies.get('aToken') ? Cookies.get('aToken') : null;

    if (aToken) {
      headers.set('Authorization', `Bearer ${aToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    const rToken = Cookies.get('rToken');

    const refreshResult = await baseQuery(
      `/auth/tkn/${rToken}`,
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      Cookies.set('aToken', refreshResult?.data, { sameSite: 'Lax' });

      result = await baseQuery(args, api, extraOptions);
    } else {
      //logout logic from logout hook in utils
      Cookies.remove('currentUser');
      Cookies.remove('aToken');
      Cookies.remove('rToken');
      Cookies.remove('isAuth');
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
