import React from 'react';
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import TimeTable from '@mikezzb/react-native-timetable';
import { Theme } from '../Theme';

const events = [
  {
    courseId: 'പൂരി',
    section: 'മസാല, കട്ടൻ',
    day: 7,
    startTime: '8:00',
    endTime: '9:30'
  },
  {
    courseId: 'നെയ്‌ച്ചോർ',
    section: 'ചിക്കൻ കാടായി',
    day: 7,
    startTime: '12:00',
    endTime: '13:30'
  },
  {
    courseId: 'പഴംപൊരി',
    section: 'കട്ടൻ',
    day: 7,
    startTime: '15:0',
    endTime: '17:00'
  },
  {
    courseId: 'ദോശ',
    section: 'ചട്നി',
    day: 7,
    startTime: '19:00',
    endTime: '20:30'
  },
  {
    courseId: 'ബ്രാഡ്',
    section: 'ജാം, കട്ടൻ',
    day: 1,
    startTime: '8:00',
    endTime: '9:30'
  },
  {
    courseId: 'ചോറ്',
    section: 'തോരൻ, മീൻ വറുത്തത്',
    day: 1,
    startTime: '12:00',
    endTime: '13:30'
  },
  {
    courseId: 'ഉള്ളിവട',
    section: 'കട്ടൻ',
    day: 1,
    startTime: '15:00',
    endTime: '17:00'
  },
  {
    courseId: 'ചപ്പാത്തി',
    section: 'മുട്ടക്കറി',
    day: 1,
    startTime: '19:00',
    endTime: '20:30'
  },
  {
    courseId: 'ഉപ്പുവാവ്',
    section: 'കടലക്കറി, കട്ടൻ',
    day: 2,
    startTime: '8:00',
    endTime: '9:30'
  },
  {
    courseId: 'ചോറ്',
    section: 'മുട്ടത്തോരൻ, പരിപ്പുകറി',
    day: 2,
    startTime: '12:00',
    endTime: '13:30'
  },
  {
    courseId: 'ചിപ്സ്',
    section: 'ചായ',
    day: 2,
    startTime: '15:00',
    endTime: '17:00'
  },
  {
    courseId: 'പുട്ട്',
    section: 'ചിക്കൻ',
    day: 2,
    startTime: '19:00',
    endTime: '20:30'
  },
  {
    courseId: 'ദോശ',
    section: 'ചട്നി, കട്ടൻ',
    day: 3,
    startTime: '8:00',
    endTime: '9:30'
  },
  {
    courseId: 'ചോറ്',
    section: 'മീൻകറി, തോരൻ',
    day: 3,
    startTime: '12:00',
    endTime: '13:30'
  },
  {
    courseId: 'മീറ്ററോൾ',
    section: 'കട്ടൻ',
    day: 3,
    startTime: '15:00',
    endTime: '17:00'
  },
  {
    courseId: 'ചപ്പാത്തി',
    section: 'കുറുമ',
    day: 3,
    startTime: '19:00',
    endTime: '20:30'
  },
  {
    courseId: 'പുട്ട്',
    section: 'ചെറുപയർ, കട്ടൻ',
    day: 4,
    startTime: '8:00',
    endTime: '9:30'
  },
  {
    courseId: 'ചോറ്',
    section: 'തോരൻ, മീൻ വറുത്തത്',
    day: 4,
    startTime: '12:00',
    endTime: '13:30'
  },
  {
    courseId: 'ക്രീം ബൺ',
    section: 'ചായ',
    day: 4,
    startTime: '15:0',
    endTime: '17:00'
  },
  {
    courseId: 'പൊറോട്ട',
    section: 'ചിക്കൻ',
    day: 4,
    startTime: '19:00',
    endTime: '20:30'
  },
  {
    courseId: 'ഇഡ്ഡലി',
    section: 'സാമ്പാർ, കട്ടൻ',
    day: 5,
    startTime: '8:00',
    endTime: '9:30'
  },
  {
    courseId: 'ചോറ്',
    section: 'സാമ്പാർ, മോര്, തോരൻ',
    day: 5,
    startTime: '12:00',
    endTime: '13:30'
  },
  {
    courseId: 'ഉഴുന്നുവട',
    section: 'കട്ടൻ',
    day: 5,
    startTime: '15:00',
    endTime: '17:00'
  },
  {
    courseId: 'ബിരിയാണി',
    day: 5,
    startTime: '19:00',
    endTime: '20:30'
  },
  {
    courseId: 'മസാലദോശ',
    section: 'ചട്നി, കട്ടൻ',
    day: 6,
    startTime: '8:00',
    endTime: '9:30'
  },
  {
    courseId: 'ചോറ്',
    section: 'മീൻകറി, തോരൻ',
    day: 6,
    startTime: '12:00',
    endTime: '13:30'
  },
  {
    courseId: 'അവിൽ',
    section: 'പഴം, കട്ടൻ',
    day: 6,
    startTime: '15:00',
    endTime: '17:00'
  },
  {
    courseId: 'നൂൽപുട്ട്',
    section: 'വെള്ളക്കടല',
    day: 6,
    startTime: '19:00',
    endTime: '20:30'
  },
]

const Food = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <TimeTable
          events={events}
          eventOnPress={(event) => Alert.alert(`${JSON.stringify(event)}`)}
          configs={{startHour: 8, endHour: 21}}
          headerStyle={styles.headerStyle}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: Theme.Primary,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  SafeAreaView: {
    flex: 1
  }
});

export default Food;