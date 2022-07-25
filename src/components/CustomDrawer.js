import React, { useContext } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableOpacity
} from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';

const CustomDrawer = (props) => {
  const { logout, userInfo } = useContext(AuthContext)

  return (
    <View style={styles.mainView}>
        <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContentScrollView}>
            <ImageBackground source={require('../../assets/images/drawer_bg.jpg')} style={styles.drawerProfileBG}>
                <Image source={{ uri: userInfo.avatar_urls['96'] }} style={styles.profileImg} />
                <Text style={styles.profileName}>{userInfo.name}</Text>
                <Text style={styles.profileRoom}>Room: {userInfo.room_no}</Text>
            </ImageBackground>
            <View style={styles.DrawerItemListView}>
                <DrawerItemList {...props} />
            </View>
        </DrawerContentScrollView>
        <View style={styles.bottomView}>
            <TouchableOpacity onPress={() => {}} style={styles.customButton} >
                <View style={styles.customButtonView}>
                    <Ionicons name="share-social-outline" size={22} color="#ccc" />
                    <Text style={styles.customButtonText}>Share to friends</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {logout()}} style={styles.customButton} >
                <View style={styles.customButtonView}>
                    <Ionicons name="exit-outline" size={22} color="#ccc" />
                    <Text style={styles.customButtonText}>Sign Out</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1
    },
    drawerContentScrollView: {
        backgroundColor: '#6C63FF'
    },
    drawerProfileBG: {
        padding: 20
    },
    profileImg: {
        height: 80,
        width: 80,
        borderRadius: 40,
        marginBottom: 10
    },
    profileName: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'roboto-medium'
    },
    profileRoom: {
        color: '#FFF',
        fontFamily: 'roboto-regular'
    },
    DrawerItemListView: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: 10
    },
    bottomView: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#CCC'
    },
    customButton: {
        paddingVertical: 15
    },
    customButtonView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    customButtonText: {
        fontSize: 15,
        fontFamily: 'roboto-medium',
        marginLeft: 5
    }
})
export default CustomDrawer