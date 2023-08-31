import React from 'react'
import { View, Image, Text, StatusBar } from 'react-native'

export default function NoInternetScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#fff'}}>
        <StatusBar hidden={false} />
        <Image source={require('../assets/images/no-internet.png')} style={{width: 200, height: 200, alignSelf: 'center'}} />
        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginTop: 20}}>No Connection Available</Text>
    </View>
  )
}
