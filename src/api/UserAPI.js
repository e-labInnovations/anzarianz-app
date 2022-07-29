import react, { useContext } from "react";
import axios from 'axios'
import { BASE_URL } from "../config";
import { AuthContext } from "../context/AuthContext";


export const updatePushToken = async(pushToken) => {
    const { userToken } = useContext(AuthContext)
    const { userInfo } = useContext(AuthContext)
    //Get User Info
    // let userToken = await AsyncStorage.getItem('userToken')
    // axios.post(`${BASE_URL}/wp/v2/users/${userInfo.id}`, {
    //     meta: {
    //         pushToken: pushToken
    //     },
    //   },{
    //     headers: {
    //       'Authorization': 'Bearer ' + userToken
    //     }
    //   }).then(function (userResponse) {
    //     console.log(userResponse.data);
    //     // let _userResponse = userResponse.data

    //     // setUserInfo(_userResponse)
    //     // AsyncStorage.setItem('userInfo', JSON.stringify(_userResponse))
    // }).catch(function (error) {
    //     console.log('Error getting user info', error);
    // });
    console.log('Update');
}