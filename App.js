import 'react-native-gesture-handler';
import React from "react";

import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';
import Toast from 'react-native-toast-message';

export default function App() {
  const [fontsLoaded] = useFonts({
    'roboto-medium-italic' : require('./assets/fonts/Roboto-MediumItalic.ttf'),
    'roboto-medium' : require('./assets/fonts/Roboto-Medium.ttf'),
    'roboto-regular' : require('./assets/fonts/Roboto-Regular.ttf'),
  })

  if (!fontsLoaded) {
    return null //<AppLoading/>
  }

  return (
    <AuthProvider>
      <AppNav />
      <Toast />
    </AuthProvider>
  )
}