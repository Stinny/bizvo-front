import { Spin } from 'antd';
import React from 'react';

const Loading = () => {
  return (
    <div className="w-full flex items-center justify-center h-80">
      <Spin size="small" />
    </div>
  );
};

export default Loading;
