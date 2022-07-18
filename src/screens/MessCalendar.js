import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView, StyleSheet, View, Text, StatusBar } from 'react-native'
import {Calendar} from 'react-native-calendars';
import axios from 'axios'
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from '../config';
import Toast from 'react-native-toast-message';
import { FloatingAction } from "react-native-floating-action";

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
    Date.prototype.addDays = function(days) {
        var dat = new Date(this.valueOf())
        dat.setDate(dat.getDate() + days);
        return dat;
    }

    function getDates(startDate, stopDate) {
      var dateArray = new Array();
      var currentDate = startDate;
      while (currentDate <= stopDate) {
        dateArray.push(currentDate)
        currentDate = currentDate.addDays(1);
      }
      return dateArray;
    }

    let _markedDates = {}

    leaves.forEach(leave => {
      let startDate = leave.leaving_at.split(' ')[0]
      let endDate = leave.rejoining_at.split(' ')[0]

      var dateArray = getDates(new Date(startDate), new Date(endDate));
      dateArray.forEach((_d, idx, array) => {
        _markedDates[_d.toISOString().split('T')[0]] = {
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