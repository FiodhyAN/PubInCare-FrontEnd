import React from 'react';
import {StatusBar} from 'react-native';
import {AuthProvider} from './src/context/AuthContext';
import Navigation from './src/navigation/Navigation';

export default function App() {
  return (
    <AuthProvider>
      <StatusBar hidden={true} />
      <Navigation />
    </AuthProvider>
  );
}
