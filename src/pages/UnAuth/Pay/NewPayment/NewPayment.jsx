import React from 'react';
import Form from './Form';

//stripe
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripeLoader = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const NewPayment = ({
  setReadyForPayment,
  invoice,
  trx,
  refetch,
  setSucc,
  customer,
  view,
  handleView,
  error,
  setError,
}) => {
  const stripeOptions = {
    mode: 'payment',
    currency: 'usd',
    amount: trx?.amount,
    appearance: {
      labels: 'floating',
      theme: 'stripe',
      variables: {
        colorPrimary: '#fff',
        colorBackground: '#ffffff',
        colorText: '#000',
        colorDanger: '#df1b41',
        fontFamily: 'Ideal Sans, system-ui, sans-serif',
        fontSizeBase: '12px',
        borderRadius: '4px',
        spacingUnit: '1px',
        gridColumnSpacing: '8px',
        gridRowSpacing: '8px',
      },
      rules: {
        '.Input': {
          borderColor: 'rgb(229 231 235)',
          backgroundColor: '#fff',
          boxShadow: 'none',
          padding: '3px',
        },
        '.Input:focus': {
          borderColor: 'rgb(229 231 235)',
          backgroundColor: 'rgb(249 250 251)',
          outline: 0,
          boxShadow: 'none',
        },
        '.Input:hover': {
          borderColor: 'rgb(229 231 235)',
          backgroundColor: 'rgb(249 250 251)',
          outline: 0,
          boxShadow: 'none',
        },
        '.Label': {
          color: '#757575',
        },
      },
    },
  };

  // if (invoice?.type === 'recurring') {
  //   stripeOptions.setup_future_usage = 'off_session';
  // }

  return (
    <Elements stripe={stripeLoader} options={stripeOptions}>
      <Form
        setReadyForPayment={setReadyForPayment}
        invoice={invoice}
        trx={trx}
        customer={customer}
        refetch={refetch}
        setSucc={setSucc}
        view={view}
        handleView={handleView}
        error={error}
        setError={setError}
      />
    </Elements>
  );
};

export default NewPayment;
