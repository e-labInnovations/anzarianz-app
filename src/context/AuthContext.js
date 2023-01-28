import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Toast from 'react-native-toast-message';
import { BASE_URL } from '../config'
export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [userToken, setUserToken] = useState(null)
    const [userInfo, setUserInfo] = useState(null)

    const showToast = (message) => {
        Toast.show({
            type: 'error',
            text1: 'Error Login',
            text2: message
        });
    };

    const login = (username, password) => {
        setIsLoading(true)
        axios.post(`${BASE_URL}/wp-json/jwt-auth/v1/token`, {
            username,
            password
        }, {
            withCredentials: true
        }).then(response => {
            // console.log('Login Success: ', response.data);
            let _userToken = response.data.data.token

            axios.get(`${BASE_URL}/wp-json/wp/v2/users/me`, {
                headers: {
                    'Authorization': 'Bearer ' + _userToken
                }
            }).then(userResponse => {
                // console.log('User Success: ', userResponse.data);
                let _userResponse = userResponse.data

                setUserToken(_userToken)
                setUserInfo(_userResponse)
                AsyncStorage.setItem('userToken', _userToken)
                AsyncStorage.setItem('userInfo', JSON.stringify(_userResponse))
                setIsLoading(false)
            }).catch(error => {
                console.log('Error getting user info', error);
                setIsLoading(false)
            });

        }).catch(error => {
            showToast(error.response.data.message)
            console.log('Error login', error.response.data.message);
            setIsLoading(false)
        });

    }
    
    const logout = () => {
        setIsLoading(true)
        setUserToken(null)
        AsyncStorage.removeItem('userToken')
        AsyncStorage.removeItem('userInfo')
        setIsLoading(false)
    }
    
    const isLoggedIn = async() => {
        try {
            setIsLoading(true)
            let userToken = await AsyncStorage.getItem('userToken')
            let userInfo = await AsyncStorage.getItem('userInfo')
            userInfo = JSON.parse(userInfo)

            if(userInfo) {
                setUserToken(userToken)
                setUserInfo(userInfo)
            }
            setIsLoading(false)
        } catch (error) {
            console.log(`isLogged in error ${error}`);
        }
    }

    const getMe = async() => {
        //Get User Info
        let userToken = await AsyncStorage.getItem('userToken')
        axios.get(`${BASE_URL}/wp-json/wp/v2/users/me`, {
            headers: {
                'Authorization': 'Bearer ' + userToken
            }
        }).then(function (userResponse) {
            // console.log(userResponse.data);
            let _userResponse = userResponse.data

            setUserInfo(_userResponse)
            AsyncStorage.setItem('userInfo', JSON.stringify(_userResponse))
        }).catch(function (error) {
            console.log('Error getting user info', error);
        });
    }

    useEffect(() => {
        isLoggedIn()
    }, [])

    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken, userInfo, getMe }}>
            {children}
        </AuthContext.Provider>
    )
}