import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import SettingComponent from '../component/SettingComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [user, setUser] = React.useState<any>(null);

  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        setUser(JSON.parse(value));
      }
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);

  if (user === null) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    profileContainer: {
      alignItems: 'center',
      paddingBottom: 20,
    },
    avatarImage: {
      height: 120,
      width: 120,
      borderRadius: 60,
      marginBottom: 20,
    },
    userName: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 10,
    },
    userEmail: {
      fontSize: 16,
      color: '#757575',
      marginTop: 5,
    },
    settingSection: {
      marginTop: 20,
    },
    sectionHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/images/default_profile.jpg')}
          style={styles.avatarImage}
        />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>

      <View style={styles.settingSection}>
        <Text style={styles.sectionHeader}>Settings</Text>
        <SettingComponent
          icon="account"
          heading="Edit Profile"
          subheading="Update your details"
          subtitle="Change Password"
        />
        <SettingComponent
          icon="cog"
          heading="Theme"
          subheading="Customize your app's theme"
          subtitle="Permissions"
        />
      </View>

      <View style={[styles.settingSection, {marginBottom:20}]}>
        <Text style={styles.sectionHeader}>Other Options</Text>
        <SettingComponent
          icon="currency-usd"
          heading="Offers & Referrals"
          subheading="View special offers"
          subtitle="Refer friends"
        />
        <SettingComponent
          icon="information"
          heading="About"
          subheading="Learn more about the app"
          subtitle="Contact Support"
        />
      </View>
    </ScrollView>
  );
}
