import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={TabNavigator} name='Home' options={{headerShown:false}} />
    </Stack.Navigator>
  )
}

export default AppStack