import React from 'react';
import Form from './Form';

const Existing = ({
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
  return (
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
  );
};

export default Existing;
