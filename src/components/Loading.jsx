import { Spinner } from 'flowbite-react';
import React from 'react';

const Loading = () => {
  return (
    <div className="mx-auto max-w-3xl flex items-center justify-center h-screen">
      <Spinner />
    </div>
  );
};

export default Loading;
