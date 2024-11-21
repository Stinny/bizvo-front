import React, { useState } from 'react';
import Desktop from './Desktop';
import { useGetCustomerOptsQuery } from '../../../api/customersApiSlice';
import Loading from '../../../components/Loading';
import { useCreateInvoiceMutation } from '../../../api/invoicesApiSlice';
import { useNavigate } from 'react-router-dom';

const NewInvo = () => {
  const navigate = useNavigate();

  //form state
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [customer, setCustomer] = useState({});
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [step, setStep] = useState('cust');

  //to determine if a customer was selected or not
  const custSelected = Object.keys(customer).length ? true : false;

  //hook for getting customer options
  const {
    data: custOpts,
    isLoading,
    isSuccess,
    refetch,
  } = useGetCustomerOptsQuery();

  //hook for creating new invoice on server
  const [createInvoice, { isLoading: creating }] = useCreateInvoiceMutation();

  //invoice create req logic here
  const handleSaveInvoice = async () => {
    try {
      const newInvoiceReq = await createInvoice({
        title: title,
        description: desc,
        customerId: customer?.value,
        items: items,
      }).unwrap();

      if (newInvoiceReq === 'Invoice created') {
        //dispatch toast notification
        navigate('/dashboard/invoices');
      } else {
        setError('There was an error');
        return;
      }
    } catch (err) {
      console.log(err);
      setError('Server error');
      return;
    }
  };

  let content;

  if (isLoading) {
    content = <Loading />;
  } else {
    content = (
      <Desktop
        handleSaveInvoice={handleSaveInvoice}
        custOpts={custOpts}
        items={items}
        setItems={setItems}
        customer={customer}
        setCustomer={setCustomer}
        custSelected={custSelected}
        error={error}
        step={step}
        setStep={setStep}
        title={title}
        setTitle={setTitle}
        desc={desc}
        setDesc={setDesc}
      />
    );
  }
  return content;
};

export default NewInvo;
