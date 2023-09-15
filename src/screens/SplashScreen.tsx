import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { ThemeContext } from '../context/ThemeContext'

export default function SplashScreen() {
  const {isDark} = React.useContext(ThemeContext)
  return (
    <View style={{flex: 1, justifyContent: 'center', backgroundColor: isDark ? '#222' : '#06bcee'}}>
        <ActivityIndicator size="large" color="#ffffff" />
    </View>
  )
}
