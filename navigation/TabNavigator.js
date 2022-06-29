import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Tab2 from '../screens/Tab2';
import Tab3 from '../screens/Tab3';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Home2' component={Home} />
            <Tab.Screen name='Tab2' component={Tab2} />
            <Tab.Screen name='Tab3' component={Tab3} />
        </Tab.Navigator>
    )
}

export default TabNavigator