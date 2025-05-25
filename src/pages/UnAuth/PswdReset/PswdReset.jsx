import React, { useEffect, useState } from 'react';
import Desktop from './Desktop';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  useConfirmEmailMutation,
  useResetPswdMutation,
  useSendConfirmLinkMutation,
} from '../../../api/authApiSlice';
import { Spin } from 'antd';

const PswdReset = () => {
  const { userId } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('ect');

  //form state
  const [pass, setPass] = useState('');
  const [passTwo, setPassTwo] = useState('');

  //track confirm status
  const [confirmed, setConfirmed] = useState(false);
  const [succ, setSucc] = useState(false);
  const [error, setError] = useState('');

  const [resetPswd, { isLoading }] = useResetPswdMutation();

  const handleResetPswd = async (e) => {
    e.preventDefault();

    if (!pass.trim() || !passTwo.trim()) {
      setError('Please fill in both feilds');
      return;
    }

    if (pass.trim() !== passTwo.trim()) {
      setError('Passwords do not match');
      return;
    }

    try {
      const resetReq = await resetPswd({
        userId: userId,
        ect: token,
        pass: pass,
      }).unwrap();

      if (resetReq?.reset) {
        setSucc(true);
        return;
      } else if (!resetReq?.reset) {
        setError(resetReq?.msg);
        return;
      }
    } catch (err) {
      setError('Server error');
      return;
    }
  };

  useEffect(() => {
    setError('');
  }, [pass, passTwo]);

  let content;

  if (isLoading) {
    content = (
      <div className="w-full flex items-center justify-center mt-32 h-56">
        <Spin size="small" />
      </div>
    );
  } else {
    content = (
      <Desktop
        pass={pass}
        setPass={setPass}
        passTwo={passTwo}
        setPassTwo={setPassTwo}
        error={error}
        handleResetPswd={handleResetPswd}
        succ={succ}
      />
    );
  }

  return content;
};

export default PswdReset;
