import moment from 'moment';

export const dateFormat = (dateStr: string | Date): string => {
  const m = moment(dateStr);
  if (m.isValid()) {
    return m.format('MMM D, YYYY');
  }
  return '';
};
