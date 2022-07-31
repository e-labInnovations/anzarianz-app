import React, { useState, useEffect, useRef } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import Settings from '../screens/Settings';
import CustomDrawer from '../components/CustomDrawer';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Theme } from '../Theme';
import Toast from 'react-native-toast-message';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import { updatePushToken } from '../api/UserAPI'

const Drawer = createDrawerNavigator();
 
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


const AppStack = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [])
  
  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to get push token for push notification!'
        });
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      updatePushToken(token)
      Toast.show({
        type: 'success',
        text1: 'PushToken',
        text2: token
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Must use physical device for Push Notifications'
      });
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }

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