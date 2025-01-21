import React, { useEffect, useState } from 'react';
import Desktop from './Desktop';
import Cookies from 'js-cookie';
import { useSendMsgMutation } from '../../../api/authApiSlice';
import { isMobile } from 'react-device-detect';
import Mobile from './Mobile';

const Message = () => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const [email, setEmail] = useState(
    currentUser?.email ? currentUser?.email : ''
  );
  const [body, setBody] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [about, setAbout] = useState(undefined);

  const [sendMsg, { isLoading }] = useSendMsgMutation();

  const handleSubmitMsg = async (e) => {
    e.preventDefault();

    if (!email.trim() || !body.trim()) {
      setError('Please fill out all fields');
      return;
    }

    try {
      const sendReq = await sendMsg({
        email: email,
        msg: body,
        type: about?.value,
        userId: currentUser?._id,
      }).unwrap();
      if (sendReq === 'Added') {
        setSent(true);
        setEmail('');
        setBody('');
        setAbout({});
        return;
      } else {
        setError('There was an error');
        return;
      }
    } catch (err) {
      setError('There was an error');
      console.log(err);
      return;
    }
  };

  useEffect(() => {
    if (sent) {
      const timer = setTimeout(() => {
        setSent(false);
      }, 3000); // Hide after 5 seconds (5000 milliseconds)
      return () => clearTimeout(timer); // Clear the timer if the component unmounts or success changes
    }
  }, [sent]);

  useEffect(() => {
    setError('');
  }, [email, about, body]);

  return isMobile ? (
    <Mobile
      email={email}
      setEmail={setEmail}
      body={body}
      setBody={setBody}
      about={about}
      setAbout={setAbout}
      handleSubmitMsg={handleSubmitMsg}
      error={error}
      isLoading={isLoading}
      sent={sent}
    />
  ) : (
    <Desktop
      email={email}
      setEmail={setEmail}
      body={body}
      setBody={setBody}
      about={about}
      setAbout={setAbout}
      handleSubmitMsg={handleSubmitMsg}
      error={error}
      isLoading={isLoading}
      sent={sent}
    />
  );
};

export default Message;
