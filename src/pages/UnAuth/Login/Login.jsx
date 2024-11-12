import React from 'react';
import { isMobile } from 'react-device-detect';
import Mobile from './Mobile';
import Desktop from './Desktop';

const Login = () => {
  //form state will go here

  //logic handler will go here

  let content;

  content = isMobile ? <Mobile /> : <Desktop />;

  return content;
};

export default Login;
