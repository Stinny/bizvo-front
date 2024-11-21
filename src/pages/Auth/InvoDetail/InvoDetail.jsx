import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetInvoiceQuery } from '../../../api/invoicesApiSlice';
import Loading from '../../../components/Loading';
import Desktop from './Desktop/Desktop';

const InvoDetail = () => {
  const { invoiceId } = useParams();

  const {
    data: invoice,
    isLoading,
    isSuccess,
    refetch,
  } = useGetInvoiceQuery({ invoiceId });

  useEffect(() => {
    refetch();
  }, []);

  let content;

  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    content = <Desktop invoice={invoice} refetch={refetch} />;
  }

  return content;
};

export default InvoDetail;
