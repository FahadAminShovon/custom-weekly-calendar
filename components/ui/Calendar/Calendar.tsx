import React, { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import {
  endOfMonth,
  eachDayOfInterval,
  format,
  endOfWeek,
  startOfWeek,
  isBefore,
  isAfter,
  isEqual,
} from 'date-fns';
import { useCalendar } from './useCalendar';

const Day = ({ children }: { children: string }) => (
  <Text className='flex-1 bg-red-300 text-center'>{children}</Text>
);

type CalendarProps = { renderEvents?: (_day: Date) => React.ReactNode };

const Calendar = ({ renderEvents }: CalendarProps) => {
  const {
    previousWeek: handlePreviousWeek,
    nextWeek: handleNextWeek,
    nextMonth: handleNextMonth,
    previousMonth: handlePreviousMonth,
    today,
    selectedDate,
    setSelectedDate,
    firstDayCurrentMonth,
  } = useCalendar();
  const weekStart = startOfWeek(selectedDate);

  const days = useMemo(() => {
    const weekEnd = endOfWeek(selectedDate);
    return eachDayOfInterval({
      start: weekStart,
      end: weekEnd,
    });
  }, [weekStart]);

  return (
    <View>
      <Text>{format(selectedDate, 'MMMM yyyy')}</Text>
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
            <TouchableOpacity
              key={format(day, 'yyyy-MM-dd')}
              className={`py-2 ${
                isEqual(selectedDate, day)
                  ? 'bg-blue-200'
                  : isToday
                  ? 'bg-gray-200'
                  : ''
              }  flex-1 `}
              onPress={() => {
                setSelectedDate(day);
              }}
            >
              <Text
                className={`text-center ${
                  !isCurrentMonth ? 'text-gray-400' : ''
                }`}
              >
                {format(day, 'd')}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {renderEvents && renderEvents(selectedDate)}
    </View>
  );
};

export default Calendar;
