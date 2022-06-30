import React, { useContext, useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native'

import LoginSVG from '../../assets/images/login_re_4vu2.svg'
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const {login} = useContext(AuthContext)
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
          <TextInput placeholder='Username' style={styles.input} secureTextEntry={true} value={password} onChangeText={text => setPassword(text)} />
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.forgotText}>Foregot?</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity onPress={() => {login(username, password)}} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
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
    color: '#AD40AF',
    fontWeight: '700'
  },
  loginButton: {
    backgroundColor: '#AD40AF',
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

/*
import { StatusBar } from "expo-status-bar";
import React, {
  useState,
  useEffect
} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";

import axios  from 'axios';
 
export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [jwtToken, setJwtToken] = useState('')

  // useEffect(() => {
    
  // }, [jwtToken]);

  const loginHandler = () => {
    axios.post('https://anzarianz.elabins.com/wp-json/api/v1/token', {
        username, password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      ToastAndroid.show('Login success', ToastAndroid.SHORT);
      // ToastAndroid.show('Welcome ' + response.data, ToastAndroid.SHORT);
      console.log(response.data);
      setJwtToken(response.data.jwt_token)
    })
    .catch(function (error) {
      console.log('Error', error);
      ToastAndroid.show('Login Error', ToastAndroid.SHORT);
      // ToastAndroid.show(error.response.data, ToastAndroid.SHORT);
    });
  }

  const createPost = () => {
    axios.post('https://anzarianz.elabins.com/wp-json/wp/v2/posts', {
      "title" : "Post2 using api",
      "content" : "Test content",
      "status" : "publish"
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwtToken
      }
    })
    .then(function (response) {
      ToastAndroid.show('Login success', ToastAndroid.SHORT);
      // ToastAndroid.show('Welcome ' + response.data, ToastAndroid.SHORT);
      console.log(response.data);
    })
    .catch(function (error) {
      console.log('Error', error);
      ToastAndroid.show('Login Error', ToastAndroid.SHORT);
      // ToastAndroid.show(error.response.data, ToastAndroid.SHORT);
    });
  }
 
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/icon.png")} />
 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={(username) => setUsername(username)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
 
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
 
      <TouchableOpacity style={styles.loginBtn} onPress={loginHandler}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
 
      <TouchableOpacity style={styles.loginBtn} onPress={createPost}>
        <Text style={styles.loginText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
    width: 100,
    height: 100
  },
 
  inputView: {
    backgroundColor: "#7b40ff7d",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    width: '100%',
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#6200EA",
  },
  loginText: {
    color: "#FFFFFF"
    
  },
});
*/