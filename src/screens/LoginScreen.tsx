import axios from 'axios';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ToastAndroid,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import {useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function LoginScreen({navigation, route}: any) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 35,
      fontWeight: 'bold',
      color: '#279EFF',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      width: 300,
      borderRadius: 10,
    },
    buttonLogin: {
      backgroundColor: '#279EFF',
      padding: 10,
      width: 300,
      borderRadius: 10,
      marginTop: 20,
    },
    background: {
      flex: 1,
      width: '100%',
      backgroundColor: '#fff',
    },
    logoImage: {
      width: 400,
      height: 400,
      resizeMode: 'contain',
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    eyeIcon: {
      position: 'absolute',
      right: 20,
    },
  });

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {login, isLoading} = React.useContext(AuthContext);
  const [showPassword, setShowPassword] = React.useState(true);

  useEffect(() => {
    if (route.params?.showToast && route.params?.toastMessage) {
      ToastAndroid.show(route.params.toastMessage, ToastAndroid.SHORT);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/splash.png')}
          style={styles.logoImage}
        />
      </View>
      <Text style={styles.text}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        keyboardType="email-address"
        onChangeText={text => setEmail(text)}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          keyboardType="default"
          secureTextEntry={showPassword}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => {
            setShowPassword(!showPassword);
          }}>
          <Icon
            name={showPassword ? 'eye' : 'eye-off'}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.buttonLogin}
        onPress={() => {
          login(email, password);
        }}>
        <Text style={{color: '#fff', textAlign: 'center', fontSize: 20}}>
          Sign In
        </Text>
      </TouchableOpacity>

      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{color: '#279EFF'}}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
