import { add } from 'date-fns/add';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfToday } from 'date-fns/startOfToday';
import { useState } from 'react';

export const useCalendar = () => {
  const today = startOfToday();

  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  function previousWeek() {
    const firstDayNextWeek = add(firstDayCurrentMonth, { weeks: -1 });
    setCurrentMonth(format(firstDayNextWeek, 'MMM-yyyy'));
  }

  function nextWeek() {
    const firstDayNextWeek = add(firstDayCurrentMonth, { weeks: 1 });
    setCurrentMonth(format(firstDayNextWeek, 'MMM-yyyy'));
  }

  return {
    currentMonth,
    previousMonth,
    nextMonth,
    previousWeek,
    nextWeek,
    firstDayCurrentMonth,
  };
};
