import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {AuthProvider} from './src/context/AuthContext';
import Navigation from './src/navigation/Navigation';
import NetInfo from '@react-native-community/netinfo';
import SplashScreen from './src/screens/SplashScreen';

export default function App() {
  return (
    <AuthProvider>
      <StatusBar hidden={true} />
      <Navigation />
    </AuthProvider>
  );
}
