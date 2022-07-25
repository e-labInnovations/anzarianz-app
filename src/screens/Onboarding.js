import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity
} from "react-native";

import { Theme } from "../Theme";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import StartImg from '../../assets/images/mobile_life_re_jtih.svg'

const Onboarding = ({navigation}) => {
   
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.startTextView}>
          <Text style={styles.textView}>Anzarianz</Text>
        </View>
        <View style={styles.startImgView}>
          <StartImg width={300} height={300} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.startButton}>
          <Text style={styles.startText}>Let's Start</Text>
          <MaterialIcons name="navigate-next" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </SafeAreaView>
    );
}
 
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  textView: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#20315F'
  },
  startButton: {
    backgroundColor: Theme.Primary,
    padding: 20,
    width: '90%',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50
  },
  startText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'roboto-medium-italic'
  },
  startTextView: {
    marginTop: 20,
  },
  startImgView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Onboarding;