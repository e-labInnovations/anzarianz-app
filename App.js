import { StatusBar } from "expo-status-bar";
import React, {
  useState,
  useEffect
} from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity
} from "react-native";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { MaterialIcons } from '@expo/vector-icons';
import StartImg from './assets/mobile_life_re_jtih.svg'
 
export default function App() {

  const [fontsLoaded] = useFonts({
    'roboto-medium-italic' : require('./assets/fonts/Roboto-MediumItalic.ttf')
  })
  

  if (!fontsLoaded) {
    return <AppLoading/>
  }
 
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.startTextView}>
        <Text style={styles.textView}>Anzarianz</Text>
      </View>
      <View style={styles.startImgView}>
        <StartImg width={300} height={300} />
      </View>
      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startText}>Let's Start</Text>
        <MaterialIcons name="navigate-next" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
 
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  textView: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#20315F'
  },
  startButton: {
    backgroundColor: '#6C63FF',
    padding: 20,
    width: '90%',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50
  },
  startText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'roboto-medium-italic'
  },
  startTextView: {
    marginTop: 20,
  },
  startImgView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});