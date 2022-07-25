import React, { useState, useEffect, useContext } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { Theme } from '../Theme'
import moment from 'moment'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Entypo from '@expo/vector-icons/Entypo';
import axios from 'axios'
import Toast from 'react-native-toast-message';
import { BASE_URL } from '../config'
import { AuthContext } from '../context/AuthContext';

const AddLeave = ({ navigation, route }) => {
  const [leavingAt, setLeavingAt] = useState(moment().toDate())
  const [rejoiningAt, setRejoiningAt] = useState(moment().add(1, 'day').toDate())
  const [isDatePicker1Visible, setDatePicker1Visibility] = useState(false)
  const [isDatePicker2Visible, setDatePicker2Visibility] = useState(false)
  const [reason, setReason] = useState('')
  const [completeDays, setCompleteDays] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const { userToken } = useContext(AuthContext)
  const { userInfo } = useContext(AuthContext)

  useEffect(() => {
    if (moment(leavingAt).add(1, 'day').isAfter(rejoiningAt)) {
      setRejoiningAt(moment(leavingAt).add(1, 'day').toDate())
    }
  }, [leavingAt])
  
  useEffect(() => {
    // console.log(moment(leavingAt).format('DD-MM-YY'));
    if (moment(rejoiningAt).isAfter(leavingAt)) {
      setCompleteDays(getCompleteDays(leavingAt, rejoiningAt));
    }
  }, [leavingAt, rejoiningAt])

  const getDates = (leavingDate, rejoiningDate) => {
    var dateArray = [];
    var currentDate = moment(new Date(leavingDate));
    var rejoiningDate = moment(new Date(rejoiningDate));
    while (currentDate <= rejoiningDate) {
      dateArray.push( moment(currentDate))
      currentDate = moment(currentDate).add(1, 'days');
    }
    dateArray[dateArray.length-1] = rejoiningDate
    return dateArray;
  }

  const getCompleteDays = (leavingDate, rejoiningDate) => {
    let datesArrays = getDates(leavingDate, rejoiningDate)
    let rejoiningPos = datesArrays.length-1
    let leavingAt8AM = moment(datesArrays[0]).set({ hour: 8, minute: 0 })
    let rejoiningAt8PM = moment(datesArrays[rejoiningPos]).set({ hour: 21, minute: 0 })

    // console.log(datesArrays);

    if (datesArrays[0].isAfter(leavingAt8AM)) {
      datesArrays.shift();
    }
    
    rejoiningPos = datesArrays.length-1

    if (datesArrays[rejoiningPos].isBefore(rejoiningAt8PM)) {
      datesArrays.pop();
    }

    // console.log(datesArrays.map(f=> f.format('YY/DD/MM hh:mm A')));
    return datesArrays.length
  }

  const showDatePicker1 = () => {
    setDatePicker1Visibility(true);
  };

  const hideDatePicker1 = () => {
    setDatePicker1Visibility(false);
  };

  const handleConfirm1 = (date) => {
    setLeavingAt(date)
    hideDatePicker1();
  };

  const showDatePicker2 = () => {
    setDatePicker2Visibility(true);
  };

  const hideDatePicker2 = () => {
    setDatePicker2Visibility(false);
  };

  const handleConfirm2 = (date) => {
    setRejoiningAt(date)
    hideDatePicker2();
  };

  const handleSave = () => {
    if(!reason) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Reason is required'
      });
    }

    setIsLoading(true)

    axios.post(`${BASE_URL}/wp-json/anzarianz/v1/leaves`, {
      leaving_at: leavingAt,
      rejoining_at: rejoiningAt,
      reason: reason,
      user_id: userInfo.id
    },{
      headers: {
        'Authorization': 'Bearer ' + userToken
      }
    }).then(response => {
      Toast.show({
        type: 'success',
        text1: 'Added',
        text2: 'New leave saved'
      });
      
    navigation.navigate({
      name: 'MessLeaves',
      params: { newItem: response.data },
      merge: true,
    });

    }).catch(error => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response.data.message
      });
      console.log('Error getting user info', error.response.data.message);
    });
  }

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.mainView}>
        <View style={styles.infoView}>
          <Entypo name="info-with-circle" size={24} color="black" style={styles.infoViewIcon} />
          <Text style={styles.infoViewText}>
            If you are not taking mess on leaving day, set <Text style={styles.textBold}>leaving time</Text> before <Text style={styles.textBold}>8 AM</Text> and if you are not taking mess on rejoining day, select <Text style={styles.textBold}>rejoining time</Text> after <Text style={styles.textBold}>9 PM</Text>
          </Text>
        </View>
        <TouchableOpacity style={styles.inputView} onPress={showDatePicker1}>
          <Text style={styles.input}>Leaving At: {moment(leavingAt).format('DD/MM/YYYY, h:mm A')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.inputView} onPress={showDatePicker2}>
          <Text style={styles.input}>Rejoining At: {moment(rejoiningAt).format('DD/MM/YYYY, h:mm A')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.inputView}>
          <Text style={styles.input}>No. of Full Days: {completeDays}</Text>
        </TouchableOpacity>

        <View style={styles.inputView}>
          <TextInput placeholder='Reason' value={reason} style={styles.input} onChangeText={text => setReason(text)} />
        </View>
        
        <TouchableOpacity onPress={handleSave} style={styles.submitButton}>
          {isLoading && <ActivityIndicator size="large" color="#fff" />}
          {!isLoading && <Text style={styles.submitButtonText}>Save</Text>}
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePicker1Visible}
          mode="datetime"
          onConfirm={handleConfirm1}
          onCancel={hideDatePicker1}
          date={leavingAt}
        />

        <DateTimePickerModal
          isVisible={isDatePicker2Visible}
          mode="datetime"
          onConfirm={handleConfirm2}
          onCancel={hideDatePicker2}
          date={rejoiningAt}
          minimumDate={moment(leavingAt).add(1, 'day').toDate()}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    justifyContent: 'center'
  },
  mainView: {
    paddingHorizontal: 25
  },
  infoView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    padding: 8,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  infoViewIcon: {
    marginRight: 10
  },
  infoViewText: {
    width: '90%'
  },
  textBold: {
    fontWeight: 'bold'
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
  input: {
    flex: 1,
    paddingVertical: 0,
    fontSize: 15
  },
  forgotText: {
    color: Theme.Primary,
    fontWeight: '700'
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.Primary,
    padding: 20,
    borderRadius: 10,
    marginBottom: 30
  },
  submitButtonText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    color: '#FFF'
  }
});

export default AddLeave