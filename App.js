import 'react-native-gesture-handler';
import React, { useState, useEffect, useRef }  from "react";

import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';
import Toast from 'react-native-toast-message';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import { updatePushToken } from './src/api/UserAPI'
 
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  
  const [fontsLoaded] = useFonts({
    'roboto-medium-italic' : require('./assets/fonts/Roboto-MediumItalic.ttf'),
    'roboto-medium' : require('./assets/fonts/Roboto-Medium.ttf'),
    'roboto-regular' : require('./assets/fonts/Roboto-Regular.ttf'),
  })

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
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      updatePushToken(token)
    } else {
      alert('Must use physical device for Push Notifications');
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