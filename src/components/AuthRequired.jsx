import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import AccSetup from '../pages/Auth/AccSetup/AccSetup';

const AuthRequired = () => {
  const location = useLocation();

  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  let content;

  if (currentUser) {
    content = currentUser?.setup ? <Outlet /> : <AccSetup />;
  } else {
    content = <Navigate to="/" state={{ from: location }} replace />;
  }

  return content;
};

export default AuthRequired;
