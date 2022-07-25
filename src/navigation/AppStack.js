import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import Settings from '../screens/Settings';
import CustomDrawer from '../components/CustomDrawer';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Theme } from '../Theme';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator drawerContent={ props => <CustomDrawer {...props}/> }
      screenOptions={{
        headerShown:false,
        drawerActiveBackgroundColor: Theme.Primary,
        drawerActiveTintColor: '#FFF',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          // marginLeft: -25,
          fontFamily: 'roboto-medium',
          fontSize: 15
        }
      }}>
      <Drawer.Screen component={TabNavigator} name='Home' options={{
        drawerIcon: ({color}) => (
          <AntDesign name="home" size={22} color={color} />
        )
      }} />
      <Drawer.Screen component={Settings} name='Settings' options={{
        drawerIcon: ({color}) => (
          <AntDesign name="setting" size={22} color={color} />
        )
      }} />
    </Drawer.Navigator>
  )
}

export default AppStack