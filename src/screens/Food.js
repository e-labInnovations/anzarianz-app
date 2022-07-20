import React, {useMemo} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import TimeTableView, {genTimeBlock} from 'react-native-timetable';

// import {Colors} from 'react-native/Libraries/NewAppScreen';

const FIXTURE_EVENTS = [
  {
    title: 'പൂരി മസാല, കട്ടൻ',
    startTime: genTimeBlock('SUN', 8),
    endTime: genTimeBlock('SUN', 9, 30)
  },
  {
    title: 'നെയ്‌ച്ചോർ, ചിക്കൻ കാടായി',
    startTime: genTimeBlock('SUN', 12),
    endTime: genTimeBlock('SUN', 1, 30)
  },
  {
    title: 'പഴംപൊരി, കട്ടൻ',
    startTime: genTimeBlock('SUN', 15),
    endTime: genTimeBlock('SUN', 17)
  },
  {
    title: 'ദോശ, ചട്നി',
    startTime: genTimeBlock('SUN', 19),
    endTime: genTimeBlock('SUN', 20, 30)
  },
  {
    title: 'ബ്രാഡ്, ജാം, കട്ടൻ',
    startTime: genTimeBlock('MON', 8),
    endTime: genTimeBlock('MON', 9, 30)
  },
  {
    title: 'ചോറ്, തോരൻ, മീൻ വറുത്തത്',
    startTime: genTimeBlock('MON', 12),
    endTime: genTimeBlock('MON', 1, 30)
  },
  {
    title: 'ഉള്ളിവട, കട്ടൻ',
    startTime: genTimeBlock('MON', 15),
    endTime: genTimeBlock('MON', 17)
  },
  {
    title: 'ചപ്പാത്തി, മുട്ടക്കറി',
    startTime: genTimeBlock('MON', 19),
    endTime: genTimeBlock('MON', 20, 30)
  },
  {
    title: 'ഉപ്പുവാവ്, കടലക്കറി, കട്ടൻ',
    startTime: genTimeBlock('TUE', 8),
    endTime: genTimeBlock('TUE', 9, 30)
  },
  {
    title: 'ചോറ്, മുട്ടത്തോരൻ, പരിപ്പുകറി',
    startTime: genTimeBlock('TUE', 12),
    endTime: genTimeBlock('TUE', 1, 30)
  },
  {
    title: 'ചിപ്സ്, ചായ',
    startTime: genTimeBlock('TUE', 15),
    endTime: genTimeBlock('TUE', 17)
  },
  {
    title: 'പുട്ട്, ചിക്കൻ',
    startTime: genTimeBlock('TUE', 19),
    endTime: genTimeBlock('TUE', 20, 30)
  },
  {
    title: 'ദോശ, ചട്നി, കട്ടൻ',
    startTime: genTimeBlock('WED', 8),
    endTime: genTimeBlock('WED', 9, 30)
  },
  {
    title: 'ചോറ്, മീൻകറി, തോരൻ',
    startTime: genTimeBlock('WED', 12),
    endTime: genTimeBlock('WED', 1, 30)
  },
  {
    title: 'മീറ്ററോൾ, കട്ടൻ',
    startTime: genTimeBlock('WED', 15),
    endTime: genTimeBlock('WED', 17)
  },
  {
    title: 'ചപ്പാത്തി, കുറുമ',
    startTime: genTimeBlock('WED', 19),
    endTime: genTimeBlock('WED', 20, 30)
  },
  {
    title: 'പുട്ട്, ചെറുപയർ, കട്ടൻ',
    startTime: genTimeBlock('THU', 8),
    endTime: genTimeBlock('THU', 9, 30)
  },
  {
    title: 'ചോറ്, തോരൻ, മീൻ വറുത്തത്',
    startTime: genTimeBlock('THU', 12),
    endTime: genTimeBlock('THU', 1, 30)
  },
  {
    title: 'ക്രീം ബൺ, ചായ',
    startTime: genTimeBlock('THU', 15),
    endTime: genTimeBlock('THU', 17)
  },
  {
    title: 'പൊറോട്ട, ചിക്കൻ',
    startTime: genTimeBlock('THU', 19),
    endTime: genTimeBlock('THU', 20, 30)
  },
  {
    title: 'ഇഡ്ഡലി, സാമ്പാർ, കട്ടൻ',
    startTime: genTimeBlock('FRI', 8),
    endTime: genTimeBlock('FRI', 9, 30)
  },
  {
    title: 'ചോറ്, സാമ്പാർ, മോര്, തോരൻ',
    startTime: genTimeBlock('FRI', 12),
    endTime: genTimeBlock('FRI', 1, 30)
  },
  {
    title: 'ഉഴുന്നുവട, കട്ടൻ',
    startTime: genTimeBlock('FRI', 15),
    endTime: genTimeBlock('FRI', 17)
  },
  {
    title: 'ബിരിയാണി',
    startTime: genTimeBlock('FRI', 19),
    endTime: genTimeBlock('FRI', 20, 30)
  },
  {
    title: 'മസാലദോശ, ചട്നി, കട്ടൻ',
    startTime: genTimeBlock('SAT', 8),
    endTime: genTimeBlock('SAT', 9, 30)
  },
  {
    title: 'ചോറ്, മീൻകറി, തോരൻ',
    startTime: genTimeBlock('SAT', 12),
    endTime: genTimeBlock('SAT', 1, 30)
  },
  {
    title: 'അവിൽ, പഴം, കട്ടൻ',
    startTime: genTimeBlock('SAT', 15),
    endTime: genTimeBlock('SAT', 17)
  },
  {
    title: 'നൂൽപുട്ട്, വെള്ളക്കടല',
    startTime: genTimeBlock('SAT', 19),
    endTime: genTimeBlock('SAT', 20, 30)
  },
]

const Food = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const pivotDate = useMemo(() => genTimeBlock('mon'), []);

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <TimeTableView
          // scrollViewRef={this.scrollViewRef}
          events={FIXTURE_EVENTS}
          pivotTime={8}
          pivotEndTime={22}
          pivotDate={pivotDate}
          nDays={7}
          headerStyle={styles.headerStyle}
          formatDateHeader="ddd"
          locale="in"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#81E1B8',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default Food;