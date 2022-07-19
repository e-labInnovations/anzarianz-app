import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView, StyleSheet, View, Text, StatusBar } from 'react-native'
import {Calendar} from 'react-native-calendars';
import axios from 'axios'
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from '../config';
import Toast from 'react-native-toast-message';
import { FloatingAction } from "react-native-floating-action";
import moment from 'moment';

const MessCalendar = () => {
  const { userToken } = useContext(AuthContext)
  const [markedDates, setMarkedDates] = useState({})
  const [leaves, setLeaves] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const handleDayPress = (day) => {
    console.log(day)
  }

  const getLeaves = () => {
    setIsLoading(true)
    axios.get(`${BASE_URL}/wp-json/anzarianz/v1/leaves/`, {
        headers: {
            'Authorization': 'Bearer ' + userToken
        }
    }).then(function (userResponse) {
      // console.log(JSON.stringify(userResponse.data));
      setLeaves(userResponse.data)
      setIsLoading(false)
    }).catch(function (error) {
      console.log('Error getting user info', error);
      setIsLoading(false)
    });
  }

  useEffect(() => {
    getLeaves()
  }, [])

  useEffect(() => {
    function getDates(startDate, stopDate) {
      var dateArray = [];
      var currentDate = moment(new Date(startDate));
      var stopDate = moment(new Date(stopDate));
      while (currentDate <= stopDate) {
        dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
        currentDate = moment(currentDate).add(1, 'days');
      }
      return dateArray;
    }

    let _markedDates = {}

    leaves.forEach(leave => {
      let startDate = leave.leaving_at.split(' ')[0]
      let endDate = leave.rejoining_at.split(' ')[0]

      var dateArray = getDates(startDate, endDate);
      dateArray.forEach((date, idx, array) => {
        _markedDates[date] = {
          startingDay: idx === 0,
          endingDay: idx === array.length - 1,
          color: 'red',
          textColor: '#fff'
        }
      })
    })
    setMarkedDates(_markedDates)
  }, [leaves])

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        markedDates={markedDates}
        markingType={'period'}
        onDayPress={handleDayPress}
        displayLoadingIndicator={isLoading}
      />
      <Text>{JSON.stringify(leaves)}</Text>
      <FloatingAction
        onPressMain={() => {
          Toast.show({
            type: 'success',
            text1: 'Hello',
            text2: 'This is some something 👋'
          });
        }}
      />
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      marginTop:StatusBar.currentHeight,
      backgroundColor: '#fff'
  }
});

export default MessCalendar