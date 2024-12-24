import React, { useEffect, useRef, useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { AlertOctagon, ChevronLeft } from 'react-feather';
import { useConfirmPayInvoMutation } from '../../../../api/invoicesApiSlice';
import { Spinner } from 'flowbite-react';

const Form = ({ setReadyForPayment, invoice, refetch }) => {
  const [error, setError] = useState('');
  const [isPayBtnDisabled, setIsPayBtnDisabled] = useState(true);

  //for display
  const taxAmount = invoice?.tax?.amount / 100;

  const stripe = useStripe();
  const elements = useElements();

  const paymentElementRef = useRef(null);

  //hook for confirming payment
  const [confirmPayInvo, { isLoading: paying }] = useConfirmPayInvoMutation();

  //handles confirming payment
  const handleConfirmPayment = async (e) => {
    e.preventDefault();

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
                name: invoice?.customer?.name,
                email: invoice?.customer?.email,
                phone: invoice?.customer?.phone ? invoice?.customer?.phone : '',
                address: {
                  country: invoice?.customer?.country?.value,
                  postal_code: invoice?.customer?.zipcode,
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
      }).unwrap();
      if (paymentReq?.success) {
        refetch();
      } else if (paymentReq?.failed) {
        setError(paymentReq?.msg);
        return;
      }
    } catch (err) {
      console.log(err);
      setError('There was a server error');
      return;
    }
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
      <div className="w-full flex flex-col items-start gap-2 p-2 pl-4 pr-4 rounded-md bg-gray-50">
        <div className="w-full flex justify-between items-center">
          <p className="text-stone-700 text-xs">Amount:</p>
          <p className="text-stone-700 text-xs">
            ${invoice?.amount?.toFixed(2)}
          </p>
        </div>
        <div className="w-full flex justify-between items-center">
          <p className="text-stone-700 text-xs">Tax({invoice?.tax?.rate}%):</p>
          <p className="text-stone-700 text-xs">${taxAmount?.toFixed(2)}</p>
        </div>
        <div className="w-full flex justify-between items-center">
          <p className="text-stone-800 text-xs font-bold">Total:</p>
          <p className="text-stone-800 text-xs font-bold">
            ${(invoice?.amount + taxAmount).toFixed(2)}
          </p>
        </div>
      </div>
      {error ? (
        <div className="w-full flex items-center justify-start gap-2 border border-gray-200 rounded-md p-2">
          <AlertOctagon size={16} className="text-red-400" />
          <p className="text-stone-800 text-xs">{error}</p>
        </div>
      ) : (
        ''
      )}
      <div id="payment-element" className="w-full" ref={paymentElementRef} />
      {paying ? (
        <div className="w-full p-2 flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="w-full flex items-center gap-2">
          <button
            type="button"
            onClick={() => setReadyForPayment(false)}
            className="p-2 w-3/12 border border-stone-800 text-stone-800 rounded-md flex items-center justify-center"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            className="p-2 w-9/12 border border-stone-800 text-stone-800 rounded-md text-xs"
            onClick={handleConfirmPayment}
            disabled={isPayBtnDisabled || paying}
          >
            Pay
          </button>
        </div>
      )}
    </div>
  );
};

export default Form;
