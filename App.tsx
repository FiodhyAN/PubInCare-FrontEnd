import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import Navigation from './src/navigation/Navigation';
import NetInfo from '@react-native-community/netinfo';
import SplashScreen from './src/screens/SplashScreen';

export default function App() {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? false);
    });

    return unsubscribe;
  }, []);

  return (
    isConnected ? (
      <AuthProvider>
        <StatusBar hidden={true} />
        <Navigation />
      </AuthProvider>
    ) : (
      <SplashScreen />
    )
  );
}
