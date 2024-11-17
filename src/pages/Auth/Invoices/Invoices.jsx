import React from 'react';
import Desktop from './Desktop';
import { useGetInvoicesQuery } from '../../../api/invoicesApiSlice';
import Loading from '../../../components/Loading';

const Invoices = () => {
  const {
    data: invoices,
    isLoading,
    isSuccess,
    refetch,
  } = useGetInvoicesQuery();

  let content;

  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    content = <Desktop invoices={invoices} />;
  }

  return content;
};

export default Invoices;
