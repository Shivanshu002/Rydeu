import moment from 'moment';

export const getNextSixMonths = () => {
  const months = [];
  for (let i = 0; i < 6; i++) {
    months.push(moment().add(i, 'months'));
  }
  return months;
};

export const generateMonthDays = (month: moment.Moment) => {
  const start = month.clone().startOf('month').startOf('week');
  const end = month.clone().endOf('month').endOf('week');

  const days: moment.Moment[] = [];
  let day = start.clone();

  while (day.isBefore(end)) {
    days.push(day.clone());
    day.add(1, 'day');
  }

  return days;
};

export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']