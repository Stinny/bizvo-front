import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import Desktop from './Desktop';
import { useLocation } from 'react-router-dom';
import Mobile from './Mobile';
import Cookies from 'js-cookie';

const Docs = () => {
  const location = useLocation();
  const [view, setView] = useState(location?.state?.view || 'home');
  const [mobView, setMobView] = useState(
    location?.state?.view || { value: 'home', label: 'Home' }
  );

  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  let content;

  content = isMobile ? (
    <Mobile view={mobView} setView={setMobView} />
  ) : (
    <Desktop view={view} setView={setView} currentUser={currentUser} />
  );

  return content;
};

export default Docs;
