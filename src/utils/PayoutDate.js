import moment from 'moment';

export const PayoutDate = ({ payoutDate, detail }) => {
  const date = new Date(payoutDate * 1000); // Convert Unix timestamp to milliseconds
  return detail
    ? moment(date).format('MMMM Do, YYYY')
    : moment(date).format('MMMM Do');
};
