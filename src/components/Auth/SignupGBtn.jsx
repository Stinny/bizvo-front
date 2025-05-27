import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';
import { useGoogleSignupMutation } from '../../api/authApiSlice';
import { useNavigate } from 'react-router-dom';

const SignupGBtn = ({ setError, setGoogling }) => {
  const navigate = useNavigate();

  const [googleSignup, result] = useGoogleSignupMutation();

  const handleGoogSignup = async (res) => {
    setGoogling(true);
    try {
      if (res['code']) {
        const googleRes = await googleSignup({ code: res.code }).unwrap();

        if (googleRes?.msg === 'User created') {
          const currentUser = JSON.stringify(googleRes?.userInfo);
          Cookies.set('currentUser', currentUser, { sameSite: 'Lax' });
          Cookies.set('aToken', googleRes?.accessToken, { sameSite: 'Lax' });
          Cookies.set('rToken', googleRes?.refreshToken, { sameSite: 'Lax' });
          setGoogling(false);
          navigate('/dashboard');
        } else if (googleRes?.error) {
          if (!googleRes?.error?.status) {
            setGoogling(false);
            setError('Server not responding');
            return;
          } else if (googleRes?.error?.status === 400) {
            if (googleRes?.error?.data?.msg === 'Email in use') {
              setError('Email in use');
              setGoogling(false);
              return;
            }
          } else {
            setError('Signup failed');
            setGoogling(false);
            return;
          }
        }
      }
    } catch (err) {
      if (!err?.status) {
        setError('Server not responding');
        setGoogling(false);
        return;
      } else if (err.status === 400) {
        if (err?.data?.msg === 'Email in use') {
          setError('Email in use');
          setGoogling(false);
          return;
        }
      } else {
        console.log(err);
        setError('Signup failed, try again');
        setGoogling(false);
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
      className="p-2 w-full border border-gray-200 bg-white hover:bg-gray-50 text-stone-800 rounded-sm text-xs flex items-center justify-center gap-1 cursor-pointer"
    >
      <FcGoogle className="text-lg" /> Google
    </button>
  );
};

export default SignupGBtn;
