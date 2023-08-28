import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function App({navigation}: any) {
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

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(true);

  const {register, isLoading} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/splash.png')}
          style={styles.logoImage}
        />
      </View>
      <Text style={styles.text}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        keyboardType="default"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        value={password}
        keyboardType="default"
        secureTextEntry={showPassword}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.eyeIcon} onPress={() => {
        setShowPassword(!showPassword);
      }}>
        <Icon
          name= {showPassword ? 'eye' : 'eye-off'}
          size={20}
          color="gray"
        />
      </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.buttonLogin}
        onPress={() => {
          register(name, email, password, navigation);
        }}>
        <Text style={{color: '#fff', textAlign: 'center', fontSize: 20}}>
          Sign Up
        </Text>
      </TouchableOpacity>

      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{color: '#279EFF'}}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
