import { Badge } from 'flowbite-react';
import React from 'react';

const Status = ({ status }) => {
  let content;

  console.log(status);

  switch (status) {
    case 'paid':
      content = (
        <Badge color="success" size="xs">
          Paid
        </Badge>
      );
      break;
    case 'failed':
      content = (
        <Badge color="failure" size="xs">
          Failed
        </Badge>
      );
      break;
    case 'cancelled':
      content = (
        <Badge color="failure" size="xs">
          Cancelled
        </Badge>
      );
      break;
    case 'pending':
      content = (
        <Badge color="warning" size="xs">
          Pending
        </Badge>
      );
      break;
    case 'in_transit':
      content = (
        <Badge color="warning" size="xs">
          In Transit
        </Badge>
      );
      break;
    default:
      break;
  }

  return content;
};

export default Status;
