import React, { useState, useEffect, useContext } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native'
import { Calendar } from 'react-native-calendars';
import axios from 'axios'
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from '../config';
import { FloatingAction } from "react-native-floating-action";
import moment from 'moment';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Theme } from '../Theme';

const MessLeaves = ({ navigation, route }) => {
  const { userToken } = useContext(AuthContext)
  const { userInfo } = useContext(AuthContext)
  const [markedDates, setMarkedDates] = useState({})
  const [leaves, setLeaves] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const actions = [
    {
      text: "Add New Leave",
      icon: <Ionicons name="add" size={24} color="#fff" />,
      name: "bt_add_new_leave",
      position: 1,
      color: Theme.Primary
    }
  ];

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
    if (route.params?.newItem) {
      // console.log(route.params?.newItem);
      let _leaves = leaves
      _leaves.push(route.params?.newItem)
      setLeaves(_leaves)
      // console.log(_leaves);
    }
  }, [route.params?.newItem]);

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
        actions={actions}
        onPressItem={name => {
          if(name == 'bt_add_new_leave') {
            //Open AddLeave screen
            navigation.navigate('AddLeave')
          }
        }}
        color={Theme.Primary}
      />
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop:StatusBar.currentHeight,
    backgroundColor: '#fff',
  },
});

export default MessLeaves