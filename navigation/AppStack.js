import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Home} name='Home' options={{headerShown:false}} />
    </Stack.Navigator>
  )
}

export default AppStack