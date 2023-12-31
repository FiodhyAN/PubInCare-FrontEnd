import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AuthContext} from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SplashScreen from '../screens/SplashScreen';
import StartScreen from '../screens/StartScreen';
import PelaporanNavigation from './PelaporanNavigation';
import MapScreen from '../screens/MapScreen';
import NetInfo from '@react-native-community/netinfo';
import NoInternetScreen from '../screens/NoInternetScreen';
import ForgotPWScreen from '../screens/ForgotPWScreen';
import DetailLaporanScreen from '../screens/DetailLaporanScreen';
import { ThemeContext } from '../context/ThemeContext';
import StatusScreen from '../screens/StatusScreen';
import AboutScreen from '../screens/AboutScreen';

export default function Navigation() {
  const Stack = createNativeStackNavigator();
  const {userInfo, splashLoading} = React.useContext(AuthContext);
  const [isConnected, setIsConnected] = React.useState<boolean>(true);
  const {isDark} = React.useContext(ThemeContext)

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? false);
    });

    return unsubscribe;
  }, []);

  if (isConnected) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {splashLoading ? (
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{
                headerShown: false,
              }}
            />
          ) : userInfo ? (
            <>
              <Stack.Screen
                name="Start"
                component={StartScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="PelaporanNavigation"
                component={PelaporanNavigation}
                options={{
                  headerShown: false,
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="Map"
                component={MapScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="DetailLaporan"
                component={DetailLaporanScreen}
                options={{
                  headerShown: true,
                  title: 'Detail Laporan',
                  headerTitleAlign: 'center',
                  headerStyle: {
                    backgroundColor: isDark ? '#001F3F' :'#00BFFF',
                  },
                  headerTintColor: isDark ? '#DDD' :'#fff',
                  animation: 'slide_from_right'
                }}
              />
              <Stack.Screen
                name='Status'
                component={StatusScreen}
                options={{
                  headerShown: true,
                  title: 'Status Laporan',
                  headerTitleAlign: 'center',
                  headerStyle: {
                    backgroundColor: isDark ? '#001F3F' :'#00BFFF',
                  },
                  headerTintColor: isDark ? '#DDD' :'#fff',
                  animation: 'slide_from_right'
                }}
              />
              <Stack.Screen
                name="About"
                component={AboutScreen}
                options={{
                  headerShown: true,
                  title: 'About',
                  headerTitleAlign: 'center',
                  headerStyle: {
                    backgroundColor: isDark ? '#001F3F' :'#00BFFF',
                  },
                  headerTintColor: isDark ? '#DDD' :'#fff',
                  animation: 'slide_from_right'
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ForgotPW"
                component={ForgotPWScreen}
                options={{
                  headerShown: false,
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return <NoInternetScreen />;
  }
}
