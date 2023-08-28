import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import {AuthContext, AuthProvider} from './src/context/AuthContext';
import Navigation from './src/component/Navigation';

export default function App() {
  return (
    <AuthProvider>
      <StatusBar hidden={true} />
      <Navigation />
    </AuthProvider>
  );
}
