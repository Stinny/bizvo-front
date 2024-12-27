import moment from 'moment';

export const PayoutDate = ({ payoutDate }) => {
  const date = new Date(payoutDate * 1000); // Convert Unix timestamp to milliseconds
  return moment(date).format('MMMM Do');
};
