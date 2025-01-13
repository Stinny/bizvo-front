import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import Desktop from './Desktop';
import { useLocation } from 'react-router-dom';

const Docs = () => {
  const location = useLocation();
  const [view, setView] = useState(location?.state?.view || 'home');

  let content;

  content = isMobile ? '' : <Desktop view={view} setView={setView} />;

  return content;
};

export default Docs;
