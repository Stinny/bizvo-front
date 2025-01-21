import { Badge } from 'flowbite-react';
import React from 'react';

const InvoStatus = ({ status }) => {
  let content;

  switch (status) {
    case 'draft':
      content = (
        <Badge size="xs" color="info">
          Draft
        </Badge>
      );
      break;
    case 'paid':
      content = (
        <Badge size="xs" color="success">
          Paid
        </Badge>
      );
      break;
    case 'live':
      content = (
        <Badge size="xs" color="success">
          Live
        </Badge>
      );
      break;
    case 'pending':
      content = (
        <Badge size="xs" color="warning">
          Await
        </Badge>
      );
      break;
    case 'late':
      content = (
        <Badge size="xs" color="pink">
          Late
        </Badge>
      );
      break;
    case 'void':
      content = (
        <Badge size="xs" color="gray">
          Void
        </Badge>
      );
      break;
    default:
      break;
  }
  return content;
};

export default InvoStatus;
