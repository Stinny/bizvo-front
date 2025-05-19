// import { Badge } from 'flowbite-react';
import { Badge } from 'antd';
import React from 'react';

const InvoStatus = ({ status, full }) => {
  let content;

  switch (status) {
    case 'draft':
      content = full ? (
        <div className="flex items-center justify-center gap-1 border border-gray-200 rounded-sm p-1">
          <p className="text-xs text-stone-800 font-medium">Draft</p>
          <Badge color="lightblue" size="large" dot={true} />
        </div>
      ) : (
        <Badge color="lightblue" size="large" dot={true} />
      );
      break;
    case 'paid':
      content = full ? (
        <div className="flex items-center justify-center gap-1 border border-gray-200 rounded-sm p-1 pl-1.5 pr-1.5">
          <p className="text-xs text-stone-800 font-medium">Paid</p>
          <Badge color="lime" size="large" dot={true} />
        </div>
      ) : (
        <Badge color="lime" size="large" dot={true} />
      );
      break;
    case 'live':
      content = <Badge color="lime" size="large" dot={true} />;
      break;
    case 'pending':
      content = full ? (
        <div className="flex items-center justify-center gap-1 border border-gray-200 rounded-sm p-1 pl-1.5 pr-1.5">
          <p className="text-xs text-stone-800 font-medium">Await</p>
          <Badge color="yellow" size="large" dot={true} />
        </div>
      ) : (
        <Badge color="yellow" size="large" dot={true} />
      );
      break;
    case 'late':
      content = full ? (
        <div className="flex items-center justify-center gap-1 border border-gray-200 rounded-sm p-1 pl-1.5 pr-1.5">
          <p className="text-xs text-stone-800 font-medium">Late</p>
          <Badge color="red" size="large" dot={true} />
        </div>
      ) : (
        <Badge color="red" size="large" dot={true} />
      );
      break;
    case 'void':
      content = full ? (
        <div className="flex items-center justify-center gap-1 border border-gray-200 rounded-sm p-1 pl-1.5 pr-1.5">
          <p className="text-xs text-stone-800 font-medium">Void</p>
          <Badge color="gray" size="large" dot={true} />
        </div>
      ) : (
        <Badge color="gray" size="large" dot={true} />
      );
      break;
    default:
      break;
  }
  return content;
};

export default InvoStatus;
