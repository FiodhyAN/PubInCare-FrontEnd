import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {AuthProvider} from './src/context/AuthContext';
import Navigation from './src/navigation/Navigation';
import { ThemeContextProvider } from './src/context/ThemeContext';

export default function App() {
  return (
    <AuthProvider>
      <ThemeContextProvider>
        <StatusBar hidden={true} />
        <Navigation />
      </ThemeContextProvider>
    </AuthProvider>
  );
}
