import React, { useState } from 'react';
import Desktop from './Desktop';
import { useGetCustomerOptsQuery } from '../../../api/customersApiSlice';
import Loading from '../../../components/Loading';
import { useCreateInvoiceMutation } from '../../../api/invoicesApiSlice';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '../../../api/toastSlice';
import { useDispatch } from 'react-redux';
import Navbar from '../../../components/Navbar/Navbar';
import Sidenav from '../../../components/Sidenav/Sidenav';
import Footer from '../../../components/Footer/Footer';

const NewInvo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //form state
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [customer, setCustomer] = useState({});
  const [items, setItems] = useState([]);
  const [due, setDue] = useState('');
  const [amount, setAmount] = useState(0);
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
        amount: parseFloat(amount),
        due: due,
      }).unwrap();

      if (newInvoiceReq === 'Invoice created') {
        dispatch(showNotification('Invoice created'));
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
        due={due}
        setDue={setDue}
        amount={amount}
        setAmount={setAmount}
      />
    );
  }
  return (
    <div className="mx-auto max-w-3xl flex flex-col gap-2 h-screen relative">
      <Navbar />
      <div className="flex items-start gap-2">
        <Sidenav />
        {content}
      </div>
      <Footer />
    </div>
  );
};

export default NewInvo;
