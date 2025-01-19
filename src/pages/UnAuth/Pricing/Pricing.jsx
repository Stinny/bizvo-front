import React from 'react';
import { isMobile } from 'react-device-detect';
import Desktop from './Desktop';
import Mobile from './Mobile';

const Pricing = () => {
  let content;

  content = isMobile ? <Mobile /> : <Desktop />;

  return content;
};

export default Pricing;
