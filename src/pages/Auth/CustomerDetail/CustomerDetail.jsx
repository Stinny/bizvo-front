import React, { useEffect } from 'react';
import Desktop from './Desktop/Desktop';
import { useParams } from 'react-router-dom';
import { useGetCustomerQuery } from '../../../api/customersApiSlice';
import { Spinner } from 'flowbite-react';
import Loading from '../../../components/Loading';

const CustomerDetail = () => {
  const { customerId } = useParams();
  const {
    data: customer,
    isLoading,
    isSuccess,
    refetch,
  } = useGetCustomerQuery({ customerId });

  useEffect(() => {
    refetch();
  }, []);

  let content;

  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    content = (
      <Desktop
        customer={customer}
        isLoading={isLoading}
        isSuccess={isSuccess}
        refetch={refetch}
      />
    );
  }

  return content;
};

export default CustomerDetail;
