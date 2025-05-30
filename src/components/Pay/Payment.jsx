import { Badge, Timeline } from 'antd';
import React, { useEffect, useState } from 'react';
import { AlertOctagon, CreditCard, Percent, Send } from 'react-feather';
import NewPayment from '../../pages/UnAuth/Pay/NewPayment/NewPayment';
import Existing from '../../pages/UnAuth/Pay/Existing/Existing';
import Title from './Title';

const Payment = ({
  setReadyForPayment,
  invoice,
  trx,
  refetch,
  setSucc,
  customer,
  biz,
}) => {
  const [view, setView] = useState('new');
  const [error, setError] = useState('');

  const handleView = (newView) => {
    setView(newView);
  };

  //for display
  const total = trx?.total / 100;
  const taxAmount = trx?.tax?.amount / 100;
  let taxType;
  switch (trx?.tax?.type) {
    case 'vat':
      taxType = 'VAT';
      break;
    case 'gst':
      taxType = 'GST';
      break;
    default:
      taxType = 'Sales Tax';
      break;
  }

  // useEffect(() => {
  //   if (customer?.payment?.id) setView('old');
  // }, []);

  return (
    <div className="w-full flex flex-col items-start gap-4">
      <Title invoice={invoice} />
      <div className="w-full pl-1">
        <Timeline
          className="text-left"
          items={[
            {
              dot: <Send size={12} className="text-stone-800" />,
              children: (
                <p className="text-xs text-stone-800 pt-1">
                  Invoiced for{' '}
                  <span className="font-medium">
                    $
                    {parseFloat(trx?.amount / 100)?.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </p>
              ),
            },
            {
              dot: <Percent size={12} className="text-stone-800" />,
              children: (
                <p className="text-xs text-stone-800 pt-1">
                  Added tax{' '}
                  <span className="font-medium">
                    $
                    {parseFloat(taxAmount)?.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </p>
              ),
            },
            {
              dot: <CreditCard size={12} className="text-stone-800" />,
              children: (
                <p className="text-xs text-stone-800 pt-1">
                  Total due{' '}
                  <span className="font-medium">
                    $
                    {parseFloat(total)?.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </p>
              ),
            },
            {
              dot: <Badge dot={true} status="processing" color="#000" />,
              children: (
                <p className="text-xs text-stone-800 pt-1">
                  Waiting for payment
                </p>
              ),
            },
          ]}
        />
      </div>

      <div className="w-full flex flex-col items-start gap-2">
        <NewPayment
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
        {/* {customer?.payment?.id ? (
          <Existing
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
        ) : (
          ''
        )} */}
      </div>

      {/* render new pay form here or exisiting pay form here */}
    </div>
  );
};

export default Payment;
