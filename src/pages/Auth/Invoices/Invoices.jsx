import React, { useEffect } from 'react';
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

  useEffect(() => {
    refetch();
  }, []);

  let content;

  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    content = <Desktop invoices={invoices} />;
  }

  return content;
};

export default Invoices;
