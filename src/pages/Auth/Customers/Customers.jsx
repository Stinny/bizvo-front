import React, { useEffect } from 'react';
import Desktop from './Desktop';
import { useGetCustomersQuery } from '../../../api/customersApiSlice';
import Loading from '../../../components/Loading';

const Customers = () => {
  //get customers API hook
  const {
    data: customers,
    isLoading,
    isSuccess,
    isFetching,
    refetch,
  } = useGetCustomersQuery();

  useEffect(() => {
    refetch();
  }, []);

  let content;

  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    content = <Desktop customers={customers} />;
  }

  return content;
};

export default Customers;
