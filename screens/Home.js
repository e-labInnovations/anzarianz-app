import react from "react";
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    ScrollView,
    ImageBackground
} from "react-native";

const Home = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.userProfileView}>
                <Text style={styles.userProfileText}>Hello Ashad</Text>
                <ImageBackground source={require('../assets/user.jpg')} style={styles.userProfileImg} imageStyle={{borderRadius: 25}} />
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