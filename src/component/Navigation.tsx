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

export default function Navigation() {
  const Stack = createNativeStackNavigator();
  const {userInfo, splashLoading} = React.useContext(AuthContext);
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
              }}
            />
            <Stack.Screen
              name="Map"
              component={MapScreen}
              options={{
                headerShown: false,
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
