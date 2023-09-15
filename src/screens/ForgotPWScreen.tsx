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
import {AuthContext} from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../context/ThemeContext';

export default function App({navigation}: any) {
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
      width: 300,
      height: 300,
      resizeMode: 'contain',
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    eyeIcon: {
      position: 'absolute',
      right: 30,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(true);

  const {changePW, isLoading} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/splash.png')}
          style={styles.logoImage}
        />
      </View>
      <Text style={styles.text}>Change Password</Text>
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
          placeholder="Enter New Password"
          placeholderTextColor={isDark ? '#DDD' : '#000'}
          value={password}
          keyboardType="default"
          secureTextEntry={showPassword}
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          placeholderTextColor={isDark ? '#DDD' : '#000'}
          value={confirmPassword}
          keyboardType="default"
          secureTextEntry={showConfirmPassword}
          onChangeText={text => setConfirmPassword(text)}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => {
            setShowConfirmPassword(!showConfirmPassword);
          }}>
          <Icon
            name={showConfirmPassword ? 'eye' : 'eye-off'}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.buttonLogin}
        onPress={() => {
            if (password != confirmPassword) {
                ToastAndroid.show('Password and Confirm Password must be same', ToastAndroid.SHORT);
            } else {
                changePW(email, password, confirmPassword, navigation);
            }
        }}>
        <Text style={{color: '#fff', textAlign: 'center', fontSize: 20}}>
            Change Password
        </Text>
      </TouchableOpacity>

      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Text style={{ color: isDark ? '#DDD' : '#000' }}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{color: '#279EFF'}}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
