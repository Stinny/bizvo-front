import React, { useEffect, useState } from 'react';
import Desktop from './Desktop';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  useConfirmEmailMutation,
  useSendConfirmLinkMutation,
} from '../../../api/authApiSlice';
import { Spinner } from 'flowbite-react';

const Confirm = () => {
  const [searchParams] = useSearchParams();
  const ect = searchParams.get('ect');
  const { userId } = useParams();

  //track confirm status
  const [confirmed, setConfirmed] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const [confirmEmail, { isLoading }] = useConfirmEmailMutation();
  const [sendConfirmLink, { isLoading: sending }] =
    useSendConfirmLinkMutation();

  const handleConfirm = async () => {
    try {
      const confirmReq = await confirmEmail({
        userId: userId,
        ect: ect,
      }).unwrap();

      if (confirmReq?.valid) {
        setConfirmed(true);
        return;
      } else if (!confirmReq?.valid) {
        setConfirmed(false);
        return;
      }
    } catch (err) {
      console.log(err);
      return;
    }
  };

  const handleSendConfirmLink = async () => {
    try {
      const confirmLinkReq = await sendConfirmLink({
        userId: userId,
      }).unwrap();

      if (confirmLinkReq?.sent) {
        setSent(true);
        return;
      } else {
        setError('There was an errror');
        return;
      }
    } catch (err) {
      console.log(err);
      return;
    }
  };

  useEffect(() => {
    if (!confirmed) handleConfirm();
  }, []);

  let content;

  if (isLoading || sending) {
    content = (
      <div className="w-full flex items-center justify-center mt-16">
        <Spinner />
      </div>
    );
  } else {
    content = (
      <Desktop
        confirmed={confirmed}
        handleSendConfirmLink={handleSendConfirmLink}
        sent={sent}
      />
    );
  }

  return content;
};

export default Confirm;
