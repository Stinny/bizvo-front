import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthRequired = () => {
  const location = useLocation();

  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  let content;

  if (currentUser) {
    content = <Outlet />;
  } else {
    content = <Navigate to="/" state={{ from: location }} replace />;
  }

  return content;
};

export default AuthRequired;
