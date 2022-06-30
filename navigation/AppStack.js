import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import Settings from '../screens/Settings';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen component={TabNavigator} name='Home' options={{headerShown:false}} />
    </Drawer.Navigator>
  )
}

export default AppStack