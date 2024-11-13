import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';
import { useGoogleSignupMutation } from '../../api/authApiSlice';
import { useNavigate } from 'react-router-dom';

const SignupGBtn = ({ setError }) => {
  const navigate = useNavigate();

  const [googleSignup, result] = useGoogleSignupMutation();

  const handleGoogSignup = async (res) => {
    try {
      if (res['code']) {
        const googleRes = await googleSignup({ code: res.code }).unwrap();

        if (googleRes?.msg === 'User created') {
          const currentUser = JSON.stringify(googleRes?.userInfo);
          Cookies.set('currentUser', currentUser, { sameSite: 'Lax' });
          Cookies.set('aToken', googleRes?.accessToken, { sameSite: 'Lax' });
          Cookies.set('rToken', googleRes?.refreshToken, { sameSite: 'Lax' });
          navigate('/dashboard');
        } else if (googleRes?.error) {
          if (!googleRes?.error?.status) {
            setError('Server not responding');
            return;
          } else if (googleRes?.error?.status === 400) {
            if (googleRes?.error?.data?.msg === 'Email in use') {
              setError('Email in use');
              return;
            }
          } else {
            setError('Signup failed');
            return;
          }
        }
      }
    } catch (err) {
      if (!err?.status) {
        setError('Server not responding');
        return;
      } else if (err.status === 400) {
        if (err?.data?.msg === 'Email in use') {
          setError('Email in use');
          return;
        }
      } else {
        console.log(err);
        setError('Signup failed, try again');
      }
    }
  };

  const signupWithGoogle = useGoogleLogin({
    onSuccess: handleGoogSignup,
    flow: 'auth-code',
  });

  return (
    <button
      type="button"
      onClick={signupWithGoogle}
      className="p-2 w-full border border-gray-200 bg-gray-200 text-stone-800 rounded-md text-xs flex items-center justify-center gap-1"
    >
      <FcGoogle className="text-lg" /> Google
    </button>
  );
};

export default SignupGBtn;
