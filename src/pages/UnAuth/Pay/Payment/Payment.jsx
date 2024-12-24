import React from 'react';
import Form from './Form';

//stripe
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripeLoader = loadStripe(import.meta.env.VITE_STRIPE_KEY);
const stripeOptions = {
  mode: 'payment',
  amount: Math.round(10000 * 100),
  currency: 'usd',
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
      borderRadius: '6px',
      spacingUnit: '1px',
      gridColumnSpacing: '8px',
      gridRowSpacing: '8px',
    },
    rules: {
      '.Input': {
        borderColor: 'rgb(229 231 235)',
        backgroundColor: 'rgb(249 250 251)',
        boxShadow: 'none',
      },
      '.Input:focus': {
        borderColor: 'rgb(229 231 235)',
        backgroundColor: 'rgb(229 231 235)',
        outline: 0,
        boxShadow: 'none',
      },
      '.Input:hover': {
        borderColor: 'rgb(229 231 235)',
        backgroundColor: 'rgb(229 231 235)',
        outline: 0,
        boxShadow: 'none',
      },
      '.Label': {
        color: '#757575',
      },
    },
  },
};

const Payment = ({ setReadyForPayment, invoice, refetch }) => {
  return (
    <Elements stripe={stripeLoader} options={stripeOptions}>
      <Form
        setReadyForPayment={setReadyForPayment}
        invoice={invoice}
        refetch={refetch}
      />
    </Elements>
  );
};

export default Payment;