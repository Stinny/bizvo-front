import React, { useEffect, useRef, useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import {
  AlertOctagon,
  ChevronLeft,
  CreditCard,
  Percent,
  Send,
} from 'react-feather';
import { useConfirmPayInvoMutation } from '../../../../api/invoicesApiSlice';
import { Spinner } from 'flowbite-react';
import { Checkbox, Timeline } from 'antd';

const Form = ({
  setReadyForPayment,
  invoice,
  refetch,
  setSucc,
  trx,
  customer,
  view,
  handleView,
  error,
  setError,
}) => {
  const [isPayBtnDisabled, setIsPayBtnDisabled] = useState(true);
  const [allow, setAllow] = useState(false);
  const disablePay = invoice?.type === 'recurring' && !allow ? true : false;

  const stripe = useStripe();
  const elements = useElements();

  const paymentElementRef = useRef(null);

  //hook for confirming payment
  const [confirmPayInvo, { isLoading: paying }] = useConfirmPayInvoMutation();

  //handles confirming payment
  const handleConfirmPayment = async (e) => {
    e.preventDefault();

    setError('');

    if (invoice?.type === 'recurring' && !allow) {
      return;
    }

    if (!stripe || !elements) {
      setError('There was an error');
      return;
    }

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError);
        return;
      }
      const { error, confirmationToken } = await stripe.createConfirmationToken(
        {
          elements,
          params: {
            payment_method_data: {
              billing_details: {
                name: customer?.name,
                email: customer?.email,
                phone: customer?.phone ? customer?.phone : '',
                address: {
                  country: customer?.country?.value,
                  postal_code: customer?.zipcode,
                },
              },
            },
          },
        }
      );
      if (error) {
        setError(error);
        return;
      }

      //confirm payment on order
      const paymentReq = await confirmPayInvo({
        tkn: confirmationToken?.id,
        payOrigin: confirmationToken?.payment_method_preview?.card?.country,
        invoiceId: invoice?._id,
        allow: allow,
      }).unwrap();
      if (paymentReq?.success) {
        setSucc(true);
        refetch();
      } else if (paymentReq?.failed) {
        setError(paymentReq?.msg);
        return;
      }
    } catch (err) {
      console.log(err);
      setError('There was an error');
      return;
    }
  };

  const handleCancelPay = () => {
    refetch();
    setReadyForPayment(false);
  };

  //handles loading the Stripe payment element
  useEffect(() => {
    if (!stripe || !elements) {
      return; // Ensure that stripe and elements are initialized
    }

    // Create a payment element instance
    const paymentElement = elements.create('payment', {
      fields: {
        billingDetails: {
          address: {
            country: 'never',
            postalCode: 'never',
          },
        },
      },
    });

    // Mount the payment element
    paymentElement.mount(paymentElementRef.current);

    // Listen to changes in the Payment Element
    paymentElement.on('change', (event) => {
      // Check if the form is complete and valid
      setIsPayBtnDisabled(!event.complete);
    });

    // Cleanup function to unmount the element when the component unmounts
    return () => {
      paymentElement.unmount();
    };
  }, [stripe, elements]);

  return (
    <div className="w-full flex flex-col gap-2 items-start">
      <button
        type="button"
        onClick={() => handleView('new')}
        className="w-full flex flex-col flex-grow border border-gray-200 rounded-md p-2"
      >
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-xs text-stone-800">New Payment Method</p>
          </div>
          <div
            className={`w-2.5 h-2.5 border border-gray-200 hover:border-stone-800 rounded-sm ${
              view === 'new' ? 'bg-stone-800' : 'bg-white'
            }`}
          ></div>
        </div>

        <div
          className={`transition-[max-height] duration-300 ease-in-out overflow-hidden ${
            view === 'new' ? 'max-h-44' : 'max-h-0'
          }`}
        >
          <div
            id="payment-element"
            className="w-full mt-2"
            ref={paymentElementRef}
          />
          <div className="flex items-center gap-1 mt-2">
            <Checkbox
              checked={allow}
              onChange={(e) => setAllow(e.target.checked)}
            />
            <div className="flex flex-col items-start">
              <p className="text-xs text-stone-800">Save for next payment</p>
            </div>
          </div>
          {paying ? (
            <div className="w-full p-2 flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="w-full flex items-center gap-2 mt-2">
              <button
                type="button"
                onClick={handleCancelPay}
                className="p-2 w-2/12 border border-stone-800 text-stone-800 rounded-md flex items-center justify-center"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                className="p-2 w-10/12 border border-stone-800 text-stone-800 rounded-md text-xs font-medium"
                onClick={handleConfirmPayment}
                disabled={isPayBtnDisabled || paying || disablePay}
              >
                Pay{' '}
                <span style={{ fontSize: '11px' }}>
                  $
                  {parseFloat(trx?.total / 100)?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </button>
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

export default Form;
