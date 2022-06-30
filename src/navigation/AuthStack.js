import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from '../screens/Onboarding';
import Login from '../screens/Login'

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Onboarding} name='Onboarding' options={{headerShown:false}} />
      <Stack.Screen component={Login} name='Login' options={{headerShown:false}} />
    </Stack.Navigator>
  )
}

export default AuthStack