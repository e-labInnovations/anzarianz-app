import React, { useState, useEffect} from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cell } from 'react-native-table-component';
import { Theme } from '../Theme';

const Food = () => {
  const [tableData, setTableData] = useState([]);
  const [foodData, setFoodData] = useState([
    {
      food: 'പൂരി\nമസാല, കട്ടൻ',
      day: 0,
      time: 0,
      foodId: '9:30',
    },
    {
      food: 'നെയ്‌ച്ചോർ\nചിക്കൻ കാടായി',
      day: 6,
      time: 1,
      foodId: '13:30'
    },
    {
      food: 'പഴംപൊരി\nകട്ടൻ',
      day: 2,
      time: 2,
      foodId: '17:00'
    },
    {
      food: 'ദോശ\nചട്നി',
      day: 4,
      time: 3,
      foodId: '20:30'
    },
    {
      food: 'ബ്രാഡ്\nജാം, കട്ടൻ',
      day: 6,
      time: 0,
      foodId: '9:30'
    },
    {
      food: 'ചോറ്\nതോരൻ, മീൻ വറുത്തത്',
      day: 1,
      time: 1,
      foodId: '13:30'
    },
    {
      food: 'ഉള്ളിവട\nകട്ടൻ',
      day: 1,
      time: '15:00',
      foodId: '17:00'
    },
    {
      food: 'ചപ്പാത്തി\nമുട്ടക്കറി',
      day: 1,
      time: 3,
      foodId: '20:30'
    },
    {
      food: 'ഉപ്പുവാവ്\nകടലക്കറി, കട്ടൻ',
      day: 2,
      time: 0,
      foodId: '9:30'
    },
    {
      food: 'ചോറ്\nമുട്ടത്തോരൻ, പരിപ്പുകറി',
      day: 2,
      time: 1,
      foodId: '13:30'
    },
    {
      food: 'ചിപ്സ്\nചായ',
      day: 2,
      time: 2,
      foodId: '17:00'
    },
    {
      food: 'പുട്ട്\nചിക്കൻ',
      day: 2,
      time: 3,
      foodId: '20:30'
    },
    {
      food: 'ദോശ\nചട്നി, കട്ടൻ',
      day: 3,
      time: 0,
      foodId: '9:30'
    },
    {
      food: 'ചോറ്\nമീൻകറി, തോരൻ',
      day: 3,
      time: 1,
      foodId: '13:30'
    },
    {
      food: 'മീറ്ററോൾ\nകട്ടൻ',
      day: 3,
      time: 2,
      foodId: '17:00'
    },
    {
      food: 'ചപ്പാത്തി\nകുറുമ',
      day: 3,
      time: 3,
      foodId: '20:30'
    },
    {
      food: 'പുട്ട്\nചെറുപയർ, കട്ടൻ',
      day: 4,
      time: 0,
      foodId: '9:30'
    },
    {
      food: 'ചോറ്\nതോരൻ, മീൻ വറുത്തത്',
      day: 4,
      time: 1,
      foodId: '13:30'
    },
    {
      food: 'ക്രീം ബൺ\nചായ',
      day: 4,
      time: 2,
      foodId: '17:00'
    },
    {
      food: 'പൊറോട്ട\nചിക്കൻ',
      day: 4,
      time: 3,
      foodId: '20:30'
    },
    {
      food: 'ഇഡ്ഡലി\nസാമ്പാർ, കട്ടൻ',
      day: 5,
      time: 0,
      foodId: '9:30'
    },
    {
      food: 'ചോറ്\nസാമ്പാർ, മോര്, തോരൻ',
      day: 5,
      time: 1,
      foodId: '13:30'
    },
    {
      food: 'ഉഴുന്നുവട\nകട്ടൻ',
      day: 5,
      time: 2,
      foodId: '17:00'
    },
    {
      food: 'ബിരിയാണി',
      day: 5,
      time: 3,
      foodId: '20:30'
    },
    {
      food: 'മസാലദോശ\nചട്നി, കട്ടൻ',
      day: 6,
      time: 0,
      foodId: '9:30'
    },
    {
      food: 'ചോറ്\nമീൻകറി, തോരൻ',
      day: 6,
      time: 1,
      foodId: '13:30'
    },
    {
      food: 'അവിൽ\nപഴം, കട്ടൻ',
      day: 6,
      time: 2,
      foodId: '17:00'
    },
    {
      food: 'നൂൽപുട്ട്\nവെള്ളക്കടല',
      day: 6,
      time: 3,
      foodId: '20:30'
    },
  ]);



  useEffect(() => {
    let tableData = [];
    for (let i = 0; i < 7; i++) {
      let row = ['', '', '', ''];
      for (let j = 0; j < foodData.length; j++) {
        if (foodData[j].day === i) {
          row[foodData[j].time] = foodData[j].food;
        }
      }
      tableData.push(row);
    }
    setTableData(tableData);
  }, [foodData]);

  let times = [
    {
      name: 'Breakfast',
      start: '08:00',
      end: '10:00'
    },{
      name: 'Lunch',
      start: '12:00',
      end: '01:00'
    },{
      name: 'Snacks',
      start: '03:00',
      end: '05:00'
    },{
      name: 'Dinner',
      start: '07:00',
      end: '08:00'
    }
  ]
  let tableHead = times.map(item => `${item.name}\n${item.start} - ${item.end}`)
  let tableTitle = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']


  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <ScrollView style={styles.dataWrapper}>
            <Table style={{flexDirection: 'row'}} borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <TableWrapper style={styles.leftWrapper}>
                <Cell data="Days" style={styles.singleHead} textStyle={{textAlign: 'center', color: Theme.Tertiary, fontWeight:'bold'}}/>
                <Col data={tableTitle} style={styles.title} textStyle={styles.headText}/>
              </TableWrapper>
              <TableWrapper style={styles.rightWrapper}>
                <Row data={tableHead} widthArr={[150, 150, 150, 150]} style={styles.head} textStyle={styles.headText}/>
                <Rows data={tableData} widthArr={[150, 150, 150, 150]} flexArr={[2, 2, 2, 2]} style={styles.row} textStyle={styles.text}/>
              </TableWrapper>
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:    { flex: 1, padding: 5, paddingTop: 30, backgroundColor: '#fff' },
  dataWrapper:  { marginTop: -1 },
  head:         { height: 50,  backgroundColor: Theme.Primary},
  singleHead:   { width: 100, height: 50, backgroundColor: Theme.Primary },
  leftWrapper:  { width: 100 },
  rightWrapper: { flex: 1 },
  title:        { backgroundColor: Theme.Primary, flex:1 },
  row:          { height: 75 },
  text:         { textAlign: 'left', margin: 6, color: '#000000' },
  headText:     { textAlign: 'center', color: Theme.Tertiary, fontWeight:'bold' }
});

export default Food