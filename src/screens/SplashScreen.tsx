import React from 'react'
import { View, ActivityIndicator } from 'react-native'

export default function SplashScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#06bcee'}}>
        <ActivityIndicator size="large" color="#ffffff" />
    </View>
  )
}
