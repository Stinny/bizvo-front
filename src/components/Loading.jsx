import { Spinner } from 'flowbite-react';
import React from 'react';

const Loading = () => {
  return (
    <div className="mx-auto w-10/12 flex items-center justify-center h-96">
      <Spinner />
    </div>
  );
};

export default Loading;
