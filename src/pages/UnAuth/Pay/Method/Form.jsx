import React, { useEffect, useRef, useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { AlertOctagon, ChevronLeft } from 'react-feather';
import { useConfirmPayInvoMutation } from '../../../../api/invoicesApiSlice';
import { Spinner } from 'flowbite-react';
import { useChangePayMethodMutation } from '../../../../api/customersApiSlice';

const Form = ({ setReady, sec, customer, invoice, refetch, setAdded }) => {
  const [error, setError] = useState('');
  const [isPayBtnDisabled, setIsPayBtnDisabled] = useState(true);

  const stripe = useStripe();
  const elements = useElements();

  const cardElementRef = useRef(null);

  //hook for confirming payment
  const [changePayMethod, { isLoading: changing }] =
    useChangePayMethodMutation();

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
      const { setupIntent } = await stripe.confirmSetup({
        elements,
        clientSecret: sec,
        redirect: 'if_required',
        confirmParams: {
          return_url: `https://bizvo.io/pay${invoice?._id}?iat=${invoice?.token}`,
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
      });

      if (setupIntent?.status === 'succeeded') {
        const changeReq = await changePayMethod({
          customerId: customer?._id,
          paymentMeth: setupIntent?.payment_method,
        }).unwrap();

        if (changeReq === 'Changed') {
          refetch();
          setAdded(true);
        }
      }
    } catch (err) {
      console.log(err);
      setError('There was an error');
      return;
    }
  };

  //handles loading the Stripe payment element
  useEffect(() => {
    if (!stripe || !elements) {
      return; // Ensure that stripe and elements are initialized
    }

    // Create a payment element instance
    const cardElement = elements.create('payment', {
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
    cardElement.mount(cardElementRef.current);

    // Listen to changes in the Payment Element
    cardElement.on('change', (event) => {
      // Check if the form is complete and valid
      setIsPayBtnDisabled(!event.complete);
    });

    // Cleanup function to unmount the element when the component unmounts
    return () => {
      cardElement.unmount();
    };
  }, [stripe, elements]);

  return (
    <div className="w-full flex flex-col gap-2 items-start">
      {error ? (
        <div className="w-full flex items-center justify-start gap-2 border border-gray-200 rounded-md p-2">
          <AlertOctagon size={16} className="text-red-400" />
          <p className="text-stone-800 text-xs">{error}</p>
        </div>
      ) : (
        ''
      )}
      <div id="payment-element" className="w-full" ref={cardElementRef} />
      {changing ? (
        <div className="w-full p-2 flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="w-full flex items-center">
          <button
            type="button"
            className="p-2 w-full border border-stone-800 text-stone-800 rounded-md text-xs font-medium"
            onClick={handleConfirmPayment}
            disabled={isPayBtnDisabled || changing}
          >
            Change Payment Method
          </button>
        </div>
      )}
    </div>
  );
};

export default Form;
