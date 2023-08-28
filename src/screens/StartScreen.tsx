import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function StartScreen({navigation}: any) {
  const {logout, isLoading} = React.useContext(AuthContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    button: {
      flexDirection: 'row',
      backgroundColor: '#279EFF',
      padding: 10,
      borderRadius: 10,
      marginTop: 20,
    },
    logoutButton: {
      flexDirection: 'row',
      position: 'absolute',
      top: 20,
      right: 20,
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 20,
      marginStart: 75,
      marginTop: 10,
    },
    buttonContainer: {
      justifyContent: 'center',
      padding: 20,
      marginTop: 50,
    },
    titleContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 280,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#fff',
    },
    subtitle: {
      fontSize: 15,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
    },
    buttonImage: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
    },
  });
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/bg.jpeg')}
        style={{flex: 1, justifyContent: 'center'}}
        resizeMode="cover">
          <View style={styles.titleContainer}>
            <Text style={styles.title}>PubInCare</Text>
            <Text style={styles.subtitle}>
              Fixing Our Hometown One Step At A Time
            </Text>
          </View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            Alert.alert(
              'Logout',
              'Are you sure you want to logout?',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => logout()},
              ],
              {cancelable: false},
            );
          }}>
          <Icon name="logout" size={20} color={'#fff'} />
          <Text style={{color: '#fff', fontSize: 16}}> Logout</Text>
        </TouchableOpacity>
          
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PelaporanNavigation');
            }}
            style={styles.button}>
            <Icon name="clipboard-text-outline" color={'#fff'} size={50} />
            <Text style={styles.buttonText}>Pelaporan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Coming Soon');
            }}
            style={styles.button}>
              <Icon name="cellphone-marker" color={'#fff'} size={50} />
            <Text style={styles.buttonText}>Turis Spot</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
