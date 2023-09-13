import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import SettingComponent from '../component/SettingComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import FormData from 'form-data';
import {API} from '../config/API';

export default function ProfileScreen() {
  const {logout} = React.useContext(AuthContext);
  const [user, setUser] = React.useState<any>(null);
  const [foto, setFoto] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const getUser = async () => {
    const user = await AsyncStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
      setFoto(API + 'profile_image/' + JSON.parse(user).profile_image);
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

  const uploadProfilePicture = (foto: string) => {
    const filename = foto.split('/').pop();
    const fileExtension = filename?.split('.').pop();
    const validExtensions = ['jpg', 'jpeg', 'png'];

    if (!validExtensions.includes(fileExtension?.toLowerCase() || '')) {
      Alert.alert('Error', 'File yang diupload harus berupa gambar.');
      return;
    }

    let formData = new FormData();
    formData.append('profile_image', {
      uri: foto,
      name: filename,
      type: `image/${fileExtension?.toLowerCase()}`,
    });
    formData.append('id', user.id);
    axios
      .post(API + 'profile_image/store', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(async res => {
        await AsyncStorage.setItem(
          'user',
          JSON.stringify({...user, profile_image: res.data.profile_image}),
        );
        setUser({...user, profile_image: res.data.profile_image});
        setFoto(API + 'profile_image/' + res.data.profile_image);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const selectImage = (mediaType: any, setImage: any) => {
    launchImageLibrary({mediaType, includeBase64: false}, response => {
      handleImageResponse(response);
    });
  };

  const handleImageResponse = (response: any) => {
    if (response.assets && response.assets.length > 0) {
      const selectedUri = response.assets[0].uri;
      if (selectedUri) {
        setIsLoading(true);
        uploadProfilePicture(selectedUri);
      } else {
        Alert.alert('Error', 'Selected URI is undefined.');
      }
    } else {
      console.log('No assets selected.');
    }
  };

  const imagePicker = () => {
    Alert.alert('Change Profile Picture', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Camera',
        onPress: () =>
          launchCamera({mediaType: 'photo'}, response =>
            handleImageResponse(response),
          ),
      },
      {
        text: 'Gallery',
        onPress: () => selectImage('photo', setFoto),
      },
    ]);
  };

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
    logoutBtn: {
      backgroundColor: '#FF5733', // Your desired background color
      borderRadius: 50,
      paddingVertical: 10,
      paddingHorizontal: 20,
      alignItems: 'center',
      marginBottom: 30,
      marginHorizontal: 120,
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconLogout: {
      fontSize: 15,
      color: '#fff', // Text color
      marginRight: 5, // Spacing between icon and text
    },
    textLogout: {
      fontSize: 15,
      color: '#fff', // Text color
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        {isLoading ? (
          <ActivityIndicator animating={isLoading} size={60} color="#000" />
        ) : (
          <TouchableOpacity onPress={() => imagePicker()}>
            <Image
              source={
                foto
                  ? {uri: foto}
                  : require('../assets/images/default_profile.jpg')
              }
              style={styles.avatarImage}
            />
          </TouchableOpacity>
        )}
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>

      <View style={styles.settingSection}>
        <Text style={styles.sectionHeader}>Settings</Text>
        <TouchableOpacity onPress={() => Alert.alert('Coming Soon!')}>
          <SettingComponent
            icon="account"
            heading="Edit Profile"
            subheading="Update your details"
            subtitle="Change Password"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Coming Soon!')}>
          <SettingComponent
            icon="cog"
            heading="Theme"
            subheading="Customize your app's theme"
            subtitle="Permissions"
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.settingSection, {marginBottom: 20}]}>
        <Text style={styles.sectionHeader}>Other Options</Text>
        <TouchableOpacity onPress={() => Alert.alert('Coming Soon!')}>
          <SettingComponent
            icon="information"
            heading="About"
            subheading="Learn more about the app"
            subtitle="Contact Support"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.logoutBtn}
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
        <View style={styles.buttonContent}>
          <Icon name="sign-out" style={styles.iconLogout} />
          <Text style={styles.textLogout}>Logout</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}
