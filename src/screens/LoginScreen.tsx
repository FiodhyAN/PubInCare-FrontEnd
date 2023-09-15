import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import {useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../context/ThemeContext';

export default function LoginScreen({navigation, route}: any) {
  const {isDark} = React.useContext(ThemeContext)
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#222' : '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 35,
      fontWeight: 'bold',
      color: isDark ? '#DDD' : '#279EFF',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      width: 300,
      borderRadius: 10,
      borderColor: isDark ? '#DDD' : '#000',
      color: isDark ? '#DDD' : '#000',
    },
    buttonLogin: {
      backgroundColor: isDark ? '#001F3F' : '#279EFF',
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
        placeholderTextColor={isDark ? '#DDD' : '#000'}
        value={email}
        keyboardType="email-address"
        onChangeText={text => setEmail(text)}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          placeholderTextColor={isDark ? '#DDD' : '#000'}
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
        <Text style={{color: isDark ? '#DDD' : '#fff', textAlign: 'center', fontSize: 20}}>
          Sign In
        </Text>
      </TouchableOpacity>

      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Text style={{ color: isDark ? '#ddd' : '#000' }}>Don't have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Register');
            setEmail('');
            setPassword('');
          }}>
          <Text style={{color: '#279EFF'}}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', marginTop: 5}}>
        <Text style={{ color: isDark ? '#ddd' : '000' }}>Forgot Password? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ForgotPW');
            setEmail('');
            setPassword('');
          }}>
          <Text style={{color: '#279EFF'}}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
