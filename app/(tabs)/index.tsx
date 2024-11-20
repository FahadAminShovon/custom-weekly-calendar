import { StyleSheet, View, Text } from 'react-native';

import { Calendar } from '@/components/ui/Calendar';
import { format } from 'date-fns';

export default function HomeScreen() {
  return (
    <View className='m-10 '>
      <Calendar
        renderEvents={(date) => {
          return (
            <View>
              <Text>selected date: {format(date, 'd MMM yyyy')}</Text>
            </View>
          );
        }}
      />
      ;
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
