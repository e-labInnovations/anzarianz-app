import react, { useContext, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    ScrollView,
    ImageBackground,
    TouchableOpacity
} from "react-native";

import { AuthContext } from "../context/AuthContext";

const Home = ( {navigation} ) => {
  const { userInfo } = useContext(AuthContext)

  useEffect(() => {
  }, [])

    return (
        <SafeAreaView style={styles.safeArea}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.userProfileView}>
                <Text style={styles.userProfileText}>Hello {userInfo.name}</Text>
                <TouchableOpacity onPress={() =>{navigation.openDrawer()} }>
                    <ImageBackground source={{ uri: userInfo.avatar_urls['48'] }} style={styles.userProfileImg} imageStyle={{borderRadius: 25}} />
                </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
     );
}

 
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    scrollView: {
        padding: 20
    },
    userProfileView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    userProfileText: {
        fontSize: 16,
        fontFamily: 'roboto-medium'
    },
    userProfileImg: {
        width: 35,
        height: 35
    }
  });

export default Home;