import { add } from 'date-fns/add';
import { startOfMonth } from 'date-fns/startOfMonth';
import { startOfToday } from 'date-fns/startOfToday';
import { useState } from 'react';

export const useCalendar = () => {
  const today = startOfToday();

  const [selectedDate, setSelectedDate] = useState(today);
  const firstDayCurrentMonth = startOfMonth(selectedDate);

  const nextWeek = () => {
    setSelectedDate(add(selectedDate, { weeks: 1 }));
  };

  const previousWeek = () => {
    setSelectedDate(add(selectedDate, { weeks: -1 }));
  };

  function previousMonth() {
    setSelectedDate(startOfMonth(add(selectedDate, { months: -1 })));
  }

  function nextMonth() {
    setSelectedDate(startOfMonth(add(selectedDate, { months: 1 })));
  }

  return {
    previousMonth,
    nextMonth,
    previousWeek,
    nextWeek,
    today,
    selectedDate,
    setSelectedDate,
    firstDayCurrentMonth,
  };
};
