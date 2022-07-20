import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import MessCalendar from '../screens/MessCalendar';
import Food from '../screens/Food';
import Payments from '../screens/Payments';

import { Ionicons, Entypo, FontAwesome5 } from '@expo/vector-icons';

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
                name='ills'
                component={Payments}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome5 name="money-check-alt" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen 
                name='MessCalendar'
                component={MessCalendar}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="calendar" size={size} color={color} />
                    ),
                    tabBarBadge: 5,
                    tabBarBadgeStyle: {backgroundColor: 'yellow'}
                }}
            />
            <Tab.Screen name='Food' component={Food} options={{
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="md-fast-food" size={size} color={color} />
                )
            }} />
        </Tab.Navigator>
    )
}

export default TabNavigator