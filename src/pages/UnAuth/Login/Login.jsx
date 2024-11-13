import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import Mobile from './Mobile';
import Desktop from './Desktop';
import { useLoginMutation } from '../../../api/authApiSlice';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
  const navigate = useNavigate();

  //login API hook
  const [login, { result }] = useLoginMutation();

  //form state
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  //handles the login req/res
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !pass.trim()) {
      setError('Email or password missing');
      return;
    }

    try {
      const loginReq = await login({ email, pass }).unwrap();

      if (loginReq?.msg === 'Success') {
        const currentUser = JSON.stringify(loginReq?.userInfo);
        Cookies.set('currentUser', currentUser, { sameSite: 'Lax' });
        Cookies.set('aToken', loginReq?.accessToken, { sameSite: 'Lax' });
        Cookies.set('rToken', loginReq?.refreshToken, { sameSite: 'Lax' });
        navigate('/dashboard');
      }
    } catch (err) {
      if (!err?.status) {
        setError('Server not responding');
        return;
      } else if (err.status === 400) {
        setError(err?.data?.msg);
        setEmail(err?.data?.email);
        setPassword(err?.data?.pass);
        return;
      } else {
        setError('Login failed');
        return;
      }
    }
  };

  useEffect(() => {
    setError('');
  }, [email, pass]);

  let content;

  content = isMobile ? (
    <Mobile />
  ) : (
    <Desktop
      email={email}
      pass={pass}
      setEmail={setEmail}
      setPass={setPass}
      handleLogin={handleLogin}
      error={error}
      setError={setError}
    />
  );

  return content;
};

export default Login;
