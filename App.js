import React  from "react";
import {} from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from "./navigation/AuthStack";
import AppStack from "./navigation/AppStack";
import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();
 
export default function App() {
  const [fontsLoaded] = useFonts({
    'roboto-medium-italic' : require('./assets/fonts/Roboto-MediumItalic.ttf'),
    'roboto-medium' : require('./assets/fonts/Roboto-Medium.ttf'),
  })
  

  if (!fontsLoaded) {
    return null //<AppLoading/>
  }

  return (
    <NavigationContainer>
      <AppStack />
      {/* <AuthStack /> */}
    </NavigationContainer>
  )
}