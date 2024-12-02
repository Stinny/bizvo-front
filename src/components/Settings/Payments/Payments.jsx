import React from 'react';
import Desktop from './Desktop';

const Payments = ({ currentUser, refetch }) => {
  return <Desktop currentUser={currentUser} refetch={refetch} />;
};

export default Payments;
