import React, { useEffect, useState } from 'react';
import Desktop from './Desktop';
import { useGetCustomerOptsQuery } from '../../../api/customersApiSlice';
import Loading from '../../../components/Loading';
import { useCreateInvoiceMutation } from '../../../api/invoicesApiSlice';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '../../../api/toastSlice';
import { useDispatch } from 'react-redux';
import Navbar from '../../../components/Navbar/Navbar';
import Sidenav from '../../../components/Sidenav/Sidenav';
import Cookies from 'js-cookie';

const NewInvo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //current user
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  //tomorrows date for datepicker min
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  //form state
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [customer, setCustomer] = useState({});
  const [items, setItems] = useState([]);
  const [due, setDue] = useState(tomorrow);
  const [amount, setAmount] = useState(undefined);
  const [error, setError] = useState('');
  const [type, setType] = useState('single');
  const [int, setInt] = useState('monthly');
  const [send, setSend] = useState(false);
  const [sendConfirm, setSendConfirm] = useState(false);
  const [confirmMod, setConfirmMod] = useState(false);

  // Function to wait for user confirmation
  const waitForConfirmation = () => {
    return new Promise((resolve) => {
      // When user confirms, call resolve
      const handleConfirm = () => {
        setSendConfirm(true);
        setConfirmMod(false); // Close modal
        resolve(); // Resolve the promise
      };

      // Show modal and attach the confirmation handler
      setConfirmMod(true);
      // Save the handler so modal can call it later
      setModalConfirmHandler(() => handleConfirm);
    });
  };

  const [modalConfirmHandler, setModalConfirmHandler] = useState(null);

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
    if (!Object.keys(customer).length) {
      setError('Missing a customer');
      return;
    }

    if (!title.trim()) {
      setError('Missing a title');
      return;
    }

    if (!desc.trim()) {
      setError('Missing a description');
      return;
    }

    if (amount < 5 || !amount) {
      setError('Amount needs to be at least $5');
      return;
    }

    if (send && !sendConfirm) {
      await waitForConfirmation();
    }

    try {
      const newInvoiceReq = await createInvoice({
        title: title,
        description: desc,
        customerId: customer?.value,
        type: type,
        interval: int,
        amount: parseFloat(amount),
        due: due,
        send: send,
      }).unwrap();

      if (newInvoiceReq === 'Invoice created') {
        const toastMsg = send ? 'Invoice created & sent' : 'Invoice created';
        dispatch(showNotification(toastMsg));
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

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    setError('');
  }, [title, desc, amount, customer]);

  let content;

  if (isLoading || creating) {
    content = <Loading />;
  } else if (isSuccess) {
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
        type={type}
        setType={setType}
        int={int}
        setInt={setInt}
        title={title}
        setTitle={setTitle}
        desc={desc}
        setDesc={setDesc}
        due={due}
        setDue={setDue}
        amount={amount}
        setAmount={setAmount}
        send={send}
        setSend={setSend}
        currentUser={currentUser}
        confirmMod={confirmMod}
        setConfirmMod={setConfirmMod}
        modalConfirmHandler={modalConfirmHandler}
      />
    );
  }
  return (
    <div className="mx-auto max-w-3xl flex flex-col gap-2 h-fit">
      <Navbar />
      <div className="flex items-start gap-2">
        <Sidenav />
        {content}
      </div>
    </div>
  );
};

export default NewInvo;
