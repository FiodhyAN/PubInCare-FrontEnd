import axios from 'axios';
import qs from 'qs';
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
  changePW: (
    email: string,
    password: string,
    confirmPassword: string,
    navigation: any,
  ) => {},
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
      let data = qs.stringify({
        name: name,
        email: email,
        password: password,
      });
      setIsLoading(true);
      axios
        .post(API + 'register', data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        .then(response => {
          setIsLoading(false);
          navigation.navigate('Login', {
            showToast: true,
            toastMessage: response.data.message,
          });
        })
        .catch(error => {
          setIsLoading(false);
          ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
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
      let data = qs.stringify({
        email: email,
        password: password,
      });
      setIsLoading(true);
      axios
        .post(API + 'login', data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        .then(function (response) {
          setUserInfo(response.data.user);
          AsyncStorage.setItem('user', JSON.stringify(response.data.user));
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

  const changePW = (
    email: string,
    password: string,
    confirmPassword: string,
    navigation: any,
  ) => {
    if (password != confirmPassword) {
      ToastAndroid.show(
        'Password and Confirm Password must be same',
        ToastAndroid.SHORT,
      );
    } else {
      let data = qs.stringify({
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });
      setIsLoading(true);
      axios
        .put(API + 'change-password', data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        .then(function (response) {
          setIsLoading(false);
          navigation.navigate('Login', {
            showToast: true,
            toastMessage: response.data.message,
          });
          ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
        })
        .catch(function (error) {
          setIsLoading(false);
          ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
        });
    }
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);
      let user = await AsyncStorage.getItem('user');
      user = user ? JSON.parse(user) : null;

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
      value={{register, isLoading, login, userInfo, splashLoading, logout, changePW}}>
      {children}
    </AuthContext.Provider>
  );
};
