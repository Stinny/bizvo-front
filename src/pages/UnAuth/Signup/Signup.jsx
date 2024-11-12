import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import Mobile from './Mobile';
import Desktop from './Desktop';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSignupMutation } from '../../../api/authApiSlice';

const Signup = () => {
  const navigate = useNavigate();

  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  //signup API query
  const [signup, { result }] = useSignupMutation();

  //form state
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  //handles the signup req/res
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !pass) {
      setError('Email or password missing');
      return;
    }

    //TO-DO: add password regex testing
    // if (!regex.test(password)) {
    //   setError('Password must match requirements');
    //   setIsFocused(true);
    //   setRegistering(false);
    //   return;
    // }

    try {
      const signupReq = await signup({
        email,
        pass,
      }).unwrap();

      if (signupReq?.msg === 'User created') {
        const currentUser = JSON.stringify(signupReq?.userInfo);
        Cookies.set('currentUser', currentUser, { sameSite: 'Lax' });
        Cookies.set('aToken', signupReq?.accessToken, { sameSite: 'Lax' });
        Cookies.set('rToken', signupReq?.refreshToken, { sameSite: 'Lax' });
        navigate('/dashboard');
      }
    } catch (err) {
      if (!err?.status) {
        setError('Server not responding');
        return;
      } else if (err.status === 400) {
        setEmail(err?.data?.email);
        setPass(err?.data?.pass);
        if (err?.data?.msg === 'Email in use') {
          setError('An account with this email already exists');

          return;
        }
      } else {
        console.log(err);
        setError('Signup failed, try again later');
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
      handleSignup={handleSignup}
      error={error}
    />
  );

  return content;
};

export default Signup;
