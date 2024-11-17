import React, { useState } from 'react';
import Desktop from './Desktop';
import { useGetCustomerOptsQuery } from '../../../api/customersApiSlice';
import Loading from '../../../components/Loading';

const NewInvo = () => {
  //form state
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [customer, setCustomer] = useState({});
  const [items, setItems] = useState([]);

  const {
    data: custOpts,
    isLoading,
    isSuccess,
    refetch,
  } = useGetCustomerOptsQuery();

  //invoice create req logic here
  const handleSaveInvoice = async () => {};

  let content;

  if (isLoading) {
    content = <Loading />;
  } else {
    content = (
      <Desktop handleSaveInvoice={handleSaveInvoice} custOpts={custOpts} />
    );
  }
  return content;
};

export default NewInvo;
