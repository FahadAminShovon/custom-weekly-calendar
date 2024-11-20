import React, { useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import {
  endOfMonth,
  eachDayOfInterval,
  differenceInCalendarWeeks,
  format,
  endOfWeek,
  startOfWeek,
  isBefore,
  isAfter,
  addWeeks,
  add,
} from 'date-fns';
import { useCalendar } from './useCalendar';

const today = new Date();

const Day = ({ children }: { children: string }) => (
  <Text className='flex-1 bg-red-300 text-center'>{children}</Text>
);

type CalendarProps = { renderEvents?: (_day: Date) => React.ReactNode };

const Calendar = ({ renderEvents }: CalendarProps) => {
  const { firstDayCurrentMonth, nextMonth, previousMonth } = useCalendar();

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

  const days = useMemo(() => {
    const startOfCurrentWeek = addWeeks(firstDayCurrentMonth, weekOfMonth - 1);
    const weekStart = startOfWeek(startOfCurrentWeek);
    const weekEnd = endOfWeek(startOfCurrentWeek);
    return eachDayOfInterval({
      start: weekStart,
      end: weekEnd,
    });
  }, [firstDayCurrentMonth, weekOfMonth]);

  const handleNextWeek = () => {
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

  const handlePreviousWeek = () => {
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
        setWeekOfMonth(weeksInPreviousMonth - 1);
      } else {
        setWeekOfMonth(weeksInCurrentMonth);
      }
      return;
    }
    setWeekOfMonth((prev) => prev - 1);
  };

  const handleNextMonth = () => {
    nextMonth();
    setWeekOfMonth(1);
  };

  const handlePreviousMonth = () => {
    previousMonth();
    setWeekOfMonth(1);
  };

  return (
    <View>
      <Text>{format(firstDayCurrentMonth, 'MMMM yyyy')}</Text>
      <Text>
        {weekOfMonth} {weeksInCurrentMonth}
      </Text>
      <View className='flex flex-row'>
        <TouchableOpacity onPress={handlePreviousMonth} className='flex-1'>
          <Text>Previous month</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNextMonth} className='flex-1 flex'>
          <Text className='text-right'>Next month</Text>
        </TouchableOpacity>
      </View>

      <View className='flex flex-row'>
        <TouchableOpacity onPress={handlePreviousWeek} className='flex-1'>
          <Text>Previous Week</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNextWeek} className='flex-1 flex'>
          <Text className='text-right'>Next Week</Text>
        </TouchableOpacity>
      </View>
      <View className='flex gap-1 flex-row'>
        <Day>S</Day>
        <Day>M</Day>
        <Day>T</Day>
        <Day>W</Day>
        <Day>T</Day>
        <Day>F</Day>
        <Day>S</Day>
      </View>
      <View className='flex gap-1 flex-row'>
        {days.map((day) => {
          const isToday =
            format(day, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
          const isCurrentMonth = isBefore(day, firstDayCurrentMonth)
            ? false
            : isAfter(day, endOfMonth(firstDayCurrentMonth))
            ? false
            : true;
          return (
            <View
              key={format(day, 'yyyy-MM-dd')}
              className={`py-2 ${!isCurrentMonth ? 'text-gray-300' : ''} ${
                isToday ? 'bg-gray-200' : ''
              } flex-1 `}
            >
              <Text className='text-center'>{format(day, 'd')}</Text>
              {renderEvents && renderEvents(day)}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Calendar;
