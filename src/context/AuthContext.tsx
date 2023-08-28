import axios from 'axios';
import React, {ReactNode} from 'react';
import {API} from '../config/API';
import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = React.createContext({
  register: (
    name: string,
    email: string,
    password: string,
    navigation: any,
  ) => {},
  isLoading: false,
  login: (email: string, password: string) => {},
  userInfo: null as string | null,
  splashLoading: false,
  logout: () => {},
});

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState<string | null>(null);
  const [splashLoading, setSplashLoading] = React.useState(false);

  const register = (
    name: string,
    email: string,
    password: string,
    navigation: any,
  ) => {
    if (!name || !email || !password) {
      ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
    } else {
      setIsLoading(true);
      axios
        .post(API + 'register', {
          email: email,
          password: password,
        })
        .then(response => {
          setIsLoading(false);
          navigation.navigate('Login', {
            showToast: true,
            toastMessage: 'Registration Successful Please Login',
          });
        })
        .catch(error => {
          setIsLoading(false);
          ToastAndroid.show('Email already exists', ToastAndroid.SHORT);
          console.log(error);
        });
    }
  };

  const login = (email: string, password: string) => {
    if (email == '' || password == '') {
      ToastAndroid.show(
        'Email or Password cannot be empty',
        ToastAndroid.SHORT,
      );
      return;
    } else {
      setIsLoading(true);
      axios
        .post(API + 'login', {
          email: email,
          password: password,
        })
        .then(function (response) {
          setUserInfo(response.data);
          AsyncStorage.setItem('user', JSON.stringify(response.data));
          setIsLoading(false);
        })
        .catch(function (error) {
          setIsLoading(false);
          ToastAndroid.show(
            'Email or Password is incorrect',
            ToastAndroid.SHORT,
          );
        });
    }
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);
      let user = await AsyncStorage.getItem('user');
      user = user ? JSON.parse(user) : null;
      console.log(user);
      
      if (user) {
        setUserInfo(user);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSplashLoading(false);
    }
  };

  const logout = () => {
    AsyncStorage.removeItem('user');
    setUserInfo(null);
  };

  React.useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{register, isLoading, login, userInfo, splashLoading, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
