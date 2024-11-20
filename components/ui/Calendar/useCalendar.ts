import { add } from 'date-fns/add';
import { differenceInCalendarWeeks } from 'date-fns/differenceInCalendarWeeks';
import { endOfMonth } from 'date-fns/endOfMonth';
import { endOfWeek } from 'date-fns/endOfWeek';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfToday } from 'date-fns/startOfToday';
import { startOfWeek } from 'date-fns/startOfWeek';
import { useMemo, useState } from 'react';

export const useCalendar = () => {
  const today = startOfToday();

  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));

  const [selectedDate, setSelectedDate] = useState(today);

  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

  const [weekOfMonth, setWeekOfMonth] = useState(() => {
    return differenceInCalendarWeeks(today, firstDayCurrentMonth) + 1;
  });

  const weeksInCurrentMonth = useMemo(() => {
    const lastDayOfCurrentMonth = endOfMonth(firstDayCurrentMonth);

    const startOfFirstWeek = startOfWeek(firstDayCurrentMonth);
    const endOfLastWeek = endOfWeek(lastDayOfCurrentMonth);
    const numberOfWeeks =
      differenceInCalendarWeeks(endOfLastWeek, startOfFirstWeek) + 1; // +1 because weeks are 1-based

    return numberOfWeeks;
  }, [firstDayCurrentMonth]);

  const nextWeek = () => {
    setSelectedDate(add(selectedDate, { weeks: 1 }));
    const weekEnd = endOfMonth(firstDayCurrentMonth).getDay();
    let updateMonth = false;

    if (weekEnd === 6 && weekOfMonth === weeksInCurrentMonth) {
      updateMonth = true;
    } else if (weekEnd !== 6 && weekOfMonth === weeksInCurrentMonth - 1) {
      updateMonth = true;
    }

    if (updateMonth) {
      nextMonth();
      setWeekOfMonth(1);
    } else {
      setWeekOfMonth((prev) => prev + 1);
    }
  };

  const previousWeek = () => {
    setSelectedDate(add(selectedDate, { weeks: -1 }));
    if (weekOfMonth === 1) {
      const tempPreviousMonth = add(firstDayCurrentMonth, { months: -1 });
      const weeksInPreviousMonth =
        differenceInCalendarWeeks(
          endOfMonth(tempPreviousMonth),
          startOfWeek(tempPreviousMonth)
        ) + 1;

      previousMonth();
      const weekEnd = endOfMonth(tempPreviousMonth).getDay();

      if (weekEnd === 6) {
        setWeekOfMonth(weeksInPreviousMonth);
      } else {
        setWeekOfMonth(weeksInPreviousMonth - 1);
      }
      return;
    }
    setWeekOfMonth((prev) => prev - 1);
  };

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  const updateNextMonthAndWeek = () => {
    nextMonth();
    setWeekOfMonth(1);
    setSelectedDate(add(firstDayCurrentMonth, { months: 1 }));
  };

  const updatePreviousMonthAndWeek = () => {
    previousMonth();
    setWeekOfMonth(1);
    setSelectedDate(add(firstDayCurrentMonth, { months: -1 }));
  };

  return {
    currentMonth,
    previousMonth,
    nextMonth,
    previousWeek,
    nextWeek,
    firstDayCurrentMonth,
    weekOfMonth,
    weeksInCurrentMonth,
    updateNextMonthAndWeek,
    updatePreviousMonthAndWeek,
    today,
    selectedDate,
    setSelectedDate,
  };
};
