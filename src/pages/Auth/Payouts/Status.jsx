import { Badge } from 'antd';
import React from 'react';

const Status = ({ status }) => {
  let content;

  switch (status) {
    case 'paid':
      content = (
        <div className="flex items-center justify-center gap-1 border border-gray-200 rounded-sm p-1">
          <p className="text-xs text-stone-800 font-medium">Complete</p>
          <Badge color="lime" size="large" dot={true} />
        </div>
      );
      break;
    case 'failed':
      content = (
        <div className="flex items-center justify-center gap-1 border border-gray-200 rounded-sm p-1">
          <p className="text-xs text-stone-800 font-medium">Failed</p>
          <Badge color="red" size="large" dot={true} />
        </div>
      );
      break;
    case 'cancelled':
      content = (
        <div className="flex items-center justify-center gap-1 border border-gray-200 rounded-sm p-1">
          <p className="text-xs text-stone-800 font-medium">Canceled</p>
          <Badge color="pink" size="large" dot={true} />
        </div>
      );
      break;
    case 'pending':
      content = (
        <div className="flex items-center justify-center gap-1 border border-gray-200 rounded-sm p-1">
          <p className="text-xs text-stone-800 font-medium">Pending</p>
          <Badge color="yellow" size="large" dot={true} />
        </div>
      );
      break;
    case 'in_transit':
      content = (
        <div className="flex items-center justify-center gap-1 border border-gray-200 rounded-sm p-1">
          <p className="text-xs text-stone-800 font-medium">In Transit</p>
          <Badge color="lightblue" size="large" dot={true} />
        </div>
      );
      break;
    default:
      break;
  }

  return content;
};

export default Status;
