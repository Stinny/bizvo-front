import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import Desktop from './Desktop';
import { useLocation } from 'react-router-dom';
import Mobile from './Mobile';

const Docs = () => {
  const location = useLocation();
  const [view, setView] = useState(location?.state?.view || 'home');
  const [mobView, setMobView] = useState(
    location?.state?.view || { value: 'home', label: 'Home' }
  );

  let content;

  content = isMobile ? (
    <Mobile view={mobView} setView={setMobView} />
  ) : (
    <Desktop view={view} setView={setView} />
  );

  return content;
};

export default Docs;
