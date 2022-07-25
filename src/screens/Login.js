import React, { useContext, useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'

import { Theme } from '../Theme';
import LoginSVG from '../../assets/images/login_re_4vu2.svg'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext)
  const { isLoading } = useContext(AuthContext)
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.mainView}>
        <View style={styles.loginSVGView}>
          <LoginSVG height={300} width={300} style={styles.loginSVGImg} />
        </View>
        <Text style={styles.loginText}>Login</Text>
        <View style={styles.inputView}>
          <FontAwesome5 name="user-circle" size={20} color="#666" style={styles.inputIcon} />
          <TextInput placeholder='Username' style={styles.input} value={username} keyboardType="email-address" onChangeText={text => setUsername(text)} />
        </View>
        <View style={styles.inputView}>
          <Ionicons name="ios-lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput placeholder='Password' style={styles.input} secureTextEntry={true} value={password} onChangeText={text => setPassword(text)} />
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.forgotText}>Foregot?</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity onPress={() => {login(username, password)}} style={styles.loginButton}>
          {isLoading && <ActivityIndicator size="large" color="#fff" />}
          {!isLoading && <Text style={styles.loginButtonText}>Login</Text>}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    justifyContent: 'center'
  },
  loginSVGView: {
    alignItems: 'center'
  },
  loginSVGImg: {
  },
  loginText:{
    fontFamily: 'roboto-medium',
    fontSize: 28,
    fontWeight: '500',
    color: '#333',
    marginBottom: 30
  },
  mainView: {
    paddingHorizontal: 25
  },
  inputView: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25
  },
  inputIcon: {
    marginRight: 5
  },
  input: {
    flex: 1,
    paddingVertical: 0
  },
  forgotText: {
    color: Theme.Primary,
    fontWeight: '700'
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.Primary,
    padding: 20,
    borderRadius: 10,
    marginBottom: 30
  },
  loginButtonText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    color: '#FFF'
  }
});

export default Login