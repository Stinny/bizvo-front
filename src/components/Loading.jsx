import { Spin } from 'antd';
import React from 'react';

const Loading = () => {
  return (
    <div className="w-10/12 flex items-center justify-center h-96">
      <Spin size="small" />
    </div>
  );
};

export default Loading;
