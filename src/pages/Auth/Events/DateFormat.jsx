import { format } from 'date-fns';

const formatDate = (createdAt) => {
  const date = new Date(createdAt);
  const now = new Date();
  const userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const today = new Date(now.setHours(0, 0, 0, 0));
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const localizedDate = new Date(
    date.toLocaleString('en-US', { timeZone: userTZ })
  );
  const timeString = format(localizedDate, 'h:mm a');

  if (localizedDate >= today) {
    return `Today @ ${timeString}`;
  } else if (localizedDate >= yesterday) {
    return `Yesterday at ${timeString}`;
  } else {
    return `${format(localizedDate, 'MMM do')} at ${timeString}`;
  }
};

const DateFormat = ({ createdAt }) => {
  return <span>{formatDate(createdAt)}</span>;
};

export default DateFormat;
