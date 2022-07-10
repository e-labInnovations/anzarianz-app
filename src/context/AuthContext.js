import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { BASE_URL } from '../config'
export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [userToken, setUserToken] = useState(null)
    const [userInfo, setUserInfo] = useState(null)

    const login = (username, password) => {
        setIsLoading(true)
        axios.post(`${BASE_URL}/wp-json/api/v1/token`, {
            username, password
        }).then(response => {
            console.log(response.data);
            setUserToken(response.data.jwt_token)
            
            //Get User Info
            axios.get(`${BASE_URL}/wp-json/wp/v2/users/me`, {}, {
                headers: {
                    'Authorization': 'Bearer ' + response.data.jwt_token
                }
            }).then(function (userResponse) {
                console.log(userResponse.data);
                setUserInfo(userResponse.data)
                AsyncStorage.setItem('userToken', response.data.jwt_token)
                AsyncStorage.setItem('userInfo', userResponse.data)
                setIsLoading(false)
            }).catch(function (error) {
                console.log('Error getting user info', error);
                setIsLoading(false)
            });

        }).catch( error => {
            console.log('Error login', error);
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

    const getMe = () => {
        //Get User Info
        axios.get(`${BASE_URL}/wp-json/wp/v2/users/me`, {}, {
            headers: {
                'Authorization': 'Bearer ' + userResponse
            }
        }).then(function (userResponse) {
            console.log(userResponse.data);
            setUserInfo(userResponse.data)
            AsyncStorage.setItem('userInfo', userResponse.data)
            console.log(userResponse);
        }).catch(function (error) {
            console.log('Error getting user info', error);
        });
    }

    useEffect(() => {
        isLoggedIn()
    }, [])

    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken, getMe }}>
            {children}
        </AuthContext.Provider>
    )
}