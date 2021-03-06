import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import Home from '../screens/Home';
import MessLeaves from '../screens/MessLeaves';
import Food from '../screens/Food';
import Payments from '../screens/Payments';
import AddLeave from '../screens/AddLeave'

import { Theme } from '../Theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Home} name='Home' options={{headerShown:false}} />
    </Stack.Navigator>
  )
}

const MessLeavesStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen
            component={MessLeaves}
            name='MessLeaves'
            options={{headerShown:false}}
        />
        <Stack.Screen
            component={AddLeave}
            name='AddLeave'
        />
    </Stack.Navigator>
  )
}

const TabNavigator = () => {
    const getTabBarVisibility = (route) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
        // console.log('Route: ', routeName);
        if (routeName == 'AddLeave') {
             return 'none'
        }
        return 'flex'
    }

    return (
        <Tab.Navigator screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
                backgroundColor: Theme.Primary
            },
            tabBarInactiveTintColor: Theme.SecondaryShade,
            tabBarActiveTintColor: Theme.Tertiary
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
                name='Bills'
                component={Payments}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome5 name="money-check-alt" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen 
                name='MessLeaves2'
                component={MessLeavesStack}
                options={({route}) => ({
                    tabBarStyle: {
                        display: getTabBarVisibility(route),
                        backgroundColor: Theme.Primary
                    },
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="calendar" size={size} color={color} />
                    ),
                    tabBarBadge: 5,
                    tabBarBadgeStyle: {backgroundColor: Theme.Tertiary}
                })}
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