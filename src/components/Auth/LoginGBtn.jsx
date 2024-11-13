import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLoginMutation } from '../../api/authApiSlice';
import { useGoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const LoginGBtn = ({ setError }) => {
  const navigate = useNavigate();

  const [googleLogin, result] = useGoogleLoginMutation();

  const handleGoogLogin = async (res) => {
    try {
      if (res['code']) {
        const googleRes = await googleLogin({ code: res.code }).unwrap();

        if (googleRes?.msg === 'Success') {
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
            setError(googleRes?.error?.data?.msg);
            return;
          } else {
            setError('Login failed');
            return;
          }
        }
      }
    } catch (err) {
      if (!err?.status) {
        setError('Server not responding');
        return;
      } else if (err.status === 400) {
        setError(err?.data?.msg);
        return;
      } else {
        setError('Login failed');
        return;
      }
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleGoogLogin,
    flow: 'auth-code',
  });

  return (
    <button
      type="button"
      onClick={loginWithGoogle}
      className="p-2 w-full border border-gray-200 bg-gray-200 text-stone-800 rounded-md text-xs flex items-center justify-center gap-1"
    >
      <FcGoogle className="text-lg" /> Google
    </button>
  );
};

export default LoginGBtn;
