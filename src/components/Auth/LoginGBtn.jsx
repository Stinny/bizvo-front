import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLoginMutation } from '../../api/authApiSlice';
import { useGoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const LoginGBtn = ({ setError, setGoogling }) => {
  const navigate = useNavigate();

  const [googleLogin, result] = useGoogleLoginMutation();

  const handleGoogLogin = async (res) => {
    setGoogling(true);
    try {
      if (res['code']) {
        const googleRes = await googleLogin({ code: res.code }).unwrap();

        if (googleRes?.msg === 'Success') {
          const currentUser = JSON.stringify(googleRes?.userInfo);
          Cookies.set('currentUser', currentUser, { sameSite: 'Lax' });
          Cookies.set('aToken', googleRes?.accessToken, { sameSite: 'Lax' });
          Cookies.set('rToken', googleRes?.refreshToken, { sameSite: 'Lax' });
          setGoogling(false);
          navigate('/dashboard');
        } else if (googleRes?.error) {
          if (!googleRes?.error?.status) {
            setError('Server not responding');
            setGoogling(false);
            return;
          } else if (googleRes?.error?.status === 400) {
            setError(googleRes?.error?.data?.msg);
            setGoogling(false);
            return;
          } else {
            setError('Login failed');
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
        setError(err?.data?.msg);
        setGoogling(false);
        return;
      } else {
        setError('Login failed');
        setGoogling(false);
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
      className="p-2 w-full border border-gray-200 bg-white hover:bg-gray-50 text-stone-800 rounded-sm text-xs flex items-center justify-center gap-1 cursor-pointer"
    >
      <FcGoogle className="text-lg" /> Google
    </button>
  );
};

export default LoginGBtn;
