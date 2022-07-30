import react from "react";
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BASE_URL } from "../config";

export const updatePushToken = async (pushToken) => {
    try {
        let userToken = await AsyncStorage.getItem('userToken')
        let userInfo = await AsyncStorage.getItem('userInfo')
        userInfo = JSON.parse(userInfo)

        if(userInfo) {
            // Get User Info
            axios.post(`${BASE_URL}/wp-json/wp/v2/users/${userInfo.id}`, {
                meta: {
                    push_token: pushToken
                },
              },{
                headers: {
                  'Authorization': 'Bearer ' + userToken
                }
              }).then(function (userResponse) {
                // console.log(userResponse.data);
                // let _userResponse = userResponse.data
            }).catch(function (error) {
                console.log('Error updatePushToken', error.response.data.message);
            });
        }
    } catch (error) {
        console.log(`updatePushToken error ${error}`);
    }
}