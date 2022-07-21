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

const AddLeave = () => {
  const [leavingAt, setLeavingAt] = useState(moment().toDate())
  const [rejoiningAt, setRejoiningAt] = useState(moment().add(1, 'day').toDate())
  const [isDatePicker1Visible, setDatePicker1Visibility] = useState(false)
  const [isDatePicker2Visible, setDatePicker2Visibility] = useState(false)
  const [reason, setReason] = useState('')
  const [completeDays, setCompleteDays] = useState(0)

  useEffect(() => {
    if (moment(leavingAt).add(1, 'day').isAfter(rejoiningAt)) {
      setRejoiningAt(moment(leavingAt).add(1, 'day').toDate())
    }
  }, [leavingAt])
  
  useEffect(() => {
    let leavingAt8AM = moment(leavingAt).set({ hour: 8, minute: 0 })
    let rejoiningAtPM = moment(rejoiningAt).set({ hour: 21, minute: 0 })
    // let leavingAt = moment(leavingAt)
    // let rejoiningAt = moment(rejoiningAt)

    let _completeDays = moment(rejoiningAt).diff(moment(leavingAt),'d')

    if(moment(leavingAt).isAfter(leavingAt8AM)) {
      _completeDays-1
      console.log('After 8AM');
    }

    if(moment(rejoiningAt).isBefore(rejoiningAtPM)) {
      console.log('Before 9PM');
      _completeDays-1
    }
    console.log('old', completeDays);
    console.log('New', _completeDays);
    // console.log('Leaving1', leavingAt8AM.format('DD/MM hh:mm A'));
    // console.log('Leaving2', moment(leavingAt).format('DD/MM hh:mm A'));

    // console.log(leavingAt);
    // console.log('Leaving', leavingAt8AM.format('hh:mm A'));
    // console.log('Rejoining', rejoiningAtPM.format('hh:mm A'));
    setCompleteDays(_completeDays);
  }, [leavingAt, rejoiningAt])

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

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.mainView}>
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
        
        <TouchableOpacity onPress={() => {}} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Save</Text>
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