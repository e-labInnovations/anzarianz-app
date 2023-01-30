import React, { useState, useEffect, useContext } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  RefreshControl,
  View,
} from 'react-native'
import { CalendarList } from 'react-native-calendars';
import axios from 'axios'
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from '../config';
import { FloatingAction } from "react-native-floating-action";
import moment from 'moment';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Theme } from '../Theme';
import Card from '../components/Card'

const MessLeaves = ({ navigation, route }) => {
  const { userToken } = useContext(AuthContext)
  const { userInfo } = useContext(AuthContext)
  const [markedDates, setMarkedDates] = useState({})
  const [leaves, setLeaves] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null)

  const actions = [
    {
      text: "Add New Leave",
      icon: <Ionicons name="add" size={24} color="#fff" />,
      name: "bt_add_new_leave",
      position: 1,
      color: Theme.Primary
    }
  ];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setIsLoading(true)
    getLeaves()
  }, []);

  const handleDayPress = (day) => {
    let pressedDate = moment(day.dateString,"YYYY-MM-DD")
    let pressedLeave = leaves.find(leave => {
      let leavingDate = moment(leave.leaving_at.split(' ')[0], 'YYYY-MM-DD')
      let rejoiningDate = moment(leave.rejoining_at.split(' ')[0], 'YYYY-MM-DD')
      return (
        pressedDate.isBetween(leavingDate, rejoiningDate) ||
        pressedDate.isSame(leave.leaving_at.split(' ')[0]) ||
        pressedDate.isSame(leave.rejoining_at.split(' ')[0])
      )
    })
    setSelectedLeave(pressedLeave)
    console.log(pressedLeave);
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
      setRefreshing(false);
    }).catch(function (error) {
      console.log('Error getting user info', error);
      setIsLoading(false)
      setRefreshing(false);
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

  const getColor = (status) => {
    switch (status) {
      case 'approved':
        return 'green'
      case 'added':
        return 'blue'
      case 'spam':
        return 'orange'
      case 'rejected':
        return 'red'
      default:
        return 'blue'
    }
  }

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
      let color = getColor(leave.status)

      var dateArray = getDates(startDate, endDate);
      dateArray.forEach((date, idx, array) => {
        _markedDates[date] = {
          startingDay: idx === 0,
          endingDay: idx === array.length - 1,
          color: color,
          textColor: '#fff'
        }
      })
    })
    setMarkedDates(_markedDates)
  }, [leaves])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <CalendarList
          markedDates={markedDates}
          markingType={'period'}
          onDayPress={handleDayPress}
          displayLoadingIndicator={isLoading}
          horizontal={true}
          pagingEnabled={true}
        />
        {selectedLeave && (
          <View style={styles.singleLeaveView}>
            <Card style={styles.card}>
              <View style={styles.rowView}>
                <View style={[styles.iconView, {backgroundColor: getColor(selectedLeave.status)}]}>
                  <Ionicons name="checkmark-done-circle" size={24} color="#fff" />
                </View>
                <View>
                  <Text style={{fontWeight: 'bold', fontSize: 20}}>{selectedLeave.status}</Text>
                  <Text>Leaving at: {selectedLeave.leaving_at}</Text>
                  <Text>Rejoining at: {selectedLeave.rejoining_at}</Text>
                  <Text>Reason: {selectedLeave.reason}</Text>
                  <Text>Note: {selectedLeave.rejection_note}</Text>

                </View>
                </View>
            </Card>
          </View>
        )}

        {(!selectedLeave && !isLoading) && (leaves.map(leave => { 
          return (
            <View style={styles.singleLeaveView}>
              <Card style={styles.card}>
                <View style={styles.rowView}>
                  <View style={[styles.iconView, {backgroundColor: getColor(leave.status)}]}>
                    <Ionicons name="checkmark-done-circle" size={24} color="#fff" />
                  </View>
                  <View>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>{leave.status}</Text>
                    <Text>Leaving at: {leave.leaving_at}</Text>
                    <Text>Rejoining at: {leave.rejoining_at}</Text>
                    <Text>Reason: {leave.reason}</Text>
                    <Text>Note: {leave.rejection_note}</Text>

                  </View>
                  </View>
              </Card>
            </View>
          )
        }))}
        
      </ScrollView>

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
  singleLeaveView: {
    flex: 1,
    margin: 8,
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center', //Centered vertically
    flex:1
  },
  iconView: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginRight: 8
  }
});

export default MessLeaves