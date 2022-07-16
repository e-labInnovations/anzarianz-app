import { View, ActivityIndicator } from 'react-native'
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';

import AuthStack from './AuthStack';
import AppStack from "./AppStack";

const Stack = createNativeStackNavigator();

const AppNav = () => {
    const { isLoading, userToken, userInfo } = useContext(AuthContext)

    if( isLoading ) {
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size={'large'} />
        </View>
    }

    return (
        <NavigationContainer>
            { userToken && userInfo ? <AppStack /> : <AuthStack /> }
        </NavigationContainer>
    )
}

export default AppNav