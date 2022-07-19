import React, { useState, useEffect, useContext } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Modal,
  TouchableOpacity,
  TextInput
} from 'react-native'
import { Calendar } from 'react-native-calendars';
import axios from 'axios'
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from '../config';
import { FloatingAction } from "react-native-floating-action";
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const MessCalendar = () => {
  const { userToken } = useContext(AuthContext)
  const { userInfo } = useContext(AuthContext)
  const [markedDates, setMarkedDates] = useState({})
  const [leaves, setLeaves] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false);

  const actions = [
    {
      text: "Add New Leave",
      icon: <Ionicons name="add" size={24} color="#fff" />,
      name: "bt_add_new_leave",
      position: 1
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
            setModalVisible(true)
          }
        }}
        // visible={!modalVisible} 
      />

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              <Text style={styles.mainText}>Add New Leave</Text>
              <View style={styles.inputView}>
                <FontAwesome5 name="user-circle" size={20} color="#666" style={styles.inputIcon} />
                <TextInput placeholder='Name' style={styles.input} value={userInfo.name} editable={false} />
              </View>
              <View style={styles.inputView}>
                <FontAwesome5 name="user-circle" size={20} color="#666" style={styles.inputIcon} />
                <TextInput placeholder='Room NO' style={styles.input} value={userInfo.room_no} editable={false} />
              </View>
              <View style={styles.inputView}>
                <Ionicons name="ios-lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput placeholder='Username' style={styles.input} />
              </View>
              
              <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}} style={styles.button}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:StatusBar.currentHeight,
    backgroundColor: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    margin: 25
  },
  mainText:{
    fontFamily: 'roboto-medium',
    fontSize: 28,
    fontWeight: '500',
    color: '#333',
    marginBottom: 30,
  },
  inputView: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25
  },
  inputIcon: {
    marginRight: 5
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#AD40AF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    color: '#FFF'
  }
});

export default MessCalendar