import React from 'react';
import { isMobile } from 'react-device-detect';
import Desktop from './Desktop';

const Pricing = () => {
  let content;

  content = isMobile ? '' : <Desktop />;

  return content;
};

export default Pricing;
