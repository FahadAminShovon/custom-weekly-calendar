import { StyleSheet, View } from 'react-native';

import { Calendar } from '@/components/ui/Calendar';

export default function HomeScreen() {
  return (
    <View className='m-10 '>
      <Calendar />;
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
