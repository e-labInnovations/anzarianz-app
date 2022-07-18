import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import MessCalendar from '../screens/MessCalendar';
import Tab3 from '../screens/Tab3';

import { MaterialIcons, Entypo } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Home} name='Home' options={{headerShown:false}} />
    </Stack.Navigator>
  )
}

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
                backgroundColor: '#6C63FF'
            },
            tabBarInactiveTintColor: '#FFFFFF',
            tabBarActiveTintColor: 'yellow'
        }}>
            <Tab.Screen
                name='Home2'
                component={HomeStack}
                options={{
                    tabBarTestID: "tabbar-Home",
                    tabBarIcon: ({color, size}) => (
                        <Entypo name="home" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen 
                name='MessCalendar'
                component={MessCalendar}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <MaterialIcons name="payment" size={size} color={color} />
                    ),
                    tabBarBadge: 5,
                    tabBarBadgeStyle: {backgroundColor: 'yellow'}
                }}
            />
            <Tab.Screen name='Tab3' component={Tab3} options={{
                tabBarIcon: ({color, size}) => (
                    <Entypo name="calendar" size={size} color={color} />
                )
            }} />
        </Tab.Navigator>
    )
}

export default TabNavigator