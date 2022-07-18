import React, { useState } from 'react'
import { View, Text } from 'react-native'
import {Calendar} from 'react-native-calendars';

const MessCalendar = () => {
  const [markedDates, setMarkedDates] = useState({
    '2022-07-20': {textColor: 'green'},
    '2022-07-22': {startingDay: true, color: 'green'},
    '2022-07-23': {selected: true, endingDay: true, color: 'green', textColor: 'gray'},
    '2022-07-04': {disabled: true, startingDay: true, color: 'green', endingDay: true}
  })

  const handleDayPress = (day) => {
    console.log(day)
  }

  return (
    <View>
      <Calendar
      markedDates={markedDates}
      markingType={'period'}
      onDayPress={handleDayPress}
    />
    <Text>Test</Text>
    </View>
    
  )
}

export default MessCalendar